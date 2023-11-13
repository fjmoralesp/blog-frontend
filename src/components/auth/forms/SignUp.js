import React from 'react';
import { Box, Button, TextField, Toolbar } from '@mui/material';

function SignUp() {
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
                    />
                    <TextField
                        required
                        id="password"
                        label="Password"
                        type="password"
                    />
                    <Button variant="contained" size="large">Sign Up</Button>
                </Box>
            </Box>
        </Box>
    );
}

export default SignUp;
