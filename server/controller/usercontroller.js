const model= require("../model/model");
var userdb = model.userInfoDb;
exports.CreateUser = (req,res)=>{
    if(!req.body){
        res.status(400).send({message:"content cannot be empty"})
        return;
    }
    if(req.body.password!=req.body.repassword){
        res.send("password and repassword aren't matching.");
        return;
    }
    const newuser = new userdb({
        name:req.body.name,
        email: req.body.email,
        adderess : req.body.adderess,
        contact : req.body.contact,
        password : req.body.password,
        repassword : req.body.repassword,
        geder : req.body.gender
    })
    newuser.save(newuser).then(data=>{
        res.redirect("/login");
    }).catch(err=>{
        console.log(err);
        res.status(500).send({message:err || "error occured while creating the data"})
    })
}
exports.DeleteUser = (req,res)=>{
    const id = req.params.id;
 userdb.findByIdAndDelete(id).then(data=>{
        if(!data){
            res.status(404).send({message:"invalid user id"})
            return;
        }
        else{
            res.send({message:"id deleted sucessfuly"})

        }
    }).catch(err=>{
        res.status(500).send({message:"user data cannot be deleted"})

    })
}
exports.UpdateUser = (req,res)=>{
    if(!req.body){
        res.status(500).send({message:"data to be updated cannot be empty."})
        return;
    }
    const id = req.params.id;
 userdb.findByIdAndUpdate(id, req.body,{useFindAndModify:false})
    .then(data=>{
        if(!data){
            res.status(404).send({message:`failed to update user of id ${id} maybe user not found `})
        }
        else{
            res.send(data)
        }
    }).catch(err=>{
        res.status(400).send({message:err.message || "error while updating the data"})
    })
}


exports.FindUser = (req,res)=>{
    if(req.query.id){
     userdb.findById(req.query.id).then(user =>{
            if(!user){
                res.send({message: "user with the given id not found."})
            }
            else{
                res.send(user)
            }
        }).catch(err=>{
            res.send({message: err.message|| "error while retreving the data"})
        })

    }
    else{
 userdb.find().then(user =>{
        res.send(user)
    }).catch(err=>{
        res.send({message: err.message || "error while retreving the data"})
    })   
} 

}
exports.login = (req,res)=>{
    const email = req.body.email;
    const password = req.body.password;
        userdb.findOne({email:email}).then(data=>{
            if(data.password!=password){
                res.send("incorrect password");
                return;
            }
            res.send("login scucessful.");
        }).catch(err =>{
            res.send("Invalid Email")
        })
}

