
var path = require('path');

//POTSGRES DATABASE_URL=   postgres://jjkdpwfqesaiuj:lijnQFQ_ITg11Fis_NxP4F2k5W@ec2-54-83-20-177.compute-1.amazonaws.com:5432/d38ur2gqar7u4p

//LOCAL DATABASE_URL = sqlite://:@:/
var url = process.env.DATABASE_URL.match(/(.*)\:\/\/(.*?)\:(.*)@(.*)\:(.*)\/(.*)/);
var DB_name     = (url[6]||null);
var user        = (url[2]||null);
var pwd         = (url[3]||null);
var protocol    = (url[1]||null);
var dialect     = (url[1]||null);
var port        = (url[5]||null);
var host        = (url[4]||null);
var storage     = process.env.DATABASE_STORAGE;



//Cargamos modelo ORM
var Sequelize = require('sequelize');

//Usar sqllite
var sequelize = new Sequelize(DB_name, user, pwd,
                {
                    dialect: protocol, 
                    protocol: protocol,
                    port:    port,
                    host:    host,
                    storage: storage,
                    omitNull:true
                });

var Quiz = sequelize.import(path.join(__dirname, 'quiz'));

//exportamos Quiz
exports.Quiz = Quiz;

//inicializar base de datos
sequelize.sync().then(function() {
    Quiz.count().then(function(count){
        if(count === 0) {
            Quiz.create({
                pregunta: 'Capital de Italia',
                respuesta: 'Roma',
                tema: 'Humanidades'
            });
            Quiz.create({
                pregunta: 'Capital de Portugal',
                respuesta: 'Lisboa',
                tema: 'Humanidades'
            })
                    .then(function(){console.log('La base de datos ha sido creada')});
        };
    });
});
