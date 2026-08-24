// ============================================================
// URL BASE DEL BACKEND
// ============================================================
const API_URL = 'https://soul-backend-1.onrender.com';

// ============================================================
// CONFIGURACIÓN DE REDES SOCIALES CON SVG
// ============================================================
const socialPlatforms = {
    instagram: { name: 'Instagram', url: 'https://instagram.com/', svg: `<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>` },
    tiktok: { name: 'TikTok', url: 'https://tiktok.com/@', svg: `<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg>` },
    discord: { name: 'Discord', url: 'https://discord.com/users/', svg: `<svg viewBox="0 0 127.14 96.36" width="48" height="48" fill="currentColor"><path d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,38.71,96.36,77.7,77.7,0,0,0,43.65,85.4a70.25,70.25,0,0,1-11.36-5.38,4.38,4.38,0,0,1-.56-6.65,4.34,4.34,0,0,1,5.12-.85,92.9,92.9,0,0,0,48.36,0,4.34,4.34,0,0,1,5.12.85,4.38,4.38,0,0,1-.56,6.65,70.09,70.09,0,0,1-11.36,5.38,77.24,77.24,0,0,0,4.94,10.89A105.52,105.52,0,0,0,126.6,80.22C129.24,52.84,122.09,28.11,107.7,8.07ZM42.45,65.69c-8.27,0-15-7.45-15-16.57s6.76-16.57,15-16.57,15,7.45,15,16.57S50.72,65.69,42.45,65.69Zm42.24,0c-8.27,0-15-7.45-15-16.57s6.76-16.57,15-16.57,15,7.45,15,16.57S93,65.69,84.69,65.69Z"/></svg>` },
    github: { name: 'GitHub', url: 'https://github.com/', svg: `<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.15 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.62.24 2.85.12 3.15.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>` },
    telegram: { name: 'Telegram', url: 'https://t.me/', svg: `<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M11.944 0A12 12 0 000 12a12 12 0 0012 12 12 12 0 0012-12A12 12 0 0012 0a12 12 0 00-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 01.171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>` },
    facebook: { name: 'Facebook', url: 'https://facebook.com/', svg: `<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>` }
};

// ============================================================
// DETECTAR VISTA PÚBLICA (PERFIL COMPARTIDO)
// ============================================================
function isPublicView() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.has('user'); // Usa .has() en lugar de !== null (más seguro)
}

// ============================================================
// AUTH: TOGGLE LOGIN / REGISTER
// ============================================================
document.addEventListener('DOMContentLoaded', () => {

    // Mostrar register
    document.getElementById('show-register')?.addEventListener('click', () => {
        document.getElementById('login-box').classList.add('hidden');
        document.getElementById('register-box').classList.remove('hidden');
    });

    // Mostrar login
    document.getElementById('show-login')?.addEventListener('click', () => {
        document.getElementById('register-box').classList.add('hidden');
        document.getElementById('login-box').classList.remove('hidden');
    });

    // ===== LOGIN =====
    document.getElementById('login-form')?.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;
        const errorEl = document.getElementById('login-error');

        try {
            const response = await fetch(`${API_URL}/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Error al iniciar sesión');
            }

            console.log('✅ Login exitoso');
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            window.location.href = 'profile.html';

        } catch (error) {
            errorEl.textContent = error.message;
        }
    });

    // ===== REGISTER =====
    document.getElementById('register-form')?.addEventListener('submit', async (e) => {
        e.preventDefault();
        const username = document.getElementById('register-username').value;
        const email = document.getElementById('register-email').value;
        const password = document.getElementById('register-password').value;
        const errorEl = document.getElementById('register-error');

        try {
            const response = await fetch(`${API_URL}/auth/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password, username })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Error al registrarse');
            }

            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            window.location.href = 'profile.html';

        } catch (error) {
            errorEl.textContent = error.message;
        }
    });

    // ============================================================
    // SI ESTAMOS EN PROFILE.HTML
    // ============================================================
    if (window.location.pathname.includes('profile.html')) {
        initProfile();
        setupProfileEvents();
    }

});
// ============================================================
// INICIALIZAR PERFIL
// ============================================================
async function initProfile() {
    // 🔥 MARCADOR DE VISTA PÚBLICA EN EL BODY
    if (isPublicView()) {
        document.body.setAttribute('data-public', 'true');
    }
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');

    // 🔥 Si es vista pública, cargar perfil por username
    if (isPublicView()) {
        const urlParams = new URLSearchParams(window.location.search);
        const username = urlParams.get('user');
        
        try {
            const response = await fetch(`${API_URL}/public-profile/${username}`);
            if (!response.ok) throw new Error('Perfil no encontrado');
            
            const user = await response.json();
            console.log('✅ Perfil público cargado:', user);
            renderProfile(user, { isPublic: true }); // Pasamos flag de público
            return;
        } catch (error) {
            console.error('❌ Error cargando perfil público:', error);
            window.location.href = 'profile.html'; // Si falla, redirigir al propio perfil
            return;
        }
    }

    // 🔥 Si es vista normal (logueado), usar el flujo anterior
    if (!token || !userData) {
        console.log('❌ No hay sesión, redirigiendo...');
        window.location.href = 'index.html';
        return;
    }

    try {
        console.log('📤 Obteniendo perfil del backend...');
        const response = await fetch(`${API_URL}/auth/me`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            const user = await response.json();
            console.log('✅ Perfil del backend:', user);
            renderProfile(user, { isPublic: false });
            localStorage.setItem('user', JSON.stringify(user));
        } else {
            console.warn('⚠️ Backend falló, usando localStorage');
            const savedUser = JSON.parse(userData);
            renderProfile(savedUser, { isPublic: false });
        }
            if (user.background_url) {
                localStorage.setItem('customBg', user.background_url);
                document.documentElement.style.setProperty('--custom-bg-url', `url(${user.background_url})`);
                document.documentElement.style.setProperty('--custom-bg-blur', '0px');
            }
    
        }
    catch (error) {
        console.warn('⚠️ Error, usando localStorage:', error.message);
        const savedUser = JSON.parse(userData);
        renderProfile(savedUser, { isPublic: false });
    }
    // Al final de initProfile(), después de renderProfile()
    const savedBg = localStorage.getItem('customBg');
    if (savedBg) {
        document.documentElement.style.setProperty('--custom-bg-url', `url(${savedBg})`);
        document.documentElement.style.setProperty('--custom-bg-blur', '0px');
    }
}

