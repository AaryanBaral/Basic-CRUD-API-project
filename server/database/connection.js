const mongoose = require("mongoose");

exports.connectDB = async()=>{
    try{
        const con = await mongoose.connect(process.env.MONGO_URL,{
            useNewUrlParser:true,
            useUnifiedTopology:true,
        })
        console.log(`Mongodb connected:${con.connection.host}`);
    }catch(err){
        console.log(err)
        process.exit(1);
    }
}