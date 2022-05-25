

function formatDate (date){
    let formatted_date = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()
    return formatted_date
}

function formatDatetime(date){
    let formatted_date = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()+"T"+date.getHours()+":"+date.getMinutes()
    return formatted_date
}



module.exports= {
    formatDate,
    formatDatetime
}