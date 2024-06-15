import { createStore, combineReducers, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import { takeEvery, put } from 'redux-saga/effects';
import axios from 'axios';
import { composeWithDevTools } from '@redux-devtools/extension';

// Create the rootSaga generator function
function* rootSaga() {
  yield takeEvery('FETCH_MOVIES', fetchAllMovies);
  yield takeEvery('FETCH_CURRENT', fetchCurrent);
  yield takeEvery('FETCH_GENRES', fetchGenres)
  yield takeEvery('ADD_MOVIE', addMovie)
  yield takeEvery('UPDATE_MOVIE', updateMovie)
}

function* fetchAllMovies() {
  try {
    // Get the movies:
    const moviesResponse = yield axios.get('/api/movies');
    // Set the value of the movies reducer:
    yield put({
      type: 'SET_MOVIES',
      payload: moviesResponse.data
    });
  } catch (error) {
    console.log('fetchAllMovies error:', error);
  }
}

function* fetchCurrent(action){
  try{
    const currentResponse = yield axios(`/api/movies/${action.payload.id}`)
    yield put({type: 'SET_CURRENT', payload: currentResponse.data})
  } catch (err){
    console.log('Error in current GET saga', err)
  }
}

function* fetchGenres(action){
  try {
    const genreResponse = yield axios('/api/genres')
    yield put({type: 'SET_GENRES', payload: genreResponse.data})
  } catch(err){
    console.log('Error in GET genres saga', err)
  }
}

function* addMovie(action){
 try {
  yield axios.post('/api/movies', action.payload)
  yield put({type: 'FETCH_MOVIES'})
 } catch (err) {
  console.log('Error in POST saga', err)
 }
}

function* updateMovie(action){
  try {
    yield axios.put('/api/movies/edit', action.payload)
    yield put({type: 'FETCH_MOVIES'})

  } catch (err){
    console.log('Error in PUT movie saga', err)
  }
}

// Create sagaMiddleware
const sagaMiddleware = createSagaMiddleware();

// Used to store movies returned from the server
const movies = (state = [], action) => {
  switch (action.type) {
    case 'SET_MOVIES':
      return action.payload;
    default:
      return state;
  }
}

// Used to store the movie genres
const genres = (state = [], action) => {
  switch (action.type) {
    case 'SET_GENRES':
      return action.payload;
    default:
      return state;
  }
}

const currentMovie = (state = {}, action)=>{
  switch (action.type){
    case 'SET_CURRENT':
      return action.payload[0]
    default:
      return state
  }
}

// Create one store that all components can use
const storeInstance = createStore(
  combineReducers({
    movies,
    genres,
    currentMovie
  }),
  // Add sagaMiddleware to our store
  composeWithDevTools(
    applyMiddleware(sagaMiddleware, logger),
  )
);

// Pass rootSaga into our sagaMiddleware
sagaMiddleware.run(rootSaga);

export default storeInstance;
