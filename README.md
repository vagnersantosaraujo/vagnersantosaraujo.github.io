# vagner.pages - Meu CMS Pessoal

Bem-vindo ao repositório do **vagner.pages**, um projeto de blog e Sistema de Gerenciamento de Conteúdo (CMS) construído do zero com HTML, CSS e JavaScript puro (módulos ES6+), e potencializado pelo ecossistema do Firebase e ferramentas de desenvolvimento modernas.

Este `README` serve como uma documentação central do projeto, explicando sua estrutura, as boas práticas aplicadas e como executá-lo.

## 🚀 Como Rodar o Projeto Localmente

1.  Clone este repositório.
2.  Certifique-se de ter o [Node.js](https://nodejs.org/) (versão LTS) instalado.
3.  Crie um arquivo `.env` na raiz do projeto, usando o `.env.example` como modelo para preencher suas chaves do Firebase.
4.  Abra o terminal na pasta do projeto e instale as dependências:
    ```bash
    npm install
    ```
5.  Inicie o servidor de desenvolvimento do Vite:
    ```bash
    npm run dev
    ```
6.  Abra a URL `http://localhost:5173` (ou a que for indicada no seu terminal) no navegador.

## ⚙️ Configurando o Deploy Automático (CI/CD)

O deploy para o Firebase Hosting é automatizado via GitHub Actions. Para replicar este projeto, a seguinte configuração de segredos no repositório do GitHub é necessária:

1.  **Chaves da Aplicação:** Crie "Repository secrets" na aba "Settings" > "Secrets and variables" > "Actions" para cada uma das variáveis presentes no arquivo `.env.example` (ex: `VITE_API_KEY`).
2.  **Autenticação do Firebase:** É necessário criar uma **Conta de Serviço (Service Account)** no Google Cloud Console com o papel de "Administrador do Firebase Hosting".
    * Gere uma chave JSON para esta conta.
    * Copie o conteúdo completo do arquivo JSON.
    * Crie um novo "Repository secret" com o nome `FIREBASE_SERVICE_ACCOUNT_[SEU_PROJECT_ID]` e cole o conteúdo do JSON como seu valor.

## 📂 Estrutura do Projeto

A estrutura do projeto separa claramente as configurações do código-fonte da aplicação (`src`).

* `.github/` - Contém os arquivos de workflow do GitHub Actions para CI/CD.
* `.env` - Armazena variáveis de ambiente e segredos (local, não versionado).
* `index.html` - O ponto de entrada principal (a "casca") da nossa SPA.
* `package.json` - Define as dependências e scripts do projeto.
* `public/` - Contém assets estáticos que são servidos diretamente, como o `favicon.svg`.
* `src/` - **Contém todo o código-fonte da aplicação.**
    * `assets/` - Recursos como o sprite de ícones SVG.
    * `components/` - Fragmentos de HTML reutilizáveis (`header.html`, `footer.html`).
    * `css/` - Arquivos de estilo (`style.css`).
    * `js/` - Módulos JavaScript da aplicação.
    * `pages/` - Fragmentos de HTML para cada "página" da SPA.

## ✨ Funcionalidades

* **Autenticação Segura:** Login com o Google através do Firebase Authentication.
* **Banco de Dados na Nuvem:** Todos os posts são armazenados e lidos do Firestore.
* **Arquitetura SPA:** Navegação rápida e fluida sem recarregar a página.
* **CRUD Completo:** Crie, Leia, Atualize e Exclua posts em uma área administrativa protegida.
* **Editor Markdown:** Escreva posts usando um editor moderno (Toast UI) que salva em Markdown.
* **Renderização Segura:** O conteúdo é convertido de Markdown para HTML e sanitizado para prevenir ataques de XSS.
* **Publicação Profissional:** Deploy automatizado com GitHub Actions para o Firebase Hosting.

## 📘 Guia de Boas Práticas Aplicadas

Este projeto foi construído seguindo uma série de boas práticas do mercado para garantir um código limpo, seguro e de fácil manutenção.

* **Centralização do Código-Fonte (`src`):** Todo o código da aplicação reside na pasta `/src`. ([Vite: A Pasta `src`](https://vitejs.dev/guide/#scaffolding-your-first-vite-project))
* **Gerenciamento de Segredos (`.env` e GitHub Secrets):** Chaves de API são armazenadas em um arquivo `.env` local e passadas para o ambiente de CI/CD através de GitHub Secrets. ([Vite: Variáveis de Ambiente e Modos](https://vitejs.dev/guide/env-and-mode.html))
* **HTML Semântico:** Uso de tags como `<header>`, `<main>`, `<footer>` para Acessibilidade e SEO. ([MDN: Elementos semânticos](https://developer.mozilla.org/pt-BR/docs/Glossary/Semantics#semantics_in_html))
* **CSS Moderno (Design Tokens):** Uso de variáveis CSS (`:root`) para um sistema de design consistente. ([MDN: Usando variáveis CSS](https://developer.mozilla.org/pt-BR/docs/Web/CSS/Using_CSS_custom_properties))
* **JavaScript Modular (ESM):** Uso de `import`/`export` para um código desacoplado. ([MDN: Módulos JavaScript](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Guide/Modules))
* **Arquitetura SPA (*Single Page Application*):** Para uma experiência de usuário rápida. ([MDN: Single-page application](https://developer.mozilla.org/pt-BR/docs/Glossary/SPA))
* **Segurança no Front-End (Sanitização):** Uso de **DOMPurify** para prevenir ataques de **XSS**. ([OWASP: Prevenção de XSS](https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html))
* **Gerenciamento de Dependências (NPM):** Bibliotecas externas gerenciadas via `package.json`. ([npm Docs: About npm](https://docs.npmjs.com/about-npm))
* **Histórico de Commits Semântico:** Adoção do padrão **Conventional Commits**. ([Conventional Commits](https://www.conventionalcommits.org/))

## 🎯 Próximos Passos

O plano é continuar evoluindo o projeto com foco em design e funcionalidades avançadas.

-   ✅ Migrar do `LocalStorage` para o **Firebase**.
-   ✅ Publicar o site com **Firebase Hosting**.
-   ✅ Implementar um **Design System** (Material Design 3).
-   ✅ Configurar **Deploy Automatizado (CI/CD)**.
-   [ ] Implementar **Taxonomia** (Categorias e Tags).
-   [ ] Configurar um **domínio personalizado** (ajuste fino).
-   [ ] Adicionar funcionalidades com **Inteligência Artificial** usando a API do Gemini.