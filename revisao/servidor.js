// const express = require('express'); // Padrão antigo
import express from "express" // Igual Python e Java (método ESG) - mais recente

const app = express()
const PORTA = 5000

app.use(express.json())

let listaAlunos = [
    {id: 1, nome: "Jansen"},
    {
        id: 2, nome: "Vitor"
    },
    {
        id: 3, nome: "Pedro"
    },
    {
        id: 4, nome: "Vitor"
    },
    {
        id: 5, nome: "Higor"
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
    const idParametro = Number(req.params.codigo);
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
    res.status(200).json({msg: "Alteração Feita com sucesso", Indice:indiceAluno})

})

app.listen(PORTA, () => { // http://localhost:5000
    console.log(`Servidor rodando!!`)
    console.log(`http://localhost:${PORTA}`)
}) // retorno void