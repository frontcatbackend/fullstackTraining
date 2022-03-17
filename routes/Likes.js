const express = require("express");
const router = express.Router();
const { Likes} = require("../models");
const {validateToken} = require("../middleware/AuthMiddleware")

router.post("/", validateToken, async(req, res, next)=>{
    const {PostId} = req.body
    const UserId = req.user.id

    try {
        //check if like before
        const found = await Likes.findOne({
            where:{
                PostId: PostId,
                UserId: UserId
            }
        })
        if(!found) {
            await Likes.create({
                PostId: PostId, UserId: UserId
            })
            return (res.json({liked:  true}))
        } else{
            await Likes.destroy({
                where:{
                    PostId: PostId, UserId: UserId
                }
            })
            return res.json({liked: false})
        }
        
    } catch (error) { 
        res.json(error)
    }
})

module.exports = router