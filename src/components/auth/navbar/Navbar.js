import React from 'react';
import { AppBar, Box, Button, Toolbar } from '@mui/material';
import { FORMS } from '../../../constants/constants';
import { useLogout, useUser } from '../../../apis/users.api';

function Navbar({ onChange, onLogout }) {
    const user = useUser();
    const logout = useLogout();
    const handleSingUp = () => {
        onChange(FORMS.SIGN_UP);
    }

    const handleLogin = () => {
        onChange(FORMS.LOGIN);
    }

    const handleLogout = () => {
        logout.mutate({}, { onSuccess: () => onLogout() });
    }

    const isUserLoggedIn = !!user.data;

    return (
        <Box sx={{ display: 'flex' }}>
            <AppBar component="nav">
                <Toolbar sx={{ justifyContent: "end" }}>
                    <Box>
                        {!isUserLoggedIn && (
                            <>
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
                            </>
                        )}
                        {isUserLoggedIn && (
                            <Button
                                sx={{ color: '#fff' }}
                                onClick={handleLogout}
                            >
                                Logout
                            </Button>
                        )}
                    </Box>
                </Toolbar>
            </AppBar>
        </Box>
    );
}

export default Navbar;
