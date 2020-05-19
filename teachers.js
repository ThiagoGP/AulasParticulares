const fs = require('fs');
const data = require('./data.json');
const {age, date} = require('./utils');

exports.post= function(req,res){
    
    const keys= Object.keys(req.body);

    for(key of keys){
        if(req.body[key]== ""){
            return res.send("Todos os campos tem que ser preenchedo");
        }
    }
    
    let {url, name, birth, grau,tipo, materia} = req.body;

    birth = Date.parse(birth);
    const id= Number(data.teachers.length) +1;
    const deste=  Date.now();

    data.teachers.push({
        id,
        url,
        name,
        birth,
        grau,
        tipo,
        materia,
        deste
    })

    fs.writeFile("data.json", JSON.stringify(data,null,2), function(err){
        if(err) return res.send("ERRO NO ARQUIVO");

        return res.render("teachers/index");
    })
}

exports.show= function(req,res){

    const {id} =req.params;

    const foundteacher=  data.teachers.find(function(teacher){
           return teacher.id == id;
    })

    if(!foundteacher)  return res.send("Professor não encontrado");

    const teacher = {
        ...foundteacher,
        materia: foundteacher.materia.split(","),
        desde: Intl.DateTimeFormat("PT-BR").format(foundteacher.deste),
        age: age(foundteacher.birth)
    }

    return res.render("teachers/show", {teacher})
} 

exports.edit = function(req,res){

    const {id} =req.params;

    const foundteacher=  data.teachers.find(function(teacher){
           return teacher.id == id;
    })

    if(!foundteacher)  return res.send("Professor não encontrado");

    const teacher = {
        ...foundteacher,
        birth: date(foundteacher.birth).iso
    }

    return res.render('teachers/edit', {teacher});

}

exports.put= function(req,res){
    const {id} = req.body;
    let index= 0;
    const foundteacher = data.teachers.find(function(teacher, foundIndex){
        if(id== teacher.id){
            index= foundIndex
            return true
        }
    })
     if(!foundteacher) return res.send("NÃO ENCONTRADO");
    const teacher={
        ...foundteacher,
        ...req.body,
        birth: Date.parse(req.body.birth),
        id: Number(req.body.id)
    }
    data.teachers[index] = teacher

    fs.writeFile("data.json", JSON.stringify(data,null,2), function(err){
        if(err) return res.send("ERROR")

        return res.redirect(`/teacher/${id}`)
    })
}

exports.delete= function(req,res){

    const {id} = req.body;

    const filteredteacher= data.teachers.filter(function(teacher){
        return teacher.id != id
    })

    data.teachers= filteredteacher

    fs.writeFile("data.json", JSON.stringify(data,null,2), function(err){
        if(err) return res.send("ERRO");

        return res.redirect("/teacher");
    })
}

exports.index = function(req,res){

  return res.render("teachers/index", {teachers: data.teachers})
}