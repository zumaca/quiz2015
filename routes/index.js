var express = require('express');
var router = express.Router();
var quizController = require('../controllers/quiz_controller');
var authorController = require('../controllers/author_controller');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Quiz' });
});


// Autoload bbdd
router.param('quizId', quizController.load);


//Routes de quizz
router.get('/quizes' , quizController.index);
router.get('/quizes/:quizId(\\d+)' , quizController.show);
router.get('/quizes/:quizId(\\d+)/answer' , quizController.answer);
router.get('/author' , authorController.author);


module.exports = router;
