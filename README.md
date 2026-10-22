# 🥋 Equipe Black Belt

Página estática de apoio aos alunos da equipe Black Belt. Reúne um jogo para praticar nomes de técnicas, conteúdo por graduação, links para vídeos de poomsae e ferramentas locais para administrar o banco de técnicas.

## Áreas da página

- **Início:** atalhos para as atividades de estudo.
- **Jogo:** identifica técnicas por imagem e monta os nomes com palavras selecionáveis.
- **Apostila:** mostra o conteúdo disponível em `data/apostila.json`, organizado pelas graduações cadastradas no arquivo.
- **Poomsae:** reproduz os vídeos incorporados na página, a partir do trecho definido para cada faixa.
- **Sebon/Dubon:** área informativa, aguardando a publicação das gravações.
- **Administração:** importa, exporta, cadastra e remove técnicas no dispositivo atual.

## Executar localmente

Como a página carrega arquivos JSON com `fetch`, abra o projeto por um servidor web local ou publique-o em uma hospedagem estática, como GitHub Pages. Abrir `index.html` diretamente (`file://`) é bloqueado pelo navegador.

No terminal, dentro da pasta do projeto, inicie o servidor local:

```powershell
py -m http.server 8000
```

Depois, abra <http://localhost:8000>. No VS Code, também é possível usar a extensão Live Server e escolher **Open with Live Server** no `index.html`.

## Dados e privacidade

O catálogo inicial de técnicas vem de `data/tecnicas.json`. Após o primeiro carregamento, o catálogo e as alterações administrativas são armazenados no `localStorage` do navegador. Esses dados pertencem ao perfil e ao dispositivo em uso; exporte um arquivo JSON para transferi-los ou guardar uma cópia.

O conteúdo da apostila é carregado de `data/apostila.json`. O site não usa servidor de aplicação nem banco de dados remoto. Imagens e vídeos podem depender de serviços externos e de conexão com a internet.

## Estrutura

```text
index.html          Interface e navegação
css/style.css       Layout responsivo e estilos
js/main.js          Inicialização e troca de telas
js/utils.js         Funções compartilhadas
js/jogo.js          Lógica do jogo de técnicas
js/apostila.js      Carregamento e apresentação da apostila
js/admin.js         Armazenamento e ferramentas administrativas
data/tecnicas.json  Catálogo inicial do jogo
data/apostila.json  Conteúdo por graduação
assets/images/      Imagens locais publicadas com o site
```
