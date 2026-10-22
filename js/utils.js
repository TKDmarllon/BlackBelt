function embaralhar(array) {
    const resultado = [...array];
    for (let i = resultado.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [resultado[i], resultado[j]] = [resultado[j], resultado[i]];
    }
    return resultado;
}

function reproduzirPoomsae(segundos, nome, opcao) {
    const inicio = Number(segundos);
    if (!Number.isFinite(inicio) || inicio < 0) return;
    const player = document.getElementById("videoPoomsae");
    const aviso = document.getElementById("avisoVideoPoomsae");
    const titulo = document.getElementById("tituloVideoPoomsae");
    if (!player) return;

    if (opcao?.parentElement?.classList.contains("poomsae-grid")) {
        document.querySelectorAll(".poomsae-grid button").forEach(botao => botao.removeAttribute("aria-current"));
        opcao.setAttribute("aria-current", "true");
        opcao.after(player.closest(".player-poomsae"));
    }

    titulo.textContent = nome || "Vídeo do poomsae";
    aviso.hidden = true;
    player.title = `Vídeo de Taekwondo: ${nome || "Poomsae"}`;
    player.src = `https://www.youtube-nocookie.com/embed/y-pmLZmjoG8?start=${Math.floor(inicio)}&autoplay=1`;
    player.hidden = false;
    player.scrollIntoView({ behavior: "smooth", block: "center" });
}
