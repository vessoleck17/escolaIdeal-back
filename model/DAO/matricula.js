/*******************************************************************************************************************************************
 * Objetivo: Arquivo responsável pelo acesso ao Banco de dados MySQL, aqui faremos o CRUD na tabela de matriculas
 * Data: 21/05/2024
 * Autor: Eduardo Vilas Boas
 * Versão: 1.0.0
 *******************************************************************************************************************************************/

const {PrismaClient} = require('@prisma/client');


const prisma = new PrismaClient();

const selectAllMatriculas = async function() {
    let sql = 'select * from tbl_matriculas';

    let rsMatriculas = await prisma.$queryRawUnsafe(sql)

    if (rsMatriculas.length > 0)
        return rsMatriculas;
    else
        return false;
}

const selectByIdMatricula = async function(id) {
    try{

        let sql = `select * from tbl_matriculas where id_aluno = ${id}`;

        let rsMatricula = await prisma.$queryRawUnsafe(sql)

        return rsMatricula;

    } catch (error) {
        return false;
    }
}

const selectByLastIdMatricula = async function() {
    try {

        let sql = `select cast(last_insert_id() as decimal) as id from tbl_matriculas limit 1`;

        let rsMatricula = await prisma.$queryRawUnsafe(sql)

        return rsMatricula

    } catch (error) {
        return false
    }
}

const insertMatricula = async function(dadosMatricula) {
    try {

        let sql;

        sql = `insert into tbl_matriculas (
                                                    data_inicio, 
                                                    id_aluno, 
                                                    data_fim
        ) values (
                                                    '${dadosMatricula.data_inicio}', 
                                                    '${dadosMatricula.id_aluno}',
                                                    '${dadosMatricula.data_fim}'
        )`;

        let result = await prisma.$executeRawUnsafe(sql)

        if (result)
            return true;
        else
            return false;

    } catch (error) {
        return false;
    }
}

const deleteMatricula = async function(id) {
    try {

        let sql = `delete from tbl_matriculas where id = ${id}`;

        let rsMatricula = await prisma.$queryRawUnsafe(sql)

        return rsMatricula

    } catch (error) {
        return false
    }
}

const updateMatricula = async function(id, dadosMatricula) {
    try {

        let sql;

        sql = `update tbl_matriculas set
                                            data_inicio = '${dadosMatricula.data_inicio}',
                                            id_aluno    = '${dadosMatricula.id_aluno}',
                                            data_fim    = '${dadosMatricula.data_fim}
            where id = ${id}`;

        let result = await prisma.$executeRawUnsafe(sql);

        if (result)
            return true;
        else
            return false;

    } catch (error) {
        return false;
    }
}

module.exports = {
    selectAllMatriculas,
    selectByIdMatricula,
    selectByLastIdMatricula,
    insertMatricula,
    deleteMatricula,
    updateMatricula
}