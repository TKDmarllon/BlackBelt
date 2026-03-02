function salvarStorage() {
    localStorage.setItem("tecnicas", JSON.stringify(tecnicas));
}

function carregarTecnicasIniciais() {
    const storage = localStorage.getItem("tecnicas");

    if (storage) {
        tecnicas = JSON.parse(storage);
        iniciarSistema();
    } else {
        fetch("data/tecnicas.json")
            .then(r => r.json())
            .then(data => {
                tecnicas = data;
                salvarStorage();
                iniciarSistema();
            });
    }
}

function cadastrarTecnica() {

    const imagem = document.getElementById("imagemInput").value;
    const resposta = document.getElementById("respostaInput").value.trim().split(" ");
    const erradas = document.getElementById("erradasInput").value
        .split(",")
        .map(p => p.trim())
        .filter(p => p !== "");

    if (!imagem || resposta.length === 0) {
        alert("Preencha imagem e resposta.");
        return;
    }

    tecnicas.push({ resposta, imagem, erradas });
    salvarStorage();

    document.getElementById("imagemInput").value = "";
    document.getElementById("respostaInput").value = "";
    document.getElementById("erradasInput").value = "";

    iniciarSistema();
}

function excluirTecnica(index) {
    tecnicas.splice(index, 1);
    salvarStorage();
    iniciarSistema();
}

function listarTecnicas() {
    const lista = document.getElementById("listaTecnicas");
    if (!lista) return;

    lista.innerHTML = "";

    tecnicas.forEach((t, i) => {
        const div = document.createElement("div");
        div.className = "tecnica-item";
        div.innerHTML = `
            ${t.resposta.join(" ")}
            <button onclick="excluirTecnica(${i})">Excluir</button>
        `;
        lista.appendChild(div);
    });
}

function exportarTecnicas() {
    const blob = new Blob([JSON.stringify(tecnicas, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "tecnicas-taekwondo.json";
    a.click();
}

function ativarImportacao() {
    const input = document.getElementById("importFile");
    if (!input) return;

    input.addEventListener("change", function(e) {

        if (!e.target.files || e.target.files.length === 0) {
            console.log("Nenhum arquivo selecionado");
            return;
        }

        const file = e.target.files[0];

        if (!(file instanceof Blob)) {
            console.log("Arquivo inválido");
            return;
        }

        const reader = new FileReader();

        reader.onload = function(event) {
            try {
                const dados = JSON.parse(event.target.result);
                tecnicas = dados;
                salvarStorage();
                iniciarSistema();
                alert("Importação realizada com sucesso!");
            } catch (erro) {
                alert("JSON inválido.");
                console.error(erro);
            }
        };

        reader.readAsText(file);
    });
}

function resetarBanco() {
    if (!confirm("Tem certeza que deseja apagar os dados locais e recarregar o banco original?")) return;
    localStorage.clear();
    alert("Banco de dados resetado com sucesso!");
    location.reload();
}
