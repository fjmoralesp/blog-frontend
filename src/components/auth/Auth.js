import React, { useState } from 'react';
import Navbar from './navbar/Navbar';
import SignUp from './forms/SignUp';
import Login from './forms/Login';
import { FORMS } from '../../constants/constants';

function Auth() {
    const [form, setForm] = useState('');

    const handleFormChange = (form) => {
        setForm(form);
    }

    const onSuccess = () => {
        setForm(null);
    }

    const onLogout = () => {
        setForm(FORMS.LOGIN);
    }

    return (
        <>
            <Navbar onChange={handleFormChange} onLogout={onLogout} />
            {form === FORMS.SIGN_UP && <SignUp onSuccess={onSuccess} />}
            {form === FORMS.LOGIN && <Login onSuccess={onSuccess} />}
        </>
    );
}

export default Auth;
