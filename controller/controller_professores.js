/*************************************************************************************************************************
 * Objetivo: Arquivo responsável pela validação, consistência de dados das requisições da API de Professores
 * Data: 06/06/2024
 * Autor: Eduardo Vilas Boas
 * Versão: 1.0.0
 ************************************************************************************************************************/

const message = require('../modulo/config.js')

const professorDAO = require('../model/DAO/professores.js')
const sexoDAO = require('../model/DAO/sexo.js')

const getListarProfessores = async function() {
    try {

        let professorJSON = {};

        let dadoProfessores = await professorDAO.selectAllProfessores();

        if(dadoProfessores) {

            if (dadoProfessores.length > 0) {
                
                for (let professor of dadoProfessores) {

                    let sexoProfessor = await sexoDAO.selectSexoById(professor.id)
                    delete professor.id_sexo
                    professor.sexo = sexoProfessor
                }

                professorJSON.professores = dadoProfessores;
                professorJSON.quantidade = dadoProfessores.length;
                professorJSON.status_code = 200;
                return professorJSON;
            }else {
                return false;
            }
        } 
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER
    }
}

const getBuscarProfessor = async function(id) {
    try {

        let idProfessor = id;

        let professorJSON = {};

        if (idProfessor == '' || idProfessor == undefined || isNaN(idProfessor)) {
            return message.ERROR_INVALID_ID;
        } else {

            let dadoProfessores = await professorDAO.selectByIdProfessor(idProfessor);

            if (dadoProfessores) {

                if (dadoProfessores.length > 0) {

                    for (let professor of dadoProfessores) {

                        let sexoProfessor = await sexoDAO.selectSexoById(professor.id)
                        delete professor.id_sexo
                        professor.sexo = sexoProfessor
                    }

                    professorJSON.professor = dadoProfessores;
                    professorJSON.status_code = 200;
                    return professorJSON;

                } else {
                    return message.ERROR_NOT_FOUND
                }
            } else {
                return message.ERROR_INTERNAL_SERVER_DB
            }
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER
    }
}

const setExcluirProfessor = async function(id) {
    try {

        let idProfessor = id;

        if (idProfessor == '' || idProfessor == undefined || isNaN(idProfessor)) {
            return message.ERROR_INVALID_ID;
        } else {

            let professorById = await professorDAO.selectByIdProfessor(id);

            if (professorById.length > 0) {

                let deleteProfessor = await professorDAO.deleteProfessores(id);

                if (deleteProfessor) {
                    return message.SUCCESS_DELETED_ITEM
                } else {
                    return message.ERROR_INTERNAL_SERVER_DB
                }
            } else {
                return message.ERROR_NOT_FOUND
            }
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER
    }
}

const setInserirNovoProfessor = async function(dadoProfessor, contentType) {
    try {

        if (String(contentType).toLowerCase() == 'application/json') {

            let novoProfessorJSON = {};

            if (dadoProfessor.nome == ''            || dadoProfessor.nome == undefined            || dadoProfessor.nome == null            || dadoProfessor.nome.length > 100            ||
                dadoProfessor.data_nascimento == '' || dadoProfessor.data_nascimento == undefined || dadoProfessor.data_nascimento == null || dadoProfessor.data_nascimento.length != 10 ||
                dadoProfessor.telefone == ''        || dadoProfessor.telefone == undefined        || dadoProfessor.telefone == null        || dadoProfessor.telefone.length > 11         ||
                dadoProfessor.id_sexo == ''         || dadoProfessor.id_sexo == undefined         || dadoProfessor.id_sexo == null         
            ) {
                return message.ERROR_REQUIRED_FIELDS;
            } else {

                let validateStatus = true;

                if (validateStatus) {
                    
                    let novoProfessor = await professorDAO.insertProfessores(dadoProfessor);

                    if (novoProfessor) {

                        novoProfessorJSON.professor = dadoProfessor;
                        novoProfessorJSON.status = message.SUCCESS_CREATED_ITEM.status;
                        novoProfessorJSON.status_code = message.SUCCESS_CREATED_ITEM.status_code;
                        novoProfessorJSON.message = message.SUCCESS_CREATED_ITEM.message;

                        return novoProfessorJSON;
                    } else {
                        return message.ERROR_INTERNAL_SERVER_DB
                    }
                }
            }
        } else {
            return message.ERROR_CONTENT_TYPE
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER
    }
}

const setAtualizarProfessor = async function(id, dadoProfessor, contentType) {
    try {

        let idProfessor = id;

        if (idProfessor == '' || idProfessor == undefined || isNaN(idProfessor)) {
            return message.ERROR_INVALID_ID;
        } else {

            if(String(contentType).toLowerCase() == 'application/json') {

                let updateProfessorJSON = {};

                if (dadoProfessor.nome == ''            || dadoProfessor.nome == undefined            || dadoProfessor.nome == null            || dadoProfessor.nome.length > 100            ||
                    dadoProfessor.data_nascimento == '' || dadoProfessor.data_nascimento == undefined || dadoProfessor.data_nascimento == null || dadoProfessor.data_nascimento.length != 10 ||
                    dadoProfessor.telefone == ''        || dadoProfessor.telefone == undefined        || dadoProfessor.telefone == null        || dadoProfessor.telefone.length > 11         ||
                    dadoProfessor.id_sexo == ''         || dadoProfessor.id_sexo == undefined         || dadoProfessor.id_sexo == null         
                ) {
                    return message.ERROR_REQUIRED_FIELDS
                } else {

                    let validateStatus = true;

                    let professorById = await professorDAO.selectByIdProfessor(id);

                    if (professorById.length > 0) {

                        if (validateStatus) {

                            let updateProfessor = await professorDAO.updateProfessores(id, dadoProfessor);

                            if(updateProfessor) {

                                updateProfessorJSON.professor = dadoProfessor;
                                updateProfessorJSON.status = message.SUCCESS_UPDATE_ITEM.status
                                updateProfessorJSON.status_code = message.SUCCESS_UPDATE_ITEM.status_code
                                updateProfessorJSON.message = message.SUCCESS_UPDATE_ITEM.message

                                return updateProfessorJSON;
                            } else {
                                return message.ERROR_INTERNAL_SERVER_DB;
                            }
                        }
                    } else {
                        return message.ERROR_NOT_FOUND;
                    }
                }
            } else{
                return message.ERROR_CONTENT_TYPE
            }
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER
    }
}

module.exports = {
    setAtualizarProfessor,
    setInserirNovoProfessor,
    setExcluirProfessor,
    getListarProfessores,
    getBuscarProfessor
}