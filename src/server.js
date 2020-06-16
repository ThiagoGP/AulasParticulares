const express= require('express')
const nunjucks = require('nunjucks');
const server= express();
const rotas= require('./rotas');
const methodOverride = require('method-override');

server.use(methodOverride('_method'));
server.use(express.urlencoded({extended: true}))
server.use(express.static('public'))
server.use(rotas);
nunjucks.configure("src/app/views", {
    express: server,
    autoescape: false,
    noCache: false,
    watch: true
   
})

server.set("view engine", "njk");



server.listen(5000, function(){
    console.log("Server is running");
})