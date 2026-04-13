const Service = require("../models/service");
const User = require("../models/user");

exports.createService = async (req, res, next) => {
  const { title, category, description, images, address, price } = req.body;

  const service = await Service.create({
    provider: req.user.id,
    title,
    category,
    description,
    images,
    location: address,
    price,
  });
  res.json(service);
};

exports.getMyService = async (req, res, next) => {
  const myservices = await Service.find({ provider: req.user.id });
  res.json(myservices);
};

exports.delete_myservice = async (req, res, next) => {
  try {
    const deleted = await Service.findByIdAndDelete(req.params.id);
    res.json(deleted);
  } catch (err) {
    res.status(500).json({ msg: "delete failed" });
  }
};

exports.get_edit_myservice = async (req, res, next) => {
  const service = await Service.findById(req.params.id);
  res.json(service);
};

exports.edit_myservice = async (req, res, next) => {
  const { title, category, description, images, address, price } = req.body;
  
  const updateValue = { title, category, description, price, location: address ,images };
  const updated = await Service.findByIdAndUpdate(req.params.id, updateValue, {
    new: true,
  });
  res.json(updated);
};
