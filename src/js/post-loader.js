import { db } from './firebase-init.js';
import { doc, getDoc } from "firebase/firestore";
import DOMPurify from 'dompurify';
import { marked } from 'marked';

export async function loadSinglePost(postId, user) {
    const imageContainer = document.getElementById('post-image-container');
    const titleEl = document.getElementById('post-title-full');
    const metaEl = document.getElementById('post-meta-full');
    const contentEl = document.getElementById('post-content-full');
    const adminActionsEl = document.getElementById('post-admin-actions');

    if (!titleEl || !contentEl || !metaEl || !imageContainer || !adminActionsEl) {
        console.error("Elementos do template de post não encontrados!");
        return;
    }

    try {
        const postRef = doc(db, 'posts', postId);
        const docSnap = await getDoc(postRef);

        if (docSnap.exists()) {
            const post = docSnap.data();
            
            titleEl.textContent = post.title;
            metaEl.textContent = `Por ${post.authorName || 'Autor Desconhecido'} em ${new Date(post.createdAt?.toDate()).toLocaleDateString('pt-BR')}`;

            if (post.contentMarkdown) {
                contentEl.innerHTML = DOMPurify.sanitize(marked.parse(post.contentMarkdown));
            }

            // A condição if usa o nome EXATO do campo: 'featuredImage'
            if (post.featuredImage) {
                imageContainer.innerHTML = `<img src="${post.featuredImage}" alt="Imagem de destaque" class="post-full-image">`;
            } else {
                imageContainer.innerHTML = '';
            }

            if (user) {
                adminActionsEl.innerHTML = `
                    <div class="admin-actions-home" style="padding: 0 0 16px 0;">
                        <button class="btn-admin-action" data-action="edit" data-id="${postId}">Editar</button>
                        <button class="btn-admin-action btn-delete-home" data-action="delete" data-id="${postId}">Excluir</button>
                    </div>
                `;
            } else {
                adminActionsEl.innerHTML = '';
            }

        } else {
            titleEl.textContent = "Post não encontrado";
            contentEl.innerHTML = "<p>O post que você está procurando não existe ou foi removido.</p>";
        }
    } catch (error) {
        console.error("Erro ao buscar o post individual:", error);
        titleEl.textContent = "Erro ao carregar";
        contentEl.innerHTML = "<p>Houve um problema ao carregar o post. Tente novamente mais tarde.</p>";
    }
}