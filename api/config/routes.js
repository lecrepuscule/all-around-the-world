var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var apiController = require('../controllers/api.js');

// Event
router.route('/api/quizzes')
  .get(apiController.quizSet);

module.exports = router;
