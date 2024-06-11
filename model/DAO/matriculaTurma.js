const {PrismaClient} = require('@prisma/client');

const prisma = new PrismaClient();

const selectMatriculaByTurma = async function(id) {
    try{

        let sql = `select m.id as matricula, t.nome as turma, m.data_inicio, m.data_fim from tbl_matricula_turma as i
        join tbl_matriculas as m on m.id = i.id_matricula
        join tbl_turmas as t on t.id = i.id_turma
        where i.id_turma = ${id}`;

        let rsMatricula = await prisma.$queryRawUnsafe(sql);

        return rsMatricula;
    } catch (error) {
        return false;
    }
}

module.exports = {
    selectMatriculaByTurma
}