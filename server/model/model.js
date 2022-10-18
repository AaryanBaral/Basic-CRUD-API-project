const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
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
    password:{
        type:String,
        required:true
    },
    repassword:{
        type:String,
        required:true
    },
    tokens:[{
        token:{
            type:String,
            required:true
        }
    }]
})
UserSchema.methods.generatetoken = async function(){
    try {        
        const token = await jwt.sign({_id:this._id.toString()},"Thisisausermanagementsystemwhichismyfirstproject");
        this.tokens = this.tokens.concat({token})
        await this.save();
        return 0;
    } catch (error) {
       console.log(error);
        
    }
}


UserSchema.pre("save", async function(next){
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password,8);
        this.repassword = await bcrypt.hash(this.repassword,8);
    }
    next();
})


exports.userdb = mongoose.model('userdb', ALLSchema)
exports.userInfoDb = mongoose.model('userInfoDb', UserSchema)

