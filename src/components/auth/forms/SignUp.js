import React, { useState } from 'react';
import { Box, Button, TextField, Toolbar } from '@mui/material';
import { useRegister } from '../../../apis/users.api';

function SignUp({ onSuccess }) {
    const register = useRegister();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }

    const handleClick = () => {
        register.mutate({ username, password }, { onSuccess: () => onSuccess() });
    }

    return (
        <Box component="main" sx={{ p: 2 }}>
            <Toolbar />
            <Box
                component="form"
                sx={{
                    '& .MuiTextField-root': { m: 1, width: '25ch' },
                }}
                noValidate
                autoComplete="off"
            >
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <TextField
                        required
                        id="username"
                        label="Username"
                        value={username}
                        onChange={handleUsernameChange}
                    />
                    <TextField
                        required
                        id="password"
                        label="Password"
                        type="password"
                        value={password}
                        onChange={handlePasswordChange}
                    />
                    <Button
                        data-testid="submit-sign-up-button"
                        variant="contained"
                        size="large"
                        onClick={handleClick}
                    >
                        Sign Up
                    </Button>
                </Box>
            </Box>
        </Box>
    );
}

export default SignUp;
