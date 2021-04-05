import { eventosService } from '../service/cliente-service.js'

const formulario = document.querySelector('[data-form]');


formulario.addEventListener('submit', (evento)=>{
    evento.preventDefault()
    const nome = evento.target.querySelector('[data-nome]').value;
    const senha = evento.target.querySelector('[data-senha]').value;
    
    const res = eventosService.fazerLogin(nome, senha).then(()=>{
        console.log(res)
    })
    
})