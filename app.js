/*********************************************************************************************************
 * Objetivo: Local onde irá ficar todos os EndPoints do projeto final escola ideal. 
 * Nome: Eduardo Vilas Boas
 * Data: 21/05/2024
 * Versão: 1.0.0
 *********************************************************************************************************/

 /*
    Para realizar o acesso a Banco de Dados precisamos instalar algumas bibliotecas:

        - SEQUELIZE     - É uma biblioteca mais antiga
        - PRISMA ORM    - É uma biblioteca mais atual (será utilizado no projeto)
        - FASTFY ORM    - É uma biblioteca mais atual

        para instalar o PRISMA:
            - npm install prisma --save  (Irá realizar a conexão com BD)
            - npm install @prisma/client --save (Irá executar os scripts SQl no BD)

        Após a instalação das bibliotecas, devemos inicializar o prisma no projeto:
            - npx prisma init (Irá inicializar o PRISMA)

        Para reinstalar o prisma e atualizar as dependências:   
            - npm i (Irá atualizar todas as dependências)
            - no package.json caso não queira atualizar todas as dependências basta tirar o "^" do @prisma/client

        Caso troque de máquina e sincronizar o Banco de Dados novamente: 
            - npx prisma generate (Serve para ressincronizar o Banco de Dados)

 */

//Import das bibliotecas do projeto
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()

app.use((request, response, next) => {

    response.header('Access-Control-Allow-Origin', '*')
    response.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')

    app.use(cors())

    next()

})

/*****************************  Import dos arquivos da controller do projeto  ******************************************/
    const controllerMatriculas = require('./controller/controller_matricula.js');
    const controllerProfessores = require('./controller/controller_professores.js');
    const controllerAlunos = require('./controller/controller_alunos.js')
    const controllerResponsaveis = require('./controller/controller_responsaveis.js')
/***********************************************************************************************************************/

////Criando um objeto para controlar a chegada dos dados da requisição em formato JSON
const bodyParserJSON = bodyParser.json();

app.get('/v1/escolaIdeal/matriculas', cors(), async function(request, response) {

    let dadosMatricula = await controllerMatriculas.getListarMatriculas();

    if (dadosMatricula) {
        response.json(dadosMatricula);
        response.status(200);
    } else {
        response.json({message: 'Nenhum registro foi encontrado'});
        response.status(404);
    }
})

app.get('/v1/escolaIdeal/matricula/:id', cors(), async function(request, response) {

    let idMatricula = request.params

    let dadosMatricula = await controllerMatriculas.getBuscarMatricula(idMatricula);

    response.json(dadosMatricula);
    response.status(dadosMatricula.status_code);
})

app.delete('/v1/escolaIdeal/deleteMatricula/:id', cors(), async function(request, response) {

    let idMatricula = request.params.id

    let  dadosMatricula = await controllerMatriculas.setExcluirMatricula(idMatricula);

    response.json(dadosMatricula);
    response.status(dadosMatricula.status_code);
})

app.post('/v1/escolaIdeal/matricula', cors(), bodyParserJSON, async function(request, response) {

    let contentType = request.headers['content-type']

    let dadosBody = request.body

    let resultDadosNovaMatricula = await controllerMatriculas.setInserirNovaMatricula(dadosBody, contentType);

    response.json(resultDadosNovaMatricula);
    response.status(resultDadosNovaMatricula.status_code);
})

app.put('/v1/escolaIdeal/updateMatricula/:id', cors(), bodyParserJSON, async function(request, response) {

    let contentType = request.headers['content-type']

    let dadosBody = request.body
    
    let idMatricula = request.params.id

    let resultDadosNovaMatricula = await controllerMatriculas.setAtualizarMatricula(idMatricula, dadosBody, contentType);

    response.json(resultDadosNovaMatricula)
    response.status(resultDadosNovaMatricula.status_code)
})

/**************************************************** ENDPOINTS PROFESSORES ****************************************************/

app.get('/v1/escolaIdeal/professores', cors(), async function(request, response) {
    
    let dadosProfessor = await controllerProfessores.getListarProfessores();

    if (dadosProfessor) {
        response.json(dadosProfessor);
        response.status(200);
    } else {
        response.json({message: 'Nenhum registro foi encontrado'});
        response.status(404);
    }
})

