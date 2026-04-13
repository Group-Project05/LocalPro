const Service = require("../models/service");
const User = require("../models/user");

exports.get_services = async (req, res, next) => {
  const services = await Service.find().populate("provider");
  res.json(services);
};

exports.add_favourites = async (req, res, next) => {
  const serviceId = req.body.serviceId;
  const user = await User.findById(req.user.id);

  if (user.favorites.includes(serviceId)) {
    user.favorites = user.favorites.filter((id) => id.toString() !== serviceId);
  } else {
    user.favorites.push(serviceId);
  }
  await user.save();
  res.json({ fvrtArray: user.favorites }); 
};

exports.get_favorites = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).populate({
      path: "favorites",
      populate: { path: "provider", select: "name" },
    });

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    const fvrtIds = user.favorites.map((fav) => fav._id);
    res.json({
      favorites: user.favorites,
      fvrtArray: fvrtIds,
    });
  } catch (error) {
    next(error);
  }
};
