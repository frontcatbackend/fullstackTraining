const express = require("express");
const router = express.Router();
const { Users } = require("../models");
const bcrypt = require("bcrypt");
const {sign} = require('jsonwebtoken')
const {validateToken} = require('../middleware/AuthMiddleware')
 
//reg
router.post("/", async (req, res) => {
  const { username, password } = req.body;
  const ifUserExists = await Users.findOne({
      where:{
          username
      }
  })
  if(ifUserExists){
      return (res.json({
          error: `User with ${username} username is exists`}
          ))
  } 
  bcrypt.hash(password, 10).then((hash)=>{
      Users.create({
          username: username,
          password: hash
      })
      res.json("SUCCSESS")
  })
});

//login

router.post('/login', async(req, res, next)=>{
    const {username, password} = req.body
    const user = await Users.findOne({
        where:{
            username: username
        }
    })

    if (!user) {
        return (res.json({
            error:"User does not exists"}
            ))
    } 
    bcrypt.compare(password, user.password).then((match)=>{
        // if (!match)  res.json({error: "Wrong username  and password combination"}) //next () !
        if(!match){
           return( res.json({error: "Wrong username  and password combination"})) 
        }
        
        //if username and password are matches. sign a token
        const accessToken = sign({username: user.username, id: user.id}, "SEKRET-KEY" )
        res.json(accessToken)
    })
})

router.get("/auth", validateToken, (req, res)=>{
    res.json(req.user)
})

module.exports = router;
