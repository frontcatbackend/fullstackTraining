const express = require("express");
const router = express.Router();
const { Posts, Likes } = require("../models");
const { validateToken } = require ("../middleware/AuthMiddleware");

router.get("/", async (req, res) => {
  const listOfPosts = await Posts.findAll({
    include:[
      Likes
    ]
  })
  res.json(listOfPosts)
});

router.post("/",validateToken, async (req, res) => {
  const post = req.body;
  await Posts.create(post);
  res.json(post)
}); //Inserting Datan to Database

router.get("/byId/:id", async(req, res) => {
  const id = req.params.id
  const post = await Posts.findByPk(id)
  res.json(post)
})

router.delete("/:postId", async (req, res)=>{
  const postId = req.params.postId
  await Posts.destroy({
    where:{
      id: postId
    },
  })
  res.json("DELETED SUCCSESSFULLY")
})

router.put("/byId/:id", (req, res)=>{

})

module.exports = router;
