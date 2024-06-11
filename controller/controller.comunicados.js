const comunicadosDAO = require('../model/DAO/comunicados')

const message = require('../modulo/config.js')

const { application } = require('express')

const getListarComunicados = async function (){
    try{

        let comunicadosJson = {}
        let dadosComunicados = await comunicadosDAO.selectAllComunicados()


        if(dadosComunicados){
            comunicadosJson.comunicado = dadosComunicados
            comunicadosJson.status_code = dadosComunicados.status_code

            return comunicadosJson
        }else{
            return message.ERROR_INTERNAL_SERVER_DB
        }

    }catch(error){
        return message.ERROR_INTERNAL_SERVER
    }
}

const getComunicadoById = async function (id){
    try{

        let idComunicado = id

        let comunicadoJson = {}


        if(idComunicado == '' || idComunicado == null || idComunicado == undefined || isNaN(idComunicado)){
            return message.ERROR_INVALID_ID
        }else{
            let dadosComunicado = await comunicadosDAO.selectComunicadoById(idComunicado)

            if(dadosComunicado){
                comunicadoJson.disciplina = dadosComunicado
                comunicadoJson.status_code = 200

                return comunicadoJson

            }else{
                ERROR_INTERNAL_SERVER_DB
            }
        }

    }catch(error){
        console.log(error);
        return message.ERROR_INTERNAL_SERVER
    }
}

const setInserirComunicado = async function (dadosComunicado, contentType){

  
    try{
        if(String(contentType).toLowerCase() == 'application/json'){
            let comunicadoJson = {}

            if(
                dadosComunicado.assunto == null || dadosComunicado.assunto == undefined || dadosComunicado.assunto == ''|| dadosComunicado.assunto.length > 150 ||
                dadosComunicado.data == null || dadosComunicado.data == undefined || dadosComunicado.data == '' || dadosComunicado.data.length > 10 ||
                dadosComunicado.mensagem == null || dadosComunicado.mensagem == undefined || dadosComunicado.mensagem == ''){

                    
                    return message.ERROR_REQUIRED_FIELDS
                
            }else {
                
                let novoComunicado = await comunicadosDAO.insertComunicado(dadosComunicado)
                if(novoComunicado){

                    let idComunicado = await comunicadosDAO.selectLastId()
                    dadosComunicado.id = idComunicado[0].id

                    comunicadoJson.comunicado = dadosComunicado
                    comunicadoJson.message = message.SUCCESS_CREATED_ITEM.message
                    comunicadoJson.status_code = message.SUCCESS_CREATED_ITEM.status_code

                     
                    return comunicadoJson
                }
            }

        } else {

            message.ERROR_CONTENT_TYPE
        }

    }catch(error){
        console.log(error);
        return message.ERROR_INTERNAL_SERVER
    }
}

const setAtualizarComunicado = async function (id, dadosComunicado, contentType){
    try{


        if(String(contentType).toLowerCase() == 'application/json'){

            let comunicadoJson = {}

            if(
                dadosComunicado.assunto == null || dadosComunicado.assunto == undefined || dadosComunicado.assunto == ''|| dadosComunicado.assunto.length > 150 ||
                dadosComunicado.data == null || dadosComunicado.data == undefined || dadosComunicado.data == '' || dadosComunicado.data.length > 10 ||
                dadosComunicado.mensagem == null || dadosComunicado.mensagem == undefined || dadosComunicado.mensagem == ''){

                    return message.ERROR_REQUIRED_FIELDS
                
            }else {

                    let updateComunicado = await comunicadosDAO.updateComunicado(id,dadosComunicado)
                    

                    if(updateComunicado){
                        comunicadoJson.comunicado = updateComunicado
                        comunicadoJson.status_code = message.SUCESS_CREATED_ITEM.status_code
                        comunicadoJson.message = message.SUCESS_CREATED_ITEM.message

                        
                        return comunicadoJson
                    }else{
                        return message.ERROR_INTERNAL_SERVER_DB
                    }

                }


        }else{
            return message.ERROR_CONTENT_TYPE
        }

    }catch(error){
        console.log(error);
        return message.ERROR_INTERNAL_SERVER
    }
}

const setExcluirComunicado = async function (id) {
    try {

        let idComunicado = id

        if (idComunicado == '' || idComunicado == undefined || isNaN(idComunicado)) {
            return message.ERROR_INVALID_ID
        } else {

            let comunicadoById = await comunicadosDAO.selectComunicadoById(idComunicado)
            if (comunicadoById.length > 0) {

                let deleteComunicado = await comunicadosDAO.deleteComunicado(idComunicado)

                if (deleteComunicado) {
                    return message.SUCESS_DETELE_ITEM
                } else {
                    return message.ERROR_NOT_FOUND
                }
            }
            return message.ERROR_NOT_FOUND
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER
    }
}



module.exports = {
    getListarComunicados,
    getComunicadoById,
    setInserirComunicado,
    setAtualizarComunicado,
    setExcluirComunicado
}