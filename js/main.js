let tecnicas = [];
let tecnicasEmbaralhadas = [];
let tecnicaAtualIndex = 0;
let respostaMontada = [];

document.addEventListener("DOMContentLoaded", function() {
    carregarTecnicasIniciais();
});

function trocarTela(id) {
    document.querySelectorAll(".tela").forEach(t => t.classList.add("hidden"));
    document.getElementById(id).classList.remove("hidden");
    window.scrollTo(0, 0);
}

function toggleLista() {
    document.getElementById("listaContainer").classList.toggle("hidden");
}


document.addEventListener("DOMContentLoaded", function () {
    ativarAcordeao();
    ativarImportacao();
    ativarQuizSignificado();
    carregarTecnicasIniciais();
});
