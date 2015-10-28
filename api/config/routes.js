var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var apiController = require('../controllers/api.js');

router.route('/api/quizzes')
  .get(apiController.quizSet);

router.route('/api/games')
  .get(apiController.getGames)
  .post(apiController.createGame);

router.route('/api/games/:id')
  .put(apiController.joinGame)

module.exports = router;
