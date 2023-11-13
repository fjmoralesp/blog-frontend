import { configureAuth } from 'react-query-auth';

const loadUser = async (username) => {
    const response = await fetch(`http://localhost:3001/users?username=${username}`);
    if (!response.ok) {
        throw new Error('Cannot load user');
    }

    return await response.json();
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

    return await response.json();
}

const logout = () => {
    console.log('logout');
}

export const { useUser, useLogin, useRegister, useLogout } = configureAuth({
    userFn: loadUser,
    loginFn: login,
    registerFn: signUp,
    logoutFn: logout,
});
