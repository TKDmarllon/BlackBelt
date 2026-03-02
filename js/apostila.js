function mostrarFaixa(id) {
    document.querySelectorAll(".faixa").forEach(f => f.classList.add("hidden"));

    const elementoAlvo = document.getElementById(id);

    if (elementoAlvo) {
        elementoAlvo.classList.remove("hidden");
        elementoAlvo.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

function ativarQuizSignificado() {

    const perguntas = document.querySelectorAll(".quiz-significado .pergunta");

    perguntas.forEach(pergunta => {

        const respostaCorreta = pergunta.dataset.resposta.trim();
        const botoes = pergunta.querySelectorAll("button");

        botoes.forEach(botao => {

            botao.addEventListener("click", function () {

                // trava todos os botões da pergunta
                botoes.forEach(b => {
                    b.disabled = true;
                    b.classList.remove("resultado-correto", "resultado-erro");
                });

                if (botao.innerText.trim() === respostaCorreta) {
                    botao.classList.add("resultado-correto");
                } else {
                    botao.classList.add("resultado-erro");

                    // marca o correto automaticamente
                    botoes.forEach(b => {
                        if (b.innerText.trim() === respostaCorreta) {
                            b.classList.add("resultado-correto");
                        }
                    });
                }

            });

        });

    });
}

function carregarOpcoesSignificado(opcoes, correta) {
    const div = document.getElementById("opcoesSignificado");
    if (!div) return;

    div.innerHTML = "";

    const opcoesEmbaralhadas = embaralhar([...opcoes]);

    opcoesEmbaralhadas.forEach(opcao => {
        const btn = document.createElement("button");
        btn.innerText = opcao;

        btn.addEventListener("click", function () {

            const grupo = div.querySelectorAll("button");

            grupo.forEach(b => {
                b.disabled = true;
                b.classList.remove("resultado-correto", "resultado-erro");
            });

            if (opcao === correta) {
                btn.classList.add("resultado-correto");
            } else {
                btn.classList.add("resultado-erro");

                grupo.forEach(b => {
                    if (b.innerText === correta) {
                        b.classList.add("resultado-correto");
                    }
                });
            }
        });

        div.appendChild(btn);
    });
}
