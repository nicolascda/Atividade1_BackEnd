// const express = require('express'); // Padrão antigo
import express from "express" // Igual Python e Java (método ESG) - mais recente

const app = express()
const PORTA = 5000

app.use(express.json())

let listaAlunos = [
    {id: 1, nome: "Jansen"}, // 0 = é o índice
    {
        id: 2, nome: "Vitor"  // 1 = é o índice
    },
    {
        id: 3, nome: "Pedro"  // 2 = é o índice
    },
    {
        id: 4, nome: "Vitor"  // 3 = é o índice
    },
    {
        id: 5, nome: "Higor"  // 4 = é o índice
    }
    
]

app.get("/", (req, res) => { // end point, a primeira rota "/"
    res.status(200).json({
        // msg: "Bom dia!",
        msg: "Hello World!"

    })
})

//Localizar Todos Alunos
app.get("/alunos", (req, res) => {
    res.status(200).json(listaAlunos);
})

//Localizar Aluno
app.get("/alunos/:codigo", (req, res) => {
    const idParametro = req.params.codigo;

    const alunoFiltrado = listaAlunos.find((listaAlunos) => listaAlunos.id === Number(idParametro))

    // if (!aluno) // se for diferente de verdadeiro me retorna falso
    if (idParametro == Number(idParametro))
    {
        if (Number(idParametro) <= listaAlunos.length && Number(idParametro) > 0)
        {
            res.status(200).json(alunoFiltrado)
        }
        else 
        {
            res.status(404).json({msg: "O id requisitado não existe na lista"})
        }
    }
    else
    {
        const alunoNomeFiltrado = listaAlunos.filter((listaAlunos) => listaAlunos.nome == idParametro)

        if( alunoNomeFiltrado.length != 0)
        {
            res.status(200).json(alunoNomeFiltrado);
        }
        else
        {
            res.status(404).json({msg: "O nome não existe na lista de alunos"});
        }
        
    }
    
});

//Alterar aluno
app.put("/alunos/:codigo", (req,res) => {
    const idParametro = req.params.codigo ? Number(req.params.codigo):0;
    console.log("parametro:", req.params)
    const indiceAluno = listaAlunos.findIndex(a => a.id == idParametro) // Localiza o índice
    const { nome } = req.body;

    //console.log(req) //Debugando no console
    if(indiceAluno === -1)
    {
        return res.status(404).json({msg: "Aluno não encontrado"})
    }
    if(!nome)
    {
        return res.status(400).json({msg: "Gentileza preencher nome"})
    }
    listaAlunos[indiceAluno] = {id:idParametro, nome}
    // listaAlunos[indiceAluno].nome = nome;
    res.status(200).json({msg: "Alteração Feita com sucesso", Indice: indiceAluno})

})

app.put("/alunos/", (req, res) => {
    const idParametro = req.params.codigo ? Number(req.params.codigo):0
    console.log("parametros:", req.params)
    if(idParametro === 0)
    {
        return res.status(400).json({msg: "Gentileza Digitar o Nome!"})
    }
})

app.delete("/alunos/:codigo", (req, res) => {
    const idParametro = Number(req.params.codigo) ? Number(req.params.codigo):0
    const aluno = listaAlunos.findIndex(a => a.id == idParametro)
    console.log(aluno)

    if (aluno === -1)
    {
        return res.status(404).json({msg: "Aluno não encontrado"})
    }

    const alunoRemovido = listaAlunos.splice(aluno, 1)
    return res.status(200).json({msg: "Aluno removido com Sucesso!", aluno: alunoRemovido});
})

app.delete("/alunos/", (req, res) => {
    const idParametro = req.params.codigo ? Number(req.params.codigo):0
    console.log("parametros:", req.params)
    if (idParametro === 0)
    {
        return res.status(400).json({msg: "Gentileza Digitar o ID!"})
    }
})


app.post("/alunos", (req, res) => {
    const id = req.body.id;
    const nome = req.body.nome;

    const novoAluno = {id , nome};

    const idEncontrado = listaAlunos.findIndex(a => a.id == Number(id))

    if (!nome)
    {
        return res.status(404).json({msg: "Por gentileza colocar o nome"})
    }
    if ( id < 0)
    {
        return res.status(400).json({msg: "Por favor coloque um id de número positivo"})
    }
    if (idEncontrado === -1)
    {
        listaAlunos.push(novoAluno);
        console.log(idEncontrado)

        return res.status(200).json({msg: "Aluno criado com sucesso"})
    }

    return res.status(400).json({msg: "Aluno já existe"})
    
})

app.listen(PORTA, () => { // http://localhost:5000
    console.log(`Servidor rodando!!`)
    console.log(`http://localhost:${PORTA}`)
}) // retorno void