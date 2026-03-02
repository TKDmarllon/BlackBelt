# 🥋 Black Belt – Sistema de Estudo para Taekwondo

Sistema web interativo desenvolvido para auxiliar alunos da Equipe Black Belt no estudo técnico, teórico e prático do Taekwondo.

Projeto desenvolvido com foco em:

- 📱 Mobile First
- 💾 Armazenamento local (localStorage)
- 🎯 Aprendizado gamificado
- 🥋 Organização por faixa (GUB)

---

# 📑 Estrutura do Sistema (Organizado por Abas)

---

## 🎮 Aba: Jogo

Sistema principal de quiz visual.

### Funcionamento:

- Exibe imagem da técnica
- Mostra palavras embaralhadas
- Usuário monta o nome correto
- Botões:
  - ✅ Verificar resposta
  - 🔙 Apagar última palavra
  - ⏭ Pular técnica
- Feedback visual:
  - Verde = correto
  - Vermelho = errado
- Técnicas são embaralhadas automaticamente

---

## 🥋 Aba: Poomsae

Área dedicada ao estudo das formas.

### Funcionalidades:

- Lista de poomsae por faixa
- Redirecionamento para vídeos no YouTube
- Abertura com minutagem específica
- Não utiliza iframe (evita erro 153)
- Funciona via link direto

---

## 📖 Aba: Apostila Black Belt

Área teórica organizada por faixa (GUB).

### Estrutura:

- Botões por faixa:
  - 10º ao 1º GUB
- Sistema tipo sanfona (accordion)
- Exibição individual de conteúdo

### Conteúdo por faixa:

- Kibon Dong Jak
- Bal Ki Sul
- Poomsae (apenas nome)
- Matcho Kyorugui (texto)
- Iron (mini quiz interativo)
- Diga o significado (múltipla escolha com correção automática)
- Kyorugui (texto)
- Kyok Pa (texto)

### Recursos interativos:

- Botão "Mostrar resposta" no Iron
- Select com validação:
  - Verde quando acerta
  - Vermelho quando erra

---

## ⚙️ Aba: Administração

Controle do banco local de técnicas.

### Funcionalidades:

- 📤 Exportar técnicas (gera arquivo `.json`)
- 📥 Importar técnicas (`.json`)
- ♻ Resetar banco (limpa `localStorage`)
- Controle total sem backend

- Cadastro

Permite cadastrar novas técnicas manualmente.

### Funcionalidades:

- Inserir:
  - Nome correto da técnica
  - Link da imagem
  - Alternativas erradas
- Salvar no `localStorage`
- Listar técnicas cadastradas
- Excluir técnicas individualmente
- Mostrar / ocultar lista
- Sistema de persistência local

---

# 💾 Armazenamento de Dados

- Utiliza `localStorage`
- Pode importar/exportar JSON
- Não utiliza banco externo
- Funciona 100% offline após carregado

---

# 📱 Design

- Layout Mobile First
- Navegação tipo aplicativo
- Sistema de troca de telas via JavaScript
- Scroll automático ao trocar de aba
- Interface limpa e focada em celular

---

# 🛠 Tecnologias Utilizadas

- HTML5  
- CSS3  
- JavaScript (Vanilla JS)  
- GitHub Pages (hospedagem estática)

---

# 📂 Estrutura do Projeto
