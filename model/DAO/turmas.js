const { PrismaClient } = require ('@prisma/client')
const { application } = require('express')
const prisma = new PrismaClient()

const selectAllTurmas = async function (){
    try{
        
        let sql = 'select * from tbl_turmas'

        let rsTurmas = await prisma.$queryRawUnsafe(sql)
        return rsTurmas

    }catch(error){
        console.log(error);
        return false 
    }
}

const selectTurmaById = async function (id){
    try{

        let sql = `select * from tbl_turmas where id = ${id}`

        let rsTurma = await prisma.$queryRawUnsafe(sql)
        
        return rsTurma

    }catch(error){
        console.log(error);
        return false
    }
}

const insertTurma = async function (dadosTurma){
    try{

        let sql = `insert into tbl_turmas (
            nome, 
            ano 
        ) values (
           '${dadosTurma.nome}',
            '${dadosTurma.ano}'
        )`

        let rsTurma = await prisma.$executeRawUnsafe(sql)

        return rsTurma



    }catch(error){
        return false
    }
}

const updateTurma = async function (id, dadosTurma){

    try{
        let sql = `update tbl_turmas set
            nome = '${dadosTurma.nome}',
            ano = '${dadosTurma.ano}'
            
            where id = ${id};`

            
        let rsTurma = await prisma.$executeRawUnsafe(sql)

        
        return rsTurma

    }catch (error){
        return false
    }
}

const deleteTurma = async function (id){
    try{

        let sql = `delete from tbl_turmas where id = ${id}`

        let rsTurma = await prisma.$executeRawUnsafe(sql)

        return rsTurma
    }catch(error){
        return false
    }
}

const selectLastId = async function(){
    try{

        //script sql para pegar o último id
        let sql = `select cast(last_insert_id() AS DECIMAL) as id from tbl_turmas limit 1`
        let rsTurma = await prisma.$queryRawUnsafe(sql)
        
    
        return rsTurma
    }catch(error){
        return false
    }
}

module.exports = {
    selectAllTurmas,
    selectTurmaById,
    selectLastId,
    insertTurma,
    updateTurma,
    deleteTurma
}