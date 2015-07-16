var express = require('express');
var router = express.Router();
var quizController = require('../controllers/quiz_controller');
var authorController = require('../controllers/author_controller');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Quiz', errors: [] });
});


// Autoload bbdd
router.param('quizId', quizController.load);


//Routes de quizz
router.get('/quizes' , quizController.index);
router.get('/quizes/:quizId(\\d+)' , quizController.show);
router.get('/quizes/:quizId(\\d+)/answer' , quizController.answer);
router.get('/author' , authorController.author);
router.get('/quizes/buscar', quizController.busqueda);
router.get('/quizes/listado', quizController.search);
router.get('/quizes/new', quizController.new);
router.post('/quizes/create', quizController.create);


module.exports = router;
