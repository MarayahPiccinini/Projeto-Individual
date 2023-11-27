var database = require("../database/config")

function obterDados(fkUsuario) {
    var instrucao = `
  select * from jogo where fkUsuario = ${fkUsuario} order by idJogo desc limit 1
`;
console.log("Executando a instrução SQL: \n" + instrucao);
return database.executar(instrucao);
}
function cadastrar(question1, question2, question3, question4, question5, fkUsuario) {
    
    var instrucao = `
        INSERT INTO jogo (question1, question2, question3, question4, question5, fkUsuario) VALUES ('${question1}', '${question2}', '${question3}', '${question4}', '${question5}', '${fkUsuario}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    cadastrar,
    obterDados
};