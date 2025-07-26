# CMS-VSA - ainda não tenho um bom nome para esse monstrinho 🤣

**Objetivos do Projeto:**
* Criar um CMS (Content Management System) funcional e minimalista.
* Aplicar boas práticas de segurança e design.

# vagner.pages

Bem-vindo ao repositório do **vagner.pages**, um projeto de blog e Sistema de Gerenciamento de Conteúdo (CMS - *Content Management System*) construído do zero como parte de um projeto de aprendizado.

O objetivo é criar um blog pessoal totalmente funcional, desde o código inicial (HTML, CSS, JavaScript) até a publicação com tecnologias modernas como o Firebase.

---

## ✨ Funcionalidades Atuais (MVP Local)

* **Criação de Posts:** Adicione novos posts através de uma área de administração.
* **Edição de Posts:** Edite o título e o conteúdo de posts existentes.
* **Exclusão de Posts:** Remova posts com uma confirmação de segurança.
* **Editor de Rich Text:** Use um editor WYSIWYG (*What You See Is What You Get*) para formatar o conteúdo com negrito, itálico, etc.
* **Suporte a Markdown:** Escreva em Markdown e o sistema converterá para HTML automaticamente.
* **Segurança:** O conteúdo HTML é sanitizado com DOMPurify para prevenir ataques de XSS.
* **Imagem de Destaque:** Adicione uma imagem principal para cada post.
* **Persistência Local:** Todos os dados são salvos diretamente no navegador usando a Web Storage API (`LocalStorage`).

---

## 🛠️ Tecnologias Utilizadas

* **Front-End:** HTML5, CSS3, JavaScript (ES6+)
* **Bibliotecas JS:**
    * `Quill.js`: Para o editor de Rich Text.
    * `marked.js`: Para a conversão de Markdown para HTML.
    * `DOMPurify`: Para a segurança do conteúdo.
* **Testes:** Jest
* **Ambiente de Desenvolvimento:** Firebase Studio

---

## 🚀 Próximos Passos (Roadmap)

O plano é evoluir este projeto para uma solução completa na nuvem.

- [ ] Migrar a autenticação e o banco de dados do `LocalStorage` para o **Firebase (Authentication & Firestore)**.
- [ ] Publicar o site com **Firebase Hosting**.
- [ ] Registrar e configurar um **domínio personalizado**.
- [ ] Implementar um **Design System** como o Material Design 3.
- [ ] Adicionar funcionalidades com **Inteligência Artificial** usando a API do Gemini.

Este é um projeto vivo! Sinta-se à vontade para explorar o código.