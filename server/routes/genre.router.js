const express = require('express');
const router = express.Router();
const pool = require('../modules/pool')

router.get('/', (req, res) => {
  const queryText = `
  SELECT * FROM "genres"
  `
  pool.query(queryText)
    .then(response=>{
      res.send(response.rows)
    })
    .catch(err=>{
      console.log('Error in GET genres', err)
    })
});

module.exports = router;