const express = require("express")
const router= express.Router()
const app=express()
const path = require("path")







router.get("/users",function(request,response){
    console.log(console.log(path.join(__dirname,'..',"views","users")))
    response.json({
        ruta:"users"
    })
})



//-----exportando el Router-----///
module.exports=router 