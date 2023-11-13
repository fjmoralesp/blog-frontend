import React, { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createPost } from '../../../apis/posts.api';

function Create() {
    const queryClient = useQueryClient();

    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');

    const mutation = useMutation({
        mutationFn: createPost,
        onSuccess: () => {
            setTitle('');
            setBody('');
            queryClient.invalidateQueries({ queryKey: ['posts'] });
        },
    });

    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    };

    const handleBodyChange = (event) => {
        setBody(event.target.value);
    }

    const handlePost = () => {
        mutation.mutate({ title, body });
    };

    return (
        <Box
            component="form"
            sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
        >
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Box>
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Typography variant="h4">
                            Create a post
                        </Typography>
                    </Box>
                    <Box sx={{ width: 1 }}>
                        <TextField
                            required
                            id="title"
                            label="title"
                            value={title}
                            onChange={handleTitleChange}
                        />
                    </Box>
                    <Box sx={{ width: 1 }}>
                        <TextField
                            required
                            id="body"
                            label="body"
                            multiline
                            rows={4}
                            value={body}
                            onChange={handleBodyChange}
                        />
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Button
                            variant="contained"
                            size="large"
                            onClick={handlePost}
                        >
                            Post
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}

export default Create;