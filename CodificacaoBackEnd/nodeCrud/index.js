const express = require('express');

const server = express();

const cursos = ["NodeJs", "PHP", "Java"]; //simulando um BD

server.use(express.json());

server.use( (req,res, next) => {
  console.log("Requisição chamada!");
  return next();
})

server.listen(3000);

// GET -> Envia todos os cursos
server.get('/cursos', (req, res) => {
    return res.json( {cursos: cursos } );
});

// GET -> Envia apenas um curso
server.get('/curso/:id', (req, res) => {
    const {id} = req.params;

    return res.json(cursos[id]);
});

// POST -> Cria um curso
server.post('/newcurso', (req, res) => {
    const { newCurso } = req.body;
    cursos.push( newCurso );
    return res.json( cursos );
});

// POST -> Cria vários cursos
server.post('/newcursos', (req, res) => {
  const { newCursos } = req.body;
  
  // Modelo do body
  // {newCursos : [{"newCurso": "nomeCurso"}, {"newCurso": "nomeDoOutroCurso"}]}

    for ( curso of newCursos ){
      cursos.push( curso.newCurso )
    }

    return res.json( {cursos: cursos} );
});


// PUT -> Atualiza um curso da API
server.put('/curso/:index', (req, res) => {
    const { index } = req.params;
    const { newCurso } = req.body;

    cursos[ index ] = newCurso;

    return res.json( {cursos : cursos} );
})

// DELETE -> Deleta um curso da API
server.delete('/curso/:id', (req, res) => {
    const { id } = req.params;
    cursos.splice(id, 1);
    return res.json({ cursos: cursos });
})