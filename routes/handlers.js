const express = require('express');
const router = express.Router();

const orm = require('../config/orm');
const { json } = require('body-parser');

router.get('/', function (req, res) {
  orm.selectAll(function (error, notes) {
    if (error) {
      return res.status(501).json({
        message: 'Not able to query the database'
      });
    } 
    
    console.log('Notes: ', notes);
    res.render('index', { notes, style: 'index' });
  });
});


router.post('/add', (req, res) => {

  const noteTitle = req.body.note_title;

  orm.insertOne(noteTitle, function(error, note){
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




module.exports = router; 