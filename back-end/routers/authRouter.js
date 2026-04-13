const express = require('express');
const {register,login,edit_myprofile,myprofile,profileById} = require('../controler/authControler');
const {protect} = require('../middleware/authMiddleware')
const router = express.Router();

router.post('/register',register);
router.post('/login',login)
router.put('/profile/edit',protect,edit_myprofile);
router.get('/profile',protect,myprofile);
router.get('/profile/:id',protect,profileById);


module.exports = router;