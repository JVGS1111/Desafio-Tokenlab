import {eventosService} from '../service/cliente-service.js'

(async() => {
    const pegaURL = new URL(window.location);
    const idEvento = pegaURL.searchParams.get('idEvento');

    const nome = document.querySelector('[data-nome]');
    const descricao = document.querySelector('[data-descricao]');
    const dia = document.querySelector('[data-dia]');
    const inicio = document.querySelector('[data-inicio]');
    const fim = document.querySelector('[data-fim]');

    const dados = await eventosService.detalhaEvento(idEvento)
    nome.value = dados.nomeDoEvento,
    descricao.value = dados.descricaoDoEvento,
    dia.value = dados.dia,
    inicio.value = dados.inicio
    fim.value = dados.fim


    const formulario = document.querySelector('[data-form]');

    formulario.addEventListener('submit', async(evento) =>{
    evento.preventDefault();

    await eventosService.atualizaEvento(idEvento, nome.value, descricao.value, dia.value, inicio.value, fim.value)
    window.location.href ="../telas/listaDeEventos.html"

})

})()


