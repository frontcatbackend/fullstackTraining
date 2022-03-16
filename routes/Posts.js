const express = require("express");
const router = express.Router();
const { Posts } = require("../models");
const { validateToken } = require ("../middleware/AuthMiddleware");

router.get("/", async (req, res) => {
  const listOfPosts = await Posts.findAll()
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

module.exports = router;