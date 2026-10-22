const STORAGE_KEY_TECNICAS = "tecnicas";

function validarTecnicas(dados) {
    return Array.isArray(dados) && dados.every(item =>
        item && typeof item === "object" &&
        Array.isArray(item.resposta) && item.resposta.length > 0 &&
        item.resposta.every(palavra => typeof palavra === "string" && palavra.trim()) &&
        typeof item.imagem === "string" && item.imagem.trim() &&
        Array.isArray(item.erradas) && item.erradas.every(palavra => typeof palavra === "string")
    );
}

function salvarStorage() {
    try {
        localStorage.setItem(STORAGE_KEY_TECNICAS, JSON.stringify(tecnicas));
        return true;
    } catch (erro) {
        alert("Não foi possível salvar neste dispositivo. Verifique o espaço disponível e as permissões do navegador.");
        console.error("Falha ao salvar técnicas:", erro);
        return false;
    }
}

async function carregarTecnicasIniciais() {
    const estado = document.getElementById("estadoJogo");
    try {
        const storage = localStorage.getItem(STORAGE_KEY_TECNICAS);
        if (storage !== null) {
            const dados = JSON.parse(storage);
            if (!validarTecnicas(dados)) throw new Error("Os dados locais têm um formato inválido.");
            tecnicas = dados;
        } else {
            const resposta = await fetch("data/tecnicas.json");
            if (!resposta.ok) throw new Error(`Falha ao carregar técnicas (${resposta.status}).`);
            const dados = await resposta.json();
            if (!validarTecnicas(dados)) throw new Error("O arquivo de técnicas tem um formato inválido.");
            tecnicas = dados;
            salvarStorage();
        }
        iniciarSistema();
        if (!tecnicas.length && estado) estado.textContent = "Ainda não há técnicas cadastradas. Adicione-as na área Administração.";
    } catch (erro) {
        console.error("Erro ao carregar técnicas:", erro);
        if (estado) estado.textContent = `${erro.message} Você pode importar um arquivo válido na área Administração.`;
    }
}

function cadastrarTecnica() {
    const imagemCampo = document.getElementById("imagemInput");
    const respostaCampo = document.getElementById("respostaInput");
    const erradasCampo = document.getElementById("erradasInput");
    const imagem = imagemCampo.value.trim();
    const resposta = respostaCampo.value.trim().split(/\s+/).filter(Boolean);
    const erradas = erradasCampo.value.split(",").map(palavra => palavra.trim()).filter(Boolean);

    let url;
    try { url = new URL(imagem); } catch { url = null; }
    if (!url || !["http:", "https:"].includes(url.protocol)) {
        alert("Informe um link de imagem válido, começando com http:// ou https://.");
        imagemCampo.focus();
        return;
    }
    if (!resposta.length) {
        alert("Informe o nome correto da técnica.");
        respostaCampo.focus();
        return;
    }

    tecnicas.push({ resposta, imagem: url.href, erradas });
    if (!salvarStorage()) { tecnicas.pop(); return; }
    imagemCampo.value = "";
    respostaCampo.value = "";
    erradasCampo.value = "";
    iniciarSistema();
}

function excluirTecnica(index) {
    if (!Number.isInteger(index) || index < 0 || index >= tecnicas.length) return;
    const [removida] = tecnicas.splice(index, 1);
    if (!salvarStorage()) { tecnicas.splice(index, 0, removida); return; }
    iniciarSistema();
}

function listarTecnicas() {
    const lista = document.getElementById("listaTecnicas");
    if (!lista) return;
    lista.replaceChildren();

    if (!tecnicas.length) {
        const vazio = document.createElement("p");
        vazio.textContent = "Nenhuma técnica cadastrada.";
        lista.appendChild(vazio);
        return;
    }

    tecnicas.forEach((tecnica, indice) => {
        const item = document.createElement("div");
        item.className = "tecnica-item";
        const nome = document.createElement("span");
        nome.textContent = tecnica.resposta.join(" ");
        const excluir = document.createElement("button");
        excluir.type = "button";
        excluir.textContent = "Excluir";
        excluir.setAttribute("aria-label", `Excluir ${tecnica.resposta.join(" ")}`);
        excluir.addEventListener("click", () => excluirTecnica(indice));
        item.append(nome, excluir);
        lista.appendChild(item);
    });
}

function exportarTecnicas() {
    if (!tecnicas.length) {
        alert("Não há técnicas para exportar.");
        return;
    }
    const blob = new Blob([JSON.stringify(tecnicas, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "tecnicas-taekwondo.json";
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function ativarImportacao() {
    const input = document.getElementById("importFile");
    if (!input) return;
    input.addEventListener("change", async () => {
        const arquivo = input.files?.[0];
        if (!arquivo) return;
        try {
            const dados = JSON.parse(await arquivo.text());
            if (!validarTecnicas(dados)) throw new Error("O arquivo precisa conter uma lista de técnicas com resposta, imagem e alternativas.");
            const anteriores = tecnicas;
            tecnicas = dados;
            if (!salvarStorage()) { tecnicas = anteriores; return; }
            iniciarSistema();
            alert(`Importação concluída: ${tecnicas.length} técnica(s).`);
        } catch (erro) {
            alert(erro instanceof SyntaxError ? "O arquivo não contém um JSON válido." : erro.message);
        } finally {
            input.value = "";
        }
    });
}

function resetarBanco() {
    if (!confirm("Tem certeza que deseja apagar as técnicas salvas neste dispositivo e restaurar o arquivo original?")) return;
    try {
        localStorage.removeItem(STORAGE_KEY_TECNICAS);
        location.reload();
    } catch (erro) {
        alert("Não foi possível limpar as técnicas salvas neste navegador.");
        console.error("Falha ao limpar técnicas:", erro);
    }
}
