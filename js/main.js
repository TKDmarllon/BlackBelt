let tecnicas = [];
let tecnicasEmbaralhadas = [];
let tecnicaAtualIndex = 0;
let respostaMontada = [];

function trocarTela(id) {
    const tela = document.getElementById(id);
    if (!tela || !tela.classList.contains("tela")) return;

    document.querySelectorAll(".tela").forEach(item => item.classList.add("hidden"));
    tela.classList.remove("hidden");

    document.querySelectorAll(".menuInferior [data-tela]").forEach(botao => {
        if (botao.dataset.tela === id) botao.setAttribute("aria-current", "page");
        else botao.removeAttribute("aria-current");
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
}

function toggleLista() {
    const lista = document.getElementById("listaContainer");
    const botao = document.querySelector(".toggle-btn");
    if (!lista || !botao) return;
    const vaiAbrir = lista.classList.contains("hidden");
    lista.classList.toggle("hidden", !vaiAbrir);
    botao.setAttribute("aria-expanded", String(vaiAbrir));
    botao.textContent = vaiAbrir ? "Ocultar técnicas cadastradas" : "Mostrar técnicas cadastradas";
}

document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".menuInferior [data-tela]").forEach(botao => {
        botao.addEventListener("click", () => trocarTela(botao.dataset.tela));
    });
    trocarTela("telaInicial");
    ativarImportacao();
    carregarTecnicasIniciais();
    carregarApostila();
});