app.get('/v1/escolaIdeal/professor/:id', cors(), async function(request, response) {

    let idProfessor = request.params

    let dadosProfessor = await controllerProfessores.getBuscarProfessor(idProfessor);

    response.json(dadosProfessor);
    response.status(dadosProfessor.status_code);
})

app.delete('/v1/escolaIdeal/deleteProfessor/:id', cors(), async function(request, response) {

    let idProfessor = request.params.id

    let  dadosProfessor = await controllerProfessores.setExcluirProfessor(idProfessor);

    response.json(dadosProfessor);
    response.status(dadosProfessor.status_code);
})

app.post('/v1/escolaIdeal/professor', cors(), bodyParserJSON, async function(request, response) {

    let contentType = request.headers['content-type']

    let dadosBody = request.body

    let resultDadosNovoProfessor = await controllerProfessores.setInserirNovoProfessor(dadosBody, contentType);

    response.json(resultDadosNovoProfessor);
    response.status(resultDadosNovoProfessor.status_code);
})

app.put('/v1/escolaIdeal/updateProfessor/:id', cors(), bodyParserJSON, async function(request, response) {

    let contentType = request.headers['content-type']

    let dadosBody = request.body
    
    let idProfessor = request.params.id

    let resultDadosNovoProfessor = await controllerProfessores.setAtualizarProfessor(idProfessor, dadosBody, contentType);

    response.json(resultDadosNovoProfessor)
    response.status(resultDadosNovoProfessor.status_code)
})

/**************************************************** ENDPOINTS ALUNOS ****************************************************/

app.get('/v1/escolaideal/alunos', cors(), async function(request, response) {
    
    let dadosAlunos = await controllerAlunos.getListarAlunos()
    
    response.status(dadosAlunos.status_code)
    response.json(dadosAlunos)
})

app.get('/v1/escolaideal/aluno/:id', cors(), async function(request, response) {
    
    let idAluno = request.params.id
    
    let dadosAluno = await controllerAlunos.getBuscarAlunoPeloID(idAluno)
    
    response.status(dadosAluno.status_code)
    response.json(dadosAluno)
})

app.get('/v1/escolaideal/alunos/turma/:id', cors(), async function(request, response) {
    
    let idTurma = request.params.id
    
    let dadosAluno = await controllerAlunos.getBuscarAlunosPelaTurma(idTurma)
    
    response.status(dadosAluno.status_code)
    response.json(dadosAluno)
})

app.post('/v1/escolaideal/aluno/insert',cors(), bodyParserJSON, async function(request, response) {
    
    let contentType = request.headers['content-type']
    
    let dadosBody = request.body
    
    let resultDadosNovoAluno = await controllerAlunos.setInserirNovoAluno(dadosBody, contentType)
    
    response.status(resultDadosNovoAluno.status_code)
    response.json(resultDadosNovoAluno)
})

app.put('/v1/escolaideal/aluno/update/:id', cors(), bodyParserJSON, async function(request, response) {
    
    let idAluno = request.params.id

    let contentType = request.headers['content-type']

    let dadosBody = request.body
    
    let resultDadosAlunoAtualizado = await controllerAlunos.setAtualizarAluno(idAluno, dadosBody, contentType)
    
    response.status(resultDadosAlunoAtualizado.status_code)
    response.json(resultDadosAlunoAtualizado)
})

app.delete('/v1/escolaideal/aluno/delete/:id', cors(), async function(request, response) {

    let idAluno = request.params.id

    let resultAlunoDeletado = await controllerAlunos.setDeletarAluno(idAluno)
    
    response.status(resultAlunoDeletado.status_code)
    response.json(resultAlunoDeletado)
})

/**************************************************** ENDPOINTS RESPONSAVEIS ****************************************************/

app.get('/v1/escolaideal/responsaveis', cors(), async function(request, response) {
    
    let dadosResponsaveis = await controllerResponsaveis.getListarResponsaveis()
    
    response.status(dadosResponsaveis.status_code)
    response.json(dadosResponsaveis)
})

app.post('/v1/escolaideal/responsavel/insert', cors(), bodyParserJSON, async function(request, response) {
    
    let contentType = request.headers['content-type']
    
    let dadosBody = request.body
    
    let resultDadosNovoAluno = await controllerResponsaveis.setInserirNovoResponsavel(dadosBody, contentType)
    
    response.status(resultDadosNovoAluno.status_code)
    response.json(resultDadosNovoAluno)
})


