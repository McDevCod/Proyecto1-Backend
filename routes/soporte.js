const express = require("express")
const router= express.Router()
//------------Módulos Nativos-----------//
const path = require("path")
const app=express()

router.get("/soporte.html",function(request,response){
    return response.sendFile(path.join(__dirname,'..',"views","soporte.html"))
})





module.exports=router



