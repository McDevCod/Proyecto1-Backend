const express = require("express")
const router= express.Router()
//------------Módulos Nativos-----------//
const path = require("path")
const app=express()

router.get("/ayuda.html",function(request,response){
    return response.sendFile(path.join(__dirname,'..',"views","ayuda.html"))
})





module.exports=router



