const dbConnection = require('./connection');
const dbRoutes = require('express').Router();

function getPeople(req, res) {
  const db = dbConnection.getDb();

  db.collection("people")
    .find({}).limit(50)
    .toArray((err, result) => {
      if (err) {
        res.status(400).send("Error fetching listings!");
     } else {
        res.json(result);
      }
    });
}

dbRoutes.get('/users', getPeople);
 
module.exports = dbRoutes;