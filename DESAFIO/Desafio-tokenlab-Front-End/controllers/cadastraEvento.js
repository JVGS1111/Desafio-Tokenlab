import {eventosService} from '../service/cliente-service.js'
const formulario = document.querySelector('[data-form]')

formulario.addEventListener('submit', (evento)=>{
    evento.preventDefault()
    const nome = evento.target.querySelector('[data-nome]').value;
    const descricao = evento.target.querySelector('[data-descricao]').value;
    const dia = evento.target.querySelector('[data-dia]').value;
    const inicio = evento.target.querySelector('[data-inicio]').value;
    const fim = evento.target.querySelector('[data-fim]').value;
    
    

    eventosService.criaEvento(nome,descricao,dia,inicio,fim)
    .then(()=>{
        window.location.href = '../telas/listaDeEventos.html'
    })
}) 