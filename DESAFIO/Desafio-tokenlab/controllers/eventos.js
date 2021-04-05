const Eventos = require('../models/Eventos.js')

module.exports = app => {
    app.post('/usuario', (req, res) =>{
        const Cliente = req.body;
        Eventos.adicionarUsuario(Cliente,res);
    })

    app.get('/usuario', (req, res) =>{
        const Cliente = req.headers;
        Eventos.consultarUsuario(Cliente, res);
    })

    app.get('/eventos', (req, res) => {
        Eventos.lista(res);
    });

    app.get('/eventos/:idEvento', (req, res) =>{
        const idEvento = parseInt(req.params.idEvento)
        Eventos.buscarPorId(idEvento, res);
    });

    app.post('/eventos', (req, res) => {
        const evento = req.body;
        Eventos.adicionaEventos(evento, res);
    });
    app.put('/eventos/:idEvento', (req, res) => {
        const idEvento = parseInt(req.params.idEvento);
        const valores = req.body;

        Eventos.alterar(idEvento, valores, res);
    });
    app.delete('/eventos/:idEvento', (req, res) => {
        const idEvento = parseInt(req.params.idEvento); 

        Eventos.deleta(idEvento, res);
    });

}