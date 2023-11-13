
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

export const updateComment = async (comment) => {
    const token = window.localStorage.getItem('token');
    const { id, body } = comment;
    const response = await fetch(`http://localhost:3001/comments?commentId=${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ body }),
    });

    if (!response.ok) {
        throw new Error('Cannot update post');
    }

    return await response.json();
}

export const deleteComment = async (comment) => {
    const token = window.localStorage.getItem('token');
    const { id } = comment;
    const response = await fetch(`http://localhost:3001/comments?commentId=${id}`, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        throw new Error('Cannot delete post');
    }

    return await response.json();
}
