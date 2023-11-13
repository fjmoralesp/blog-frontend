import React, {useState} from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createComment } from '../../../apis/comments.api';

function Create({ postId }) {
    const queryClient = useQueryClient();

    const [body, setBody] = useState('');

    const mutation = useMutation({
        mutationFn: createComment,
        onSuccess: () => {
            setBody('');
            queryClient.invalidateQueries({ queryKey: ['posts'] });
        },
    });

    const handleBodyChange = (event) => {
        setBody(event.target.value);
    }

    const handleComment = () => {
        mutation.mutate({ body, postId });
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
            <Box>
                <Box>
                    <Typography variant="h6">
                        Comment
                    </Typography>
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
                <Button
                    variant="contained"
                    size="large"
                    onClick={handleComment}
                >
                    Comment
                </Button>
            </Box>
        </Box>
    );
}

export default Create
