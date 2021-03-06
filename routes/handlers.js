const express = require('express');
const router = express.Router();

const orm = require('../config/orm');
const { json } = require('body-parser');


// GET

router.get('/', function (req, res) {
  orm.selectAllBy('is_favorite', false, function (error, notes) {
    if (error) {
      return res.status(501).json({
        message: 'Not able to query the database'
      });
    } 
    
    console.log('Notes: ', notes);
    res.render('index', { notes, style: 'index' });
  });
});

router.get('/all', (req, res) => {
  orm.selectAll(function (error, notes) {
    if (error) {
      return res.status(501).json({
        message: 'Not able to query the database'
      });
    } 
    
    console.log('Notes: ', notes);
    res.render('allNotes', { notes, style: 'all' });
  });
});


router.get('/favorites', (req, res) => {
  orm.selectAllBy('is_favorite', true, function (error, notes) {
    if (error) {
      return res.status(501).json({
        message: 'Not able to query the database by favorite.'
      });
    } 
    
    res.render('favorites', { notes, style: 'favorite' });
  });
});

// END


// POST

router.post('/add', (req, res) => {

  const noteTitle = req.body.note_title;

  orm.insertOne(noteTitle, function(error, note) {

    if (error) {
      return res.status(401).json({
        message: 'Not able to add the note'
      });
    }
    return res.json({
      note_title: noteTitle,
      note_id: note.insertId,
      is_favorite: 0 // Zero for False , One for True
    });
  });
});

// END


//DELETE 

router.delete('/delete/:id', (req, res) => {

  const id = req.params.id; 

  orm.deleteOne(id, function (err, note) {

    if (err) {
      return res.status(501).json({
        message: 'Not able to delete note.'
      });
    }

    return res.json({
      id
    });
  });
});

// END


//UPDATE HANDLER

router.put('/:id/:value', (req, res) => {

  const id = req.params.id; 
  const value = JSON.parse(req.params.value); 

  orm.updateOne(value, id, function(error, note){
    if (error) {
      return res.status(501).json({
        message: 'Not able to add note to your favorites list.'
      });
    }
    return res.json({
      id: id
    });
  });
});

// END


// EXPORT

module.exports = router; 

// END