import React from 'react';
import {Box, Button, Card, CardActions, CardContent, Typography} from '@mui/material';
import { usePosts } from '../../../apis/post.api';
import { useUser } from '../../../apis/users.api';

function List() {
    const posts = usePosts();

    return (
        <Box>
            {posts.data?.map((post) => (
                <Card key={post.id}>
                    <CardContent>
                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                            Title
                        </Typography>
                        <Typography variant="h5" component="div">
                            {post.title}
                        </Typography>
                        <Typography sx={{ mb: 1.5 }} color="text.secondary">
                            Body
                        </Typography>
                        <Typography variant="body2">
                            {post.body}
                        </Typography>
                    </CardContent>
                </Card>
            ))}
        </Box>
    );
}

export default List;