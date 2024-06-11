const { PrismaClient } = require ('@prisma/client')
const { application } = require('express')
const prisma = new PrismaClient()

const insertNota = async function (dadosNotas) {

    try{
        let sql = `insert into tbl_notas 
        (nota, semestre, id_matricula, id_disciplina) 
        values(
            "${dadosNotas.nota}", 
            "${dadosNotas.semestre}", 
            "${dadosNotas.id_matricula}", 
            "${dadosNotas.id_disciplina}")`

        let rsNotas = await prisma.$executeRawUnsafe(sql)

        return rsNotas

    }catch(error){
        return false
    }

}

const updateNotas = async function (id, dadosNotas){

    try{

        let sql = `update tbl_notas set 
        nota = '${dadosNotas.nota}',
        semestre = '${dadosNotas.semestre}',
        id_matricula = '${dadosNotas.id_matricula}',
        id_disciplina = '${dadosNotas.id_disciplina}'
        
        where id = ${id}`

        let rsNotas = await prisma.$executeRawUnsafe(sql)

        return rsNotas

    }catch(error){
        return false
    }
}

const selectMediaNotas = async function (id_matricula, id_disciplina){
    try{
        let sql = `SELECT AVG(nota) AS media
        FROM tbl_notas 
        WHERE id_disciplina = ${id_disciplina} 
        AND id_matricula = ${id_matricula};`

        let rsMedia = await prisma.$queryRawUnsafe(sql)

        return rsMedia
    }catch(error){
        return false
    }
}

const selectNotasDisciplina = async function (id_matricula, id_disciplina){
    try{
        let sql = `select id_disciplina, nota from tbl_notas where id_matricula = ${id_matricula} and id_disciplina=${id_disciplina};`

        let rsNotas = await prisma.$queryRawUnsafe(sql)

        return rsNotas
    }catch (error){
        return false
    }


}

const selectLastId = async function(){
    try{

        //script sql para pegar o último id
        let sql = `select cast(last_insert_id() AS DECIMAL) as id from tbl_notas limit 1`
        let rsNotas = await prisma.$queryRawUnsafe(sql)
        
    
        return rsNotas
    }catch(error){
        return false
    }
}

module.exports ={
    insertNota,
    updateNotas,
    selectMediaNotas,
    selectNotasDisciplina,
    selectLastId
}

