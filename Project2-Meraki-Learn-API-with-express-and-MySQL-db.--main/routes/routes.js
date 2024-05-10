const express = require('express')
const router = express.Router()
const controlUser=require('../controller/controller')
router.get('/all',controlUser.getAllUsers)
router.get('/:id',controlUser.getbyID)
router.post('/post',controlUser.post)
router.put('/:id',controlUser.putin)
router.delete('/:id',controlUser.delet)
module.exports=router
