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
    const { id } = req.params;
    const service = await Service.findById(id);
    if (!service) {
      return res.status(404).json({ msg: "Service not found" });
    }
    await Service.findByIdAndDelete(id);
    await User.updateMany({ favorites: id }, { $pull: { favorites: id } });

    res
      .status(200)
      .json({ msg: "Service deleted and removed from all users' favorites" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error during deletion" });
  }
};

exports.get_edit_myservice = async (req, res, next) => {
  const service = await Service.findById(req.params.id);
  res.json(service);
};

exports.edit_myservice = async (req, res, next) => {
  const { title, category, description, images, address, price } = req.body;

  const updateValue = {
    title,
    category,
    description,
    price,
    location: address,
    images,
  };
  const updated = await Service.findByIdAndUpdate(req.params.id, updateValue, {
    new: true,
  });
  res.json(updated);
};
