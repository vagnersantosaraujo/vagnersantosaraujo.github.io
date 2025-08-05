import { db, auth } from './firebase-init.js'; // Importamos também o 'auth'
import { collection, getDocs, doc, deleteDoc, query, orderBy } from "firebase/firestore";
import DOMPurify from 'dompurify';

export async function loadPostsFromFirestore(user) {
    const postsGrid = document.querySelector('.posts-grid');
    if (!postsGrid) return;

    postsGrid.innerHTML = 'Carregando posts...';
    try {
        const postsCollection = collection(db, "posts");
        const q = query(postsCollection, orderBy("createdAt", "desc"));
        const querySnapshot = await getDocs(q);

        let postsHTML = '';
        if (querySnapshot.empty) {
            postsGrid.innerHTML = 'Nenhum post encontrado.';
            return;
        }

        querySnapshot.forEach((doc) => {
            const post = doc.data();
            postsHTML += `
                <div class="post-card">
                    <a href="#/post?id=${doc.id}" class="post-card-link">
                        ${post.featuredImage ? `<img src="${post.featuredImage}" alt="Imagem de destaque do post">` : ''}
                        <div class="post-card-content">
                            <h2>${DOMPurify.sanitize(post.title)}</h2>
                            <p>Por ${post.authorName || 'Autor Desconhecido'} em ${new Date(post.createdAt?.toDate()).toLocaleDateString('pt-BR')}</p>
                        </div>
                    </a>
                    
                    ${user ? `
                    <div class="admin-actions-home">
                        <button class="btn-admin-action" data-action="edit" data-id="${doc.id}">Editar</button>
                        <button class="btn-admin-action btn-delete-home" data-action="delete" data-id="${doc.id}">Excluir</button>
                    </div>
                    ` : ''}
                </div>
            `;
        });
        postsGrid.innerHTML = postsHTML;
    } catch (error) {
        console.error("Erro ao buscar posts:", error);
        postsGrid.innerHTML = 'Erro ao carregar posts. Tente novamente mais tarde.';
    }
}

// LÓGICA DA FUNÇÃO RESTAURADA
export async function deletePost(id) {
    if (confirm('Tem certeza que deseja excluir este post?')) {
        try {
            const postDocRef = doc(db, "posts", id);
            await deleteDoc(postDocRef);
            alert('Post excluído com sucesso!');
            
            // Recarrega os posts, passando o usuário atual para renderizar a lista corretamente
            // Este auth.currentUser só funciona porque importamos o 'auth' no topo do arquivo
            loadPostsFromFirestore(auth.currentUser);
        } catch (error) {
            console.error("Erro ao excluir post: ", error);
            alert('Erro ao excluir post.');
        }
    }
}

// LÓGICA DA FUNÇÃO RESTAURADA
export function editPost(id) {
    // Redireciona para a página de admin com o ID do post para edição
    window.location.hash = `#/admin?edit=${id}`;
}