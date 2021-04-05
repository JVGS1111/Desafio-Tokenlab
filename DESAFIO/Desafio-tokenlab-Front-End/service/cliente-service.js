
// abertura de comunicaçao com API

const cadastrarUsuario = (nomeDeCliente, senhaDoCliente) =>{
    return fetch(`http://localhost:3000/usuario`, {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify({
            nomeDeCliente: nomeDeCliente,
            senhaDoCliente: senhaDoCliente
        })
    }).then(resposta =>{
        return resposta.body
    }) 
}
const fazerLogin = (nomeDeCliente, senhaDoCliente) =>{
    return fetch(`http://localhost:3000/usuario`, {
        method: 'GET',
        headers: {
            nomeDeCliente: nomeDeCliente,
            senhaDoCliente: senhaDoCliente
        },
        // body: JSON.stringify({
            
        // })
    })
    .then(resposta => {
        if(resposta.status == 201){
            window.location.href = '../telas/listaDeEventos.html'
        }
        else{
            alert('nome ou senha invalidos');
        }
        
    })
}
const listarEventos = () =>{
    return fetch(`http://localhost:3000/eventos`)
    .then(resposta => {
        return resposta.json();
    })
}

const criaEvento = (nomeDoEvento, descricaoDoEvento, dia, inicio, fim) => {
    return fetch(`http://localhost:3000/eventos`,{
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify({
            nomeDoEvento: nomeDoEvento,
            descricaoDoEvento: descricaoDoEvento,
            dia: dia,
            inicio: inicio,
            fim: fim
        })
    }).then(resposta =>{
        return resposta.body
    })
}

const removeEvento = (idEvento) => {
    return fetch(`http://localhost:3000/eventos/${idEvento}`, {
        method: 'DELETE'
    })
}

const detalhaEvento = (idEvento) =>{
return fetch(`http://localhost:3000/eventos/${idEvento}`)
    .then(resposta => {
        return resposta.json();
    })
}

const atualizaEvento = (idEvento,nomeDoEvento, descricaoDoEvento, dia, inicio, fim) =>{
    return fetch(`http://localhost:3000/eventos/${idEvento}`,{
        method: 'PUT',
        headers: {
            'content-type' : 'application/json'
        },
        body: JSON.stringify({
            nomeDoEvento: nomeDoEvento,
            descricaoDoEvento: descricaoDoEvento,
            dia: dia,
            inicio: inicio,
            fim: fim
        })
    }).then( resposta => {
        return resposta.json();
    })
}

export const eventosService = {
    listarEventos,
    criaEvento,
    detalhaEvento,
    removeEvento,
    atualizaEvento,
    cadastrarUsuario,
    fazerLogin
}


