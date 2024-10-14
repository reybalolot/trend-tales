import Post from '../models/post.js';
import Comment from '../models/comment.js'
import errorHandler from "../utils/errorHandler.js";

//user actions
const getAggregatePosts = (req, res) => {
    try {
        Post.aggregate([{$limit:2}])
        .then(posts => {
            if (posts.length == 0) {
                return res.status(200).send({
                    success: true,
                    message: 'No post found'
                });
            } else {
                return res.status(200).json({posts: posts});
            }
        })
    } catch (error) {
        res.status(500).json({
            message: 'Internal server error',
            error: error.message
        });
    }
}

const getAllPosts = (req, res) => {
    try {
        Post.find({})
        .then(posts => {
            if (posts.length == 0) {
                return res.status(200).send({
                    success: true,
                    message: 'No post found'
                });
            } else {
                return res.status(200).json({posts: posts});
            }
        })
    } catch (error) {
        res.status(500).json({
            message: 'Internal server error',
            error: error.message
        });
    }
}

const getPost = (req, res) => {
    try {
        const { postId } = req.params;

        Post.findById(postId)
        .then(post => {
            return res.status(200).json({
                message: 'Post retrieved successfully',
                post: post
            })
        })
        .catch(error => errorHandler(error, req, res));

    } catch (error) {
        res.status(500).json({
            message: 'Internal server error',
            error: error.message
        });
    }
}

const createPost = (req, res) => {
    try {
        const userId = req.user.id;
        const {title, content} = req.body;

        if (!title || !content) {
            return res.status(400).send({error: "Fill required fields"});
        }

        const newPost = new Post({
            title: title,
            content: content,
            author: userId,
            date: new Date()
        })

        newPost.save()
        .then(post => {
            return res.status(200).json({
                message: 'Post created successfully',
                post: post
            })
        })
        .catch(error => errorHandler(error, req, res));

    } catch (error) {
        res.status(500).json({
            message: 'Internal server error',
            error: error.message
        });
    }
}

const updatePost = (req, res) => {
    try {
        const author = req.user.id;
        const { postId } = req.params;
        const { title, content } = req.body;
        const updatedOn = new Date();

        Post.findByIdAndUpdate(
            postId,
            {title, content, author, updatedOn},
            {new: true}
        )
        .then(post => {
            return res.status(200).json({
                message: 'Post updated successfully',
                post: post
            })
        })
        .catch(error => errorHandler(error, req, res));

    } catch (error) {
        res.status(500).json({
            message: 'Internal server error',
            error: error.message
        });
    }
}

const addComment = (req, res) => {
    try {
        const userId = req.user.id;
        const { postId } = req.params;
        const { comment } = req.body;

        const newComment = new Comment({
            postId: postId,
            userId: userId,
            comment: comment,
            createdOn: new Date()
        })

        newComment.save()
        .then(comment => {
            Post.findById(postId)
            .then(post => {
                if (post) {
                    post.comments.push(comment);
                    post.save();
                    return res.status(200).send({
                        success: true,
                        message: 'Comment added successfully',
                    })
                } else {
                    return res.status(404).send({ message: 'Post not found'});
                }
            })
        })
        .catch(error => errorHandler(error, req, res));

    } catch (error) {
        res.status(500).json({
            message: 'Internal server error',
            error: error.message
        });
    }
}

const getComments = (req, res) => {
    try {
        const { postId } = req.params;

        Comment.find({ postId: postId })
        .then(comments => {
            if (comments) {
                return res.status(200).json({
                    success: true,
                    comments: comments
                })
            } else {
                return res.status(200).send({
                    message: 'No comments found'
                })
            }
        })
        .catch(error => errorHandler(error, req, res));

    } catch (error) {
        res.status(500).json({
            message: 'Internal server error',
            error: error.message
        });
    }
}

//admin actions
const deletePost = (req, res) => {
    try {
        const { postId } = req.params;

        Post.findByIdAndDelete(postId)
        .then(() => {
            return res.status(200).json({
                success: true,
                message: 'Post deleted successfully',
            })
        })
        .catch(error => errorHandler(error, req, res));

    } catch (error) {
        res.status(500).json({
            message: 'Internal server error',
            error: error.message
        });
    }
}

const removeComment = (req, res) => {
    try {

        const { commentId } = req.params;

        Comment.findByIdAndDelete(commentId)
        .then(() => {
            return res.status(200).json({
                success: true,
                message: 'Comment deleted successfully',
            })
        })
        .catch(error => errorHandler(error, req, res));
    } catch (error) {
        res.status(500).json({
            message: 'Internal server error',
            error: error.message
        });

    }
}

export default { getAggregatePosts, getAllPosts, getPost, createPost, updatePost, addComment, removeComment, getComments, deletePost }
