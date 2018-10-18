var express = require('express');
var router = express.Router();
const knex = require('../knex')

// READ ALL records for this table
router.get('/', (req, res, next) => {
knex('blogpost')
 .then((rows) => {
   res.json(rows)
 })
 .catch((err) => {
   next(err)
 })
})
// READ ONE record for this table
router.get('/:id', (req, res, next) => {
knex('blogpost')
 .where('id',req.params.id)
 .then((rows) => {
   res.json(rows)
 })
 .catch((err) => {
   next(err)
 })
})

// CREATE ONE record for this table
router.post('/', (req, res, next) => {
knex('blogpost')
 .insert({
   "title": req.body.title,
   "content": req.body.content
 })
 .returning('*')
 .then((data) => {
   res.json(data[0])
 })
 .catch((err) => {
   next(err)
 })
})

// UPDATE ONE record for this table

router.patch('/:id', (req, res, next) => {

  // Using the given id, look up if that record actually exists
  // req.params.id

  knex('blogpost')
    .where('id', req.params.id)
    .then((results) => {
      console.log('record', results);
      // If found, go ahead and update it
      if (results.length > 0) {
        // all good, it was found-- update it
        let updatedBlogpost = results[0]
        if (req.body.title) { updatedBlogpost.title = req.body.title }
        if (req.body.director) { updatedBlogpost.content = req.body.content }
        // UPDATE the record in the DB
        knex('blogpost')
          .update(updatedBlogpost)
          .where('id', req.params.id)
          .returning('*')
          .then((resUpdate) => {

            // Send back the newly updated record object
            res.send(resUpdate)
          })

      } else {
        throw new Error('NOT FOUND.')
      }
    })
    .catch((err) => {
      next(err)
    })
})

// DELETE ONE record for this table
router.delete('/:id', (req, res, next) => {
  // lookup or verify that the record specified by the given id, actually exists
  // req.params.id
  knex('blogpost')
    .where('id', req.params.id)
    .then((thePost) => {
      // if it exists, delete it
      if (thePost.length > 0) {
        // delete it
        knex('blogpost')
          .del()
          .where('id', req.params.id)
          .returning('*')
          .then((result) => {
            res.send(result[0])
          })
      } else {
        throw new Error(`Can't delete what does not exist`)
      }
    })
    .catch((err) => {
      next(err)
    })
})

module.exports = router;