// ============================================================
// EVENTOS
// ============================================================
function setupProfileEvents() {
    // 🔥 SI ES VISTA PÚBLICA: Bloquear botones
    if (isPublicView()) {
        document.getElementById('edit-bio-btn').classList.add('hidden');
        document.getElementById('add-social-btn').classList.add('hidden');
        document.getElementById('upload-banner-btn').classList.add('hidden');
        document.getElementById('upload-avatar-btn').classList.add('hidden');
        document.getElementById('logout-btn').classList.add('hidden');
        document.getElementById('disconnect-spotify-btn').classList.add('hidden');
        
        document.getElementById('edit-bio-btn').onclick = () => {};
        document.getElementById('add-social-btn').onclick = () => {};
        document.getElementById('upload-banner-btn').onclick = () => {};
        document.getElementById('upload-avatar-btn').onclick = () => {};
        document.getElementById('logout-btn').onclick = () => {};
        document.getElementById('disconnect-spotify-btn').onclick = () => {};
    }

    // 🔥 SI NO ES VISTA PÚBLICA: NO bloquear nada (todo funciona)
    else {
        // Quitar la función vacía de los botones
        document.getElementById('edit-bio-btn').onclick = null;
        document.getElementById('add-social-btn').onclick = null;
        document.getElementById('upload-banner-btn').onclick = null;
        document.getElementById('upload-avatar-btn').onclick = null;
        document.getElementById('logout-btn').onclick = null;
        document.getElementById('disconnect-spotify-btn').onclick = null;
        
        // 🔥 RE-ASIGNAR EL BOTÓN DE GUARDAR BIO (SIEMPRE QUE NO SEA PÚBLICO)
        document.getElementById('bio-save').onclick = async () => {
            const bio = document.getElementById('bio-textarea').value;
            const token = localStorage.getItem('token');
            try {
                const response = await fetch(`${API_URL}/profile`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({ bio })
                });
                if (!response.ok) throw new Error('Error al guardar bio');
                const data = await response.json();
                renderBioWithHTML(data.bio);
                document.getElementById('bio-display').classList.remove('hidden');
                document.getElementById('bio-editor').classList.add('hidden');
            } catch (error) {
                alert('Error al guardar la bio: ' + error.message);
            }
        };
        
        // 🔥 RE-ASIGNAR EL BOTÓN DE CANCELAR BIO
        document.getElementById('bio-cancel').onclick = () => {
            document.getElementById('bio-display').classList.remove('hidden');
            document.getElementById('bio-editor').classList.add('hidden');
        };
    }

    // 1. LOGOUT (solo si NO es pública)
    if (!isPublicView()) {
        document.getElementById('logout-btn').addEventListener('click', () => {
            stopNowPlayingUpdates();
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            window.location.href = 'index.html';
        });
    }

    // 2. EDITAR BIO (solo si NO es pública)
    if (!isPublicView()) {
        document.getElementById('edit-bio-btn').addEventListener('click', () => {
            const bioDisplay = document.getElementById('bio-display');
            const bioEditor = document.getElementById('bio-editor');
            const bioTextarea = document.getElementById('bio-textarea');
            const currentBio = document.getElementById('display-bio').textContent;
            bioTextarea.value = currentBio === 'Edit your bio' ? '' : currentBio;
            bioDisplay.classList.add('hidden');
            bioEditor.classList.remove('hidden');
        });
    }

    // 3. SOCIAL: AÑADIR (solo si NO es pública)
    if (!isPublicView()) {
        document.getElementById('add-social-btn').addEventListener('click', () => {
            document.getElementById('social-card').classList.add('hidden');
            document.getElementById('social-editor').classList.remove('hidden');
        });

        document.getElementById('social-cancel').addEventListener('click', () => {
            document.getElementById('social-card').classList.remove('hidden');
            document.getElementById('social-editor').classList.add('hidden');
        });

        document.getElementById('social-save').addEventListener('click', async () => {
            const platformSelect = document.getElementById('social-platform');
            const platform = platformSelect.value;
            const username = document.getElementById('social-username').value.trim();
            
            if (!platform) {
                alert('❌ Por favor selecciona una red social de la lista');
                platformSelect.focus();
                return;
            }
            
            if (!username) {
                alert('❌ Por favor ingresa tu usuario');
                document.getElementById('social-username').focus();
                return;
            }
            
            const token = localStorage.getItem('token');
            try {
                const meResponse = await fetch(`${API_URL}/auth/me`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                const user = await meResponse.json();
                const socialLinks = user.social_links || {};
                socialLinks[platform] = username;
                const response = await fetch(`${API_URL}/profile`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({ social_links: socialLinks })
                });
                if (!response.ok) throw new Error('Error al guardar red social');
                const data = await response.json();
                renderSocialLinks(data.social_links);
                document.getElementById('social-card').classList.remove('hidden');
                document.getElementById('social-editor').classList.add('hidden');
                document.getElementById('social-platform').value = '';
                document.getElementById('social-username').value = '';
            } catch (error) {
                alert('Error: ' + error.message);
            }
        });

        document.getElementById('social-list').addEventListener('click', async (e) => {
            const deleteBtn = e.target.closest('.social-delete');
            if (!deleteBtn) return;
            const platform = deleteBtn.dataset.platform;
            const token = localStorage.getItem('token');
            try {
                const meResponse = await fetch(`${API_URL}/auth/me`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                const user = await meResponse.json();
                const socialLinks = user.social_links || {};
                delete socialLinks[platform];
                const response = await fetch(`${API_URL}/profile`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({ social_links: socialLinks })
                });
                if (!response.ok) throw new Error('Error al eliminar red social');
                const data = await response.json();
                renderSocialLinks(data.social_links);
            } catch (error) {
                alert('Error: ' + error.message);
            }
        });
    }

    // 4. SUBIR BANNER (solo si NO es pública)
    if (!isPublicView()) {
        document.getElementById('upload-banner-btn').addEventListener('click', () => {
            document.getElementById('banner-input').click();
        });

        document.getElementById('banner-input').addEventListener('change', async (e) => {
            const file = e.target.files[0];
            if (!file) return;
            const formData = new FormData();
            formData.append('image', file);
            formData.append('type', 'banner');
            const token = localStorage.getItem('token');
            try {
                const response = await fetch(`${API_URL}/profile/upload`, {
                    method: 'POST',
                    headers: { 'Authorization': `Bearer ${token}` },
                    body: formData
                });
                if (!response.ok) throw new Error('Error al subir banner');
                const data = await response.json();
                document.getElementById('banner-img').src = data.url;
            } catch (error) {
                alert('Error: ' + error.message);
            }
            e.target.value = '';
        });
    }

    // 5. SUBIR AVATAR (solo si NO es pública)
    if (!isPublicView()) {
        document.getElementById('upload-avatar-btn').addEventListener('click', () => {
            document.getElementById('avatar-input').click();
        });

        document.getElementById('avatar-input').addEventListener('change', async (e) => {
            const file = e.target.files[0];
            if (!file) return;
            const formData = new FormData();
            formData.append('image', file);
            formData.append('type', 'avatar');
            const token = localStorage.getItem('token');
            try {
                const response = await fetch(`${API_URL}/profile/upload`, {
                    method: 'POST',
                    headers: { 'Authorization': `Bearer ${token}` },
                    body: formData
                });
                if (!response.ok) throw new Error('Error al subir avatar');
                const data = await response.json();
                document.getElementById('avatar-img').src = data.url;
            } catch (error) {
                alert('Error: ' + error.message);
            }
            e.target.value = '';
        });
    }

    // 6. CONECTAR SPOTIFY (O VER MODAL EN MODO PÚBLICO)
    document.getElementById('music-card').addEventListener('click', async () => {
        const token = localStorage.getItem('token');
        
        // 🔥 Si es vista pública, el modal se abre igual, solo para visualizar
        if (isPublicView()) {
            const modal = document.getElementById('modal-music');
            if (modal) {
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
                setTimeout(() => loadModalDataPublic(), 100); // ✅ Espera 100ms
            }
            return;
        }

        // 🔥 Si NO es vista pública, usar el flujo normal
        try {
            const meResponse = await fetch(`${API_URL}/auth/me`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const user = await meResponse.json();
            if (user.spotify_connected) {
                const modal = document.getElementById('modal-music');
                if (modal) {
                    modal.classList.add('active');
                    document.body.style.overflow = 'hidden';
                    setTimeout(() => loadModalData(), 100); // ✅ Espera 100ms
                }
                return;
            }
            const response = await fetch(`${API_URL}/spotify/connect`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const data = await response.json();
            if (data.url) {
                window.location.href = data.url;
            }
        } catch (error) {
            console.error('Error al conectar Spotify:', error);
            alert('Error al conectar Spotify');
        }
    });

    // 7. DESCONECTAR SPOTIFY (solo si NO es pública)
    if (!isPublicView()) {
        document.getElementById('disconnect-spotify-btn').addEventListener('click', async (e) => {
            e.stopPropagation();
            const token = localStorage.getItem('token');
            try {
                const response = await fetch(`${API_URL}/spotify/disconnect`, {
                    method: 'POST',
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                if (!response.ok) throw new Error('Error al desconectar Spotify');
                
                const data = await response.json();
                console.log('✅ Spotify desconectado');
                
                const userData = localStorage.getItem('user');
                if (userData) {
                    const user = JSON.parse(userData);
                    user.spotify_connected = false;
                    localStorage.setItem('user', JSON.stringify(user));
                }
                
                const spotifyStatus = document.getElementById('spotify-status');
                const spotifyBadge = document.getElementById('spotify-badge');
                if (spotifyStatus) spotifyStatus.textContent = 'Not connected';
                if (spotifyBadge) {
                    spotifyBadge.textContent = 'Connect';
                    spotifyBadge.style.background = 'var(--surface-2)';
                    spotifyBadge.style.color = 'var(--text-muted)';
                }
                
                document.getElementById('disconnect-spotify-btn').classList.add('hidden');
                document.getElementById('music-card').classList.add('disabled-card');
                
            } catch (error) {
                console.error('Error al desconectar Spotify:', error);
                alert('Error al desconectar Spotify');
            }
        });
    }

    // 8. CERRAR MODAL (siempre funciona)
    document.querySelectorAll('.modal-close').forEach(btn => {
        btn.addEventListener('click', () => {
            const target = btn.dataset.close;
            const modal = document.getElementById(target);
            if (modal) {
                modal.classList.remove('active');
                document.body.style.overflow = '';
                stopNowPlayingUpdates();
            }
        });
    });

    document.querySelectorAll('.modal-overlay').forEach(overlay => {
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                overlay.classList.remove('active');
                document.body.style.overflow = '';
                stopNowPlayingUpdates();
            }
        });
    });

    // 9. SHARE PROFILE (siempre funciona)
    document.getElementById('share-profile-btn').addEventListener('click', async () => {
        let username;
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.get('user')) {
            username = urlParams.get('user');
        } else {
            const userData = localStorage.getItem('user');
            const user = userData ? JSON.parse(userData) : null;
            username = user?.username || 'user';
        }

        const baseUrl = window.location.origin;
        const profileUrl = `${baseUrl}/profile.html?user=${encodeURIComponent(username)}`;
        
        try {
            if (navigator.clipboard && navigator.clipboard.writeText) {
                await navigator.clipboard.writeText(profileUrl);
                showShareToast('Profile link copied!', 'success');
            } else {
                const textArea = document.createElement('textarea');
                textArea.value = profileUrl;
                document.body.appendChild(textArea);
                textArea.select();
                document.execCommand('copy');
                document.body.removeChild(textArea);
                showShareToast('Profile link copied!', 'success');
            }
        } catch (error) {
            console.error('Error al compartir perfil:', error);
            showShareToast('Error copying link', 'error');
        }
    });

    // 10. SPOTIFY CONNECTION CHECK
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('spotify') === 'connected') {
        window.location.href = 'profile.html';
    }
    // 11. CAMBIAR FONDO GENERAL
    document.getElementById('upload-bg-btn')?.addEventListener('click', () => {
        document.getElementById('bg-input').click();
    });

    // En setupProfileEvents(), líneas ~566-590
    document.getElementById('bg-input')?.addEventListener('change', async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const token = localStorage.getItem('token');
        
        const formData = new FormData();
        formData.append('image', file);
        formData.append('type', 'background'); // ✅ Ahora es válido
        
        try {
            const response = await fetch(`${API_URL}/profile/upload`, {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${token}` },
                body: formData
            });
            
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Error al subir fondo');
            }
            
            const data = await response.json();
            
            // Aplicar el fondo en la página
            document.documentElement.style.setProperty('--custom-bg-url', `url(${data.url})`);
            document.documentElement.style.setProperty('--custom-bg-blur', '0px');
            
            // ✅ Actualizar localStorage para acceso rápido (cache)
            localStorage.setItem('customBg', data.url);
            
            // ✅ También actualizar el perfil en localStorage
            const userData = localStorage.getItem('user');
            if (userData) {
                const user = JSON.parse(userData);
                user.background_url = data.url;
                localStorage.setItem('user', JSON.stringify(user));
            }
            
            // Mostrar mensaje de éxito
            showShareToast('Background updated!', 'success');
            
        } catch (error) {
            console.error('❌ Error al subir fondo:', error);
            alert('Error al subir el fondo: ' + error.message);
        }
        e.target.value = '';
    });
}

// ============================================================
// RENDER FUNCTIONS
// ============================================================
function renderProfile(user, options = {}) {
    const isPublic = options.isPublic || false;
    console.log('🎨 Renderizando perfil con:', user, 'Público:', isPublic);

    const username = user.username || user.email || 'soul_user';
    document.getElementById('display-username').textContent = `@${username}`;
    renderBioWithHTML(user.bio);
    document.getElementById('profile-username').textContent = `@${username}`;

    if (user.banner_url) {
        document.getElementById('banner-img').src = user.banner_url;
    }
    if (user.background_url) {
        document.documentElement.style.setProperty('--custom-bg-url', `url(${user.background_url})`);
        document.documentElement.style.setProperty('--custom-bg-blur', '0px');
    }
    if (user.avatar_url) {
        document.getElementById('avatar-img').src = user.avatar_url;
    }

    renderSocialLinks(user.social_links || {});

    // 🔥 HACER SÍ O SÍ: Oculta los botones de edición
    const editBioBtn = document.getElementById('edit-bio-btn');
    const addSocialBtn = document.getElementById('add-social-btn');
    const uploadBannerBtn = document.getElementById('upload-banner-btn');
    const uploadAvatarBtn = document.getElementById('upload-avatar-btn');
    const logoutBtn = document.getElementById('logout-btn');

    if (isPublic) {
        if (editBioBtn) editBioBtn.classList.add('hidden');
        if (addSocialBtn) addSocialBtn.classList.add('hidden');
        if (uploadBannerBtn) uploadBannerBtn.classList.add('hidden');
        if (uploadAvatarBtn) uploadAvatarBtn.classList.add('hidden');
        if (logoutBtn) logoutBtn.classList.add('hidden');
    } else {
        if (editBioBtn) editBioBtn.classList.remove('hidden');
        if (addSocialBtn) addSocialBtn.classList.remove('hidden');
        if (uploadBannerBtn) uploadBannerBtn.classList.remove('hidden');
        if (uploadAvatarBtn) uploadAvatarBtn.classList.remove('hidden');
        if (logoutBtn) logoutBtn.classList.remove('hidden');
    }

    // 🔥 Spotify: SIEMPRE debe estar activo
    const spotifyStatus = document.getElementById('spotify-status');
    const spotifyBadge = document.getElementById('spotify-badge');
    const disconnectBtn = document.getElementById('disconnect-spotify-btn');

    if (user.spotify_connected) {
        spotifyStatus.textContent = 'Connected';
        spotifyBadge.textContent = '● Live';
        spotifyBadge.style.background = 'var(--accent)';
        spotifyBadge.style.color = 'var(--bg)';
        document.getElementById('music-card').classList.remove('disabled-card');
        
        if (isPublic) {
            if (disconnectBtn) disconnectBtn.classList.add('hidden');
        } else {
            if (disconnectBtn) disconnectBtn.classList.remove('hidden');
        }
    } else {
        spotifyStatus.textContent = 'Not connected';
        spotifyBadge.textContent = 'Connect';
        spotifyBadge.style.background = 'var(--surface-2)';
        spotifyBadge.style.color = 'var(--text-muted)';
        document.getElementById('music-card').classList.add('disabled-card');
        if (disconnectBtn) disconnectBtn.classList.add('hidden');
    }
    
    // 🔥 SIEMPRE ocultar los botones de edición si es público (sin depender de eventos)
    if (isPublicView()) {
        document.getElementById('edit-bio-btn').classList.add('hidden');
        document.getElementById('add-social-btn').classList.add('hidden');
        document.getElementById('upload-banner-btn').classList.add('hidden');
        document.getElementById('upload-avatar-btn').classList.add('hidden');
        document.getElementById('logout-btn').classList.add('hidden');
    }
}

function renderSocialLinks(socialLinks) {
    const container = document.getElementById('social-list');
    container.innerHTML = '';

    if (!socialLinks || Object.keys(socialLinks).length === 0) {
        container.innerHTML = '<p style="color:var(--text-muted);font-size:13px;">No social links yet</p>';
        return;
    }

    Object.entries(socialLinks).forEach(([platform, username]) => {
        const platformLower = platform.toLowerCase();
        const platformInfo = socialPlatforms[platformLower];
        if (!platformInfo) return;

        const div = document.createElement('div');
        div.className = 'social-item';
        
        const link = document.createElement('a');
        link.href = platformInfo.url + username;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        link.innerHTML = `
            <span class="social-icon">${platformInfo.svg}</span>
            <span class="social-platform">${platformInfo.name}</span>
            <span class="social-username">${username}</span>
        `;

        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'social-delete public-hide'; // 🔥 AQUÍ AGREGAMOS public-hide
        deleteBtn.dataset.platform = platform;
        deleteBtn.textContent = '✕';

        div.appendChild(link);
        div.appendChild(deleteBtn);
        container.appendChild(div);
    });
}

// ============================================================
// FUNCIONES DE SPOTIFY
// ============================================================
async function fetchSpotify(endpoint) {
    const token = localStorage.getItem('token');
    if (!token) {
        console.error('❌ No hay token de autenticación');
        return null;
    }

    try {
        console.log(`📤 Fetching: ${endpoint}`);
        const response = await fetch(`${API_URL}/${endpoint}`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });

        console.log(`📊 Response status: ${response.status} for ${endpoint}`);

        if (!response.ok) {
            console.error(`❌ Error ${response.status} en ${endpoint}: ${response.statusText}`);
            if (response.status === 401) {
                console.warn('⚠️ Token de Spotify expirado. Reconecta tu cuenta.');
                const spotifyStatus = document.getElementById('spotify-status');
                const spotifyBadge = document.getElementById('spotify-badge');
                if (spotifyStatus) spotifyStatus.textContent = 'Session expired';
                if (spotifyBadge) {
                    spotifyBadge.textContent = 'Reconnect';
                    spotifyBadge.style.background = '#ff6b6b';
                    spotifyBadge.style.color = '#fff';
                }
                return null;
            }
            return null;
        }

        const data = await response.json();
        console.log(`✅ Datos recibidos de ${endpoint}:`, data);
        return data;
    } catch (error) {
        console.error(`❌ Error en fetchSpotify (${endpoint}):`, error);
        return null;
    }
}

// Función para actualizar el Now Playing en modo público (cada 2 segundos)
async function updatePublicNowPlaying(username) {
    try {
        const response = await fetch(`${API_URL}/public-spotify/${username}`);
        if (!response.ok) return;
        const data = await response.json();
        
        if (data.connected && data.currently_playing?.item) {
            const track = data.currently_playing.item;
            const modalTrack = document.getElementById('modal-track-name');
            const modalArtist = document.getElementById('modal-track-artist');
            const modalCover = document.getElementById('modal-cover');
            const modalNow = document.getElementById('modal-now-playing');
            
            modalTrack.textContent = track.name || 'Unknown';
            modalArtist.textContent = track.artists?.[0]?.name || 'Unknown';
            modalCover.src = track.album?.images?.[0]?.url || 'https://picsum.photos/60/60?random=3';
            modalNow.style.display = 'flex';
            
            // 🔥 NUEVO: Extraer color del cover y actualizar la variable CSS
            if (modalCover.src) {
                extractAccentColorFromImage(modalCover.src).then(color => {
                    if (color) {
                        document.documentElement.style.setProperty('--track-accent', color);
                        const rgbValues = color.match(/\d+/g);
                        if (rgbValues && rgbValues.length === 3) {
                            document.documentElement.style.setProperty('--track-accent-rgb', rgbValues.join(','));
                        }
                    }
                });
            }
            
            // Hacer clickeable
            modalNow.style.cursor = 'pointer';
            modalNow.onclick = () => {
                if (track.external_urls?.spotify) window.open(track.external_urls.spotify, '_blank');
            };
        } else {
            // Si no hay canción sonando, ocultar el Now Playing
            document.getElementById('modal-now-playing').style.display = 'none';
        }
    } catch (error) {
        // Silenciar errores
    }
}

// Cargar datos de Spotify en modo público (sin login)
async function loadModalDataPublic() {
    console.log('📥 Cargando modal en modo público (solo visualización)');

    // Obtener el username de la URL
    const urlParams = new URLSearchParams(window.location.search);
    const username = urlParams.get('user');

    // 🔥 INICIAR ACTUALIZACIÓN DEL NOW PLAYING CADA 2 SEGUNDOS
    updatePublicNowPlaying(username);
    setInterval(() => updatePublicNowPlaying(username), 2000);

    try {
        const response = await fetch(`${API_URL}/public-spotify/${username}`);
        if (!response.ok) throw new Error('No se pudieron cargar los datos de Spotify');

        const data = await response.json();
        console.log('✅ Datos de Spotify público recibidos:', data);

        if (data.connected) {
            // ===== TOP ARTISTS =====
            const artistContainer = document.getElementById('modal-artist-list');
            if (data.top_artists?.items) {
                artistContainer.innerHTML = '';
                data.top_artists.items.slice(0, 5).forEach((artist, i) => {
                    const div = document.createElement('div');
                    div.className = 'artist-item';
                    div.innerHTML = `
                        <span class="rank">${i + 1}</span>
                        <img src="${artist.images?.[0]?.url || 'https://picsum.photos/30/30?random=' + i}" class="artist-avatar" />
                        <span>${artist.name || 'Unknown'}</span>
                    `;
                    div.style.cursor = 'pointer';
                    div.addEventListener('click', () => {
                        if (artist.external_urls?.spotify) window.open(artist.external_urls.spotify, '_blank');
                    });
                    artistContainer.appendChild(div);
                });
            }

            // ===== TOP TRACKS =====
            const trackContainer = document.getElementById('modal-tracks-list');
            if (data.top_tracks?.items) {
                trackContainer.innerHTML = '';
                data.top_tracks.items.slice(0, 5).forEach((track, i) => {
                    const div = document.createElement('div');
                    div.className = 'track-item';
                    div.innerHTML = `
                        <span class="rank">${i + 1}</span>
                        <img src="${track.album?.images?.[0]?.url || 'https://picsum.photos/30/30?random=' + i}" class="track-avatar" />
                        <span>${track.name || 'Unknown'}</span>
                        <span class="track-artist-name">${track.artists?.[0]?.name || 'Unknown'}</span>
                    `;
                    div.style.cursor = 'pointer';
                    div.addEventListener('click', () => {
                        if (track.external_urls?.spotify) window.open(track.external_urls.spotify, '_blank');
                    });
                    trackContainer.appendChild(div);
                });
            }

            // ===== RECENT LIKES =====
            const likesGrid = document.getElementById('modal-likes-grid');
            if (data.saved_tracks?.items) {
                likesGrid.innerHTML = '';
                data.saved_tracks.items.slice(0, 6).forEach((item, i) => {
                    const track = item.track;
                    const div = document.createElement('div');
                    div.className = 'like-item';
                    div.innerHTML = `
                        <img src="${track.album?.images?.[0]?.url || 'https://picsum.photos/50/50?random=' + i}" />
                        <span>${track.name || 'Unknown'}</span>
                    `;
                    div.style.cursor = 'pointer';
                    div.addEventListener('click', () => {
                        if (track.external_urls?.spotify) window.open(track.external_urls.spotify, '_blank');
                    });
                    likesGrid.appendChild(div);
                });
            }

            // ===== FOLLOWING (Carrusel) =====
            const followingList = document.getElementById('modal-following-list');
            if (data.following?.artists?.items) {
                followingList.innerHTML = '';
                data.following.artists.items.slice(0, 20).forEach((artist) => {
                    const div = document.createElement('div');
                    div.className = 'carousel-item';
                    div.innerHTML = `
                        <img src="${artist.images?.[0]?.url || 'https://picsum.photos/80/80?random=' + Math.random()}" class="item-image" />
                        <p class="item-name">${artist.name || 'Unknown'}</p>
                    `;
                    div.addEventListener('click', () => {
                        if (artist.external_urls?.spotify) window.open(artist.external_urls.spotify, '_blank');
                    });
                    followingList.appendChild(div);
                });
            }

            // ===== SAVED ALBUMS (Carrusel) =====
            const albumsList = document.getElementById('modal-albums-list');
            if (data.saved_albums?.items) {
                albumsList.innerHTML = '';
                data.saved_albums.items.slice(0, 20).forEach((item) => {
                    const album = item.album;
                    const div = document.createElement('div');
                    div.className = 'carousel-item square';
                    div.innerHTML = `
                        <img src="${album.images?.[0]?.url || 'https://picsum.photos/80/80?random=' + Math.random()}" class="item-image" />
                        <p class="item-name">${album.name || 'Unknown'}</p>
                        <p class="item-subtitle">${album.artists?.[0]?.name || 'Unknown'}</p>
                    `;
                    div.addEventListener('click', () => {
                        if (album.external_urls?.spotify) window.open(album.external_urls.spotify, '_blank');
                    });
                    albumsList.appendChild(div);
                });
            }

            // ===== PLAYLISTS (Carrusel) =====
            const playlistsList = document.getElementById('modal-playlists-list');
            if (data.playlists?.length > 0) {
                playlistsList.innerHTML = '';
                data.playlists.slice(0, 10).forEach((playlist) => {
                    const div = document.createElement('div');
                    div.className = 'carousel-item square';
                    div.innerHTML = `
                        <img src="${playlist.images?.[0]?.url || 'https://picsum.photos/80/80?random=' + Math.random()}" class="item-image" />
                        <p class="item-name">${playlist.name || 'Untitled'}</p>
                    `;
                    div.addEventListener('click', () => {
                        if (playlist.external_urls?.spotify) window.open(playlist.external_urls.spotify, '_blank');
                    });
                    playlistsList.appendChild(div);
                });
            }

        } else {
            document.getElementById('modal-artist-list').innerHTML = '<div style="color: var(--text-muted); padding: 10px;">Este usuario no tiene Spotify conectado.</div>';
        }

    } catch (error) {
        console.error('❌ Error cargando datos públicos de Spotify:', error);
        document.getElementById('modal-artist-list').innerHTML = '<div style="color: var(--text-muted); padding: 10px;">No se pudieron cargar los datos de Spotify.</div>';
    }

    // Inicializar carruseles
    setupCarousel('following');
    setupCarousel('albums');
    setupCarousel('playlists');
}
// Cargar datos de Spotify con sesión activa (usuario logueado)
async function loadModalData() {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}/all-spotify-data`, {
        headers: { 'Authorization': `Bearer ${token}` }
    });
    
    const data = await response.json();
    console.log('✅ Todos los datos recibidos:', data);

    // Renderizar Top Artists
    const artistContainer = document.getElementById('modal-artist-list');
    if (data.top_artists?.items) {
        artistContainer.innerHTML = '';
        data.top_artists.items.slice(0, 5).forEach((artist, i) => {
            const div = document.createElement('div');
            div.className = 'artist-item';
            div.innerHTML = `
                <span class="rank">${i + 1}</span>
                <img src="${artist.images?.[0]?.url || 'https://picsum.photos/30/30?random=' + i}" class="artist-avatar" />
                <span>${artist.name || 'Unknown'}</span>
            `;
            div.style.cursor = 'pointer';
            div.addEventListener('click', () => {
                if (artist.external_urls?.spotify) window.open(artist.external_urls.spotify, '_blank');
            });
            artistContainer.appendChild(div);
        });
    }

    // Renderizar Top Tracks
    const trackContainer = document.getElementById('modal-tracks-list');
    if (data.top_tracks?.items) {
        trackContainer.innerHTML = '';
        data.top_tracks.items.slice(0, 5).forEach((track, i) => {
            const div = document.createElement('div');
            div.className = 'track-item';
            div.innerHTML = `
                <span class="rank">${i + 1}</span>
                <img src="${track.album?.images?.[0]?.url || 'https://picsum.photos/30/30?random=' + i}" class="track-avatar" />
                <span>${track.name || 'Unknown'}</span>
                <span class="track-artist-name">${track.artists?.[0]?.name || 'Unknown'}</span>
            `;
            div.style.cursor = 'pointer';
            div.addEventListener('click', () => {
                if (track.external_urls?.spotify) window.open(track.external_urls.spotify, '_blank');
            });
            trackContainer.appendChild(div);
        });
    }

    // Renderizar Recent Likes
    const likesGrid = document.getElementById('modal-likes-grid');
    if (data.saved_tracks?.items) {
        likesGrid.innerHTML = '';
        data.saved_tracks.items.slice(0, 6).forEach((item, i) => {
            const track = item.track;
            const div = document.createElement('div');
            div.className = 'like-item';
            div.innerHTML = `
                <img src="${track.album?.images?.[0]?.url || 'https://picsum.photos/50/50?random=' + i}" />
                <span>${track.name || 'Unknown'}</span>
            `;
            div.style.cursor = 'pointer';
            div.addEventListener('click', () => {
                if (track.external_urls?.spotify) window.open(track.external_urls.spotify, '_blank');
            });
            likesGrid.appendChild(div);
        });
    }

    // Renderizar Following
    const followingList = document.getElementById('modal-following-list');
    if (data.following?.artists?.items) {
        followingList.innerHTML = '';
        data.following.artists.items.slice(0, 20).forEach((artist) => {
            const div = document.createElement('div');
            div.className = 'carousel-item';
            div.innerHTML = `
                <img src="${artist.images?.[0]?.url || 'https://picsum.photos/80/80?random=' + Math.random()}" class="item-image" />
                <p class="item-name">${artist.name || 'Unknown'}</p>
            `;
            div.addEventListener('click', () => {
                if (artist.external_urls?.spotify) window.open(artist.external_urls.spotify, '_blank');
            });
            followingList.appendChild(div);
        });
    }

    // Renderizar Saved Albums
    const albumsList = document.getElementById('modal-albums-list');
    if (data.saved_albums?.items) {
        albumsList.innerHTML = '';
        data.saved_albums.items.slice(0, 20).forEach((item) => {
            const album = item.album;
            const div = document.createElement('div');
            div.className = 'carousel-item square';
            div.innerHTML = `
                <img src="${album.images?.[0]?.url || 'https://picsum.photos/80/80?random=' + Math.random()}" class="item-image" />
                <p class="item-name">${album.name || 'Unknown'}</p>
                <p class="item-subtitle">${album.artists?.[0]?.name || 'Unknown'}</p>
            `;
            div.addEventListener('click', () => {
                if (album.external_urls?.spotify) window.open(album.external_urls.spotify, '_blank');
            });
            albumsList.appendChild(div);
        });
    }

    // Renderizar Playlists
    const playlistsList = document.getElementById('modal-playlists-list');
    if (data.playlists?.items) {
        playlistsList.innerHTML = '';
        data.playlists.items.slice(0, 10).forEach((playlist) => {
            const div = document.createElement('div');
            div.className = 'carousel-item square';
            div.innerHTML = `
                <img src="${playlist.images?.[0]?.url || 'https://picsum.photos/80/80?random=' + Math.random()}" class="item-image" />
                <p class="item-name">${playlist.name || 'Untitled'}</p>
            `;
            div.addEventListener('click', () => {
                if (playlist.external_urls?.spotify) window.open(playlist.external_urls.spotify, '_blank');
            });
            playlistsList.appendChild(div);
        });
    }

    // Inicializar carruseles (aunque estén vacíos)
    setupCarousel('following');
    setupCarousel('albums');
    setupCarousel('playlists');

    // Iniciar Now Playing en tiempo real
    startNowPlayingUpdates();
}
// Función para manejar los botones de los carruseles
function setupCarousel(type) {
    const prevBtn = document.getElementById(`${type}-prev`);
    const nextBtn = document.getElementById(`${type}-next`);
    const track = document.getElementById(`modal-${type}-list`);

    if (!prevBtn || !nextBtn || !track) return;

    const scrollAmount = 100;

    prevBtn.addEventListener('click', () => {
        track.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    });

    nextBtn.addEventListener('click', () => {
        track.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    });
}

// ============================================================
// NOW PLAYING - ACTUALIZACIÓN CADA 2 SEGUNDOS
// ============================================================
let nowPlayingInterval = null;

function startNowPlayingUpdates() {
    if (nowPlayingInterval) {
        clearInterval(nowPlayingInterval);
        nowPlayingInterval = null;
    }
    console.log('▶️ Iniciando actualización de "Now Playing" cada 2 segundos');
    updateNowPlayingOnly();
    nowPlayingInterval = setInterval(updateNowPlayingOnly, 2000);
}

function stopNowPlayingUpdates() {
    if (nowPlayingInterval) {
        console.log('⏹️ Deteniendo actualización de "Now Playing"');
        clearInterval(nowPlayingInterval);
        nowPlayingInterval = null;
    }
}

async function updateNowPlayingOnly() {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
        const response = await fetch(`${API_URL}/currently-playing`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });

        if (!response.ok) {
            if (response.status === 401) updateNowPlayingUI(null);
            return;
        }

        const data = await response.json();
        updateNowPlayingUI(data);
    } catch (error) {
        // Silenciar errores
    }
}