app.use((request, response, next) =>{

    
    response.header('Access-Control-Allow-Origin', '*')

    response.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')

    app.use(cors())


    next()
})

const controllerDisciplinas = require('./controller/controller_disciplinas')
const controllerComunicados = require('./controller/controller.comunicados.js')
const controllerTurmas = require('./controller/controller_turmas.js')
const controllerFrequencia = require('./controller/controller_frequencia.js')
const controllerNotas = require('./controller/controller_notas.js')

/****************************** DISCIPLINAS  ***********************************/


app.get('/v1/escola_ideal/disciplinas', cors(), async function (request, response){
    let dadosDisciplinas = await controllerDisciplinas.getListarDisciplinas()

    if(dadosDisciplinas){
        response.json(dadosDisciplinas)
        response.status(dadosDisciplinas.status_code)
    }else{
        response.json
    }
})

app.delete('/v1/escola_ideal/deleteDisciplina/:id', cors(), async function(request,response){
    let idDisciplina = request.params.id

    let dadosDisciplina = await controllerDisciplinas.setExcluirDisciplina(idDisciplina)

    response.json(dadosDisciplina)
    response.status(dadosDisciplina.status_code)
})

app.post('/v1/escola_ideal/disciplina', cors(), bodyParserJSON, async function(request, response){

    
    let contentType = request.headers['content-type']

    let dadosBody = request.body

    let dadosDisciplina = await controllerDisciplinas.setInserirDisciplina(dadosBody, contentType)

    

    response.json(dadosDisciplina)
    response.status(dadosDisciplina.status_code)
})

app.put('/v1/escola_ideal/updateDisciplina/:id', cors(), bodyParserJSON,  async function(request,response){
    let idDisciplina = request.params.id
    let contentType = request.headers['content-type']
    let dadosBody = request.body

    let atualizacaoDisciplina = await controllerDisciplinas.setAtualizarDisciplina(idDisciplina,dadosBody, contentType)

    response.json(atualizacaoDisciplina)
    response.status(atualizacaoDisciplina.status_code)
    

})

app.get('/v1/escola_ideal/disciplina/:id', cors(), async function(request, response){
    
    //recebe o id da requisição
    let idDisciplina = request.params.id

    //encaminha o id para a controller buscar o filme
    let dadosDisciplina = await controllerDisciplinas.getDisciplinaById(idDisciplina)
    console.log(dadosDisciplina)

    if(dadosDisciplina){
        response.json(dadosDisciplina)
        response.status(200)
    }else{
        response.json({message: 'Nenhum registro foi encontrado!'})
        response.status(404)
    }
    
    
})

/******************************  COMUNICADOS  ***********************************/


app.get('/v1/escola_ideal/comunicados', cors(), async function (request, response){
    let dadosComunicados = await controllerComunicados.getListarComunicados()

    if(dadosComunicados){
        response.json(dadosComunicados)
        response.status(dadosComunicados.status_code)
    }else{
        response.json
    }
})

app.delete('/v1/escola_ideal/deleteComunicado/:id', cors(), async function(request,response){
    let idComunicado = request.params.id

    let dadosComunicado = await controllerComunicados.setExcluirComunicado(idComunicado)

    response.json(dadosComunicado)
    response.status(dadosComunicado.status_code)
})

app.post('/v1/escola_ideal/comunicado', cors(), bodyParserJSON, async function(request, response){

    
    let contentType = request.headers['content-type']

    let dadosBody = request.body

    let dadosComunicado = await controllerComunicados.setInserirComunicado(dadosBody, contentType)

    

    response.json(dadosComunicado)
    response.status(dadosComunicado.status_code)
})

app.put('/v1/escola_ideal/updateComunicado/:id', cors(), bodyParserJSON,  async function(request,response){
    let idComunicado = request.params.id
    let contentType = request.headers['content-type']
    let dadosBody = request.body

    let atualizacaoComunicado = await controllerComunicados.setAtualizarComunicado(idComunicado,dadosBody, contentType)

    response.json(atualizacaoComunicado)
    response.status(atualizacaoComunicado.status_code)
    

})

app.get('/v1/escola_ideal/comunicado/:id', cors(), async function(request, response){
    
    //recebe o id da requisição
    let idComunicado = request.params.id

    //encaminha o id para a controller buscar o filme
    let dadosComunicado = await controllerComunicados.getComunicadoById(idComunicado)
    console.log(dadosComunicado)

    if(dadosComunicado){
        response.json(dadosComunicado)
        response.status(200)
    }else{
        response.json({message: 'Nenhum registro foi encontrado!'})
        response.status(404)
    }
    
    
})
/******************************  TURMAS  ***********************************/


