const User = require('../models/user');
const Service = require('../models/service');


exports.service_detailById = async(req,res,next)=>{
    const service = await Service.findById(req.params.id).populate('provider');
    res.json(service);
}

exports.getServiceOfProvider = async (req, res, next) => {
  const services = await Service.find({ provider: req.params.id }).populate('provider')
  res.json(services);
};