// Extraer color del cover en el navegador (sin backend)
async function extractAccentColorFromImage(imageUrl) {
    return new Promise((resolve) => {
        const img = new Image();
        img.crossOrigin = "Anonymous";
        img.src = imageUrl;
        
        img.onload = () => {
            try {
                const canvas = document.createElement('canvas');
                canvas.width = 1;
                canvas.height = 1;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, 1, 1);
                const pixel = ctx.getImageData(0, 0, 1, 1).data;
                
                let r = pixel[0];
                let g = pixel[1];
                let b = pixel[2];

                // Aplicar gamma (convertir a HSL y ajustar)
                let rN = r / 255;
                let gN = g / 255;
                let bN = b / 255;
                let max = Math.max(rN, gN, bN), min = Math.min(rN, gN, bN);
                let h, s, l = (max + min) / 2;

                if (max === min) {
                    h = s = 0; 
                } else {
                    let d = max - min;
                    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
                    switch (max) {
                        case rN: h = (gN - bN) / d + (gN < bN ? 6 : 0); break;
                        case gN: h = (bN - rN) / d + 2; break;
                        case bN: h = (rN - gN) / d + 4; break;
                    }
                    h /= 6;
                }

                // Filtro de seguridad (gamma de Spotify)
                if (l < 0.25) l = 0.25;
                if (l > 0.85) l = 0.85;
                if (s < 0.3) s = 0.3;

                // Convertir HSL de vuelta a RGB
                const hue2rgb = (p, q, t) => {
                    if (t < 0) t += 1;
                    if (t > 1) t -= 1;
                    if (t < 1/6) return p + (q - p) * 6 * t;
                    if (t < 1/2) return q;
                    if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
                    return p;
                };

                let q = l < 0.5 ? l * (1 + s) : l + s - l * s;
                let p = 2 * l - q;
                let newR = Math.round(hue2rgb(p, q, h + 1/3) * 255);
                let newG = Math.round(hue2rgb(p, q, h) * 255);
                let newB = Math.round(hue2rgb(p, q, h - 1/3) * 255);

                resolve(`rgb(${newR}, ${newG}, ${newB})`);
            } catch (e) {
                resolve(null);
            }
        };
        
        img.onerror = () => resolve(null);
    });
}

