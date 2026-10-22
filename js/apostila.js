let apostila = [];

async function carregarApostila() {
    const estado = document.getElementById("estadoApostila");
    try {
        const resposta = await fetch("data/apostila.json");
        if (!resposta.ok) throw new Error(`Falha ao carregar a apostila (${resposta.status}).`);
        const dados = await resposta.json();
        if (!Array.isArray(dados)) throw new Error("O arquivo da apostila tem um formato inválido.");
        apostila = dados;
        renderizarBotoesFaixas();
        if (estado) estado.textContent = apostila.length ? "" : "Nenhuma graduação disponível no momento.";
    } catch (erro) {
        console.error("Erro ao carregar apostila:", erro);
        if (estado) estado.textContent = "Não foi possível carregar o conteúdo. Confira sua conexão e tente novamente.";
    }
}

function renderizarBotoesFaixas() {
    const menu = document.querySelector(".menu-faixas");
    if (!menu) return;
    menu.replaceChildren();
    apostila.forEach(faixa => {
        const botao = document.createElement("button");
        botao.type = "button";
        botao.textContent = `${faixa.faixa} · ${faixa.titulo}`;
        botao.setAttribute("aria-pressed", "false");
        botao.addEventListener("click", () => mostrarFaixa(faixa.id));
        menu.appendChild(botao);
    });
}

function criarTexto(tag, texto) {
    const elemento = document.createElement(tag);
    elemento.textContent = texto;
    return elemento;
}

function renderLista(container, lista) {
    const ul = document.createElement("ul");
    lista.forEach(item => {
        const li = document.createElement("li");
        if (typeof item === "string") {
            li.textContent = item;
        } else if (item && typeof item === "object") {
            if (item.nome) li.appendChild(criarTexto("strong", item.nome));
            if (item.descricao) li.appendChild(criarTexto("span", item.descricao));
        }
        ul.appendChild(li);
    });
    container.appendChild(ul);
}

function renderPerguntas(container, perguntas) {
    perguntas.forEach(pergunta => {
        const item = document.createElement("div");
        item.className = "pergunta-item";
        item.appendChild(criarTexto("p", pergunta.pergunta));

        const resposta = criarTexto("p", pergunta.resposta);
        resposta.className = "resposta-iron hidden";
        const botao = document.createElement("button");
        botao.type = "button";
        botao.className = "botao-secundario";
        botao.textContent = "Mostrar resposta";
        botao.setAttribute("aria-expanded", "false");
        botao.addEventListener("click", () => {
            const abrir = resposta.classList.contains("hidden");
            resposta.classList.toggle("hidden", !abrir);
            botao.textContent = abrir ? "Ocultar resposta" : "Mostrar resposta";
            botao.setAttribute("aria-expanded", String(abrir));
        });
        item.append(botao, resposta);
        container.appendChild(item);
    });
}

function renderQuiz(container, quiz) {
    if (!quiz.length) return;
    container.appendChild(criarTexto("h4", "Quiz · Diga o significado"));
    quiz.forEach(item => {
        const wrapper = document.createElement("div");
        wrapper.className = "quiz-item";
        wrapper.appendChild(criarTexto("p", item.termo));
        embaralhar(item.opcoes).forEach(opcao => {
            const botao = document.createElement("button");
            botao.type = "button";
            botao.textContent = opcao;
            botao.addEventListener("click", () => {
                const botoes = wrapper.querySelectorAll("button");
                botoes.forEach(opcaoBotao => {
                    opcaoBotao.disabled = true;
                    if (opcaoBotao.textContent === item.resposta) opcaoBotao.classList.add("resultado-correto");
                });
                if (opcao !== item.resposta) botao.classList.add("resultado-erro");
            });
            wrapper.appendChild(botao);
        });
        container.appendChild(wrapper);
    });
}

function mostrarFaixa(id) {
    const faixa = apostila.find(item => item.id === id);
    const container = document.getElementById("conteudo-faixa");
    if (!container) return;
    container.replaceChildren();

    if (!apostila.length) {
        container.appendChild(criarTexto("p", "O conteúdo da apostila ainda não carregou. Verifique se o site está sendo aberto por um servidor web e atualize a página."));
        return;
    }

    document.querySelectorAll(".menu-faixas button").forEach(botao => {
        const ativa = botao.textContent === `${faixa?.faixa} · ${faixa?.titulo}`;
        botao.setAttribute("aria-pressed", String(ativa));
    });
    if (!faixa) {
        container.appendChild(criarTexto("p", "Graduação não encontrada."));
        return;
    }

    const cabecalho = document.createElement("div");
    cabecalho.className = "faixa-titulo";
    cabecalho.appendChild(criarTexto("h2", `${faixa.titulo} · Faixa ${faixa.faixa}`));
    if (faixa.tempo_minimo) cabecalho.appendChild(criarTexto("p", `Tempo mínimo: ${faixa.tempo_minimo}`));
    container.appendChild(cabecalho);

    Object.values(faixa.conteudo || {}).forEach(secao => {
        if (!secao || !secao.titulo) return;
        const cartao = document.createElement("article");
        cartao.className = "secao-apostila";
        cartao.appendChild(criarTexto("h3", secao.titulo));
        if (secao.descricao) cartao.appendChild(criarTexto("p", secao.descricao));
        if (secao.regra) {
            const regra = document.createElement("p");
            regra.appendChild(criarTexto("strong", "Regra: "));
            regra.appendChild(document.createTextNode(secao.regra));
            cartao.appendChild(regra);
        }
        if (secao.preparacao) {
            const preparacao = document.createElement("p");
            preparacao.appendChild(criarTexto("strong", "Preparação: "));
            preparacao.appendChild(document.createTextNode(secao.preparacao));
            cartao.appendChild(preparacao);
        }
        ["bases", "ataques", "defesas", "tecnicas", "itens", "atividades", "modalidades"].forEach(chave => {
            if (Array.isArray(secao[chave]) && secao[chave].length) renderLista(cartao, secao[chave]);
        });
        if (Array.isArray(secao.perguntas_respostas)) renderPerguntas(cartao, secao.perguntas_respostas);
        if (Array.isArray(secao.quiz_significados)) renderQuiz(cartao, secao.quiz_significados);
        container.appendChild(cartao);
    });
    container.scrollIntoView({ behavior: "smooth", block: "start" });
}

function resetarQuiz() {
    const container = document.getElementById("conteudo-faixa");
    if (!container) return;
    container.querySelectorAll(".quiz-item button").forEach(botao => {
        botao.disabled = false;
        botao.classList.remove("resultado-correto", "resultado-erro");
    });
    container.querySelectorAll(".resposta-iron").forEach(resposta => resposta.classList.add("hidden"));
    container.querySelectorAll(".pergunta-item button").forEach(botao => {
        botao.textContent = "Mostrar resposta";
        botao.setAttribute("aria-expanded", "false");
    });
}
