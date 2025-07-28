// =================================================================
// ✨ INICIALIZAÇÃO DO FIREBASE ✨
// =================================================================

const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth(); // Serviço de Autenticação
const db = firebase.firestore(); // Serviço do Firestore (nosso banco de dados)

// =================================================================
// ✨ REFERÊNCIAS AOS ELEMENTOS DO HTML ✨
// =================================================================
const authContainer = document.getElementById('auth-container');
const contentContainer = document.getElementById('content-container');
const loginGoogleBtn = document.getElementById('login-google-btn');

const logoutBtn = document.createElement('button');
logoutBtn.textContent = 'Logout (Sair)';
logoutBtn.className = 'btn';
logoutBtn.id = 'logout-btn';


// =================================================================
// ✨ CÉREBRO CENTRAL: O VIGIA DE AUTENTICAÇÃO ✨
// =================================================================
auth.onAuthStateChanged((user) => {
  if (user) {
    // --- USUÁRIO ESTÁ LOGADO ---
    console.log('Vigia diz: Usuário LOGADO!', user);
    
    authContainer.style.display = 'none';
    contentContainer.style.display = 'block';
    
    const welcomeHeader = contentContainer.querySelector('h2');
    welcomeHeader.textContent = `Bem-vindo, ${user.displayName}!`;
    
    if (!document.querySelector('#logout-btn')) { 
        welcomeHeader.insertAdjacentElement('afterend', logoutBtn);
    }
    
    initializeFormLogic();

  } else {
    // --- USUÁRIO ESTÁ DESLOGADO ---
    console.log('Vigia diz: Usuário DESLOGADO!');
    
    authContainer.style.display = 'block';
    contentContainer.style.display = 'none';
  }
});

// =================================================================
// ✨ FUNÇÕES DE LOGIN E LOGOUT ✨
// =================================================================
loginGoogleBtn.addEventListener('click', () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  auth.signInWithPopup(provider).catch(error => {
    console.error('Erro no login:', error);
    alert('Ocorreu um erro ao tentar fazer o login.');
  });
});

logoutBtn.addEventListener('click', () => {
    if (confirm('Tem certeza que deseja sair?')) {
        auth.signOut();
    }
});


// =================================================================
// ✨ LÓGICA DO FORMULÁRIO (AGORA DENTRO DE UMA FUNÇÃO) ✨
// =================================================================
// =================================================================
// ✨ LÓGICA DO FORMULÁRIO (AGORA COM MODO DE EDIÇÃO) ✨
// =================================================================
function initializeFormLogic() {
    const postForm = document.querySelector('#post-form');
    const postTitleInput = document.getElementById('post-title');
    const postContentInput = document.getElementById('post-content');
    const postImageInput = document.getElementById('post-image');
    const imagePreview = document.getElementById('image-preview');
    const submitButton = postForm.querySelector('button[type="submit"]');
    let featuredImageData = ''; 

    // --- VERIFICA SE ESTAMOS EM MODO DE EDIÇÃO ---
    const params = new URLSearchParams(window.location.search);
    const editPostId = params.get('id'); // Usando 'id' como no link

    if (editPostId) {
        // MODO DE EDIÇÃO
        console.log(`Modo de Edição. Carregando post: ${editPostId}`);
        submitButton.textContent = 'Atualizar Post'; // Muda o texto do botão

        // Busca o post no Firestore
        db.collection("posts").doc(editPostId).get().then(doc => {
            if (doc.exists) {
                const post = doc.data();
                postTitleInput.value = post.title;
                postContentInput.value = post.contentMarkdown;
                featuredImageData = post.featuredImage;
                if (post.featuredImage) {
                    imagePreview.innerHTML = `<img src="${post.featuredImage}" alt="Preview da imagem">`;
                }
            } else {
                alert("Post não encontrado para edição!");
                window.location.href = 'index.html';
            }
        }).catch(error => {
            console.error("Erro ao carregar post para edição:", error);
        });
    } else {
        // MODO DE CRIAÇÃO
        submitButton.textContent = 'Publicar Post';
    }


    postImageInput.addEventListener('change', function(event) {
        // ... (código de preview da imagem - continua o mesmo) ...
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                imagePreview.innerHTML = `<img src="${e.target.result}" alt="Preview da imagem">`;
                featuredImageData = e.target.result;
            }
            reader.readAsDataURL(file);
        }
    });

    postForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const title = postTitleInput.value;
        const markdownContent = postContentInput.value;

        const postData = {
            title: title,
            contentMarkdown: markdownContent,
            featuredImage: featuredImageData,
            authorName: auth.currentUser.displayName,
            authorId: auth.currentUser.uid,
            // Adicionamos um campo 'updatedAt' para saber quando foi a última modificação
            updatedAt: firebase.firestore.FieldValue.serverTimestamp() 
        };

        if (editPostId) {
            // --- LÓGICA DE ATUALIZAÇÃO ---
            console.log(`Atualizando post: ${editPostId}`);
            db.collection("posts").doc(editPostId).update(postData)
                .then(() => {
                    alert("Post atualizado com sucesso!");
                    window.location.href = 'index.html'; // Volta para a home após atualizar
                })
                .catch(error => {
                    console.error("Erro ao atualizar post:", error);
                    alert("Erro ao atualizar o post.");
                });
        } else {
            // --- LÓGICA DE CRIAÇÃO (JÁ EXISTENTE) ---
            console.log("Criando novo post...");
            // Adicionamos o campo createdAt apenas na criação
            postData.createdAt = firebase.firestore.FieldValue.serverTimestamp();

            db.collection("posts").add(postData)
                .then((docRef) => {
                    alert("Post salvo com sucesso!");
                    postForm.reset();
                    imagePreview.innerHTML = '<span id="preview-text">Pré-visualização da Imagem</span>';
                    featuredImageData = '';
                })
                .catch((error) => {
                    console.error("Erro ao salvar o post: ", error);
                    alert("Ocorreu um erro ao salvar o post.");
                });
        }
    });
    
    console.log('Lógica do formulário inicializada!');
}