const form = document.getElementById('form-atividade');

const imgAprovado = '<img src="./imagens/aprovado.png" alt="Emoji celebrando" />';
const imgReprovado = '<img src="./imagens/reprovado.png" alt="Emoji decepção" />';
const spanAprovado = '<span class="resultado-aprovado">Aprovado</span>';
const spanReprovado = '<span class="resultado-reprovado">Reprovado</span>';
const atividade = [];
const notas = [];
const notaMinima = parseFloat(prompt("Digite a nota mínima"));

let linhas = '';

form.addEventListener('submit', function(e) {
    e.preventDefault();

    adicionaLinha();
    atualizaTabela();
    atualizaMediaFinal();
});

function adicionaLinha() {
    const inputNomeAtividade = document.getElementById('nome-atividade');
    const inputNotaAtividade = document.getElementById('nota-atividade');

    // Verifica se a atividade já foi inserida
    if (atividade.includes(inputNomeAtividade.value)) {
        // Exibe mensagem de alerta ou outra forma de notificação
        alert(`A atividade "${inputNomeAtividade.value}" já foi inserida.`);
        return; // Interrompe a execução se a atividade já existir
    }

    // Adiciona a atividade e a nota aos arrays
    atividade.push(inputNomeAtividade.value);
    notas.push(parseFloat(inputNotaAtividade.value));

    // Monta a linha da tabela com base nos dados inseridos
    let linha = '<tr>';
    linha += `<td>${inputNomeAtividade.value}</td>`;
    linha += `<td>${inputNotaAtividade.value}</td>`;
    linha += `<td>${inputNotaAtividade.value >= notaMinima ? imgAprovado : imgReprovado}</td>`;
    linha += '</tr>';

    linhas += linha;

    inputNomeAtividade.value = '';
    inputNotaAtividade.value = '';
}

function atualizaTabela() {
    const corpoTabela = document.querySelector('tbody');
    corpoTabela.innerHTML = linhas;
}

function atualizaMediaFinal() {
    const mediaFinal = calculaMediaFinal();

    // Atualiza a média final exibida na interface
    document.getElementById('media-final-valor').innerHTML = mediaFinal.toFixed(2);
    document.getElementById('media-final-resultado').innerHTML = mediaFinal >= notaMinima ? spanAprovado : spanReprovado;
}

function calculaMediaFinal() {
    if (notas.length === 0) return 0;

    let somaDasNotas = 0;

    for (let i = 0; i < notas.length; i++) {
        somaDasNotas += notas[i];
    }

    return somaDasNotas / notas.length;
}