function updateNowPlayingUI(spotifyData) {
    const modalTrack = document.getElementById('modal-track-name');
    const modalArtist = document.getElementById('modal-track-artist');
    const modalCover = document.getElementById('modal-cover');
    const modalNow = document.getElementById('modal-now-playing');
    const pulseBars = document.getElementById('modal-pulse-bars');

    if (!modalNow || !modalTrack) return;

    if (!spotifyData || !spotifyData.item || !spotifyData.is_playing) {
        modalNow.style.display = 'none';
        return;
    }

    const track = spotifyData.item;
    modalTrack.textContent = track.name || 'Unknown';
    modalArtist.textContent = track.artists?.[0]?.name || 'Unknown';
    modalCover.src = track.album?.images?.[0]?.url || 'https://picsum.photos/60/60?random=3';
    modalNow.style.display = 'flex';
    if (pulseBars) pulseBars.style.opacity = '1';
    
    // 🔥 Extraer color del cover y actualizar la variable CSS
    if (modalCover.src) {
        extractAccentColorFromImage(modalCover.src).then(color => {
            if (color) {
                document.documentElement.style.setProperty('--track-accent', color);
                const rgbValues = color.match(/\d+/g);
                if (rgbValues && rgbValues.length === 3) {
                    document.documentElement.style.setProperty('--track-accent-rgb', rgbValues.join(','));
                }
            }
        });
    }
    
    // Hacer clickeable
    modalNow.style.cursor = 'pointer';
    modalNow.onclick = () => {
        if (track.external_urls?.spotify) {
            window.open(track.external_urls.spotify, '_blank');
        }
    };
}

