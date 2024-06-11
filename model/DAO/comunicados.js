const { PrismaClient } = require ('@prisma/client')
const { application } = require('express')
const prisma = new PrismaClient()

const selectAllComunicados = async function (){
    try{
        
        let sql = 'select * from tbl_comunicados'

        let rsComunicados = await prisma.$queryRawUnsafe(sql)
        return rsComunicados

    }catch(error){
        console.log(error);
        return false 
    }
}

const selectComunicadoById = async function (id){
    try{

        let sql = `select * from tbl_comunicados where id = ${id}`

        let rsComunicados = await prisma.$queryRawUnsafe(sql)
        
        return rsComunicados

    }catch(error){
        console.log(error);
        return false
    }
}

const insertComunicado = async function (dadosComunicado){
    try{

        let sql = `insert into tbl_comunicados (
            assunto, 
            data, 
            mensagem
        ) values (
           '${dadosComunicado.assunto}',
            '${dadosComunicado.data}',
            '${dadosComunicado.mensagem}'
        )`

        let rsComunicado = await prisma.$executeRawUnsafe(sql)

        return rsComunicado



    }catch(error){
        return false
    }
}

const updateComunicado = async function (id, dadosComunicado){

    try{
        let sql = `update tbl_comunicados set
            assunto = '${dadosComunicado.assunto}',
            data = '${dadosComunicado.data}',
            mensagem = '${dadosComunicado.mensagem}'
            
            where id = ${id};`

            
        let rsComunicado = await prisma.$executeRawUnsafe(sql)

        console.log(rsComunicado)

        return rsComunicado

    }catch (error){
        return false
    }
}

const deleteComunicado = async function (id){
    try{

        let sql = `delete from tbl_comunicados where id = ${id}`

        let rsComunicado = await prisma.$executeRawUnsafe(sql)

        return rsComunicado
    }catch(error){
        return false
    }
}

const selectLastId = async function(){
    try{

        //script sql para pegar o último id
        let sql = `select cast(last_insert_id() AS DECIMAL) as id from tbl_comunicados limit 1`
        let rsAtor = await prisma.$queryRawUnsafe(sql)
        
    
        return rsAtor
    }catch(error){
        return false
    }
}

module.exports = {
    selectAllComunicados,
    selectComunicadoById,
    selectLastId,
    insertComunicado,
    updateComunicado,
    deleteComunicado
}