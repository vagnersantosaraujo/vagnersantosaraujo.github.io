import { auth } from './firebase-init.js';
import { onAuthStateChanged, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { loadPostsFromFirestore } from './main-logic.js';

function initializeAuth() {
    const authStatusPlaceholder = document.getElementById('auth-status-placeholder');
    if (!authStatusPlaceholder) return;

    onAuthStateChanged(auth, user => {
        // O console.log de debug que adicionamos pode ser mantido ou removido.
        console.log("Objeto 'user' recebido do Firebase:", user);

        const authEvent = new CustomEvent('vagner-auth-changed', { detail: { user } });
        document.dispatchEvent(authEvent);

        if (window.location.hash === '' || window.location.hash === '#/') {
            loadPostsFromFirestore(user);
        }

        if (user) {
            // AQUI ESTÁ A LÓGICA MELHORADA PARA A FOTO
            // 1. Tenta pegar a photoURL principal.
            // 2. Se não existir, tenta pegar a photoURL de dentro dos dados do provedor (Google).
            // 3. Se nenhuma existir, usa o emoji de fallback.
            const photoUrl = user.photoURL || (user.providerData[0] && user.providerData[0].photoURL);
            const photo = photoUrl 
                ? `<img src="${photoUrl}" alt="Foto de Perfil" class="user-profile-pic" />` 
                : '<span class="logo-emoji">🧔🏻‍♂️</span>';

            authStatusPlaceholder.innerHTML = `
                <div class="user-profile">
                    ${photo}
                    <span class="user-profile-name">${user.displayName.split(' ')[0]}</span>
                </div>
                <div class="logout-menu">
                    <div class="user-info">
                        <strong>${user.displayName}</strong>
                        <span>${user.email}</span>
                    </div>
                    <a href="#/admin" class="menu-item">Painel de Admin</a>
                    <button id="logout-btn-header" class="menu-item menu-item-logout">Sair</button>
                </div>
            `;
            
            const userProfile = authStatusPlaceholder.querySelector('.user-profile');
            const logoutMenu = authStatusPlaceholder.querySelector('.logout-menu');
            
            userProfile.addEventListener('click', () => {
                logoutMenu.style.display = logoutMenu.style.display === 'block' ? 'none' : 'block';
            });

            document.addEventListener('click', (event) => {
                if (!authStatusPlaceholder.contains(event.target)) {
                    logoutMenu.style.display = 'none';
                }
            });

            authStatusPlaceholder.querySelector('#logout-btn-header').addEventListener('click', () => {
                signOut(auth).catch(error => console.error('Erro no logout:', error));
            });

        } else {
            authStatusPlaceholder.innerHTML = `<button id="login-btn-header" class="btn btn-login">Login</button>`;
            authStatusPlaceholder.querySelector('#login-btn-header').addEventListener('click', () => {
                const provider = new GoogleAuthProvider();
                signInWithPopup(auth, provider).catch(error => console.error('Erro no login:', error));
            });
        }
    });
}

document.addEventListener('componentLoaded', (event) => {
    if (event.detail.elementId === 'header-placeholder') {
        initializeAuth();
    }
});