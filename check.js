const bycript =require("bcryptjs");
async function call(){
    console.log(await bycript.hash("aaryan",8));
    console.log(await bycript.hash("aaryan",8));
    console.log(await bycript.hash("aaryan",8));

}
call();
