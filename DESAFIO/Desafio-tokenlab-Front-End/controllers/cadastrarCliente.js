import {eventosService} from '../service/cliente-service.js'

const formulario = document.querySelector('[data-form]')

formulario.addEventListener('submit',(evento)=>{
    evento.preventDefault();

    const nome = evento.target.querySelector('[data-nome]').value;
    const senha = evento.target.querySelector('[data-senha]').value;
    eventosService.cadastrarUsuario(nome,senha)
    .then(()=>{
        window.location.href = '../telas/login.html'
    })
})


