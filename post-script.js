// =================================================================
// ✨ INICIALIZAÇÃO DO FIREBASE ✨
// =================================================================

const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// =================================================================
// ✨ LÓGICA DA PÁGINA DO POST ✨
// =================================================================
document.addEventListener('DOMContentLoaded', async () => {
    const mainContent = document.querySelector('main.container');

    try {
        const params = new URLSearchParams(window.location.search);
        const postId = params.get('id');

        if (!postId) {
            throw new Error("ID do post não encontrado na URL.");
        }

        console.log(`Buscando post com ID: ${postId}`);

        // Comando para buscar um ÚNICO documento pelo seu ID
        const docRef = db.collection("posts").doc(postId);
        const doc = await docRef.get();

        if (doc.exists) {
            // Se o documento existe, pegamos os dados
            const post = doc.data();
            console.log("Post encontrado:", post);

            document.title = `${post.title} | vagner.pages`;
            
            const dirtyHtml = marked.parse(post.contentMarkdown || '');
            const cleanHtml = DOMPurify.sanitize(dirtyHtml);

            const imageHtml = post.featuredImage 
                ? `<img src="${post.featuredImage}" alt="Imagem de destaque para ${post.title}" class="post-full-image">`
                : '';
            
            const postDate = post.createdAt && post.createdAt.toDate 
                ? post.createdAt.toDate().toLocaleDateString('pt-BR') 
                : 'Data indisponível';

            mainContent.innerHTML = `
                <article class="post-full">
                    ${imageHtml}
                    <h1>${post.title}</h1>
                    <p class="post-meta"><em>Por ${post.authorName} em ${postDate}</em></p>
                    <div>${cleanHtml}</div>
                </article>
            `;
        } else {
            // Se o documento com aquele ID não foi encontrado
            throw new Error("Post não encontrado no banco de dados.");
        }

    } catch (error) {
        console.error("Erro ao carregar o post:", error);
        mainContent.innerHTML = '<h1>Ops! Post não encontrado.</h1>';
    }
});