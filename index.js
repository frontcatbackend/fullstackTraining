const express = require('express')
const app = express()
const db = require('./models/index')

app.use(express.json())

//Routers
const postRouter = require('./routes/Posts')
app.use("/posts", postRouter)

db.sequelize.sync().then(()=>{
    app.listen(5000, ()=>{
        console.log(`Server has been started `)
    })
})

 