var dashboardModel = require("../models/dashboardModel");
function obterDados(req, res) {
    var fkUsuario= req.params.idUsuario
dashboardModel.obterDados(fkUsuario)
.then(
    function(resultado){
        res.json(resultado)
    }
)

}

function cadastrar(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
   var question1=req.body.m1
   var question2=req.body.m2
   var question3=req.body.m3
   var question4=req.body.m4
   var question5=req.body.m5
   var fkUsuario=req.body.fkUsuario

    // Faça as validações dos valores
    if (question1==undefined||question2==undefined||question3==undefined||question4==undefined||question5==undefined||fkUsuario==undefined) {
        res.status(400).send("Alguma coisa está indefinida");
    } else {

        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        dashboardModel.cadastrar(question1, question2, question3, question4, question5, fkUsuario)
            .then(
                function (resultado) {
                    res.status(200).json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

module.exports = {
    cadastrar, 
    obterDados
}