const express = require('express');
const path = require('path');
const dotenv = require("dotenv");
const bodyparser = require("body-parser")
const Route = require("./server/routes/router")
const app = express();
const connection = require("./server/database/connection")



dotenv.config({path: "configure.env"});
const PORT = process.env.PORT|| 8080;

app.use(bodyparser.urlencoded({extended:true}));

connection.connectDB();


app.set("view engine","ejs")

app.use("/css",express.static(path.resolve(__dirname, "assests/css")))
app.use("/img",express.static(path.resolve(__dirname, "assests/img")))
app.use("/js",express.static(path.resolve(__dirname, "assests/js")))

app.use("/", Route);




app.listen(PORT,()=>{
    console.log(`code running at http://localhost:${PORT}` );
})

