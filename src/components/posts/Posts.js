import React from 'react';
import { Box, Toolbar } from '@mui/material';
import { useUser } from "../../apis/users.api";
import Create from './create/Create';
import List from './list/List';

function Posts() {
    const user = useUser();

    if (!user.data) {
        return null;
    }

    return (
        <Box component="main" sx={{ p: 2 }}>
            <Toolbar />
            <Create />
            <List />
        </Box>
    );
}

export default Posts;
