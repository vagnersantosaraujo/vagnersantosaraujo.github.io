// admin-script.js

// --- DECLARAÇÃO DE VARIÁVEIS DO FORMULÁRIO ---
const postForm = document.querySelector('#post-form');
const postImageInput = document.getElementById('post-image');
const imagePreview = document.getElementById('image-preview');
let featuredImageData = ''; // ✨ Variável para guardar a string Base64 da imagem

// --- LÓGICA DO PREVIEW DE IMAGEM ---
postImageInput.addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            imagePreview.innerHTML = `<img src="${e.target.result}" alt="Preview da imagem">`;
            // ✨ Guarda o resultado na nossa variável
            featuredImageData = e.target.result;
        }
        reader.readAsDataURL(file);
    }
});

// --- LÓGICA DE SUBMISSÃO DO FORMULÁRIO ---
postForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const titleInput = document.querySelector('#post-title');
    const contentInput = document.querySelector('#post-content-markdown');
    
    const title = titleInput.value;
    const markdownContent = contentInput.value;
    
    if (title.trim() === '' || markdownContent.trim() === '') {
        alert('Por favor, preencha o título e o conteúdo!');
        return; 
    }
    
    const currentPosts = JSON.parse(localStorage.getItem('posts')) || [];

    if (postIdToUpdate) {
        // MODO UPDATE
        // ✨ Passa a nova imagem para a função de update
        const updatedPosts = updatePost(currentPosts, postIdToUpdate, title, markdownContent, featuredImageData, marked.parse, DOMPurify.sanitize);
        localStorage.setItem('posts', JSON.stringify(updatedPosts));
        alert('Post atualizado com sucesso!');
        window.location.href = 'index.html';
    } else {
        // MODO CREATE
        // ✨ Passa a imagem para a função de criação
        const newPost = createNewPost(title, markdownContent, featuredImageData, marked.parse, DOMPurify.sanitize);
        currentPosts.push(newPost);
        localStorage.setItem('posts', JSON.stringify(currentPosts));
        
        alert('Post publicado com sucesso!');
        // Limpa tudo, inclusive a preview da imagem
        postForm.reset();
        imagePreview.innerHTML = '<span id="preview-text">Pré-visualização da Imagem</span>';
        featuredImageData = '';
        titleInput.focus();
    }
});

// --- MODO DE EDIÇÃO: VERIFICA A URL E PREENCHE O FORMULÁRIO ---
let postIdToUpdate = null; 

(function checkEditMode() {
    const params = new URLSearchParams(window.location.search);
    const editId = params.get('editId');

    if (!editId) return;

    postIdToUpdate = parseInt(editId, 10);

    const currentPosts = JSON.parse(localStorage.getItem('posts')) || [];
    const postToEdit = currentPosts.find(post => post.id === postIdToUpdate);

    if (postToEdit) {
        document.querySelector('#post-title').value = postToEdit.title;
        document.querySelector('#post-content-markdown').value = postToEdit.contentMarkdown;
        
        // ✨ Se o post a ser editado tiver uma imagem, mostra ela!
        if (postToEdit.featuredImage) {
            featuredImageData = postToEdit.featuredImage;
            imagePreview.innerHTML = `<img src="${featuredImageData}" alt="Preview da imagem">`;
        }
    }
})();