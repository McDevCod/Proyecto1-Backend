//-----Módulos Externos
const express = require("express")
const router= express.Router()

//-----------------------------------------
const database=require("../libs/database")
const view=require("../helpers/views")
const User=require("../models/user")

//------------Módulos Nativos-----------//
const path = require("path")
const res = require("express/lib/response")

//-----constantes--------//
const app=express()

//------Get para el main de cierre sesion----------------//
router.get("/cierre_sesion.html",function(request,response){
    return view("/cierre_sesion.html",response)
})

router.post("/", async function(request, response){
    const user= new User(request.body)
    const result = await user.login()
    console.log(result)
    return response.json(result)
})



module.exports=router



