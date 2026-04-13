const express = require('express');
const router = express.Router();

const {get_services,add_favourites,get_favorites} = require('../controler/userControler');
const {protect} = require('../middleware/authMiddleware');

router.get('/',get_services);
router.post('/favorites',protect,add_favourites);
router.get('/favorites',protect,get_favorites);

module.exports = router;