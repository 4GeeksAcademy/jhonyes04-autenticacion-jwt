const API_URL = import.meta.env.VITE_BACKEND_URL;

export const register = async (usuario) => {
    try {
        const response = await fetch(API_URL + '/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(usuario),
        });

        if (!response.ok) throw new Error('Error al registrarse');

        const data = await response.json();

        return data;
    } catch (error) {
        throw new Error('Error al registrarse');
    }
};

export const login = async (usuario) => {
    try {
        const response = await fetch(API_URL + '/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(usuario),
        });

        if (!response.ok) throw new Error('Email o contraseña incorrecta');

        const data = await response.json();

        sessionStorage.setItem('token', data.token);
        sessionStorage.setItem('token_expires_at', data.expires_at);
        sessionStorage.setItem('user', JSON.stringify(data.user));

        return data;
    } catch (error) {
        throw new Error('Email o contraseña incorrecta');
    }
};

export const logout = async () => {
    try {
        const response = await fetch(API_URL + '/logout', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem('token')}`,
            },
        });

        if (!response.ok) throw new Error('Error al cerrar sesión');

        const data = await response.json();

        sessionStorage.removeItem('token');
        sessionStorage.removeItem('token_expires_at');
        sessionStorage.removeItem('user');

        return data;
    } catch (error) {
        throw new Error('Error al cerrar sesión');
    }
};

export const rutaProtegida = async () => {
    try {
        const response = await fetch(API_URL + '/privado', {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem('token')}`,
            },
        });

        if (!response.ok) {
            sessionStorage.removeItem('token');
            sessionStorage.removeItem('token_expires_at');
            sessionStorage.removeItem('user');
            throw new Error('Acceso restringido');
        }

        const data = await response.json();

        return data;
    } catch (error) {
        throw new Error('Acceso restringido');
    }
};
