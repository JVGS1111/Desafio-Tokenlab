class Tabelas {
    init(conexao){
        this.conexao = conexao;
        this.criarTabelaEventos();
        this.criarTaberlaUsuario();
    }

    criarTabelaEventos(){
        const sql = 'CREATE TABLE IF NOT EXISTS Eventos (idEvento int NOT NULL AUTO_INCREMENT, nomeDoEvento varchar(500), descricaoDoEvento varchar(150) NOT NULL, dia date NOT NULL, inicio time NOT NULL, fim time NOT NULL, PRIMARY KEY(idEvento))';


        this.conexao.query(sql, (erro)=>{
            if(erro){
                console.log(erro);

            }else{
                console.log('TABELA de eventos criada');
            }
        });
    }
    criarTaberlaUsuario(){

        const sql = 'CREATE TABLE IF NOT EXISTS usuario (idCliente int AUTO_INCREMENT, nomeDeCliente varchar(80) NOT NULL, senhaDoCliente varchar(30) NOT NULL, PRIMARY KEY(idCliente))'

        this.conexao.query(sql, (erro)=>{
            if(erro){
                console.log(erro);

            }else{
                console.log('TABELA de usuario criada');
            }
        });
    }
}

module.exports = new Tabelas