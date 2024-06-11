/*******************************************************************************************************************************************
 * Objetivo: Arquivo responsável pelo acesso ao Banco de dados MySQL, aqui faremos o CRUD na tabela de professores
 * Data: 06/06/2024
 * Autor: Eduardo Vilas Boas
 * Versão: 1.0.0
 *******************************************************************************************************************************************/

const {PrismaClient} = require('@prisma/client');


const prisma = new PrismaClient();

const selectAllProfessores = async function() {
    let sql = 'select * from tbl_professores';

    let rsProfessores = await prisma.$queryRawUnsafe(sql)

    if (rsProfessores.length > 0)
        return rsProfessores;
    else
        return false;
}

const selectByIdProfessor = async function(id) {
    try{

        let sql = `select * from tbl_professores where id = ${id}`;

        let rsProfessores = await prisma.$queryRawUnsafe(sql)

        return rsProfessores;

    } catch (error) {
        return false;
    }
}

const selectByLastIdProfessor = async function() {
    try{

        let sql = `select cast(last_insert_id() as decimal) as id from tbl_professores`;

        let rsProfessores = await prisma.$queryRawUnsafe(sql)

        return rsProfessores

    } catch (error) {
        return false;
    }
}

const insertProfessores = async function(dadosProfessores) {
    try{

        let sql;

        sql = `insert into tbl_professores (
                                                    nome,
                                                    data_nascimento,
                                                    telefone,
                                                    id_sexo
        ) values (
                                                    '${dadosProfessores.nome}',
                                                    '${dadosProfessores.data_nascimento}',
                                                    '${dadosProfessores.telefone}',
                                                    '${dadosProfessores.id_sexo}'
        )`;

        let result = await prisma.$queryRawUnsafe(sql)

        if (result)
            return true;
        else
            return false;

    } catch (error) {
        return false;
    }
}

const deleteProfessores = async function(id) {
    try{

        let sql = `delete from tbl_professores where id = ${id}`;

        let rsProfessores = await prisma.$queryRawUnsafe(sql)

        return rsProfessores

    } catch (error) {
        return false
    }
}

const updateProfessores = async function(id, dadosProfessores) {
    try{

        let sql;

        sql = `update tbl_professores set
                                            nome = '${dadosProfessores.nome}',
                                            data_nascimento = '${dadosProfessores.data_nascimento}',
                                            telefone = '${dadosProfessores.telefone}',
                                            id_sexo = '${dadosProfessores.id_sexo}',
            where id = ${id}`;

        let result = await prisma.$queryRawUnsafe(sql);

        if (result)
            return true;
        else
            return false;

    } catch (error) {
        return false;
    }
}

module.exports = {
    selectAllProfessores,
    selectByIdProfessor,
    selectByLastIdProfessor,
    insertProfessores,
    deleteProfessores,
    updateProfessores
}