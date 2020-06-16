const {age, date} = require('../../lib/utils');
const Teacher = require('../../models/teacher');


module.exports= {
    post(req,res){
        const keys= Object.keys(req.body);

        for(key of keys){
            if(req.body[key]== ""){
                return res.send("Todos os campos tem que ser preenchedo");
            }
        }

        Teacher.create(req.body, function(teacher){
            return res.redirect(`/teachers/${teacher.id}`);
        })

    },

    show(req,res){
        Teacher.find(req.params.id, function(teacher){
            if(!teacher) return res.send("Teacher not found!");

            teacher.age= age(teacher.birth_date)
            teacher.subjects_taught =  teacher.subjects_taught.split(",");
            teacher.created_at = date(teacher.created_at).format;

            return res.render("teachers/show", {teacher});
        })
     
    },
    
    edit(req,res){
        Teacher.find(req.params.id, function(teacher){
            if(!teacher) return res.send("Teacher not found!");

            teacher.birth_date= date(teacher.birth_date).iso2
            teacher.subjects_taught = teacher.subjects_taught.split(",");
            
            return res.render("teachers/edit", {teacher});
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

        Teacher.update(req.body, function(){
            return res.redirect(`/teacher/${req.body.id}`);
        })
    
       
    },

    delete(req,res){
        Teacher.delete(req.body.id, function(){
            return res.redirect('/teacher');
        })
    
      
    },

    index(req,res){
       
      
       Teacher.all(function(teachers){
           return res.render('teachers/index',{teachers} )
       })
    },

    form(req,res){
    return res.render('teachers/form')

    }
}










