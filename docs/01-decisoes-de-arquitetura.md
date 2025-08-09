# Registro de Decisões de Arquitetura (ADR) - vagner.pages

Este documento registra as principais decisões de arquitetura tomadas durante o desenvolvimento do projeto `vagner.pages`.

## 1. Adoção da Arquitetura SPA (Single Page Application)

* **Status:** Decidido
* **Data:** Agosto de 2025

### Contexto:
O projeto iniciou como um site de múltiplas páginas (MPA), onde cada link (Home, Sobre, Contato) carregava um novo arquivo HTML, causando um recarregamento completo da página e uma experiência de usuário lenta.

### Decisão:
Migrar a aplicação para uma arquitetura de Página Única (SPA) utilizando roteamento do lado do cliente (client-side routing) baseado em hash (`#`). Todo o conteúdo dinâmico é injetado no elemento `<main id="app">` do `index.html`.

### Justificativa:
* **Experiência do Usuário (UX):** Proporciona uma navegação instantânea e fluida, sem "piscar" a tela, similar à de um aplicativo nativo.
* **Performance:** Reduz a carga no servidor, já que apenas os "fragmentos" de conteúdo necessários são buscados com `fetch`, em vez da página inteira.
* **Centralização da Lógica:** Permite que toda a lógica de renderização e estado da aplicação seja gerenciada por JavaScript de forma centralizada.

---

## 2. Escolha do Backend: Firebase (Backend-as-a-Service)

* **Status:** Decidido
* **Data:** Agosto de 2025

### Contexto:
A primeira versão do projeto utilizava o `localStorage` do navegador para persistir os dados dos posts, o que limitava o acesso aos dados apenas àquele navegador e dispositivo específico.

### Decisão:
Adotar a plataforma Firebase como nosso Backend-as-a-Service (BaaS), utilizando especificamente os serviços de **Authentication**, **Firestore** e **Hosting**.

### Justificativa:
* **Persistência na Nuvem:** O Firestore permite que os dados sejam armazenados na nuvem, tornando-os acessíveis de qualquer lugar e dispositivo.
* **Ecossistema Integrado:** O Firebase oferece uma suíte completa de ferramentas (autenticação, banco de dados, hospedagem) que se integram perfeitamente, acelerando o desenvolvimento.
* **Escalabilidade e Segurança:** A infraestrutura do Google garante que a aplicação seja escalável e segura, com gerenciamento de regras de acesso granulares (via `firestore.rules`).
* **Alinhamento de Ferramentas:** A escolha está alinhada com o objetivo do projeto de priorizar soluções do ecossistema Google.

---

## 3. Escolha da Ferramenta de Build: Vite.js

* **Status:** Decidido
* **Data:** Agosto de 2025

### Contexto:
O ambiente de desenvolvimento inicial dependia da extensão "Live Server" do VS Code, que se mostrou instável e problemática, causando bugs de cache e injeção de scripts que corrompiam nossos componentes.

### Decisão:
Migrar todo o projeto para ser gerenciado e servido pelo **Vite.js**.

### Justificativa:
* **Performance do Dev Server:** O Vite oferece um servidor de desenvolvimento quase instantâneo (`npm run dev`) com Hot Module Replacement (HMR), que atualiza a página de forma inteligente sem recarregamentos completos.
* **Suporte Nativo a Módulos ES:** O Vite é construído sobre o sistema de módulos `import`/`export` do JavaScript moderno, o que elimina a necessidade de hacks e torna o código mais limpo.
* **Build para Produção:** O Vite inclui um processo de build (`npm run build`) que otimiza, minifica e empacota nosso código para produção, melhorando drasticamente a performance de carregamento para o usuário final. É uma ferramenta de nível profissional.

---

## 4. Gerenciamento de Segredos com Variáveis de Ambiente

* **Status:** Decidido
* **Data:** Agosto de 2025

### Contexto:
As chaves de API do Firebase estavam inicialmente armazenadas em um arquivo JavaScript (`firebase-keys.js`), que seria enviado para o repositório Git, representando um risco de segurança significativo.

### Decisão:
Adotar o padrão de **Variáveis de Ambiente** para gerenciar todos os segredos da aplicação.
1.  Para o desenvolvimento local, as chaves são armazenadas em um arquivo `.env`, que é listado no `.gitignore`.
2.  Para o ambiente de produção (CI/CD), as chaves são armazenadas como **GitHub Secrets**.

### Justificativa:
* **Segurança:** Esta é a prática de mercado padrão para evitar o vazamento de credenciais em repositórios de código. O código-fonte se torna agnóstico aos segredos.
* **Flexibilidade:** Permite a configuração de diferentes chaves para diferentes ambientes (desenvolvimento, produção, etc.) de forma simples e segura.