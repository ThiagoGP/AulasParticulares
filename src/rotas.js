const express= require('express');
const rotas= express.Router();
const teachers= require('./app/controllers/teachers');
const students = require('./app/controllers/students')

//Teacher
rotas.get('/', function(req,res){
    return res.redirect('/teacher');
})
rotas.get('/teacher/', teachers.index)
rotas.get('/teacher/cadastrar', teachers.form)
rotas.post('/teacher', teachers.post);
rotas.get('/teacher/:id/edit', teachers.edit);
rotas.get('/teacher/:id', teachers.show);
rotas.put('/teacher', teachers.put);
rotas.delete('/teacher', teachers.delete)

//Student

rotas.get('/students', students.index )

rotas.get('/students/form', students.create)

rotas.post('/students', students.post)
rotas.get('/students/:id', students.show);
rotas.get('/students/:id/edit', students.edit);
rotas.put('/students', students.put);
rotas.delete('/students', students.delet)
module.exports = rotas;