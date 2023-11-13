import React, { useState } from 'react';
import Navbar from './navbar/Navbar';
import SignUp from './forms/SignUp';
import Login from './forms/Login';
import { FORMS } from '../../constants/constants';

function Auth() {
    const [form, setForm] = useState();

    const handleFormChange = (form) => {
        setForm(form);
    }

    return (
        <>
            <Navbar onChange={handleFormChange} />
            {form === FORMS.SIGN_UP && <SignUp />}
            {form === FORMS.LOGIN && <Login />}
        </>
    );
}

export default Auth;
