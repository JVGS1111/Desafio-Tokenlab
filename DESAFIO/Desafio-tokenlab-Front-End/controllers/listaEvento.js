import { eventosService } from '../service/cliente-service.js'

const criaNovaLinha = (nomeDoEvento, descricaoDoEvento, dia, inicio, fim, idEvento) => {
    const linhaNovoEvento = document.createElement('tr');
    const conteudo = 
    `<td>${nomeDoEvento}</td>
    <td>${descricaoDoEvento}</td>
    <td>${dia}</td>
    <td>${inicio}</td>
    <td>${fim}</td>
    <td>
        <ul class="tabela__botoes-controle">
            <li><a href="../telas/editarEvento.html?idEvento=${idEvento}" class="botao-simples--editar">Editar</a></li>
            <li><button class="botao-simples--excluir" type="button">Excluir</button></li>
        </ul>
    </td>`

    linhaNovoEvento.innerHTML = conteudo;
    linhaNovoEvento.dataset.id = idEvento;
    
    return linhaNovoEvento;
}

const tabela = document.querySelector('[data-tabela]');

const render = async() => {
    
const eventoService = await eventosService.listarEventos()

            
eventoService.forEach(elemento => {
        tabela.appendChild(criaNovaLinha(elemento.nomeDoEvento, elemento.descricaoDoEvento, elemento.dia, elemento.inicio, elemento.fim, elemento.idEvento));

})}




tabela.addEventListener('click', async(evento)=> {
    let botaoDeletar = evento.target.className === 'botao-simples--excluir'; //botao deletar
    if(botaoDeletar){
        
        const linhaEvento = evento.target.closest('[data-id]');//linha recebe id
        let idEvento = linhaEvento.dataset.id
        await eventosService.removeEvento(idEvento)//linha removida na API
        linhaEvento.remove() //remove a linha no front-end
        
    }
});


render();

