/*************************************************************************************************************************
 * Objetivo: Arquivo responsável pela validação, consistência de dados das requisições da API de Matricula
 * Data: 21/05/2024
 * Autor: Eduardo Vilas Boas
 * Versão: 1.0.0
 ************************************************************************************************************************/

const message = require('../modulo/config.js')

const matriculaDAO = require('../model/DAO/matricula.js')
const matriculaTurmaDAO = require('../model/DAO/matriculaTurma.js')

const getListarMatriculas = async function() {
    try {

        let matriculaJSON = {};

        let dadosMatricula = await matriculaDAO.selectAllMatriculas();

        if (dadosMatricula) {

            if (dadosMatricula.length > 0) {

                for (let matricula of dadosMatricula) {

                    let matriculaTurma = await matriculaTurmaDAO.selectMatriculaByTurma(matricula.id)
                    
                    if(matriculaTurma.length > 0) {

                        matricula.turma = matriculaTurma
                        
                    }
                }

                matriculaJSON.matriculas = dadosMatricula;
                matriculaJSON.quantidade = dadosMatricula.length;
                matriculaJSON.status_code = 200;

                return matriculaJSON;

            } else {
                return false;
            }
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER
    }
}

const getBuscarMatricula = async function(id) {
    try {

        let idMatricula = id;

        let matriculaJSON = {};

        if (idMatricula == '' || idMatricula == undefined || isNaN(idMatricula)) {
            return message.ERROR_INVALID_ID;
        } else {

            let dadosMatricula = await matriculaDAO.selectByIdMatricula(idMatricula);

            if (dadosMatricula) {

                if (dadosMatricula.length > 0) {
                    
                    matriculaJSON.matricula = dadosMatricula;
                    matriculaJSON.status_code = 200;
                    return matriculaJSON;

                } else {
                    return message.ERROR_NOT_FOUND;
                }
            } else {
                return message.ERROR_INTERNAL_SERVER_DB
            }
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER
    }
}

const setExcluirMatricula = async function(id) {
    try {

        let idMatricula = id;

        if (idMatricula == '' || idMatricula == undefined || isNaN(idMatricula)) {
            return message.ERROR_INVALID_ID;
        } else {

            let matriculaById = await matriculaDAO.selectByIdMatricula(id);

            if (matriculaById.length > 0) {

                let deleteMatricula = await matriculaDAO.deleteMatricula(id);

                if (deleteMatricula) {
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

const setInserirNovaMatricula = async function(dadosMatricula, contentType) {
    try {

        if (String(contentType).toLowerCase() == 'application/json') {

            let novaMatriculaJSON = {};

            if (dadosMatricula.data_inicio == '' || dadosMatricula.data_inicio == undefined || dadosMatricula.data_inicio == null || dadosMatricula.data_inicio.length != 10 ||
                dadosMatricula.id_aluno == ''    || dadosMatricula.id_aluno == undefined    || dadosMatricula.id_aluno == null
            ) {
                return message.ERROR_REQUIRED_FIELDS;
            } else {

                let validateStatus = false;

                if (dadosMatricula.data_fim != ''   &&
                    dadosMatricula.data_fim != null &&
                    dadosMatricula.data_fim != undefined) {

                    if (dadosMatricula.data_fim.length != 10) {
                        return message.ERROR_REQUIRED_FIELDS;
                    } else {
                        validateStatus = true;
                    }
                } else {
                    validateStatus = true;
                }

                if (validateStatus) {

                    let novaMatricula = await matriculaDAO.insertMatricula(dadosMatricula);

                    if (novaMatricula) {

                        let id = await matriculaDAO.selectByLastIdMatricula();

                        dadosMatricula.id = id[0].id;

                        novaMatriculaJSON.matricula   = dadosMatricula;
                        novaMatriculaJSON.status      = message.SUCCESS_CREATED_ITEM.status;
                        novaMatriculaJSON.status_code = message.SUCCESS_CREATED_ITEM.status_code;
                        novaMatriculaJSON.message     = message.SUCCESS_CREATED_ITEM.message;
                        return novaMatriculaJSON;

                    } else {
                        return message.ERROR_INTERNAL_SERVER_DB;
                    } 
                }
            }
        } else {
            return message.ERROR_CONTENT_TYPE;
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER
    }
}

const setAtualizarMatricula = async function(id, dadosMatricula, contentType) {
    try {

        let idMatricula = id;

        if(idMatricula == '' || idMatricula == undefined || isNaN(idMatricula)) {

            return message.ERROR_INVALID_ID

        } else {

            if (String(contentType).toLowerCase() == 'application/json') {

                let updateMatriculaJSON = {};

                if (dadosMatricula.data_inicio == '' || dadosMatricula.data_inicio == undefined || dadosMatricula.data_inicio == null || dadosMatricula.data_inicio.length != 10 ||
                    dadosMatricula.id_aluno == ''    || dadosMatricula.id_aluno == undefined    || dadosMatricula.id_aluno == null
                ) {
                    return message.ERROR_REQUIRED_FIELDS;
                } else {

                    let validateStatus = false;

                    if (dadosMatricula.data_fim != ''   &&
                        dadosMatricula.data_fim != null &&
                        dadosMatricula.data_fim != undefined) {

                        if (dadosMatricula.data_fim.length != 10) {
                            return message.ERROR_REQUIRED_FIELDS;
                        } else {
                            validateStatus = true;
                        }
                    } else {
                        validateStatus = true;
                    } 

                    let matriculaById = await matriculaDAO.selectByIdMatricula(id);

                    if (matriculaById.length > 0) {

                        if(validateStatus) {

                            let updateMatricula = await matriculaDAO.updateMatricula(id, dadosMatricula);

                            if (updateMatricula) {

                                updateMatriculaJSON.matricula   = dadosMatricula;
                                updateMatriculaJSON.status      = message.SUCCESS_UPDATE_ITEM.status;
                                updateMatriculaJSON.status_code = message.SUCCESS_UPDATE_ITEM.status_code;
                                updateMatriculaJSON.message     = message.SUCCESS_UPDATE_ITEM.message;

                                return updateMatriculaJSON;
                            } else {
                                return message.ERROR_INTERNAL_SERVER_DB
                            }
                        }
                    } else {
                        return message.ERROR_NOT_FOUND
                    }
                }
            } else {
                return message.ERROR_CONTENT_TYPE
            }
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER
    }
}

module.exports = {
    setInserirNovaMatricula,
    setAtualizarMatricula,
    setExcluirMatricula,
    getListarMatriculas,
    getBuscarMatricula
}