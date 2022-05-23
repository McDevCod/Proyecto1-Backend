//------------Módulos Nativos-----------//
const path = require("path")

//------------Módulos Externos----------//
const express = require("express")


//------------Importación de Routers para direccionar a los distintos html del proyecto---------//
const users=require("./routes/users")
const registro=require("./routes/registro")
const soporte=require("./routes/soporte")
const login=require("./routes/login")
const agenda=require("./routes/agenda")
const contactos=require("./routes/contactos")
const configuracion=require("./routes/configuracion")
const ayuda=require("./routes/ayuda")


//------------Constantes----------------//
const port= 3000
const app= express()

//------------Middlewares------------------//
//---Archivos Staticos para alojar CSS e imagenes que seran requeridos por los html------//
app.use(express.static(path.join(__dirname,"static")))

//-------Uso de los routers--------------//
app.use(users)
app.use(registro)
app.use(soporte)
app.use(login)
app.use(agenda)
app.use(contactos)
app.use(configuracion)
app.use(ayuda)


//------------Respondiendo a peticion GET del cliente con index del proyecto---------------------//
app.get("/",function(request,response){
    console.log(path.join(__dirname,"views","index.html"))
    return response.sendFile(path.join(__dirname,"views","index.html"))
})



//-------Iniciando el servidor para comenzar a recibir peticiones de clientes------------//

app.listen(port, () =>{
    console.log("Escuchando en http://localhost:"+port)
})