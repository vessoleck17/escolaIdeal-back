const turmasDAO = require('../model/DAO/turmas')

const message = require('../modulo/config')

const { application } = require('express')

const getListarTurmas = async function (){
    try{

        let turmasJson = {}
        let dadosTurmas = await turmasDAO.selectAllTurmas()


        if(dadosTurmas){
            turmasJson.turmas = dadosTurmas
            turmasJson.status_code = dadosTurmas.status_code

            return turmasJson
        }else{
            return message.ERROR_INTERNAL_SERVER_DB
        }

    }catch(error){
        return message.ERROR_INTERNAL_SERVER
    }
}

const getTurmaById = async function (id){
    try{

        let idTurma = id

        let turmaJson = {}


        if(idTurma == '' || idTurma == null || idTurma == undefined || isNaN(idTurma)){
            return message.ERROR_INVALID_ID
        }else{
            let dadosTurma = await turmasDAO.selectTurmaById(idTurma)

            if(dadosTurma){
                turmaJson.disciplina = dadosTurma
                turmaJson.status_code = 200

                return turmaJson

            }else{
                ERROR_INTERNAL_SERVER_DB
            }
        }

    }catch(error){
        console.log(error);
        return message.ERROR_INTERNAL_SERVER
    }
}

const setInserirTurma = async function (dadosTurma, contentType){

  
    try{
        if(String(contentType).toLowerCase() == 'application/json'){
            let turmaJson = {}

            if(
                dadosTurma.nome == null || dadosTurma.nome == undefined || dadosTurma.nome == ''|| dadosTurma.nome.length > 6 ||
                dadosTurma.ano == null || dadosTurma.ano == undefined || dadosTurma.ano == '' || dadosTurma.ano.length > 10 ){
                

                    
                    return message.ERROR_REQUIRED_FIELDS
                
            }else {
                
                let novoTurma = await turmasDAO.insertTurma(dadosTurma)

                console.log(novoTurma);
                if(novoTurma){

                    let idTurma = await turmasDAO.selectLastId()
                    dadosTurma.id = idTurma[0].id

                    turmaJson.turma = dadosTurma
                    turmaJson.message = message.SUCESS_CREATED_ITEM.message
                    turmaJson.status_code = message.SUCESS_CREATED_ITEM.status_code

                     
                    return turmaJson
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

const setAtualizarTurma = async function (id, dadosTurma, contentType){
    try{

        let idTurma = id

        if(String(contentType).toLowerCase() == 'application/json'){

            let turmaJson = {}

            if(
                dadosTurma.nome == null || dadosTurma.nome == undefined || dadosTurma.nome == ''|| dadosTurma.nome.length > 6 ||
                dadosTurma.ano == null || dadosTurma.ano == undefined || dadosTurma.ano == '' || dadosTurma.ano.length > 10 ){

                    return message.ERROR_REQUIRED_FIELDS
                
            }else {
    

                    let updateTurma = await turmasDAO.updateTurma(id, dadosTurma)

                    if(updateTurma){
                        turmaJson.turma = updateTurma
                        turmaJson.status_code = message.SUCESS_CREATED_ITEM.status_code
                        turmaJson.message = message.SUCESS_CREATED_ITEM.message

                        return turmaJson
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

const setExcluirTurma = async function (id) {
    try {

        let idTurma = id

        if (idTurma == '' || idTurma == undefined || isNaN(idTurma)) {
            return message.ERROR_INVALID_ID
        } else {

            let turmaById = await turmasDAO.selectTurmaById(idTurma)
            if (turmaById.length > 0) {

                let deleteTurma = await turmasDAO.deleteTurma(idTurma)

                if (deleteTurma) {
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
    getListarTurmas,
    getTurmaById,
    setInserirTurma,
    setAtualizarTurma,
    setExcluirTurma
}