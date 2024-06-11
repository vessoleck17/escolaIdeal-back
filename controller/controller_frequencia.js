const frequenciasDAO = require('../model/DAO/frequencia.js')

const message = require('../modulo/config.js')

const { application } = require('express')

const getSomaFaltas = async function (id_matricula){

    try{

        let idMatricula = id_matricula

        let frequenciaJson = {}


        if(idMatricula == '' || idMatricula == null || idMatricula == undefined || isNaN(idMatricula)){
            return message.ERROR_INVALID_ID
        }else{
            let dadosFrequencia = await frequenciasDAO.selectSomarFaltas(idMatricula)
            dadosFrequencia[0].faltas = Number(String(dadosFrequencia[0].faltas).replace('n', ''))
            if(dadosFrequencia){
                frequenciaJson.faltas = dadosFrequencia
                frequenciaJson.status_code = 200

                return frequenciaJson

            }else{
              return message.ERROR_INTERNAL_SERVER_DB
            }
        }

    }catch(error){
        return message.ERROR_INTERNAL_SERVER
    }
}

const setInserirFrequencia = async function (dadosFrequencia, contentType){

  
    try{
        if(String(contentType).toLowerCase() == 'application/json'){
            let frequenciaJson = {}

            if(
                dadosFrequencia.data == null || dadosFrequencia.data == undefined || dadosFrequencia.data == ''|| dadosFrequencia.data.length > 10 ||
                dadosFrequencia.status == null || dadosFrequencia.status == undefined || dadosFrequencia == '' || dadosFrequencia.status.length > 1 ||
                dadosFrequencia.id_matricula == null || dadosFrequencia.id_matricula == undefined || dadosFrequencia.id_matricula == '' ||
                dadosFrequencia.id_disciplina == null || dadosFrequencia.id_disciplina == undefined || dadosFrequencia.id_disciplina == ''
            ){

                return message.ERROR_REQUIRED_FIELDS
                
            }else{
                
                let novaFrequencia = await frequenciasDAO.insertFrequencia(dadosFrequencia)

                
                if(novaFrequencia){

                    let idFrequencia = await frequenciasDAO.selectLastId()
                    dadosFrequencia.id = idFrequencia[0].id

                    frequenciaJson.frequencias = dadosFrequencia
                    frequenciaJson.status_code = message.SUCESS_CREATED_ITEM.status_code

                     
                    return frequenciaJson
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





module.exports = {
    getSomaFaltas,
    setInserirFrequencia
}