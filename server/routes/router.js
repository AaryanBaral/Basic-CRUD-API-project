const app = require("express");
const route = app.Router();
const render = require("../services/render")
const controller = require("../controller/controller")
const usercontroller = require("../controller/usercontroller")

route.get("/",render.Home);
route.get("/add_user",render.AddUser);
route.get("/update_user",render.UpdateUser);
route.get("/signup",render.Signup);
route.get("/login",render.Login);


// For per user data Api
route.post("/api/user", controller.CreateInfo)
route.delete("/api/user/:id", controller.DeleteInfo)
route.put("/api/user/:id", controller.UpdateInfo)
route.get("/api/user", controller.FindInfo);

// for user data api
route.post("/api/signup", usercontroller.CreateUser)
route.post("/login",usercontroller.login);



module.exports = route

