import { configureAuth } from 'react-query-auth';

const loadUser = async () => {
    const token = window.localStorage.getItem('token');
    const response = await fetch(`http://localhost:3001/users/me`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (!response.ok || response.status === 403) {
        return null;
    }

    const data = await response.json();

    return data.data;
}

const login = async (data) => {
    const { username, password } = data;
    const response = await fetch('http://localhost:3001/users/login', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: { 'Content-Type': 'application/json' }
    });

    if (!response.ok) {
        throw new Error('Cannot login');
    }

    const apiResponse = await response.json();
    window.localStorage.setItem('token', apiResponse.data.token);
    return apiResponse.data;
}

const signUp = async (data) => {
    const { username, password } = data;
    const response = await fetch('http://localhost:3001/users', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: { 'Content-Type': 'application/json' }
    });

    if (!response.ok) {
        throw new Error('Cannot sign up');
    }

    return await login(data);
}

const logout = async () => {
    window.localStorage.removeItem('token');
}

export const { useUser, useLogin, useRegister, useLogout, AuthLoader } = configureAuth({
    userFn: loadUser,
    loginFn: login,
    registerFn: signUp,
    logoutFn: logout,
});
