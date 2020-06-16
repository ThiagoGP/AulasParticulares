const {age, date, grade} = require('../../lib/utils');
const Student = require('../../models/student');
const teacher = require('../../models/teacher');

module.exports = {
    index(req,res){
        Student.all(function(students){
            return res.render("students/index", {students});
        })
    },
    post(req,res){
        const keys = Object.keys(req.body);

        for (key of keys) {
    
            if (req.body[key] == "") {
                return res.send("Preencha todos campos");
            }
        }

        Student.create(req.body, function(student){
            return res.render(`/students/${student.id}`);
        })
    },
    show(req,res){
     Student.find(req.params.id, function(student){

        student.birthday = date(student.birthday).birthday
        student.year = grade(student.year).test
         return res.render("students/show", {student});
     })
    },
    edit(req,res){
        Student.find(req.params.id, function(student){
            student.birthday= date(student.birthday).iso2

            Student.Option(function(option){
            return res.render("students/edit", {student, teacheroption: option});})
        })
    },
    put(req,res){
        const keys = Object.keys(req.body)

        for( key of keys){
            //req.body.key ==""
            if(req.body[key] == "")
            {
                return res.send("Please, fill all fiells");
            }
        }
        Student.update(req.body, function(){
            return res.redirect(`/students/${req.body.id}`)
        })

    
    },

    delet(req,res){
        Student.delet(req.body.id, function(){
            return res.redirect('/students');
        })
    },
    create(req,res){
        Student.Option(function(option){
            return res.render('students/form',{teacheroption: option})
        })
    }
}