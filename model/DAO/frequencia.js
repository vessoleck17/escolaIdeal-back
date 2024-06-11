const { PrismaClient } = require ('@prisma/client')
const { application } = require('express')
const prisma = new PrismaClient()

const insertFrequencia = async function (dadosFrequencia){
    try{
        
        let sql = `insert into tbl_frequencia 
        (
            data,
            status,
            id_matricula,
            id_disciplina
        )values(
            '${dadosFrequencia.data}',
            '${dadosFrequencia.status}',
            '${dadosFrequencia.id_matricula}',
            '${dadosFrequencia.id_disciplina}'
        )`

        let rsFrequencia = await prisma.$queryRawUnsafe(sql)
        return rsFrequencia

    }catch(error){
        return false 
    }
}

const selectSomarFaltas = async function (id_matricula, dadosFrequencia){
    try{

        let sql = `SELECT COUNT(*) as faltas, id_matricula FROM tbl_frequencia where status=1 and id_matricula=${id_matricula};`
        let rsFaltas = await prisma.$queryRawUnsafe(sql)

        return rsFaltas
        
    }catch(error){
        return false
    }
}

const selectLastId = async function(){
    try{

        let sql = `select cast(last_insert_id() AS DECIMAL) as id from tbl_frequencia limit 1`
        let rsFrequencia = await prisma.$queryRawUnsafe(sql)
        
    
        return rsFrequencia
    }catch(error){
        return false
    }
}

module.exports = {
    insertFrequencia,
    selectSomarFaltas,
    selectLastId
}