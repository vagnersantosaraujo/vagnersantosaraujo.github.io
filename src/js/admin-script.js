import { auth, db } from './firebase-init.js';
import { getDoc, doc, updateDoc, addDoc, collection, serverTimestamp, getDocs, query, orderBy } from "firebase/firestore";
import Editor from '@toast-ui/editor';
import '@toast-ui/editor/dist/toastui-editor.css';
import '@toast-ui/editor/dist/theme/toastui-editor-dark.css';

export function initializeAdminPage() {
    const user = auth.currentUser;
    if (!user) {
        window.location.hash = '#/';
        return;
    }

    const form = document.getElementById('post-form');
    const titleInput = document.getElementById('post-title');
    const imageInput = document.getElementById('featured-image');
    const imagePreview = document.getElementById('image-preview');
    const formTitle = document.getElementById('form-title');
    const submitBtn = document.getElementById('submit-btn');
    const editPostIdInput = document.getElementById('edit-post-id');
    const editorContainer = document.getElementById('editor-container');

    if (!form || !editorContainer) {
        console.error("Elementos do formulário de admin não encontrados!");
        return;
    }
    
    editorContainer.innerHTML = '';

    const editor = new Editor({
        el: editorContainer,
        height: '400px',
        initialEditType: 'markdown',
        previewStyle: 'vertical',
        // AQUI ESTÁ A MUDANÇA! Forçamos o tema 'default' (claro) o tempo todo.
        theme: 'default',
        autofocus: false,
        usageStatistics: false,
        codeBlockLanguages: ['javascript', 'css', 'html', 'xml', 'typescript'],
        codemirror: {
            // A configuração do CodeMirror agora também pode ser simplificada ou removida,
            // mas vamos mantê-la para garantir consistência.
            theme: 'default'
        }
    });

    let featuredImageBase64 = null;

    imageInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onloadend = () => {
            featuredImageBase64 = reader.result;
            imagePreview.innerHTML = `<img src="${featuredImageBase64}" alt="Prévia da imagem">`;
        };
        reader.readAsDataURL(file);
    });

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        submitBtn.disabled = true;
        submitBtn.textContent = 'Salvando...';

        const editPostId = editPostIdInput.value;
        const postData = {
            title: titleInput.value,
            contentMarkdown: editor.getMarkdown(),
            authorId: user.uid,
            authorName: user.displayName,
            updatedAt: serverTimestamp(),
        };

        if (featuredImageBase64) {
            postData.featuredImage = featuredImageBase64;
        }

        try {
            if (editPostId) {
                const postRef = doc(db, 'posts', editPostId);
                await updateDoc(postRef, postData);
                alert('Post atualizado com sucesso!');
            } else {
                postData.createdAt = serverTimestamp();
                await addDoc(collection(db, 'posts'), postData);
                alert('Post criado com sucesso!');
            }
            window.location.hash = '#/';
        } catch (error) {
            console.error("Erro ao salvar post:", error);
            alert("Erro ao salvar o post.");
            submitBtn.disabled = false;
            submitBtn.textContent = 'Salvar Post';
        }
    });

    const params = new URLSearchParams(window.location.hash.split('?')[1]);
    const editId = params.get('edit');
    if (editId) {
        formTitle.textContent = "Editar Post";
        submitBtn.textContent = "Atualizar Post";
        editPostIdInput.value = editId;

        getDoc(doc(db, 'posts', editId)).then(docSnap => {
            if (docSnap.exists()) {
                const post = docSnap.data();
                titleInput.value = post.title;
                editor.setMarkdown(post.contentMarkdown || '');
                if (post.featuredImage) {
                    featuredImageBase64 = post.featuredImage;
                    imagePreview.innerHTML = `<img src="${post.featuredImage}" alt="Prévia da imagem">`;
                }
            } else {
                alert("Post não encontrado!");
                window.location.hash = '#/admin';
            }
        });
    }

    async function loadExistingPosts() {
        const postsListDiv = document.getElementById('posts-list');
        if (!postsListDiv) return;

        const q = query(collection(db, "posts"), orderBy("createdAt", "desc"));
        const querySnapshot = await getDocs(q);
        postsListDiv.innerHTML = '';

        querySnapshot.forEach(doc => {
            const post = doc.data();
            postsListDiv.innerHTML += `
                <div class="existing-post-item">
                    <div class="post-info">
                        <h3>${post.title}</h3>
                        <p class="post-meta">
                            Atualizado em: ${new Date(post.updatedAt?.toDate()).toLocaleDateString('pt-BR')}
                        </p>
                    </div>
                    <div class="admin-actions">
                        <button class="btn-admin-action" data-action="edit" data-id="${doc.id}">Editar</button>
                        <button class="btn-admin-action btn-delete-home" data-action="delete" data-id="${doc.id}">Excluir</button>
                    </div>
                </div>
            `;
        });
    }
    
    loadExistingPosts();
}