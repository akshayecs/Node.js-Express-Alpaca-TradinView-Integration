const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    uuid:{type:String,required:true},
    Username :{type:String,required:true},
    Email:{type:String,required:true},
    Password:{type:String,required:true},
    ApiKey:{type:String,required:true},
    SecretKey:{type:String,required:true}
},{timestamps:true});



module.exports = mongoose.model('User',userSchema);

