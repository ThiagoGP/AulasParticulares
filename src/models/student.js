const db = require('../config/db');
const {age,date} = require('../lib/utils');
const { update } = require('./teacher');

module.exports={
    all(callback){
        db.query(`SELECT * FROM students`, function(err,results){
            if(err) throw `database erro ${err}`

            callback(results.rows);
        })
    },

    create(data, callback){
        
        const query=  `
        INSERT INTO students(
            url,
            name,
            birthday,
            email,
            year,
            chs,
            teacher_id
        ) VALUES($1, $2, $3, $4, $5, $6, $7)  
        RETURNING id
        `

        const values = [
            data.url,
            data.name,
            date(data.birthday).iso,
            data.email,
            data.year,
            data.chs,
            data.teacher_id
        ]

        db.query(query, values, function(err,results){
           if(err) throw `DATABASE erro ${err}`

            callback(results.rows[0])
        })
    },

    find(id, callback){
        db.query(`SELECT students.*, teachers.name AS teachers_name 
        FROM students 
        LEFT JOIN teachers ON (students.teacher_id = teachers.id)
        WHERE students.id = $1`, [id], function(err,results){
            if(err) throw `DATABASE erro ${err}`

            callback(results.rows[0])
        })
    },
    update(data,callback){
        const query = `UPDATE students set url = ($1), name= ($2), birthday = ($3), email = ($4), year= ($5), chs=($6) ,teacher_id=($7) WHERE id=($8)`

        const values = [
            data.url,
            data.name,
            date(data.birthday).iso,
            data.email,
            data.year,
            data.chs,
            data.teacher_id,
            data.id
        ]
        db.query(query,values,function(err,results){
            if(err) throw `DATABASE erro ${err}`

            callback()
        })

    },
    delet(id, callback){
        db.query(`DELETE  FROM students WHERE id = $1`,[id],function(err,results){
            if(err) throw `DATABASE ${err}`

            callback()
        })
    },
    Option(callback){
        db.query(`SELECT name, id FROM teachers`, function(err,results){
            if(err) throw `DATABASE ${err}`

            callback(results.rows)
        })
    }
}