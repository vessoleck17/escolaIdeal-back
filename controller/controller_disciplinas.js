const disciplinasDAO = require('../model/DAO/disciplinas.js')
const professorDAO = require('../model/DAO/professores.js')

const message = require('../modulo/config.js')

const { application } = require('express')

const getListarDisciplinas = async function (){
    try{

        let disciplinasJson = {}
        let dadosDisciplinas = await disciplinasDAO.selectAllDisciplinas()


        if(dadosDisciplinas){

            for(let disciplina of dadosDisciplinas){
                let professorDisciplina = await professorDAO.selectByIdProfessor(disciplina.id)
                disciplina.professor = professorDisciplina

            }

            disciplinasJson.disciplina = dadosDisciplinas
            disciplinasJson.status_code = dadosDisciplinas.status_code

            return disciplinasJson
        }else{
            return message.ERROR_INTERNAL_SERVER_DB
        }

    }catch(error){
        console.log(error);
        
        return message.ERROR_INTERNAL_SERVER
    }
}

const getDisciplinaById = async function (id){
    try{

        let idDisciplina = id

        let disciplinasJson = {}


        if(idDisciplina == '' || idDisciplina == null || idDisciplina == undefined || isNaN(idDisciplina)){
            return message.ERROR_INVALID_ID
        }else{
            let dadosDisciplinas = await disciplinasDAO.selectDisciplinaById(idDisciplina)

            if(dadosDisciplinas){
                disciplinasJson.disciplina = dadosDisciplinas
                disciplinasJson.status_code = 200

                return disciplinasJson

            }else{
                ERROR_INTERNAL_SERVER_DB
            }
        }

    }catch(error){
        console.log(error);
        return message.ERROR_INTERNAL_SERVER
    }
}

const setInserirDisciplina = async function (dadosDisciplina, contentType){

  
    try{
        if(String(contentType).toLowerCase() == 'application/json'){
            let disciplinaJson = {}

            if(
                dadosDisciplina.nome == null || dadosDisciplina.nome == undefined || dadosDisciplina.nome == ''|| dadosDisciplina.nome.length > 44 ||
                dadosDisciplina.carga_horaria == null || dadosDisciplina.carga_horaria == undefined || dadosDisciplina == '' || dadosDisciplina.carga_horaria.length > 3 ||
                dadosDisciplina.id_professor == null || dadosDisciplina.id_professor == undefined || dadosDisciplina.id_professor == ''){

                    
                    return message.ERROR_REQUIRED_FIELDS
                
            }else {
                
                let novaDisciplina = await disciplinasDAO.insertDisciplina(dadosDisciplina)
                if(novaDisciplina){

                    let idDisciplina = await disciplinasDAO.selectLastId()
                    dadosDisciplina.id = idDisciplina[0].id

                    disciplinaJson.disciplina = dadosDisciplina

                     
                    return disciplinaJson
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

const setAtualizarDisciplina = async function (id, dadosDisciplina, contentType){
    try{

        let idDisciplina = id

        if(String(contentType).toLowerCase() == 'application/json'){

            let disciplinaJson = {}

            if(
                dadosDisciplina.nome == null || dadosDisciplina.nome == undefined || dadosDisciplina.nome == ''|| dadosDisciplina.nome.length > 44 ||
                dadosDisciplina.carga_horaria == null || dadosDisciplina.carga_horaria == undefined || dadosDisciplina == '' || dadosDisciplina.carga_horaria.length > 3 ||
                dadosDisciplina.id_professor == null || dadosDisciplina.id_professor == undefined || dadosDisciplina.id_professor == ''){

                    return message.ERROR_REQUIRED_FIELDS
                
            }else {
                let disciplinaById = await disciplinasDAO.selectDisciplinaById(idDisciplina)

                if(disciplinaById){

                    let updateDisciplina = await disciplinasDAO.updateDisciplina(id, dadosDisciplina)

                    if(updateDisciplina){
                        disciplinaJson.disciplina = dadosDisciplina
                        disciplinaJson.status_code = message.SUCESS_CREATED_ITEM.status_code
                        disciplinaJson.message = message.SUCESS_CREATED_ITEM.message

                        return disciplinaJson
                    }else{
                        return message.ERROR_INTERNAL_SERVER_DB
                    }
                }else{
                    return message.ERROR_NOT_FOUND
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

const setExcluirDisciplina = async function (id) {
    try {

        let idDisciplina = id

        if (idDisciplina == '' || idDisciplina == undefined || isNaN(idDisciplina)) {
            return message.ERROR_INVALID_ID
        } else {

            let disciplinaById = await disciplinasDAO.selectDisciplinaById(idDisciplina)
            if (disciplinaById.length > 0) {

                let deleteDisciplina = await disciplinasDAO.deleteDisciplina(idDisciplina)

                if (deleteDisciplina) {
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
    getListarDisciplinas,
    getDisciplinaById,
    setInserirDisciplina,
    setAtualizarDisciplina,
    setExcluirDisciplina
}