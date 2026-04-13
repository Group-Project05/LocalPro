const User = require('../models/user');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


exports.register = async(req,res,next)=>{
    const {name,email,password,role,address} = req.body
    const user = await User.findOne({email: email.trim().toLowerCase() });
    if(user){
        return res.status(400).json({msg:"user already exist"});
    }
    const hashed = await bcrypt.hash(password,10);
    const created = await User.create({name,email,address,password:hashed,role});
    res.json(created);
}

exports.login = async(req,res,next)=>{
    
    const {email,password} = req.body;
    
    const user = await User.findOne({email: email.trim().toLowerCase() });
    if(!user){
        return res.status(400).json({msg:"user not found"});
    }
    const isMatch =await bcrypt.compare(password,user.password);
    if(!isMatch){
        return res.status(400).json({msg:"wrong password"});
    }
    const token = jwt.sign({id:user._id,role:user.role}, process.env.SECRET_KEY, { expiresIn: '1h' })
    res.json({token,user});
}

exports.edit_myprofile= async(req,res,next)=>{
    console.log(req.body)
  const updated = await User.findByIdAndUpdate(req.user.id,req.body,{new: true});
  res.json(updated);
}


exports.myprofile= async(req,res,next)=>{
  const user = await User.findById(req.user.id);
  res.json(user);
}

exports.profileById= async(req,res,next)=>{
  const user = await User.findById(req.params.id);
  res.json(user);
}