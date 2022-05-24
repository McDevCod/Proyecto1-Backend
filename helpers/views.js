const path = require("path")

function view(htmlFileName,response){
    return response.sendFile(path.join(__dirname,"..","views",htmlFileName))
    
}

module.exports= view

