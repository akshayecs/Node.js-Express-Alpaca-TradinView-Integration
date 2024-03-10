// const User = mongoose.model('User', userSchema);
const {
  handleUsersignUp,
  handleUserLogin
} = require('../service/user');
const Joi = require('joi');


const userSignUp = async(req,res) => {
  try {
    const validationSchema = Joi.object({
      username:Joi.string().required(),
      email:Joi.string().email().required(),
      password:Joi.string().required(),
      api_key:Joi.string().required(),
      api_secret:Joi.string().required()
    });

    const validate = validationSchema.validate(req.body);

    if(validate.error){
      return res.status(401).json({message:"Invalid Argument!"})
    }
    const args = {
      data:{
        username:req.body.username,
        email:req.body.email,
        password:req.body.password,
        api_key:req.body.api_key,
        api_secret:req.body.api_secret
      }
    }
    const response = await handleUsersignUp(args);

    res.status(response.status).json({message:response.message,data:response.data})
    // return res.status(response.status).send({message:response.message,data:response.data})
  } catch (error) {
    return res.status(501).json({message:"Internal Seever Error!"})
  }
} 

const userLogin = async(req,res) => {
  try {
    const validationSchema = Joi.object({
      email:Joi.string().required(),
      password:Joi.string().required(),
    });

    const validate = validationSchema.validate(req.body);

    if(validate.error){
      return res.status(401).json({message:"Invalid Argument!"})
    }
    const args = {
      data:{
        email:req.body.email,
        password:req.body.password
      }
    }
    const response = await handleUserLogin(args);

    res.status(response.status).json({message:response.message,data:response.data})
    // return res.status(response.status).send({message:response.message,data:response.data})
  } catch (error) {
    return res.status(501).json({message:"Internal Seever Error!"})
  }
} 

module.exports = {
  userSignUp,
  userLogin
}
