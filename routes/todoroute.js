const express = require('express')
const router = express.Router();
const {getalltodos , createdtodo , updatetodo , deletetodo} = require('../controllers/todocontroller')
const {auth} = require('../middlewares/auth')

router.post('/add' , auth ,createdtodo);
router.get('/get' , getalltodos)
router.put('/update/:id',auth ,updatetodo);
router.delete('/delete/:id' ,auth , deletetodo)


module.exports = router