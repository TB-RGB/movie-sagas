const express = require("express");
const router = express.Router();
const pool = require("../modules/pool");

router.get("/", (req, res) => {
  const query = `
    SELECT * FROM "movies"
      ORDER BY "title" ASC;
  `;
  pool
    .query(query)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      console.log("ERROR: Get all movies", err);
      res.sendStatus(500);
    });
});

router.post("/", (req, res) => {
  console.log(req.body);
  // RETURNING "id" will give us back the id of the created movie
  const insertMovieQuery = `
    INSERT INTO "movies" 
      ("title", "poster", "description")
      VALUES
      ($1, $2, $3)
      RETURNING "id";
  `;
  const insertMovieValues = [
    req.body.title,
    req.body.poster,
    req.body.description,
  ];
  // FIRST QUERY MAKES MOVIE
  pool
    .query(insertMovieQuery, insertMovieValues)
    .then((result) => {
      // ID IS HERE!
      console.log("New Movie Id:", result.rows[0].id);
      const createdMovieId = result.rows[0].id;

      // Now handle the genre reference:
      const insertMovieGenreQuery = `
        INSERT INTO "movies_genres" 
          ("movie_id", "genre_id")
          VALUES
          ($1, $2);
      `;
      const insertMovieGenreValues = [createdMovieId, req.body.genre_id];
      // SECOND QUERY ADDS GENRE FOR THAT NEW MOVIE
      pool
        .query(insertMovieGenreQuery, insertMovieGenreValues)
        .then((result) => {
          //Now that both are done, send back success!
          res.sendStatus(201);
        })
        .catch((err) => {
          // catch for second query
          console.log(err);
          res.sendStatus(500);
        });
    })
    .catch((err) => {
      // 👈 Catch for first query
      console.log(err);
      res.sendStatus(500);
    });
});

router.get("/:id", (req, res) => {
  const queryText = `
  SELECT
  "movies"."id" AS "movie_id",
  "movies"."title" AS "title",
  "movies"."description" AS "description",
  "movies"."poster" AS "poster",
  jsonb_agg(jsonb_build_object('name', "genres"."name")) AS "genres"
  FROM "movies"
  JOIN "movies_genres" ON "movies"."id" = "movies_genres"."movie_id"
  JOIN "genres" ON "movies_genres"."genre_id" = "genres"."id"
  WHERE "movies"."id" = $1
  GROUP BY "movies"."id";
  `;
  const currentId = [req.params.id];
  pool
    .query(queryText, currentId)
    .then((response) => {
      res.send(response.rows);
    })
    .catch((err) => {
      console.log("Error in current GET request", err);
      res.sendStatus(500);
    });
});

router.put('/edit', (req,res)=>{
  const queryText = `
  UPDATE "movies" SET "title" = $1, "description" = $2
  WHERE "id"=$3;
  `
  const valArray = [req.body.title, req.body.description, req.body.movie_id]

  pool.query(queryText, valArray)
    .then(response=>{
      const genreQuery = `
       INSERT INTO "movies_genres" 
          ("movie_id", "genre_id")
          VALUES
          ($1, $2); 
      `
      const valArray = [req.body.movie_id, req.body.genre_id]

      pool.query(genreQuery, valArray)
        .then(response=>{
          res.sendStatus(204)
        })
        .catch(err=>{
          console.log('Error in PUT query', err)
        })
    })
})

module.exports = router;
