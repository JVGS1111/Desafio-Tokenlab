const conexao = require('../infraestrutura/conexao.js')
const moment = require('moment');

class Eventos {
    //add login
    //add cadastro de usuario
    adicionarUsuario(Cliente, res){
        
        const sql = 'INSERT INTO usuario SET ?'
        const nomeEhValdo = Cliente.nomeDeCliente.length >= 5;
        const senhaEhValida = Cliente.senhaDoCliente.length >= 5;

        const validacoes = [
            {
                nome: 'Nome de usuario',
                valido: nomeEhValdo,
                mensagem: 'O nome de usuario deve ter pelo menos 5 caracteres'
            },
            {
                nome: 'Senhad o usuario',
                valido: senhaEhValida,
                mensagem: 'A senha deve ter pelo menos 5 caracteres'
            }
        ]

        const erros = validacoes.filter(campo => !campo.valido);
        const existemErros = erros.length;

        if(existemErros) {
            res.status(400).json(erros);
        } else {
            conexao.query(sql, Cliente, (erro, resultados) =>{
                if(erro){
                    res.status(400).json(erro);
                }else{
                    res.status(200).json(resultados);
                }
            });
        }
    }

    consultarUsuario(Cliente, res){
        console.log(Cliente)
        const sql = `SELECT * FROM usuario WHERE nomeDeCliente = '${Cliente.nomedecliente}' AND senhaDoCliente = '${Cliente.senhadocliente}'`
        //const cliente = [Cliente.nomedecliente, Cliente.senhadocliente]
        
        conexao.query(sql, Cliente,(erro, resultados) =>{
            const ClienteConfirmado = resultados[0];
            
            if(erro){
                res.status(400).json(erro);
            } else {

                if(resultados.length > 0){
                    var aceita = Cliente.nomedecliente == ClienteConfirmado.nomeDeCliente && Cliente.senhadocliente == ClienteConfirmado.senhaDoCliente;
                    if(aceita){
                        res.status(201).json('autorizado');
                    } else {
                        res.status(400).json('nao autorizado');
                    }
                }else{
                    res.status(400).json('nao autorizado');
                }
            }
        })
    };

    adicionaEventos(evento, res){

        const dia = moment(evento.dia, 'YYYY-MM-DD').format('YYYY-MM-DD');
        
        const sql = 'INSERT INTO eventos SET ?';
        const eventoEhValido = evento.nomeDoEvento.length >=1 ;
        
        const validacoes = [
             {
                nome: 'Nome do evento',
                valido: eventoEhValido,
                mensagem: 'Nome do evento nao poder ter menos de 1 caractere'
             }
        ]
        const erros = validacoes.filter(campo => !campo.valido);
        const existemErros = erros.length;

        if(existemErros) {
            res.status(400).json(erros);
        }else{
            const eventoModificado = {...evento, dia};

            conexao.query(sql, eventoModificado, (erro, resultados) => {
                
                if(erro){
                    res.status(400).json(erro);
                    
                }else{
                    res.status(200).json(resultados);
                }
            });
        }   
    }

    lista(res){
        const sql = 'SELECT * FROM eventos';

        conexao.query(sql, (erro, resultados)=>{     
            resultados.forEach(elemento => {      
                elemento.dia = moment(elemento.dia).utc().format('DD/MM/YYYY'); //CONVERTE A DATA DE FORMATO UTC para dd/mm/yyyy         
            });
            if(erro){
                res.status(400).json(erro);
            }else{
                res.status(200).json(resultados);    
            }
        });
    }

    buscarPorId(id, res){
       const sql = `SELECT * FROM eventos WHERE idEvento = ${id}` 

       conexao.query(sql, (erro,resultados) => {
            const evento = resultados[0];
            if(evento.dia){
                evento.dia = moment(evento.dia).utc().format('YYYY-MM-DD');// converte a data para o html input date
                
            }
            console.log(evento)
            if(erro){
                res.status(400).json(erro);
            }else{
                console.log(evento)
                res.status(200).json(evento);
            }
       });
    }

    alterar(idEvento, valores, res){
        if(valores.dia){
            valores.dia = moment(valores.dia, 'YYYY-MM-DD').format('YYYY-MM-DD');
        }
        const sql = 'UPDATE Eventos SET ? WHERE idEvento=?';
        
        conexao.query(sql, [valores, idEvento], (erro, resultados) => {
            if(erro){
                res.status(400).json(erro);
            }else{
                res.status(200).json({...valores, idEvento});
            }
        });
    }

    deleta(idEvento, res){
        const sql = `DELETE FROM eventos WHERE idEvento=?`;

        conexao.query(sql,idEvento, (erro, resuldados) => {
            if(erro) {
                res.status(400).json(erro);
            } else {
                res.status(200); // nao fiz retorno
            }
        });

    }
}

   
module.exports = new Eventos;