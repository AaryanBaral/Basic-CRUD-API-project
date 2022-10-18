const model= require("../model/model");
var userdb = model.userdb;
exports.CreateInfo = (req,res)=>{
    if(!req.body){
        res.status(400).send({message:"content cannot be empty"})
        return;
    }
    const newuser = new userdb({
        name:req.body.name,
        email: req.body.email,
        adderess : req.body.adderess,
        gender : req.body.gender,
        status : req.body.status
    })
    newuser.save(newuser).then(data=>{
        res.redirect("/add_user")
    }).catch(err=>{
        console.log(err);
        res.status(500).send({message:err || "error occured while creating the data"})
    })
}
exports.DeleteInfo = (req,res)=>{
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
exports.UpdateInfo = (req,res)=>{
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


exports.FindInfo = (req,res)=>{
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