// ============================================================
// LIGHTBOX (Ver imágenes en grande)
// ============================================================
function openLightbox(src) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    lightboxImg.src = src;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
}

// Agregar evento de click a todas las imágenes (bio, banner, avatar)
document.addEventListener('click', (e) => {
    if (e.target.tagName === 'IMG' && !e.target.closest('.modal')) {
        e.stopPropagation();
        openLightbox(e.target.src);
    }
});

// Cerrar lightbox al hacer click fuera
document.getElementById('lightbox')?.addEventListener('click', (e) => {
    if (e.target.id === 'lightbox') {
        closeLightbox();
    }
});

// ============================================================
// BIO CON HTML
// ============================================================
function renderBioWithHTML(bio) {
    const displayBio = document.getElementById('display-bio');
    if (!displayBio) return;

    if (!bio || bio.trim() === '') {
        displayBio.innerHTML = '<em style="color: var(--text-muted);">Edit your bio</em>';
        return;
    }

    const cleanBio = DOMPurify.sanitize(bio, {
        ALLOWED_TAGS: [
            'b', 'strong', 'i', 'em', 'u', 's', 'strike',
            'a', 'br', 'p', 'span', 'div',
            'img', 'ul', 'ol', 'li', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
            'blockquote', 'code', 'pre', 'hr'
        ],
        ALLOWED_ATTR: ['href', 'target', 'rel', 'style', 'class', 'id', 'src', 'alt', 'width', 'height']
    });

    displayBio.innerHTML = cleanBio;
}

// ============================================================
// SHARE TOAST
// ============================================================
function showShareToast(message, type = 'success') {
    let toast = document.querySelector('.share-toast');
    if (!toast) {
        toast = document.createElement('div');
        toast.className = 'share-toast';
        document.body.appendChild(toast);
    }
    
    toast.textContent = message;
    toast.className = `share-toast ${type}`;
    void toast.offsetWidth;
    toast.classList.add('show');
    
    clearTimeout(toast._timeout);
    toast._timeout = setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}