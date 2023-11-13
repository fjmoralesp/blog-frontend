import React from 'react';
import { Typography, Card, CardContent } from '@mui/material';

function Comment({ comment }) {
    return (
        <Card>
            <CardContent>
                <Typography sx={{ mb: 1.5 }} color="text.secondary" variant="subtitle2">
                    Comment author
                </Typography>
                <Typography variant="body2">
                    {comment.UserId}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary" variant="subtitle2">
                    Comment body
                </Typography>
                <Typography variant="body2">
                    {comment.body}
                </Typography>
            </CardContent>
        </Card>
    )
}

export default Comment;