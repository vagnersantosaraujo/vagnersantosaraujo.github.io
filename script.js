// =================================================================
// ✨ INICIALIZAÇÃO DO FIREBASE ✨
// =================================================================

const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth(); 

const postsContainer = document.querySelector('#posts-container');
let currentPosts = [];

// =================================================================
// ✨ FUNÇÃO PRINCIPAL: CARREGAR POSTS DO FIRESTORE ✨
// =================================================================
async function loadPostsFromFirestore() {
    try {
        console.log("Buscando posts no Firestore...");
        const querySnapshot = await db.collection("posts").orderBy("createdAt", "desc").get();
        
        currentPosts = []; 
        querySnapshot.forEach((doc) => {
            const postData = doc.data();
            currentPosts.push({
                id: doc.id, 
                ...postData 
            });
        });

        console.log("Posts carregados:", currentPosts);
        renderPosts(currentPosts);

    } catch (error) {
        console.error("Erro ao buscar posts: ", error);
        postsContainer.innerHTML = "<h1>Ops! Não foi possível carregar os posts.</h1>";
    }
}


// =================================================================
// ✨ FUNÇÃO PARA RENDERIZAR OS POSTS (Com lógica de login) ✨
// =================================================================
function renderPosts(postsArray) {
    postsContainer.innerHTML = '';
    const user = auth.currentUser;

    // Usaremos as funções do logic.js que já tínhamos!
    const markdownParser = marked.parse;
    const sanitizer = DOMPurify.sanitize;

    const postsHTML = postsArray.map(post => {
        const dirtyHtml = markdownParser(post.contentMarkdown || '');
        const cleanHtml = sanitizer(dirtyHtml);

        const summary = cleanHtml.length > 200 
            ? cleanHtml.substring(0, 200) + '...'
            : cleanHtml;
            
        const adminButtons = user ? `
            <div class="post-actions">
                <button class="btn btn-edit" data-post-id="${post.id}">Editar ✏️</button>
                <button class="btn btn-delete" data-post-id="${post.id}">Excluir 🗑️</button>
            </div>
        ` : '';

        const imageHtml = post.featuredImage 
            ? `<img src="${post.featuredImage}" alt="Imagem de destaque para o post ${post.title}" class="post-card-image">`
            : '';

        // Formatando a data de criação
        const postDate = post.createdAt && post.createdAt.toDate 
            ? post.createdAt.toDate().toLocaleDateString('pt-BR') 
            : 'Data indisponível';

        return `
            <article class="post">
                ${imageHtml}
                <div class="post-content-wrapper">
                    <h2><a href="post.html?id=${post.id}">${post.title}</a></h2>
                    <p class="post-date"><em>Por ${post.authorName} em ${postDate}</em></p>
                    <div>${summary}</div> 
                    <a href="post.html?id=${post.id}" class="read-more">Leia mais...</a>
                </div>
                ${adminButtons}
            </article>
        `;
    }).join('');

    postsContainer.innerHTML = postsHTML;
}


// =================================================================
// ✨ INÍCIO DA EXECUÇÃO ✨
// =================================================================

auth.onAuthStateChanged((user) => {
    console.log("Estado de autenticação mudou, recarregando posts...");
    loadPostsFromFirestore();
});

// =================================================================
// ✨ AÇÕES DE EDITAR E EXCLUIR ✨
// =================================================================
postsContainer.addEventListener('click', function(event) {
    const target = event.target;
    const postId = target.dataset.postId;

    if (target.classList.contains('btn-delete')) {
        // --- LÓGICA DE EXCLUSÃO ---
        if (confirm('Tem certeza que deseja excluir este post? Esta ação não pode ser desfeita.')) {
            db.collection("posts").doc(postId).delete()
                .then(() => {
                    alert("Post excluído!");
                    loadPostsFromFirestore(); // Recarrega a lista
                })
                .catch((error) => {
                    console.error("Erro ao excluir o post: ", error);
                });
        }
    }
    else if (target.classList.contains('btn-edit')) {
        // --- LÓGICA DE EDIÇÃO ---
        // Agora redireciona corretamente para a página de admin com o ID
        window.location.href = `admin.html?id=${postId}`;
    }
});