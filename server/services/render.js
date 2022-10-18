const axios = require("axios");


exports.Home = (req,res)=>{
    axios.get("http://localhost:3000/api/user").then(function(response){
            res.render("_index",{user: response.data});
    }).catch(err=>{
        res.send(err);
    })
}
exports.UpdateUser = (req,res)=>{
    axios.get("http://localhost:3000/api/user", {params:{id:req.query.id}}).then(function(response){
        res.render("_update",{user: response.data})
}).catch(err=>{
    res.send(err);
    })
}

exports.AddUser = (req,res)=>{
    res.render("_add");
}
exports.Signup = (req, res)=>{
    res.render("signup")
}
exports.Login = (req, res)=>{
    res.render("login")
}
