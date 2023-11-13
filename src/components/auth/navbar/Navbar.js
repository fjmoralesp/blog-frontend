import React from 'react';
import { AppBar, Box, Button, Toolbar } from '@mui/material';
import { FORMS } from '../../../constants/constants';
import { useLogout, AuthLoader } from '../../../apis/users.api';

function Navbar({ onChange, onLogout }) {
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

    return (
        <Box sx={{ display: 'flex' }}>
            <AppBar component="nav">
                <Toolbar sx={{ justifyContent: "end" }}>
                    <Box>
                        <AuthLoader
                            renderLoading={() => <div>Loading ...</div>}
                            renderUnauthenticated={() => (
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
                        >
                            <Button
                                sx={{ color: '#fff' }}
                                onClick={handleLogout}
                            >
                                Logout
                            </Button>
                        </AuthLoader>
                    </Box>
                </Toolbar>
            </AppBar>
        </Box>
    );
}

export default Navbar;
