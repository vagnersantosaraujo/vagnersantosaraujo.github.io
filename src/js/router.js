import { loadPostsFromFirestore, editPost, deletePost } from './main-logic.js';
import { auth } from './firebase-init.js';
import { initializeAdminPage } from './admin-script.js';
import { loadSinglePost } from './post-loader.js';

const routes = {
    '/': '/src/pages/home.html',
    '/sobre': '/src/pages/sobre.html',
    '/contato': '/src/pages/contato.html',
    '/admin': '/src/pages/admin.html',
    '/post': '/src/pages/post.html'
};

let appContainer;

function updateActiveNavLink(path) {
    document.querySelectorAll('.main-nav a').forEach(link => {
        link.classList.remove('active');
    });
    const activeLink = document.querySelector(`.main-nav a[href="#${path}"]`);
    if (activeLink) {
        activeLink.classList.add('active');
    }
}

const loadContent = async (path) => {
    const routeKey = path.split('?')[0];
    const isPostPage = path.startsWith('/post?id=');
    let filePath = routes[routeKey];
    if (!filePath && !isPostPage) {
        console.warn(`Rota não encontrada: ${routeKey}.`);
        appContainer.innerHTML = '<h1>Página não encontrada</h1>';
        return;
    }
    try {
        if (filePath) {
            const response = await fetch(filePath);
            if (!response.ok) throw new Error(`Falha ao carregar o fragmento HTML: ${filePath}`);
            appContainer.innerHTML = await response.text();
        }
        if (routeKey === '/') {
            loadPostsFromFirestore(auth.currentUser);
        } else if (routeKey === '/admin') {
            initializeAdminPage();
        } else if (isPostPage) {
            const params = new URLSearchParams(path.split('?')[1]);
            const postId = params.get('id');
            if (postId) {
                loadSinglePost(postId, auth.currentUser);
            } else {
                throw new Error("ID do post não encontrado na URL.");
            }
        }
    } catch (error) {
        console.error('Erro ao carregar conteúdo:', error);
        appContainer.innerHTML = '<h1>Erro ao carregar a página.</h1>';
    }
};

const handleLocation = () => {
    const path = window.location.hash.replace('#', '') || '/';
    loadContent(path);
    updateActiveNavLink(path);
};

export const initializeRouter = () => {
    appContainer = document.getElementById('app');
    if (!appContainer) {
        console.error("Elemento principal #app não encontrado!");
        return;
    }
    appContainer.addEventListener('click', (event) => {
        const target = event.target.closest('[data-action]');
        if (!target) return;
        const action = target.dataset.action;
        const id = target.dataset.id;
        if (action === 'edit') {
            editPost(id);
        } else if (action === 'delete') {
            deletePost(id);
        }
    });
    window.addEventListener('hashchange', handleLocation);
    handleLocation();
};