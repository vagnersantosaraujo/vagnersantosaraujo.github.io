# vagner.pages - Meu CMS Pessoal

Bem-vindo ao repositório do **vagner.pages**, um projeto de blog e Sistema de Gerenciamento de Conteúdo (CMS) construído do zero com HTML, CSS e JavaScript puro (módulos ES6+), e potencializado pelo ecossistema do Firebase e ferramentas de desenvolvimento modernas.

Este `README` serve como uma documentação central do projeto, explicando sua estrutura, as boas práticas aplicadas, como executá-lo e o roadmap completo da sua evolução.

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
    * `components/` - Fragmentos de HTML reutilizáveis.
    * `css/` - Arquivos de estilo.
    * `js/` - Módulos JavaScript.
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

## 🗺️ Roadmap do Projeto (Memória Viva)

**Legenda:** ✅=Concluído | 👉=Etapa Atual | 🅿️=Pausado/Adiado | 🕒=Planejado

* **✅ Fase 1: Fundação do Projeto (Aprendendo Fundamentos Web)**
    * ✅ 1.1. Ambiente de Desenvolvimento: Instalação do VS Code e extensões essenciais.
    * ✅ 1.2. Estrutura e Semântica (HTML): Criação do `index.html` e `admin.html` com tags semânticas.
    * ✅ 1.3. Estilização Inicial (CSS): Criação do `style.css` com a estrutura básica de layout.

* **✅ Fase 2: Construção do MVP Local (Aprendendo JavaScript Essencial)**
    * ✅ 2.1. Conteúdo Dinâmico: Leitura de dados de um objeto JavaScript.
    * ✅ 2.2. Funcionalidade de Adicionar Posts (CRUD - Create).
    * ✅ 2.3. Persistência de Dados: Uso da Web Storage API (`localStorage`).
    * ✅ 2.4. Funcionalidade de Editar e Excluir (CRUD - Update/Delete).
    * ✅ 2.5. Melhoria da Experiência de Edição (UX/UI): Introdução do editor Rich Text.
    * ✅ 2.6. Segurança Front-End: Introdução ao DOMPurify para prevenir ataques de XSS.

* **✅ Fase 3: Migração para Backend-as-a-Service (Aprendendo Firebase)**
    * ✅ 3.1. Setup e Configuração: Criação do projeto no Firebase.
    * ✅ 3.2. Autenticação: Implementação do Login com Google.
    * ✅ 3.3. Banco de Dados: Migração do `localStorage` para o Firestore.
    * ✅ 3.4. Publicação: Primeiro deploy manual no Firebase Hosting.

* **✅ Fase 4: Refinamento Visual e de UX (Aprendendo Design System)**
    * ✅ 4.1. Estudo e Estratégia: Definição de tokens de design (cores, fontes, espaçamento) inspirados no Material Design 3.
    * ✅ 4.2. Implementação do Design System: Tradução dos tokens para variáveis CSS.
    * ✅ 4.3. Componentes e Páginas: Aplicação do Design System na UI.

* **✅ Fase 5: A Revolução da Arquitetura (Aprendendo sobre SPAs)**
    * ✅ 5.1. Fundamentos da SPA: Estudo do conceito de Single Page Application.
    * ✅ 5.2. Implementação: Refatoração para uma arquitetura SPA com roteamento baseado em hash.

* **✅ Fase 5.5: Upgrade Estrutural (Aprendendo Vite e Boas Práticas)**
    * ✅ 5.5.1. Substituição do Live Server pelo **Vite** como servidor de desenvolvimento e build tool.
    * ✅ 5.5.2. Refatoração completa do código para o padrão de **Módulos ES (`import`/`export`)**, resolvendo a cadeia de dependências.
    * ✅ 5.5.3. Implementação de **Delegação de Eventos** com `data-attributes` para os botões de ação.
    * ✅ 5.5.4. Implementação de **gerenciamento de segredos** com variáveis de ambiente (`.env`).
    * ✅ 5.5.5. Reestruturação do projeto para o padrão de mercado com a pasta `/src`.
    * ✅ 5.5.6. Correção de todos os caminhos de arquivos (`assets`, `components`, `pages`) para funcionar no ambiente de produção.
    * ✅ 5.5.7. Resolução do problema de legibilidade do editor de texto no modo escuro através da substituição do **EasyMDE pelo Toast UI Editor** e implementação de uma solução de tema customizada.

