let botoesSelecionados = [];
let verificacaoEmAndamento = false;
let temporizadorOverlay;

function iniciarSistema() {
    listarTecnicas();
    iniciarJogo();
    carregarJogo();
}

function iniciarJogo() {
    tecnicasEmbaralhadas = embaralhar(tecnicas);
    tecnicaAtualIndex = 0;
}

function carregarJogo() {
    const imagem = document.getElementById("imagemTecnica");
    const opcoes = document.getElementById("opcoes");
    const estado = document.getElementById("estadoJogo");
    const verificarBotao = document.querySelector(".acoes-jogo .verificar");
    const botoesAcao = document.querySelectorAll(".acoes-jogo button");
    if (!imagem || !opcoes) return;

    window.clearTimeout(temporizadorOverlay);
    verificacaoEmAndamento = false;
    botoesAcao.forEach(botao => { botao.disabled = false; });
    document.getElementById("overlayResultado")?.classList.add("hidden");
    document.getElementById("overlayResultado")?.classList.remove("overlay-correto", "overlay-erro");
    opcoes.replaceChildren();
    respostaMontada = [];
    botoesSelecionados = [];
    atualizarArea();

    const tecnica = tecnicasEmbaralhadas[tecnicaAtualIndex];
    if (!tecnica) {
        imagem.hidden = true;
        imagem.removeAttribute("src");
        if (estado) estado.textContent = "Nenhuma técnica disponível. Adicione técnicas na área Administração.";
        if (verificarBotao) verificarBotao.disabled = true;
        return;
    }
    if (estado) estado.textContent = "";
    if (verificarBotao) verificarBotao.disabled = false;
    imagem.hidden = false;
    imagem.alt = "Imagem de referência para identificar a técnica de Taekwondo";
    imagem.onerror = () => {
        imagem.hidden = true;
        if (estado) estado.textContent = "Não foi possível carregar a imagem desta técnica.";
    };
    imagem.src = tecnica.imagem;

    const resposta = Array.isArray(tecnica.resposta) ? tecnica.resposta : [];
    const erradas = Array.isArray(tecnica.erradas) ? tecnica.erradas : [];
    embaralhar([...resposta, ...erradas]).forEach(palavra => {
        const botao = document.createElement("button");
        botao.type = "button";
        botao.textContent = palavra;
        botao.addEventListener("click", () => adicionarPalavra(palavra, botao));
        opcoes.appendChild(botao);
    });
}

function adicionarPalavra(palavra, botao) {
    if (verificacaoEmAndamento || botao.disabled) return;
    const estado = document.getElementById("estadoJogo");
    if (estado) estado.textContent = "";
    respostaMontada.push(palavra);
    botoesSelecionados.push(botao);
    botao.disabled = true;
    atualizarArea();
}

function atualizarArea() {
    const area = document.getElementById("areaMontada");
    if (area) area.textContent = respostaMontada.join(" ");
}

function apagarUltima() {
    if (verificacaoEmAndamento) return;
    respostaMontada.pop();
    const botao = botoesSelecionados.pop();
    if (botao) botao.disabled = false;
    atualizarArea();
}

function pularTecnica() {
    if (verificacaoEmAndamento || !tecnicasEmbaralhadas.length) return;
    tecnicaAtualIndex++;
    if (tecnicaAtualIndex >= tecnicasEmbaralhadas.length) iniciarJogo();
    carregarJogo();
}

function verificar() {
    if (verificacaoEmAndamento) return;
    const tecnica = tecnicasEmbaralhadas[tecnicaAtualIndex];
    if (!tecnica) return;
    if (!respostaMontada.length) {
        const estado = document.getElementById("estadoJogo");
        if (estado) estado.textContent = "Escolha algumas palavras antes de verificar.";
        return;
    }

    const overlay = document.getElementById("overlayResultado");
    const texto = document.getElementById("overlayTexto");
    const acertou = respostaMontada.length === tecnica.resposta.length &&
        respostaMontada.every((palavra, indice) => palavra === tecnica.resposta[indice]);
    window.clearTimeout(temporizadorOverlay);
    overlay.classList.remove("hidden", "overlay-correto", "overlay-erro");

    if (acertou) {
        verificacaoEmAndamento = true;
        document.querySelectorAll(".acoes-jogo button").forEach(botao => { botao.disabled = true; });
        texto.textContent = "✅ Correto! Muito bem! 🥋";
        overlay.classList.add("overlay-correto");
        temporizadorOverlay = window.setTimeout(() => {
            overlay.classList.add("hidden");
            tecnicaAtualIndex++;
            if (tecnicaAtualIndex >= tecnicasEmbaralhadas.length) iniciarJogo();
            carregarJogo();
        }, 1300);
    } else {
        texto.textContent = "❌ Ainda não. Tente outra vez!";
        overlay.classList.add("overlay-erro");
        temporizadorOverlay = window.setTimeout(() => overlay.classList.add("hidden"), 1100);
    }
}
