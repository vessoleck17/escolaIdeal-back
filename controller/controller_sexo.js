const {application} = require('express')

const sexoDAO = require('../model/DAO/sexo.js')

const message = require('../modulo/config.js')

const getListarSexo = async function(){
    try{
        let sexoJson = {}

        let dadosSexo = await sexoDAO.selectAllSexo()

        if(dadosSexo){
            if(dadosSexo.length > 0){
                sexoJson.sexo = dadosSexo
                sexoJson.quantidade = dadosSexo.length
                sexoJson.status_code = 200
                return sexoJson
            }else{
                return message.ERROR_NOT_FOUND
            }

        }else{
            return message.ERROR_INTERNAL_SERVER_DB
        }
    }catch(error){
        return message.ERROR_INTERNAL_SERVER
    }
}

const getSexoById = async function(id){
    try{

        let idSexo = id
        let sexoJson = {}

        if(idSexo == '' || idSexo == undefined || isNaN(idSexo)){
            return message.ERROR_INVALID_ID 
        }else{
            let dadosSexo = await sexoDAO.selectSexoById(id)
            

            if(dadosSexo){
                if(dadosSexo.length > 0){
                    sexoJson.sexo = dadosSexo
                    sexoJson.status_code = 200

                    return sexoJson
                }else{
                    return message.ERROR_NOT_FOUND

                }
            }else{
                
                return message.ERROR_INTERNAL_SERVER
            }
    }
}catch(error){
    return message.ERROR_INTERNAL_SERVER_DB
    
}
}


module.exports = {
    getListarSexo,
    getSexoById
}