* **✅ Fase 9: Publicação Profissional e DevOps (Aprendendo CI/CD)**
    * ✅ 9.1. Domínio e Deploy Inicial
        * ✅ 9.1.1. Conexão do domínio personalizado `vagner.page`.
        * ✅ 9.1.2. Configuração dos registros DNS (A, CNAME, TXT) no provedor.
        * ✅ 9.1.3. Verificação e correção da configuração de deploy (`firebase.json`) para apontar para a pasta `dist` e incluir regras de `rewrite` para a SPA.
        * ✅ 9.1.4. Depuração de problemas pós-deploy (login, caminhos de assets).
    * ✅ 9.2. CI/CD: Configuração do Deploy Automatizado
        * ✅ 9.2.1. Inicialização do workflow do GitHub Actions com `firebase init hosting:github`.
        * ✅ 9.2.2. Depuração de falhas de permissão (Token de Acesso Pessoal sem o escopo `workflow`).
        * ✅ 9.2.3. Configuração dos **GitHub Secrets** para as chaves de API do Firebase (`VITE_...`).
        * ✅ 9.2.4. Criação e configuração manual de uma **Conta de Serviço (Service Account)** no Google Cloud para autenticação segura do CI/CD.
        * ✅ 9.2.5. Atualização do arquivo `.github/workflows/firebase-hosting-merge.yml` para usar os segredos no build e a autenticação correta no deploy.

* **👉 Fase 6: Funcionalidades Avançadas de Conteúdo (Aprendendo Taxonomia e SEO)**
    * 👉 6.1. Taxonomia: Implementar sistema de Categorias e Tags nos posts.
        * 🕒 6.1.1. Adicionar campos `category` e `tags` ao modelo de dados no Firestore.
        * 🕒 6.1.2. Atualizar o formulário de Admin para incluir inputs para categoria e tags.
        * 🕒 6.1.3. Exibir a categoria e as tags na página do post e nos cards da home.
    * 🕒 6.2. Busca: Criar uma função de busca de posts no blog.
    * 🕒 6.3. SEO: Adicionar campos de SEO (meta description, keywords) no formulário.

* **🕒 Fase 7: Backend Próprio e Segurança Avançada (Aprendendo Cloud Functions)**
    * 🕒 7.1. Backend Serverless: Criação de Cloud Functions para lógica de backend.
    * 🕒 7.2. Armazenamento de Arquivos: Implementação do Cloud Storage para upload de imagens (substituindo o Base64).
    * 🕒 7.3. Segurança: Refinamento das regras do Firestore.

* **🕒 Fase 8: Engajamento e Inteligência Artificial (Aprendendo APIs)**
    * 🕒 8.1. Comunidade: Implementar um sistema de comentários nos posts.
    * 🕒 8.2. IA: Integrar a API do Gemini para a funcionalidade "Sugerir Título com IA".

* **🅿️ Fase 10: Qualidade e Otimização (Pausado)**
    * 🅿️ 10.1. Validação de Código: Configuração de ferramentas como ESLint/Prettier.
    * 🕒 10.2. Performance
        * 🕒 10.2.1. Implementar **"Code Splitting"** para resolver o aviso "chunks are larger than 500 kB".
    * 🕒 10.3. Ambiente de Dev
        * 🕒 10.3.1. Implementar versionamento semântico e exibir a versão da app na UI.
        * 🕒 10.3.2. Adotar e manter o padrão **Conventional Commits** para o histórico do Git.
    * 🕒 10.4. Infraestrutura como Código
        * 🕒 10.4.1. Sincronizar os índices do Firestore usando o arquivo `firestore.indexes.json`.
    * 🕒 10.5. Configuração de Ambientes (Dev/Prod)
        * 🕒 10.5.1. Criar um segundo projeto Firebase para desenvolvimento.
        * 🕒 10.5.2. Configurar a WebApp para alternar entre ambientes.