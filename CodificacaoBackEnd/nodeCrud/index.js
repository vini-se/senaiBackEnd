const express = require("express");

const server = express();

const cursos = ["NodeJs", "PHP", "Java"]; //simulando um BD

server.use(express.json());

server.use((req, res, next) => {
  console.log("Requisição chamada!");
  return next();
});

server.listen(3000);

function checkIndexCurso(req, res, next) {
  const { id } = req.params;

  if (!cursos[id]) {
    return res.status(400).json({
      error: `Indice do curso indisponível! Último índice da lista de cursos: ${
        cursos.length - 1
      }`,
    });
  }

  return next();
}

function checkBodyCurso(req, res, next) {
  const { body } = req;

  if (!body.hasOwnProperty("newCurso")) {
    return res
      .status(400)
      .json({ error: "Estrutura errada! Cheque como dever ser a solicitação" });
  }
  return next();
}

function checkBodyCursos(req, res, next) {
  const { body } = req;

  if (!body.hasOwnProperty("newCursos")) {
    return res
      .status(400)
      .json({ error: "Estrutura errada! Cheque como dever ser a solicitação" });
  }
  return next();
}

function checkCursoCursos(req, res, next) {
  const cursos = req.body.newCursos;

  if (!cursos.find((curso) => curso.hasOwnProperty("newCurso"))) {
    // if(cursos.find( (curso) => curso.newCurso == undefined) ){
    return res
      .status(400)
      .json({ error: "Estrutura errada! Cheque como dever ser a solicitação" });
  }

  return next();
}

// GET -> Envia todos os cursos
server.get("/cursos", (req, res) => {
  return res.json({ cursos: cursos });
});

// GET -> Envia apenas um curso
server.get("/curso/:id", (req, res) => {
  const { id } = req.params;

  return res.json({ curso: cursos[id] });
});

// POST -> Cria um curso
server.post("/newcurso", checkBodyCurso, (req, res) => {
  const { newCurso } = req.body;
  cursos.push(newCurso);
  return res.json(cursos);
});

// POST -> Cria vários cursos
server.post("/newcursos", checkBodyCursos, checkCursoCursos, (req, res) => {
  const { newCursos } = req.body;

  // Modelo do body
  // {newCursos : [{"newCurso": "nomeCurso"}, {"newCurso": "nomeDoOutroCurso"}]}

  for (curso of newCursos) {
    cursos.push(curso.newCurso);
  }

  return res.json({ cursos: cursos });
});

// PUT -> Atualiza um curso da API
server.put("/curso/:id", checkIndexCurso, checkBodyCurso, (req, res) => {
  const { id } = req.params;
  const { newCurso } = req.body;

  cursos[id] = newCurso;

  return res.json({ cursos: cursos });
});

// DELETE -> Deleta um curso da API
server.delete("/curso/:id", checkIndexCurso, (req, res) => {
  const { id } = req.params;
  cursos.splice(id, 1);
  return res.json({ cursos: cursos });
});
