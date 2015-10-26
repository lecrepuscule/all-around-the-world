var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var countriesController = require('../controllers/countries.js');

// Event
router.route('/countries')
  .get(countriesController.index);

module.exports = router;
