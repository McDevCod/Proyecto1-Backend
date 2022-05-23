const express = require("express")
const router= express.Router()
//------------Módulos Nativos-----------//
const path = require("path")
const app=express()

router.get("/registro.html",function(request,response){
    return response.sendFile(path.join(__dirname,'..',"views","registro.html"))
})





module.exports=router



