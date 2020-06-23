const express = require('express');
const router = express.Router();

const orm = require('../config/orm');

router.get('/', function (req, res) {
  orm.selectAll(function (error, notes) {
    if (error) {
      return res.status(501).json({
        message: 'Not able to query the database'
      });
    } 
    console.log('Notes: ', notes);
    res.render('index', { notes });
  });
});

module.exports = router; 