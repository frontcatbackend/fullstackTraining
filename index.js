const express = require('express')
const app = express()
const db = require('./models/index')

db.sequelize.sync().then(()=>{
    app.listen(5000, ()=>{
        console.log(`Server has been started `)
    })
})

 