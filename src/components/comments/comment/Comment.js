import React, {useState} from 'react';
import { Typography, Card, CardContent, Button, TextField, Box } from '@mui/material';
import { useUser } from '../../../apis/users.api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteComment, updateComment } from '../../../apis/comments.api';

function Comment({ comment }) {
    const queryClient = useQueryClient();

    const user = useUser();
    const [body, setBody] = useState('');
    const [editingId, setEditingId] = useState();

    const mutationUpdate = useMutation({
        mutationFn: updateComment,
        onSuccess: () => {
            setEditingId(null);
            queryClient.invalidateQueries({ queryKey: ['posts'] });
        },
    });

    const mutationDelete = useMutation({
        mutationFn: deleteComment,
        onSuccess: () => {
            setEditingId(null);
            queryClient.invalidateQueries({ queryKey: ['posts'] });
        },
    });

    const handleBodyChange = (event) => {
        setBody(event.target.value);
    }

    const handleEdit = (comment) => {
        setEditingId((prev) => (prev === comment.id ? null : comment.id));
        setBody(comment.body);
    }

    const handleDelete = (comment) => {
        mutationDelete.mutate({ id: comment.id });
    }

    const handleComment = (id) => {
        mutationUpdate.mutate({ body, id });
    };

    const isEditing = (id) => editingId === id;
    const canEdit = (userId) => user.data?.id === userId;

    return (
        <Card>
            <CardContent>
                {canEdit(comment.User.id) && (
                    <>
                        <Button
                            data-testid="edit-comment-button"
                            variant="text"
                            onClick={() => handleEdit(comment)}
                        >
                            Edit
                        </Button>
                        <Button
                            data-testid="delete-comment-button"
                            variant="outlined"
                            color="error"
                            onClick={() => handleDelete(comment)}
                        >
                            Delete comment
                        </Button>
                    </>
                )}
                <Typography sx={{ mb: 1.5 }} color="text.secondary" variant="subtitle2">
                    Comment author
                </Typography>
                <Typography variant="body2">
                    {comment.User.username}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary" variant="subtitle2">
                    Comment body
                </Typography>
                {isEditing(comment.id) ? (
                    <TextField
                        required
                        id="body-comment-edit"
                        label="body"
                        multiline
                        rows={4}
                        value={body}
                        onChange={handleBodyChange}
                    />
                ) : (
                    <Typography variant="body2">
                        {comment.body}
                    </Typography>
                )}
                {isEditing(comment.id) && (
                    <Box sx={{ p: 1 }}>
                        <Button
                            data-testid="submit-edit-comment-button"
                            variant="contained"
                            size="large"
                            onClick={() => handleComment(comment.id)}
                        >
                            Save
                        </Button>
                    </Box>
                )}
            </CardContent>
        </Card>
    )
}

export default Comment;