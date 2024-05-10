const express = require("express")
const router = new express.Router()
const serve = require("../controller/index")

router.post("/signup", serve.signup)
router.post("/login", serve.login)
router.post("/post", serve.post)
router.get("/all_post", serve.all_post)
router.get("/:id", serve.id)
router.get("/likedislike/:id",serve.likedislike)
router.get("/like/:id", serve.like)
router.get("/dislike/:id", serve.dislike)


module.exports = router