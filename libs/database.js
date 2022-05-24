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


//----Metodo query basado en promesa---------//
function query(sql,data){
    const miPromesa = new Promise(function (resolve,reject){
        connection.query(sql,data,function(error,result,fields){
            if(error!=null){
                console.log(error)
    
                return reject({
                    error:true,
                    message:error.sqlMessage
                })
            }else{
                return resolve(result)
            }
        })
    })

    return miPromesa
    
}



//------Exportando objeto de conexión de mysql2-----//
module.exports={
    connection,
    query
}