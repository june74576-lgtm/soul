    // ============================================================
    // 1. IMPORTAR LIBRERÍAS
    // ============================================================
    const express = require('express');
    const axios = require('axios');
    const querystring = require('querystring');
    const cors = require('cors');
    const multer = require('multer');
    const { createClient } = require('@supabase/supabase-js');
    const jwt = require('jsonwebtoken');
    require('dotenv').config();

    const app = express();

    // ============================================================
    // CONFIGURACIÓN DE CORS (CORREGIDO PARA RENDER)
    // ============================================================
    // 🔥 CONFIGURACIÓN MANUAL - MÁS CONFIABLE
    app.use((req, res, next) => {
        // Permite explícitamente tu dominio de Netlify
        const allowedOrigins = [
            'https://courageous-biscochitos-8c3cca.netlify.app',
            'https://*.netlify.app',
            'http://127.0.0.1:3000',
            'http://localhost:3000'
        ];
        
        const origin = req.headers.origin;
        // Si el origen está en la lista o es de netlify.app, permítelo
        if (origin && (allowedOrigins.includes(origin) || origin.includes('netlify.app'))) {
            res.header('Access-Control-Allow-Origin', origin);
        } else {
            // Para pruebas, permite todo (en producción, especifica los dominios)
            res.header('Access-Control-Allow-Origin', '*');
        }
        
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        res.header('Access-Control-Allow-Credentials', 'true');
        
        // Responder a las solicitudes OPTIONS (preflight)
        if (req.method === 'OPTIONS') {
            return res.status(200).json({});
        }
        next();
    });
    app.use(express.json());  // ← Necesario para leer req.body
    app.use(cors());          // ← Respaldo para CORS

    // ============================================================
    // 3. CONFIGURACIÓN DE ENTORNO
    // ============================================================
    const SUPABASE_URL = process.env.SUPABASE_URL;
    const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;
    const JWT_SECRET = process.env.JWT_SECRET;

    console.log('🔑 JWT_SECRET cargado:', JWT_SECRET ? '✅ Sí' : '❌ No');
    console.log('🔑 SUPABASE_URL cargado:', SUPABASE_URL ? '✅ Sí' : '❌ No');
    console.log('🔑 SUPABASE_ANON_KEY cargado:', SUPABASE_ANON_KEY ? '✅ Sí' : '❌ No');

    const supabase = createClient(SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

    // Spotify
    const spotifyClientId = 'fed9178fa0784af6a1c611ac82c91f60';
    const spotifyClientSecret = '289897deab3b4d5e8957c61de046f8a8';
    const spotifyRedirectUri = 'https://soul-backend-hbdp.onrender.com/callback';  // ← CAMBIADO

    // ============================================================
    // 4. RUTA DE PRUEBA
    // ============================================================
    // ============================================================
    // RUTA RAÍZ (PARA RENDER)
    // ============================================================
    app.get('/', (req, res) => {
        res.json({
            message: '🚀 SOUL API está funcionando',
            version: '1.0.0',
            endpoints: {
                test: '/test',
                ping: '/ping',
                auth: {
                    login: '/auth/login [POST]',
                    register: '/auth/register [POST]',
                    me: '/auth/me [GET]'
                },
                profile: '/profile [PUT]',
                spotify: {
                    connect: '/spotify/connect [GET]',
                    status: '/spotify/status [GET]',
                    currently_playing: '/currently-playing [GET]',
                    recent_tracks: '/recent-tracks [GET]',
                    top_artists: '/top-artists [GET]',
                    top_tracks: '/top-tracks [GET]',
                    playlists: '/playlists [GET]'
                }
            },
            status: 'online',
            timestamp: new Date().toISOString()
        });
    });

    // ============================================================
    // 5. FUNCIÓN AUXILIAR
    // ============================================================
    const generateRandomString = (length) => {
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return result;
    };

    // ============================================================
    // 6. MIDDLEWARE: VERIFICAR TOKEN
    // ============================================================
    const verifyToken = (req, res, next) => {
        const authHeader = req.headers.authorization;
        console.log('🔍 Headers de autorización:', authHeader ? '✅ Presente' : '❌ Ausente');

        if (!authHeader) {
            console.log('❌ No hay header de autorización');
            return res.status(401).json({ error: 'No token' });
        }

        const token = authHeader.split(' ')[1];
        console.log('📝 Token recibido (primeros 30 chars):', token?.substring(0, 30) + '...');

        if (!token) {
            console.log('❌ No hay token en el header');
            return res.status(401).json({ error: 'No token' });
        }

        try {
            const decoded = jwt.verify(token, JWT_SECRET);
            console.log('✅ Token válido para:', decoded.email);
            
            req.user = {
                id: decoded.userId,
                email: decoded.email
            };
            
            next();
        } catch (error) {
            console.error('❌ Error al verificar token:', error.message);
            
            if (error.name === 'TokenExpiredError') {
                return res.status(401).json({ error: 'Token expirado' });
            }
            if (error.name === 'JsonWebTokenError') {
                return res.status(401).json({ error: 'Token inválido: ' + error.message });
            }
            
            res.status(401).json({ error: 'Error al verificar token' });
        }
    };

    // ============================================================
    // 7. AUTH: LOGIN
    // ============================================================
    app.post('/auth/login', async (req, res) => {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: 'Faltan campos: email y password son requeridos' });
        }

        try {
            const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (authError) throw authError;

            const { data: profile, error: profileError } = await supabase
                .from('profiles')
                .select('*')
                .eq('user_id', authData.user.id)
                .single();

            if (profileError && profileError.code !== 'PGRST116') throw profileError;

            const token = jwt.sign(
                {
                    userId: authData.user.id,
                    email: authData.user.email,
                    iat: Math.floor(Date.now() / 1000)
                },
                JWT_SECRET,
                { expiresIn: '7d' }
            );

            console.log('✅ Login exitoso para:', email);

            res.json({
                token: token,
                user: {
                    id: authData.user.id,
                    email: authData.user.email,
                    username: profile?.username || email,
                    bio: profile?.bio || '',
                    banner_url: profile?.banner_url || '',
                    avatar_url: profile?.avatar_url || '',
                    social_links: profile?.social_links || {},
                    spotify_connected: profile?.spotify_connected || false,
                }
            });

        } catch (error) {
            console.error('❌ Error en login:', error);
            res.status(500).json({ error: error.message });
        }
    });

    // ============================================================
    // 8. AUTH: REGISTRO
    // ============================================================
    app.post('/auth/register', async (req, res) => {
        const { email, password, username } = req.body;

        if (!email || !password || !username) {
            return res.status(400).json({ error: 'Faltan campos: email, password y username son requeridos' });
        }

        try {
            const { data: authData, error: authError } = await supabase.auth.signUp({
                email,
                password,
            });

            if (authError) throw authError;

            const { error: profileError } = await supabase
                .from('profiles')
                .insert({
                    user_id: authData.user.id,
                    username: username,
                    social_links: {},
                });

            if (profileError) throw profileError;

            const token = jwt.sign(
                {
                    userId: authData.user.id,
                    email: email,
                    iat: Math.floor(Date.now() / 1000)
                },
                JWT_SECRET,
                { expiresIn: '7d' }
            );

            console.log('✅ Registro exitoso para:', email);

            res.json({
                token: token,
                user: {
                    id: authData.user.id,
                    email,
                    username,
                }
            });

        } catch (error) {
            console.error('❌ Error en registro:', error);
            res.status(500).json({ error: error.message });
        }
    });

    // ============================================================
    // 9. AUTH: OBTENER PERFIL
    // ============================================================
    app.get('/auth/me', verifyToken, async (req, res) => {
        try {
            console.log('🔍 Buscando perfil para usuario:', req.user.id);

            const { data: profile, error } = await supabase
                .from('profiles')
                .select('*')
                .eq('user_id', req.user.id)
                .maybeSingle();

            if (error) {
                console.error('❌ Error en Supabase:', error);
                throw error;
            }

            if (!profile) {
                console.log('⚠️ No se encontró perfil, creando uno por defecto...');
                
                const { data: newProfile, error: insertError } = await supabase
                    .from('profiles')
                    .insert({
                        user_id: req.user.id,
                        username: req.user.email?.split('@')[0] || 'user',
                        social_links: {},
                    })
                    .select()
                    .single();

                if (insertError) {
                    console.error('❌ Error al crear perfil:', insertError);
                    throw insertError;
                }

                console.log('✅ Perfil creado:', newProfile);
                
                return res.json({
                    id: req.user.id,
                    email: req.user.email,
                    username: newProfile.username,
                    bio: newProfile.bio || '',
                    banner_url: newProfile.banner_url || '',
                    avatar_url: newProfile.avatar_url || '',
                    social_links: newProfile.social_links || {},
                    spotify_connected: newProfile.spotify_connected || false,
                });
            }

            console.log('✅ Perfil encontrado:', profile);

            res.json({
                id: req.user.id,
                email: req.user.email,
                username: profile.username,
                bio: profile.bio || '',
                banner_url: profile.banner_url || '',
                avatar_url: profile.avatar_url || '',
                social_links: profile.social_links || {},
                spotify_connected: profile.spotify_connected || false,
            });

        } catch (error) {
            console.error('❌ Error en /auth/me:', error);
            res.status(500).json({ error: error.message });
        }
    });

    // ============================================================
    // 10. PERFIL: ACTUALIZAR
    // ============================================================
    app.put('/profile', verifyToken, async (req, res) => {
        const { username, bio, social_links } = req.body;

        try {
            const updates = {};
            if (username !== undefined) updates.username = username;
            if (bio !== undefined) updates.bio = bio;
            if (social_links !== undefined) updates.social_links = social_links;
            updates.updated_at = new Date();

            const { data, error } = await supabase
                .from('profiles')
                .update(updates)
                .eq('user_id', req.user.id)
                .select()
                .single();

            if (error) throw error;

            res.json(data);

        } catch (error) {
            console.error('❌ Error al actualizar perfil:', error);
            res.status(500).json({ error: error.message });
        }
    });

        // ============================================================
    // 11. PERFIL: SUBIR IMAGEN (CORREGIDO PARA BUCKET 'images')
    // ============================================================
    const storage = multer.memoryStorage();
    const upload = multer({
        storage,
        limits: { 
            fileSize: 5 * 1024 * 1024, // 5MB
            files: 1
        },
        fileFilter: (req, file, cb) => {
            const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml'];
            if (allowedTypes.includes(file.mimetype)) {
                cb(null, true);
            } else {
                cb(new Error('Tipo de archivo no soportado. Usa JPEG, PNG, GIF, WEBP o SVG.'), false);
            }
        }
    });

    app.post('/profile/upload', verifyToken, upload.single('image'), async (req, res) => {
        console.log('📤 Recibida solicitud de subida de imagen');
        console.log('📦 Body:', req.body);
        console.log('📦 File:', req.file ? '✅ Recibido' : '❌ No recibido');

        // Verificar que se recibió el archivo
        if (!req.file) {
            return res.status(400).json({ 
                error: 'No se subió ninguna imagen. Asegúrate de seleccionar un archivo.' 
            });
        }

        // Verificar el tipo de imagen
        const type = req.body.type;
        if (!type || (type !== 'banner' && type !== 'avatar')) {
            return res.status(400).json({ 
                error: 'Tipo de imagen inválido. Usa "banner" o "avatar".' 
            });
        }

        try {
            // 1. Preparar el archivo (SIN CARPETAS ANIDADAS, solo nombre único)
            const fileExt = req.file.originalname.split('.').pop();
            const fileName = `${req.user.id}_${Date.now()}.${fileExt}`;
            
            console.log(`📝 Subiendo ${type} con nombre: ${fileName}`);
            console.log(`📊 Tamaño: ${(req.file.size / 1024).toFixed(2)} KB`);
            console.log(`📊 Tipo: ${req.file.mimetype}`);

            // 2. Subir el archivo directamente a la raíz del bucket 'images'
            console.log('📤 Subiendo archivo a Supabase Storage...');
            const { error: uploadError } = await supabase.storage
                .from('images') // 👈 AQUÍ USAMOS TU BUCKET 'images'
                .upload(fileName, req.file.buffer, {
                    contentType: req.file.mimetype,
                    cacheControl: '3600',
                    upsert: true // Sobrescribir si existe
                });

            if (uploadError) {
                console.error('❌ Error al subir a Storage:', uploadError);
                throw new Error(`Error al subir la imagen: ${uploadError.message}`);
            }

            console.log('✅ Archivo subido exitosamente a Storage');

            // 3. Obtener la URL pública
            const { data: urlData } = supabase.storage
                .from('images')
                .getPublicUrl(fileName);

            if (!urlData || !urlData.publicUrl) {
                throw new Error('No se pudo obtener la URL pública de la imagen');
            }

            const imageUrl = urlData.publicUrl;
            console.log('🔗 URL pública:', imageUrl);

            // 4. Actualizar el perfil en la base de datos
            const updateField = type === 'banner' ? 'banner_url' : 'avatar_url';
            console.log(`📝 Actualizando campo: ${updateField}`);

            const { data: profile, error: updateError } = await supabase
                .from('profiles')
                .update({ 
                    [updateField]: imageUrl,
                    updated_at: new Date()
                })
                .eq('user_id', req.user.id)
                .select()
                .single();

            if (updateError) {
                console.error('❌ Error al actualizar perfil:', updateError);
                // Intentar eliminar la imagen subida si falla la actualización
                try {
                    await supabase.storage.from('images').remove([fileName]);
                    console.log('🗑️ Imagen eliminada por fallo en actualización');
                } catch (removeError) {
                    console.error('⚠️ Error al eliminar imagen:', removeError);
                }
                throw new Error(`Error al actualizar el perfil: ${updateError.message}`);
            }

            console.log('✅ Perfil actualizado exitosamente');
            console.log('✅ Imagen subida y perfil actualizado');

            // 5. Respuesta exitosa
            res.json({ 
                success: true,
                url: imageUrl, 
                profile: profile,
                message: `${type} actualizado correctamente`
            });

        } catch (error) {
            console.error('❌ Error en /profile/upload:', error);
            
            // Determinar el código de estado apropiado
            let statusCode = 500;
            let errorMessage = error.message || 'Error al subir la imagen';
            
            if (error.message.includes('bucket')) {
                statusCode = 500;
                errorMessage = 'Error de configuración del almacenamiento. Contacta al administrador.';
            } else if (error.message.includes('tamaño') || error.message.includes('size')) {
                statusCode = 413;
                errorMessage = 'El archivo es demasiado grande. Máximo 5MB.';
            } else if (error.message.includes('tipo')) {
                statusCode = 415;
            }
            
            res.status(statusCode).json({ 
                error: errorMessage,
                details: process.env.NODE_ENV === 'development' ? error.stack : undefined
            });
        }
    });
    // ============================================================
    // SPOTIFY: OBTENER PERFIL DEL USUARIO (para obtener su ID)
    // ============================================================
    app.get('/spotify/profile', verifyToken, async (req, res) => {
        try {
            const data = await spotifyRequest(req.user.id, '/me');
            res.json(data);
        } catch (error) {
            const status = error.status || error.response?.status || 500;
            console.error(`❌ Error en /spotify/profile (${status}):`, error.message);
            res.status(status).json({ 
                error: error.message || 'Error al obtener perfil de Spotify'
            });
        }
    });
    // ============================================================
    // RUTA DE DIAGNÓSTICO PARA SPOTIFY
    // ============================================================
    app.get('/spotify/status', verifyToken, async (req, res) => {
        try {
            const { data: profile, error } = await supabase
                .from('profiles')
                .select('spotify_connected, spotify_token, spotify_refresh_token')
                .eq('user_id', req.user.id)
                .single();

            if (error) {
                return res.status(500).json({ error: 'Error al obtener perfil', details: error.message });
            }

            res.json({
                spotify_connected: profile?.spotify_connected || false,
                has_token: !!profile?.spotify_token,
                has_refresh_token: !!profile?.spotify_refresh_token,
                token_preview: profile?.spotify_token ? profile.spotify_token.substring(0, 20) + '...' : null,
                user_id: req.user.id
            });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });
    // ============================================================
    // RUTA DE DIAGNÓSTICO PARA STORAGE
    // ============================================================
    app.get('/storage/status', verifyToken, async (req, res) => {
        try {
            // 1. Verificar buckets
            const { data: buckets, error: bucketsError } = await supabase.storage.listBuckets();
            
            if (bucketsError) {
                return res.status(500).json({ 
                    error: 'Error al listar buckets',
                    details: bucketsError.message
                });
            }

            const imagesBucket = buckets?.find(b => b.name === 'images');

            // 2. Verificar políticas del bucket
            let policies = null;
            if (imagesBucket) {
                try {
                    // Intentar subir un archivo de prueba para verificar permisos
                    const testFile = Buffer.from('test');
                    const { error: testError } = await supabase.storage
                        .from('images')
                        .upload(`test_${Date.now()}.txt`, testFile, {
                            contentType: 'text/plain'
                        });
                    
                    if (testError) {
                        policies = {
                            can_upload: false,
                            error: testError.message
                        };
                    } else {
                        policies = {
                            can_upload: true
                        };
                    }
                } catch (policyError) {
                    policies = {
                        can_upload: false,
                        error: policyError.message
                    };
                }
            }

            // 3. Verificar perfil del usuario
            const { data: profile, error: profileError } = await supabase
                .from('profiles')
                .select('user_id, username, avatar_url, banner_url')
                .eq('user_id', req.user.id)
                .single();

            res.json({
                storage: {
                    buckets_available: buckets?.map(b => b.name) || [],
                    images_bucket_exists: !!imagesBucket,
                    images_bucket_public: imagesBucket?.public || false,
                    policies: policies
                },
                user: {
                    id: req.user.id,
                    has_profile: !!profile,
                    current_avatar: profile?.avatar_url || null,
                    current_banner: profile?.banner_url || null
                }
            });

        } catch (error) {
            console.error('❌ Error en /storage/status:', error);
            res.status(500).json({ 
                error: 'Error al verificar estado del almacenamiento',
                details: error.message
            });
        }
    });

    // ============================================================
    // 12. SPOTIFY: CONECTAR
    // ============================================================
    app.get('/spotify/connect', verifyToken, (req, res) => {
        const state = req.user.id;
        const scope = 'user-read-currently-playing user-top-read user-read-private user-library-read user-library-modify playlist-read-private playlist-read-collaborative';

        const redirectUrl = 'https://accounts.spotify.com/authorize?' +
            querystring.stringify({
                response_type: 'code',
                client_id: spotifyClientId,
                scope: scope,
                redirect_uri: spotifyRedirectUri,
                state: state
            });

        res.json({ url: redirectUrl });
    });

    // ============================================================
    // 13. SPOTIFY: CALLBACK
    // ============================================================
    app.get('/callback', async (req, res) => {
        const code = req.query.code;
        const userId = req.query.state;

        if (!code || !userId) {
            return res.status(400).send('Error: falta código o usuario');
        }

        try {
            const authOptions = {
                url: 'https://accounts.spotify.com/api/token',
                form: {
                    code: code,
                    redirect_uri: spotifyRedirectUri,
                    grant_type: 'authorization_code'
                },
                headers: {
                    'Authorization': 'Basic ' + Buffer.from(spotifyClientId + ':' + spotifyClientSecret).toString('base64'),
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            };

            const response = await axios.post(authOptions.url, querystring.stringify(authOptions.form), {
                headers: authOptions.headers
            });

            const access_token = response.data.access_token;
            const refresh_token = response.data.refresh_token;

            const { error: updateError } = await supabase
                .from('profiles')
                .update({
                    spotify_token: access_token,
                    spotify_refresh_token: refresh_token,
                    spotify_connected: true,
                    updated_at: new Date()
                })
                .eq('user_id', userId);

            if (updateError) throw updateError;

            // Redirigir al frontend
                    // Redirigir al frontend
            res.redirect('https://courageous-biscochitos-8c3cca.netlify.app?spotify=connected');  // ← CAMBIADO

        } catch (error) {
            console.error('❌ Error en callback Spotify:', error);
            res.status(500).send('Error al conectar Spotify: ' + error.message);
        }
    });

    // ============================================================
    // 14. FUNCIÓN PARA REFRESCAR TOKEN DE SPOTIFY (NUEVO)
    // ============================================================
    const refreshSpotifyToken = async (userId) => {
        try {
            const { data: profile, error } = await supabase
                .from('profiles')
                .select('spotify_refresh_token')
                .eq('user_id', userId)
                .single();

            if (error || !profile?.spotify_refresh_token) {
                throw new Error('No hay refresh token disponible');
            }

            const authOptions = {
                url: 'https://accounts.spotify.com/api/token',
                form: {
                    grant_type: 'refresh_token',
                    refresh_token: profile.spotify_refresh_token
                },
                headers: {
                    'Authorization': 'Basic ' + Buffer.from(spotifyClientId + ':' + spotifyClientSecret).toString('base64'),
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            };

            const response = await axios.post(authOptions.url, querystring.stringify(authOptions.form), {
                headers: authOptions.headers
            });

            const newAccessToken = response.data.access_token;

            const { error: updateError } = await supabase
                .from('profiles')
                .update({
                    spotify_token: newAccessToken,
                    updated_at: new Date()
                })
                .eq('user_id', userId);

            if (updateError) throw updateError;

            return newAccessToken;
        } catch (error) {
            console.error('❌ Error al refrescar token de Spotify:', error);
            throw error;
        }
    };

    // ============================================================
    // FUNCIÓN MEJORADA PARA OBTENER TOKEN DE SPOTIFY
    // ============================================================
    const getSpotifyToken = async (userId) => {
        try {
            console.log(`🔍 Buscando token de Spotify para usuario: ${userId}`);

            const { data: profile, error } = await supabase
                .from('profiles')
                .select('spotify_token, spotify_refresh_token, spotify_connected')
                .eq('user_id', userId)
                .single();

            if (error) {
                console.error('❌ Error al obtener perfil:', error);
                throw new Error(`Error al obtener perfil: ${error.message}`);
            }

            if (!profile) {
                console.error('❌ Perfil no encontrado para usuario:', userId);
                throw new Error('Perfil no encontrado');
            }

            console.log('📊 Perfil encontrado:', {
                spotify_connected: profile.spotify_connected,
                has_token: !!profile.spotify_token,
                has_refresh_token: !!profile.spotify_refresh_token
            });

            if (!profile.spotify_connected) {
                throw new Error('Spotify no está conectado');
            }

            if (!profile.spotify_token) {
                // Intentar refrescar si hay refresh token
                if (profile.spotify_refresh_token) {
                    console.log('🔄 Token ausente, intentando refrescar...');
                    const newToken = await refreshSpotifyToken(userId);
                    return newToken;
                }
                throw new Error('No hay token de Spotify disponible');
            }

            return profile.spotify_token;
        } catch (error) {
            console.error('❌ Error en getSpotifyToken:', error.message);
            throw error;
        }
    };

    // Helper para hacer requests a Spotify con manejo de errores
    // ============================================================
    // SPOTIFY REQUEST CON MANEJO DE ERRORES MEJORADO
    // ============================================================
    const spotifyRequest = async (userId, endpoint, params = {}) => {
        try {
            console.log(`📤 Haciendo request a Spotify: ${endpoint}`);
            
            let token;
            try {
                token = await getSpotifyToken(userId);
            } catch (error) {
                console.error('❌ Error al obtener token:', error.message);
                // Devolver error 401 para que el frontend sepa que debe reconectar
                const err = new Error(error.message);
                err.status = 401;
                throw err;
            }

            try {
                const response = await axios.get(`https://api.spotify.com/v1${endpoint}`, {
                    headers: { 
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                    params: params,
                    timeout: 10000 // 10 segundos timeout
                });
                return response.data;
            } catch (error) {
                console.error(`❌ Error en request a Spotify (${endpoint}):`, {
                    status: error.response?.status,
                    data: error.response?.data,
                    message: error.message
                });

                // Si el token expiró (401), intentamos refrescar
                if (error.response?.status === 401) {
                    console.log('🔄 Token expirado, refrescando...');
                    try {
                        token = await refreshSpotifyToken(userId);
                        
                        const response = await axios.get(`https://api.spotify.com/v1${endpoint}`, {
                            headers: { 'Authorization': `Bearer ${token}` },
                            params: params,
                            timeout: 10000
                        });
                        return response.data;
                    } catch (refreshError) {
                        console.error('❌ Error al refrescar token:', refreshError.message);
                        const err = new Error('Error al refrescar token de Spotify');
                        err.status = 401;
                        throw err;
                    }
                }

                // Si es 204 No Content, devolver vacío
                if (error.response?.status === 204) {
                    return { is_playing: false };
                }

                throw error;
            }
        } catch (error) {
            console.error(`❌ Error en spotifyRequest (${endpoint}):`, {
                message: error.message,
                status: error.status || error.response?.status
            });
            
            // Propagar el error con el código de estado apropiado
            const err = new Error(error.message);
            err.status = error.status || error.response?.status || 500;
            throw err;
        }
    };

    // --- NOW PLAYING ---
    // --- NOW PLAYING ---
    app.get('/currently-playing', verifyToken, async (req, res) => {
        try {
            const data = await spotifyRequest(req.user.id, '/me/player/currently-playing');
            res.json(data);
        } catch (error) {
            const status = error.status || error.response?.status || 500;
            console.error(`❌ Error en /currently-playing (${status}):`, error.message);
            
            // Si es 401, devolver un error claro
            if (status === 401) {
                return res.status(401).json({ 
                    error: 'Spotify no conectado o sesión expirada. Reconecta tu cuenta.',
                    needs_reconnect: true
                });
            }
            
            if (status === 204) {
                return res.json({ is_playing: false });
            }
            
            res.status(status).json({ 
                error: error.message || 'Error al obtener canción actual'
            });
        }
    });

    // --- RECENT TRACKS ---
    app.get('/recent-tracks', verifyToken, async (req, res) => {
        try {
            const data = await spotifyRequest(req.user.id, '/me/tracks', { limit: 6, offset: 0 });
            res.json(data);
        } catch (error) {
            const status = error.status || error.response?.status || 500;
            console.error(`❌ Error en /recent-tracks (${status}):`, error.message);
            
            if (status === 401) {
                return res.status(401).json({ 
                    error: 'Spotify no conectado o sesión expirada. Reconecta tu cuenta.',
                    needs_reconnect: true
                });
            }
            
            res.status(status).json({ 
                error: error.message || 'Error al obtener canciones recientes'
            });
        }
    });

    // --- TOP ARTISTS ---
    app.get('/top-artists', verifyToken, async (req, res) => {
        try {
            const data = await spotifyRequest(req.user.id, '/me/top/artists', { 
                time_range: 'short_term', 
                limit: 5 
            });
            res.json(data);
        } catch (error) {
            const status = error.status || error.response?.status || 500;
            console.error(`❌ Error en /top-artists (${status}):`, error.message);
            
            if (status === 401) {
                return res.status(401).json({ 
                    error: 'Spotify no conectado o sesión expirada. Reconecta tu cuenta.',
                    needs_reconnect: true
                });
            }
            
            res.status(status).json({ 
                error: error.message || 'Error al obtener top artistas'
            });
        }
    });

    // --- TOP TRACKS ---
    app.get('/top-tracks', verifyToken, async (req, res) => {
        try {
            const data = await spotifyRequest(req.user.id, '/me/top/tracks', { 
                time_range: 'short_term', 
                limit: 5 
            });
            res.json(data);
        } catch (error) {
            const status = error.status || error.response?.status || 500;
            console.error(`❌ Error en /top-tracks (${status}):`, error.message);
            
            if (status === 401) {
                return res.status(401).json({ 
                    error: 'Spotify no conectado o sesión expirada. Reconecta tu cuenta.',
                    needs_reconnect: true
                });
            }
            
            res.status(status).json({ 
                error: error.message || 'Error al obtener top tracks'
            });
        }
    });

    // --- PLAYLISTS (SOLO DEL USUARIO) ---
    app.get('/playlists', verifyToken, async (req, res) => {
        try {
            console.log('📤 Obteniendo playlists del usuario...');
            
            // 1. Obtener el perfil del usuario para conocer su ID de Spotify
            const userProfile = await spotifyRequest(req.user.id, '/me');
            const spotifyUserId = userProfile.id;
            console.log(`🔍 Usuario Spotify ID: ${spotifyUserId}`);
            console.log(`🔍 Nombre de usuario: ${userProfile.display_name}`);
            
            // 2. Obtener todas las playlists (incluye las guardadas)
            const data = await spotifyRequest(req.user.id, '/me/playlists', { limit: 50 });
            console.log(`📊 Total de playlists obtenidas: ${data.items.length}`);
            
            // 3. Filtrar SOLO las playlists donde el owner es el usuario
            const userPlaylists = data.items.filter(playlist => {
                const isOwner = playlist.owner?.id === spotifyUserId;
                console.log(`  📌 "${playlist.name}" - Owner: ${playlist.owner?.display_name || playlist.owner?.id} - Es dueño: ${isOwner}`);
                return isOwner;
            });
            
            console.log(`✅ ${userPlaylists.length} playlists del usuario (de ${data.items.length} totales)`);
            
            // 4. Devolver solo las playlists del usuario
            res.json({ items: userPlaylists });
            
        } catch (error) {
            const status = error.status || error.response?.status || 500;
            console.error(`❌ Error en /playlists (${status}):`, error.message);
            
            if (status === 401) {
                return res.status(401).json({ 
                    error: 'Spotify no conectado o sesión expirada. Reconecta tu cuenta.',
                    needs_reconnect: true
                });
            }
            
            res.status(status).json({ 
                error: error.message || 'Error al obtener playlists'
            });
        }
    });

    // ============================================================
    // RUTA DE DIAGNÓSTICO PARA SPOTIFY
    // ============================================================
    app.get('/spotify/status', verifyToken, async (req, res) => {
        try {
            const { data: profile, error } = await supabase
                .from('profiles')
                .select('spotify_connected, spotify_token, spotify_refresh_token')
                .eq('user_id', req.user.id)
                .single();

            if (error) {
                return res.status(500).json({ error: 'Error al obtener perfil', details: error.message });
            }

            res.json({
                spotify_connected: profile?.spotify_connected || false,
                has_token: !!profile?.spotify_token,
                has_refresh_token: !!profile?.spotify_refresh_token,
                token_preview: profile?.spotify_token ? profile.spotify_token.substring(0, 20) + '...' : null,
                user_id: req.user.id
            });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });
    // ============================================================
    // 16. INICIAR SERVIDOR
    // ============================================================
    const PORT = process.env.PORT || 8888;  // ← CAMBIADO
    app.listen(PORT, '0.0.0.0', () => {
        console.log(`🚀 Servidor SOUL corriendo en puerto ${PORT}`);
        console.log(`📌 URL del servidor: https://soul-backend-hbdp.onrender.com`);
    });