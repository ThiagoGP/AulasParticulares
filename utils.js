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
            iso: `${year}-${month}-${day}`,
            birthday: `${day}/${month}`
        }
    }
}