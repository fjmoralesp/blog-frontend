import React from 'react';
import { AppBar, Box, Button, Toolbar } from '@mui/material';
import { FORMS } from '../../../constants/constants';

function Navbar({ onChange }) {
    const handleSingUp = () => {
        onChange(FORMS.SIGN_UP);
    }

    const handleLogin = () => {
        onChange(FORMS.LOGIN);
    }

    return (
        <Box sx={{ display: 'flex' }}>
            <AppBar component="nav">
                <Toolbar sx={{ justifyContent: "end" }}>
                    <Box>
                        <Button
                            sx={{ color: '#fff' }}
                            onClick={handleSingUp}
                        >
                            Sign Up
                        </Button>
                        <Button
                            sx={{ color: '#fff' }}
                            onClick={handleLogin}
                        >
                            Login
                        </Button>
                    </Box>
                </Toolbar>
            </AppBar>
        </Box>
    );
}

export default Navbar;
