const express=require('express');
const router=express.Router();
const {signup,signin}=require('../../Controllers/Admin/Auth')


router.post('/admin/signin',signin)
router.post('/admin/signup',signup)



module.exports =router;