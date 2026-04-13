const express = require("express");
const router2 = express.Router();

const {createService,getMyService,delete_myservice,edit_myservice,get_edit_myservice,myprofile,edit_myprofile} = require('../controler/providerControler');
const {protect} = require('../middleware/authMiddleware');

// router2.post();
router2.get('/myservice',protect,getMyService);
router2.post('/createService',protect,createService);
router2.delete('/delete/:id',delete_myservice);
router2.get('/edit/:id',protect,get_edit_myservice);
router2.put('/edit/:id',protect,edit_myservice);



module.exports = router2;