app.get('/v1/escola_ideal/turmas', cors(), async function (request, response){
    let dadosTurmas = await controllerTurmas.getListarTurmas()

    if(dadosTurmas){
        response.json(dadosTurmas)
        response.status(dadosTurmas.status_code)
    }else{
        response.json(404)
    }
})

app.delete('/v1/escola_ideal/deleteTurma/:id', cors(), async function(request,response){
    let idTurma = request.params.id

    let dadosTurma = await controllerTurmas.setExcluirTurma(idTurma)

    response.json(dadosTurma)
    response.status(dadosTurma.status_code)
})

app.post('/v1/escola_ideal/turma', cors(), bodyParserJSON, async function(request, response){

    
    let contentType = request.headers['content-type']

    let dadosBody = request.body

    let dadosTurma = await controllerTurmas.setInserirTurma(dadosBody, contentType)

    

    response.json(dadosTurma)
    response.status(dadosTurma.status_code)
})

app.put('/v1/escola_ideal/updateTurma/:id', cors(), bodyParserJSON,  async function(request,response){
    let idTurma = request.params.id
    let contentType = request.headers['content-type']
    let dadosBody = request.body

    let atualizacaoTurma = await controllerTurmas.setAtualizarTurma(idTurma,dadosBody, contentType)

    response.json(atualizacaoTurma)
    response.status(atualizacaoTurma.status_code)
    

})

app.get('/v1/escola_ideal/turma/:id', cors(), async function(request, response){
    
    //recebe o id da requisição
    let idTurma = request.params.id

    //encaminha o id para a controller buscar o filme
    let dadosTurma = await controllerTurmas.getTurmaById(idTurma)
    console.log(dadosTurma)

    if(dadosTurma){
        response.json(dadosTurma)
        response.status(200)
    }else{
        response.json({message: 'Nenhum registro foi encontrado!'})
        response.status(404)
    }
    
    
})

/**************************************  FREQUENCIA  *************************************/

app.get('/v1/escola_ideal/somaFrequencia/:id', cors(), async function(request, response){


    let idMatricula = request.params.id

    let somaFaltas = await controllerFrequencia.getSomaFaltas(idMatricula)
    
    if(somaFaltas){
        response.json(somaFaltas)
        response.status(200)
    }else{
      
        response.json({message: 'Nenhum registro foi encontrado!'})
        response.status(404)
    }
    
    
})

app.post('/v1/escola_ideal/frequencia', cors(), bodyParserJSON, async function(request, response){

    
    let contentType = request.headers['content-type']

    let dadosBody = request.body

    let dadosFrequencia = await controllerFrequencia.setInserirFrequencia(dadosBody, contentType)

    

    response.json(dadosFrequencia)
    response.status(200)
})

/****************************  NOTAS  **************************/

app.post('/v1/escola_ideal/nota', cors(), bodyParserJSON, async function(request, response){

    
    let contentType = request.headers['content-type']

    let dadosBody = request.body

    let dadosNota = await controllerNotas.setInserirNota(dadosBody, contentType)

    

    response.json(dadosNota)
    response.status(200)
})

app.put('/v1/escola_ideal/updateNota/:id', cors(), bodyParserJSON,  async function(request,response){
    let idNota = request.params.id
    let contentType = request.headers['content-type']
    let dadosBody = request.body

    let atualizacaoNota = await controllerNotas.setAtualizarNota (idNota,dadosBody, contentType)

    response.json(atualizacaoNota)
    response.status(atualizacaoNota.status_code)
    

})

app.get('/v1/escola_ideal/notas/:idMatricula/:idDisciplina', cors(), async function(request, response){


    let idMatricula = request.params.idMatricula
    let idDisciplina = request.params.idDisciplina

    let notasDisciplina = await controllerNotas.getNotasDisciplina(idMatricula, idDisciplina)
    
    if(notasDisciplina){
        response.json(notasDisciplina)
        response.status(200)
    }else{
      
        response.json({message: 'Nenhum registro foi encontrado!'})
        response.status(404)
    }
    
    
})




app.listen('8080', function(){
    console.log('API funcionando!!')
})
