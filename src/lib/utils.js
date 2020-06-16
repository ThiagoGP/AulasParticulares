module.exports = {
    age: function(timestamp){

        const today= new Date(); //obeteve a data atual usando New Date
        const birthday= new Date(timestamp)

        let age= today.getFullYear() - birthday.getFullYear()
                      //hoje maio   -   aniversario julho
        const month = today.getMonth() - birthday.getMonth()

        if(month <0 || month == 0 && today.getDate() < birthday.getDate()){
            age= age -1;
        }
       
        return age 

    },

    date: function(timestamp){
        const date = new Date(timestamp)

        const year= date.getFullYear()

        const month= `0${date.getMonth() +1}`.slice(-2)

        const day= `0${date.getDate() +1}`.slice(-2)

        return{
            day,
            month,
            year,
            iso: `${day}-${month}-${year}`,
            iso2: `${year}-${month}-${day}`,
            birthday: `${day}/${month}`,
            format: `${day}/${month}/${year}`
        }
    },

    grade: function(ano){
        
        if(ano == "5"){
            return{
                test: "5º do ensino fundamental"
            }
        }

        if(ano == "6"){
            return{
                test: "6º do ensino fundamental"
            }
        }
        if(ano == "7"){
            return{
                test: "7º do ensino fundamental"
            }
        }
        if(ano == "8"){
            return{
                test: "8º do ensino fundamental"
            }
        }
        if(ano=="9"){
            return{
                test: "9º do ensino fundamental"
            }

        }
        if(ano=="1"){
            return{
                test: "1º ano do Ensino médio"
            }
        }
        if(ano=="2"){
            return{
                test: "2º ano do Ensino Médio"
            }
        }
        if(ano=="3"){
            return{
                test: "3º ano do Ensino Médio"
            }
        }
    }
}