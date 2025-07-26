const postsContainer = document.querySelector('#posts-container');

// Função para renderizar os posts na tela
// script.js

function renderPosts(postsArray) {
    postsContainer.innerHTML = '';
    
    const validPosts = postsArray.filter(p => p && p.title && typeof p.contentHtml !== 'undefined');

    const postsHTML = validPosts.slice().reverse().map(post => {
        // ✨ LÓGICA NOVA AQUI ✨
        // Cria o HTML da imagem APENAS se post.featuredImage tiver algum conteúdo.
        const imageHtml = post.featuredImage 
            ? `<img src="${post.featuredImage}" alt="Imagem de destaque para o post ${post.title}" class="post-card-image">`
            : ''; // Se não tiver imagem, retorna uma string vazia.

        const summary = post.contentHtml.length > 200 
            ? post.contentHtml.substring(0, 200) + '...'
            : post.contentHtml;

        return `
            <article class="post">
                ${imageHtml}
                <div class="post-content-wrapper">
                    <h2><a href="post.html?id=${post.id}">${post.title}</a></h2>
                    <p class="post-date"><em>Por ${post.author} em ${post.date}</em></p>
                    <div>${summary}</div> 
                    <a href="post.html?id=${post.id}" class="read-more">Leia mais...</a>
                </div>
                <div class="post-actions">
                    <button class="btn btn-edit" data-post-id="${post.id}">Editar ✏️</button>
                    <button class="btn btn-delete" data-post-id="${post.id}">Excluir 🗑️</button>
                </div>
            </article>
        `;
    }).join('');

    postsContainer.innerHTML = postsHTML;
}

// ------ LÓGICA PRINCIPAL ------

// 1. Carrega os posts do LocalStorage ou usa o array padrão.
let currentPosts = JSON.parse(localStorage.getItem('posts')) || posts;

// ------ ✨ NOVA SEÇÃO: LÓGICA DE MIGRAÇÃO DE DADOS ✨ ------
// Esta parte vai garantir que todos os posts antigos sejam atualizados para o novo formato.
let needsUpdate = false;
currentPosts.forEach(post => {
    // Se o post tem a propriedade 'content' mas não tem 'contentHtml', é um post antigo.
    if (post.content && typeof post.contentHtml === 'undefined') {
        console.log(`Migrando post antigo: "${post.title}"`);
        post.contentHtml = post.content; // O conteúdo antigo vira o novo HTML
        post.contentMarkdown = ''; // Um placeholder
        delete post.content; // Remove a propriedade antiga para limpar
        needsUpdate = true;
    }
});

// Se algum post foi migrado, atualizamos o LocalStorage com a nova estrutura.
if (needsUpdate) {
    console.log('Atualizando LocalStorage com posts migrados...');
    localStorage.setItem('posts', JSON.stringify(currentPosts));
}

// -----------------------------------------------------------------

// O resto do código permanece igual...

postsContainer.addEventListener('click', function(event) {
    const target = event.target; 

    if (target.classList.contains('btn-delete')) {
        const postIdToDelete = parseInt(target.dataset.postId, 10);
        const userConfirmed = confirm('Tem certeza que deseja excluir este post? Esta ação não pode ser desfeita.');

        if (userConfirmed) {
            currentPosts = deletePost(currentPosts, postIdToDelete);
            localStorage.setItem('posts', JSON.stringify(currentPosts));
            renderPosts(currentPosts);
            alert('Post excluído com sucesso!');
        }
    }
    else if (event.target.classList.contains('btn-edit')) {
        const postIdToEdit = target.dataset.postId;
        window.location.href = `admin.html?editId=${postIdToEdit}`;
    }
});

// Renderiza os posts pela primeira vez quando a página carrega.
renderPosts(currentPosts);