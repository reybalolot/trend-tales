import Post from '../models/post.js';
import errorHandler from "../utils/errorHandler.js";

//user actions
const getAggregatePosts = (req, res) => {
    try {
        //aggregate $limit
        //aggregate $sortByCount
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
        const postId = req.params;

        Post.findById(postId)

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
        const postId = req.params;

        Post.findByIdAndDelete(postId)
        .then(() => {
            return res.status(200).json({
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

const removeComment = () => {

}

export default { getAggregatePosts, getAllPosts, getPost, createPost, updatePost, addComment, removeComment, deletePost }
