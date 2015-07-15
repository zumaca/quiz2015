var models = require('../models/models.js');


// Carga del load
exports.load = function(req, res, next, quizId) {
    models.Quiz.findById(quizId).then (
            function(quiz) {
                if (quiz) {
                    req.quiz = quiz;
                    next();
                } else { next(new Error('No existe quizId= ' + quizId));}
            }
            ).catch(function(error) {next(error);});
    };



// GET /quizes

exports.index = function(req, res) {
    models.Quiz.findAll().then(function(quizes) {
        res.render('quizes/indice.ejs', {quizes: quizes});
    });
    
};


// GET /quiz/id
exports.show = function(req, res) {
    
        res.render('quizes/show', {quiz: req.quiz});
    };


//GET /quizes/id/answer
exports.answer = function(req, res) {
    var resultado = 'Incorrecto';
   
    if (req.query.respuesta === req.quiz.respuesta){
        resultado = 'Correcto';
    } 
    res.render('quizes/answer', {quiz: req.quiz, respuesta: resultado});
    };
 
// GET /quizes/buscar
exports.busqueda = function(req, res) {
    res.render('quizes/buscar');
};

//GET /quizes/buscar preguntas search
exports.search = function(req, res) {
    var blancos = req.query.search;
    var busqueda = blancos.split(" ").join("%");
    models.Quiz.findAll({where: ["pregunta like ?", "%"+ busqueda +"%"] , 
        order: [['pregunta','asc']]}).then(function(results) {
        
        res.render('quizes/search', {results: results});
        
    });
    
};