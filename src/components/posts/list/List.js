import React, { useState } from 'react';
import { Box, Button, Card, CardContent, TextField, Typography } from '@mui/material';
import { deletePost, updatePost, usePosts } from '../../../apis/posts.api';
import { useUser } from '../../../apis/users.api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Comments from '../../comments/Comments';

function List() {
    const queryClient = useQueryClient();

    const user = useUser();
    const posts = usePosts();
    const [editingId, setEditingId] = useState();
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');

    const mutationUpdate = useMutation({
        mutationFn: updatePost,
        onSuccess: () => {
            setEditingId(null);
            queryClient.invalidateQueries({ queryKey: ['posts'] });
        },
    });

    const mutationDelete = useMutation({
        mutationFn: deletePost,
        onSuccess: () => {
            setEditingId(null);
            queryClient.invalidateQueries({ queryKey: ['posts'] });
        },
    });

    const handleEdit = (post) => {
        setEditingId((prev) => (prev === post.id ? null : post.id));
        setTitle(post.title);
        setBody(post.body);
    }

    const handleDelete = (post) => {
        mutationDelete.mutate({ id: post.id });
    }

    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    };

    const handleBodyChange = (event) => {
        setBody(event.target.value);
    }

    const handlePost = (id) => {
        mutationUpdate.mutate({ title, body, id });
    };

    const isEditing = (id) => editingId === id;
    const canEdit = (userId) => user.data?.id === userId;

    return (
        <Box>
            {posts.data?.map((post) => (
                <Card key={post.id}>
                    <CardContent>
                        {canEdit(post.UserId) && (
                            <>
                                <Button
                                    variant="text"
                                    onClick={() => handleEdit(post)}
                                >
                                    Edit
                                </Button>
                                <Button
                                    variant="outlined"
                                    color="error"
                                    onClick={() => handleDelete(post)}
                                >
                                    delete
                                </Button>
                            </>
                        )}
                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                            Title
                        </Typography>
                        {isEditing(post.id) ? (
                            <TextField
                                required
                                id="title"
                                label="title"
                                value={title}
                                onChange={handleTitleChange}
                            />
                        ) : (
                            <Typography variant="h5" component="div">
                                {post.title}
                            </Typography>
                        )}
                        <Typography sx={{ mb: 1.5 }} color="text.secondary">
                            Body
                        </Typography>
                        {isEditing(post.id) ? (
                            <TextField
                                required
                                id="body"
                                label="body"
                                multiline
                                rows={4}
                                value={body}
                                onChange={handleBodyChange}
                            />
                        ) : (
                            <Typography variant="body2">
                                {post.body}
                            </Typography>
                        )}
                        {isEditing(post.id) && (
                            <Box sx={{ p: 1 }}>
                                <Button
                                    variant="contained"
                                    size="large"
                                    onClick={() => handlePost(post.id)}
                                >
                                    Save
                                </Button>
                            </Box>
                        )}
                        <Typography sx={{ mb: 1.5 }} color="text.secondary">
                            Comments
                        </Typography>
                        <Box>
                            <Comments comments={post.Comments} postId={post.id} />
                        </Box>
                    </CardContent>
                </Card>
            ))}
        </Box>
    );
}

export default List;