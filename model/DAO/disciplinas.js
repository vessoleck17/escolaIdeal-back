const { PrismaClient } = require ('@prisma/client')
const { application } = require('express')
const prisma = new PrismaClient()

const selectAllDisciplinas = async function (){
    try{
        
        let sql = 'select * from tbl_disciplinas'

        let rsDisciplinas = await prisma.$queryRawUnsafe(sql)
        return rsDisciplinas

    }catch(error){
        console.log(error);
        return false 
    }
}

const selectDisciplinaById = async function (id){
    try{

        let sql = `select * from tbl_disciplinas where id = ${id}`

        let rsDisciplina = await prisma.$queryRawUnsafe(sql)
        
        return rsDisciplina

    }catch(error){
        console.log(error);
        return false
    }
}

const insertDisciplina = async function (dadosDisciplina){
    try{

        let sql = `insert into tbl_disciplinas (
            nome, 
            carga_horaria, 
            id_professor
        ) values (
           '${dadosDisciplina.nome}',
            '${dadosDisciplina.carga_horaria}',
            '${dadosDisciplina.id_professor}'
        )`

        let rsDisciplina = await prisma.$executeRawUnsafe(sql)

        return rsDisciplina



    }catch(error){
        return false
    }
}

const updateDisciplina = async function (id, dadosDisciplina){

    try{
        let sql = `update tbl_disciplinas set
            nome = '${dadosDisciplina.nome}',
            carga_horaria = '${dadosDisciplina.carga_horaria}',
            id_professor = '${dadosDisciplina.id_professor}'
            
            where id = ${id}`

            
        let rsDisciplina = await prisma.$executeRawUnsafe(sql)

        return rsDisciplina

    }catch (error){
        return false
    }
}

const deleteDisciplina = async function (id){
    try{

        let sql = `delete from tbl_disciplinas where id = ${id}`

        let rsDisciplina = await prisma.$executeRawUnsafe(sql)

        return rsDisciplina
    }catch(error){
        return false
    }
}

const selectLastId = async function(){
    try{

        //script sql para pegar o último id
        let sql = `select cast(last_insert_id() AS DECIMAL) as id from tbl_disciplinas limit 1`
        let rsAtor = await prisma.$queryRawUnsafe(sql)
        
    
        return rsAtor
    }catch(error){
        return false
    }
}



module.exports = {
    selectAllDisciplinas,
    selectDisciplinaById,
    selectLastId,
    insertDisciplina,
    updateDisciplina,
    deleteDisciplina
}