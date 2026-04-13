const express = require('express');
const {service_detailById,getServiceOfProvider,service_request} = require('../controler/serviceControler');
const {protect} = require('../middleware/authMiddleware')
const router = express.Router();

router.get('/detail/:id',service_detailById);
router.get('/ofprovider/:id',protect,getServiceOfProvider);



module.exports = router;