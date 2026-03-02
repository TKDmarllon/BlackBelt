function toggleResposta(botao) {
    const resposta = botao.nextElementSibling;
    resposta.classList.toggle("hidden");
}

function verificarResposta(select, respostaCorreta) {
    if (select.value === respostaCorreta) {
        select.style.backgroundColor = "#c8f7c5";
    } else {
        select.style.backgroundColor = "#f7c5c5";
    }
}

function iniciarSistema() {
    listarTecnicas();
    iniciarJogo();
    carregarJogo();
}

function iniciarJogo() {
    tecnicasEmbaralhadas = embaralhar([...tecnicas]);
    tecnicaAtualIndex = 0;
}

function carregarJogo() {
    if (!tecnicasEmbaralhadas.length) return;

    const t = tecnicasEmbaralhadas[tecnicaAtualIndex];

    document.getElementById("imagemTecnica").src = t.imagem;

    respostaMontada = [];
    atualizarArea();

    const resposta = Array.isArray(t.resposta) ? t.resposta : [];
    const erradas = Array.isArray(t.erradas) ? t.erradas : [];

    const opcoes = embaralhar([...resposta, ...erradas]);
    carregarOpcoes(opcoes);
}

function carregarOpcoes(opcoes) {
    const div = document.getElementById("opcoes");
    div.innerHTML = "";

    opcoes.forEach(p => {
        const btn = document.createElement("button");
        btn.innerText = p;
        btn.onclick = () => adicionarPalavra(p);
        div.appendChild(btn);
    });
}

function adicionarPalavra(p) {
    respostaMontada.push(p);
    atualizarArea();
}

function atualizarArea() {
    document.getElementById("areaMontada").innerText = respostaMontada.join(" ");
}

function apagarUltima() {
    respostaMontada.pop();
    atualizarArea();
}

function pularTecnica() {
    tecnicaAtualIndex++;
    if (tecnicaAtualIndex >= tecnicasEmbaralhadas.length) iniciarJogo();
    document.getElementById("resultado").innerText = "";
    carregarJogo();
}

function verificar() {
    const t = tecnicasEmbaralhadas[tecnicaAtualIndex];
    const overlay = document.getElementById("overlayResultado");
    const texto = document.getElementById("overlayTexto");

    overlay.classList.remove("hidden", "overlay-correto", "overlay-erro");

    if (JSON.stringify(respostaMontada) === JSON.stringify(t.resposta)) {

        texto.innerText = "✅ CORRETO! 👊🥋";
        overlay.classList.add("overlay-correto");

        setTimeout(() => {
            overlay.classList.add("hidden");
            tecnicaAtualIndex++;
            if (tecnicaAtualIndex >= tecnicasEmbaralhadas.length) iniciarJogo();
            carregarJogo();
        }, 1500);

    } else {

        texto.innerText = "❌ ERRADO!";
        overlay.classList.add("overlay-erro");

        setTimeout(() => {
            overlay.classList.add("hidden");
        }, 1500);
    }
}
