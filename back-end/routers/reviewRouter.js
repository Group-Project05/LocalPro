const express = require('express');
const {service_detailById} = require('../controler/serviceControler');
const {add_review,fetch_reviewByProviderId,fetch_reviewByServiceId} = require('../controler/reviewControler')
const {protect} = require('../middleware/authMiddleware')
const router = express.Router();

router.post('/add',protect,add_review);
router.get('/provider/:id',protect,fetch_reviewByProviderId);
router.get('/service/:id',protect,fetch_reviewByServiceId);



module.exports = router;