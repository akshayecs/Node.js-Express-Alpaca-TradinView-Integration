const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const userStockSchema = new Schema({
    uuid:{type:String,required:true},
    username: {String,required:true},
    Email:{type:String,required:true},
    Stocks: {type: [String]}
},{timestamps:true});

module.exports = mongoose.model('Stocks',userStockSchema);
