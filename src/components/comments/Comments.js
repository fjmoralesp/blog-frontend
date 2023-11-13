import React from 'react';
import Comment from "./comment/Comment";
import Create from "./create/Create";

function Comments({ comments, postId }) {
    return (
        <>
            {comments.map((comment) => <Comment key={comment.id} comment={comment} />)}
            <Create postId={postId} />
        </>
    );
}

export default Comments;
