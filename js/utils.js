function embaralhar(array) {
    return array.sort(() => Math.random() - 0.5);
}

function abrirPoomsae(segundos) {
    window.open(
        `https://www.youtube.com/watch?v=y-pmLZmjoG8&t=${segundos}s`,
        "_blank"
    );
}

function ativarAcordeao() {
    document.querySelectorAll(".acordeao").forEach(botao => {
        botao.addEventListener("click", function () {
            this.classList.toggle("ativo");
            const painel = this.nextElementSibling;

            if (painel.style.display === "block") {
                painel.style.display = "none";
            } else {
                painel.style.display = "block";
                painel.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
}