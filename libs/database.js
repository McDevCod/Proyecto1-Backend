//---Importando Mysql----//
const mysql=require("mysql2")

//--Estableciendo función de conexión con la BD----//
const connection = mysql.createConnection({
    host:'127.0.0.1', //localhost
    port:'3306',
    user:'mcdev',
    password: 'Hojalat@141',
    database:'agendabd'
})

//------Exportando objeto de conexión de mysql2-----//
module.exports={
    connection
}