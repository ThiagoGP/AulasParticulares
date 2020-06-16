const pagina= location.pathname;
const paginahref= document.querySelectorAll("header .links a");

for(item of paginahref){
        //pagina exemplo="student" student/
    if(pagina.includes(item.getAttribute("href"))){
        item.classList.add("active");
    }
}