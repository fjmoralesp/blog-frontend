import { useQuery } from '@tanstack/react-query';

const token = window.localStorage.getItem('token');

export const createPost = async (post) => {
    const { title, body } = post;
    const response = await fetch('http://localhost:3001/posts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, body }),
    });

    if (!response.ok) {
        throw new Error('Cannot create post');
    }

    return await response.json();
}

const fetchPosts = async () => {
    const response = await fetch('http://localhost:3001/posts', {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        throw new Error('Cannot fetch posts');
    }

    const posts = await response.json();
    return posts.data
}

export const usePosts = () => {
    return useQuery({
        queryKey: ['posts'],
        queryFn: fetchPosts,
    });
};
