let apostila = [];

document.addEventListener("DOMContentLoaded", () => {
    fetch("data/apostila.json")
        .then(res => res.json())
        .then(data => {
            apostila = data;
        })
        .catch(err => console.error("Erro ao carregar apostila:", err));
});

function criarParagrafo(html) {
    const p = document.createElement("p");
    p.innerHTML = html;
    return p;
}

function renderLista(container, lista) {
    lista.forEach(item => {

        const p = document.createElement("p");

        if (typeof item === "string") {
            p.textContent = item;
        } else {
            p.innerHTML = `<strong>${item.nome}</strong><br>${item.descricao}`;
        }

        container.appendChild(p);
    });
}

function renderPerguntas(container, perguntas) {
    perguntas.forEach(pr => {

        container.appendChild(
            criarParagrafo(`<strong>${pr.pergunta}</strong>`)
        );

        const botao = document.createElement("button");
        botao.textContent = "Mostrar resposta";

        const resposta = criarParagrafo(pr.resposta);
        resposta.style.display = "none";

        botao.onclick = () => {
            resposta.style.display =
                resposta.style.display === "none" ? "block" : "none";
        };

        container.appendChild(botao);
        container.appendChild(resposta);
    });
}

function renderQuiz(container, quiz) {

    const tituloQuiz = document.createElement("h4");
    tituloQuiz.textContent = "Quiz - Diga o significado";
    container.appendChild(tituloQuiz);

    quiz.forEach((item, index) => {

        const wrapper = document.createElement("div");
        wrapper.classList.add("quiz-item");

        const pergunta = document.createElement("p");
        pergunta.innerHTML = `<strong>${item.termo}</strong>`;
        wrapper.appendChild(pergunta);

        const opcoesEmbaralhadas = embaralhar([...item.opcoes]);

        opcoesEmbaralhadas.forEach(opcao => {

            const botao = document.createElement("button");
            botao.textContent = opcao;

            botao.addEventListener("click", () => {

                const botoes = wrapper.querySelectorAll("button");

                botoes.forEach(b => {
                    b.disabled = true;
                    b.classList.remove("resultado-correto", "resultado-erro");
                });

                if (opcao === item.resposta) {
                    botao.classList.add("resultado-correto");
                } else {
                    botao.classList.add("resultado-erro");

                    botoes.forEach(b => {
                        if (b.textContent === item.resposta) {
                            b.classList.add("resultado-correto");
                        }
                    });
                }

            });

            wrapper.appendChild(botao);
        });

        container.appendChild(wrapper);
    });
}

function mostrarFaixa(id) {

    const faixa = apostila.find(f => f.id === id);
    const container = document.getElementById("conteudo-faixa");
    container.innerHTML = "";
    container.scrollIntoView({ behavior: "smooth", block: "start" });

    if (!faixa) {
        container.innerHTML = "<p>Faixa não encontrada.</p>";
        return;
    }

    container.appendChild(
        criarParagrafo(`<h3>${faixa.titulo} - ${faixa.faixa}</h3>`)
    );

    Object.values(faixa.conteudo).forEach(secao => {

        if (!secao.titulo) return;

        container.appendChild(
            criarParagrafo(`<h4>${secao.titulo}</h4>`)
        );

        if (secao.descricao) {
            container.appendChild(
                criarParagrafo(secao.descricao)
            );
        }
        
        if (secao.regra) {
            container.appendChild(
                criarParagrafo(`<strong>Regra:</strong> ${secao.regra}`)
            );
}

        // Todas essas estruturas agora usam a mesma função
        ["bases", "ataques", "defesas", "tecnicas", "itens"]
            .forEach(tipo => {
                if (secao[tipo]) {
                    renderLista(container, secao[tipo]);
                }
            });

        if (secao.preparacao) {
            container.appendChild(
                criarParagrafo(`<strong>Preparação:</strong> ${secao.preparacao}`)
            );
        }

        if (secao.perguntas_respostas) {
            renderPerguntas(container, secao.perguntas_respostas);
        }

        if (secao.quiz_significados) {
            renderQuiz(container, secao.quiz_significados);
        }

    });
}
