const express= require('express');
const rotas= express.Router();
const teachers= require('./teachers');


rotas.get('/', function(req,res){
    return res.redirect("/teacher");
})
rotas.get('/teacher/', teachers.index)



rotas.get('/teacher/cadastrar', function(req,res){
    return res.render("teachers/form")
})

rotas.post('/teacher', teachers.post);

rotas.get('/teacher/:id/edit', teachers.edit);
rotas.get('/teacher/:id', teachers.show);

rotas.put('/teacher', teachers.put);
rotas.delete('/teacher', teachers.delete)

module.exports = rotas;