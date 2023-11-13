
export const createComment = async (comment) => {
    const token = window.localStorage.getItem('token');
    const { body, postId } = comment;
    const response = await fetch('http://localhost:3001/comments', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ body, postId }),
    });

    if (!response.ok) {
        throw new Error('Cannot create post');
    }

    return await response.json();
}