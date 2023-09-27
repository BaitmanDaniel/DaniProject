const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
require("dotenv").config();


const userSchema = new mongoose.Schema({
  name:String,
  email:String,
  password:String,
  // role - תקפיד המשתמש אם אדמין או משתמש רגיל
  role:{
    type:String, default:"user"
  }
  
},{timestamps:true})

exports.UserModel = mongoose.model("users",userSchema);

exports.createToken = (user_id,role) => {
  
  const token = jwt.sign({_id:user_id,role},process.env.TOKEN_SECRET,{expiresIn:"600mins"})
  return token;
}


exports.validateUser = (_reqBody) => {
  const joiSchema = Joi.object({
    name:Joi.string().min(2).max(150).required(),
    // email() -> בודק שהמייל שנשלח במאפיין הגיוני למייל
    email:Joi.string().min(2).max(150).email().required(),
    password:Joi.string().min(3).max(16).required()
  })
  return joiSchema.validate(_reqBody)
}

// וולדזציה להתחברות
exports.validateLogin = (_reqBody) => {
  const joiSchema = Joi.object({
    email:Joi.string().min(2).max(150).email().required(),
    password:Joi.string().min(3).max(16).required()
  })
  return joiSchema.validate(_reqBody)
}