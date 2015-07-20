//Definicion del modelo Quiz
module.exports = function(sequelize, DataTypes) {
    return sequelize.define('Quiz', {
        pregunta: {
        type: DataTypes.STRING,
        validate: { notEmpty: {msg: "-> Falta pregunta"}}},
        respuesta: {
        type: DataTypes.STRING,
        validate: { notEmpty: {msg: "-> Falta respuesta"}}},
        tema: {
            type: DataTypes.STRING,
            validate: {notEmpty: {msg: "-> Falta tema de la pregunta"}}}
    });
};
