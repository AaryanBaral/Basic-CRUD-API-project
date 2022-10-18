const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
var ALLSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    adderess:{
        type:String,
        required:true
    },
    gender:String,
    status:String  
    


})
var UserSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    adderess:{
        type:String,
        required:true
    },
    contact:{
        type:Number,
        required:true
    },
    password:String,
    repassword:String,
    gender:String 
})
UserSchema.pre("save", async function(next){
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password,8);
        this.repassword = undefined;
    }
    next();
})


exports.userdb = mongoose.model('userdb', ALLSchema)
exports.userInfoDb = mongoose.model('userInfoDb', UserSchema)

