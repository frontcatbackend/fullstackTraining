const express = require('express')
const app = express()
const cors = require('cors')
const db = require('./models/index')

app.use(express.json())
app.use(cors())

//Routers
const postRouter = require('./routes/Posts')
app.use("/posts", postRouter)

const commentsRouter = require('./routes/Comments')
app.use("/comments", commentsRouter)

const usersRouter = require('./routes/Users')
app.use("/auth", usersRouter)

db.sequelize.sync().then(()=>{
    app.listen(5000, ()=>{
        console.log(`Server has been started `)
    })
})

 