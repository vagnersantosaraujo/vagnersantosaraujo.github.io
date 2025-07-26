// Este script só roda na página post.html

document.addEventListener('DOMContentLoaded', function() {
    // 1. Pega os parâmetros da URL
    const params = new URLSearchParams(window.location.search);
    const postId = parseInt(params.get('id'), 10); // Converte o ID para número

    // 2. ✨ ALTERAÇÃO CRÍTICA: Busca os posts do LocalStorage ✨
    const currentPosts = JSON.parse(localStorage.getItem('posts')) || [];

    // 3. Procura no nosso array 'currentPosts' pelo post que tenha o ID correspondente.
    const post = currentPosts.find(p => p.id === postId);

    // 4. Seleciona o <main> da página para colocar o conteúdo.
    const mainContent = document.querySelector('main.container');

    // 5. Verifica se o post foi encontrado
    if (post) {
        document.title = `${post.title} | VSA.BLOG`;
        // ... (formatação de data) ...
        
        // ✨ LÓGICA NOVA AQUI ✨
        const imageHtml = post.featuredImage 
            ? `<img src="${post.featuredImage}" alt="Imagem de destaque para o post ${post.title}" class="post-full-image">`
            : '';

        mainContent.innerHTML = `
            <article class="post-full">
                ${imageHtml}
                <h1>${post.title}</h1>
                <p class="post-meta"><em>Por ${post.author} em ${post.date}</em></p>
                <div>${post.contentHtml}</div>
            </article>
        `;
    } else {
        // Se o ID não corresponde a nenhum post, mostra uma mensagem de erro.
        mainContent.innerHTML = '<h1>Ops! Post não encontrado.</h1>';
    }
});