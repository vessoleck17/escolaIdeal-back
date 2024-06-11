const notasDAO = require('../model/DAO/notas')
const message = require('../modulo/config.js')
const disciplinaDAO = require('../model/DAO/disciplinas.js')
const { application } = require('express')

const setInserirNota = async function (dadosNota, contentType){

    try{
        if(String(contentType).toLowerCase() == 'application/json'){
            let notaJson = {}

            if(
                dadosNota.nota == null || dadosNota.nota == '' || dadosNota.nota == undefined || dadosNota.nota.length > 3 ||
                dadosNota.semestre == null || dadosNota.semestre == '' || dadosNota.semestre == undefined || dadosNota.semestre.length > 1 ||
                dadosNota.id_matricula == null || dadosNota.id_matricula == '' || dadosNota.id_matricula == undefined || 
                dadosNota.id_disciplina == null || dadosNota.id_disciplina == '' || dadosNota.id_disciplina == undefined 
            ){
                return message.ERROR_REQUIRED_FIELDS

            }else{

                let novaNota = await notasDAO.insertNota(dadosNota)

                if(novaNota){

                    let idNota = await notasDAO.selectLastId()
                    dadosNota.id = idNota[0].id

                    notaJson.nota = dadosNota
                    notaJson.message = message.SUCESS_CREATED_ITEM.message
                    notaJson.status_code = message.SUCESS_CREATED_ITEM.status_code

                    return notaJson

                }else{
                    return message.ERROR_INTERNAL_SERVER_DB
                }
                
            }
            

        }else{
            return message.ERROR_CONTENT_TYPE
        }

    }catch(error){
        return false
    }
}

const setAtualizarNota = async function (id, dadosNota, contentType){
    try{

        if(String(contentType).toLowerCase() == 'application/json'){

            let notaJson = {}

            if(
                dadosNota.nota == null || dadosNota.nota == undefined || dadosNota.nota == ''|| dadosNota.nota.length > 3 ||
                dadosNota.semestre == null || dadosNota.semestre == undefined || dadosNota.semestre == '' || dadosNota.semestre.length > 1 ||
                dadosNota.id_matricula == null || dadosNota.id_matricula == undefined || dadosNota.id_matricula == '' ||
                dadosNota.id_disciplina == null || dadosNota.id_disciplina == undefined || dadosNota.id_disciplina == ''){

                    return message.ERROR_REQUIRED_FIELDS
                
            }else {

                    let updateNota = await notasDAO.updateNotas(id, dadosNota)
                    

                    if(updateNota){
                        notaJson.nota = updateNota
                        notaJson.status_code = message.SUCESS_CREATED_ITEM.status_code
                        notaJson.message = message.SUCESS_CREATED_ITEM.message

                        
                        return notaJson
                    }else{
                        return message.ERROR_INTERNAL_SERVER_DB
                    }

                }


        }else{
            return message.ERROR_CONTENT_TYPE
        }

    }catch(error){

    }
}

const getNotasDisciplina = async function (id_matricula, id_disciplina){
    try{

        let idMatricula = id_matricula
        let idDisciplina =  id_disciplina

        let notasJson = {}

        if(
            idDisciplina == null || idDisciplina == '' || idDisciplina == undefined || isNaN(idDisciplina) ||
            idMatricula == null || idMatricula == '' || idMatricula == undefined || isNaN(idMatricula)
        ){
            return message.ERROR_INVALID_ID
        }else{

            let dadosNotas = await notasDAO.selectNotasDisciplina(idMatricula, idDisciplina)
        

            if(dadosNotas){

                let dadosDisciplina = await disciplinaDAO.selectDisciplinaById(idDisciplina)
                let mediaNotas = await notasDAO.selectMediaNotas(idMatricula, idDisciplina)

                notasJson.disciplina = dadosDisciplina
                notasJson.notas = dadosNotas
                notasJson.media = mediaNotas
                notasJson.status_code = 200

                return notasJson

            }else{
                return message.ERROR_INTERNAL_SERVER_DB
            }
        }

    }catch(error){
        return false
    }
}


module.exports = {
    setInserirNota,
    setAtualizarNota,
    getNotasDisciplina
}
