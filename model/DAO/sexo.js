const {PrismaClient} = require('@prisma/client')

const prisma = new PrismaClient()

const selectAllSexo = async function(){
    try{
        
        let sql = 'select * from tbl_sexo'

        let rsSexo = await prisma.$queryRawUnsafe(sql)

        return rsSexo
    }catch (error){
        return false
    }
}

const selectSexoById = async function(id){
    try{

       
        let sql = `select * from tbl_sexo where id = ${id}`

        let rsSexo = await prisma.$queryRawUnsafe(sql)

        return rsSexo
    }catch(error){
        return error
    }
}

module.exports = {
    selectAllSexo,
    selectSexoById
}