const express = require("express")
const router= express.Router()
//------------Módulos Nativos-----------//
const path = require("path")
const app=express()

router.get("/configuracion.html",function(request,response){
    return response.sendFile(path.join(__dirname,'..',"views","configuracion.html"))
})





module.exports=router



