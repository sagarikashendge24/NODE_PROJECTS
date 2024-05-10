const express=require('express')
const router =express.Router()
const controller=require("../controller/userController.js")

router.get('/get',controller.get);
router.get('/get/:id',controller.getbyid);
router.post('/post',controller.post);
// router.put('/put/:id',controller.put);
router.delete('/:id',controller.delete)

module.exports = router

