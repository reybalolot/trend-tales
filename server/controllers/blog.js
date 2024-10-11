import Blog from '../models/blog.js';
import errorHandler from "../utils/errorHandler.js";

//user actions
const getAllBlogs = (req, res) => {
    try {
        Blog.find({})
        .then(blogs => {
            if (blogs.length == 0) {
                return res.status(200).send({ message: 'No products found'});
            } else {
                return res.status(200).json(products);
            }
        })
    } catch (error) {
        res.status(500).json({
            message: 'Internal server error',
            error: error.message
        });
    }
}

const getBlog = (req, res) => {
    try {
        const blogId = req.params;

        Blog.findById(blogId)
        .then(blog => {
            return res.status(200).json({
                message: 'Blog retrieved successfully',
                blog: blog
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

const postBlog = (req, res) => {
    try {
        const userId = req.user.id;
        const {title, content} = req.body;

        if (!title || !content) {
            return res.status(400).send({error: "Fill required fields"});
        }

        const newBlog = new Blog({
            title: title,
            content: content,
            author: userId,
            date: new Date()
        })

        newBlog.save()
        .then(blog => {
            return res.status(200).json({
                message: 'Added successfully',
                blog: blog
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

const updateBlog = (req, res) => {
    try {
        const author = req.user.id;
        const { blogId } = req.params;
        const { title, content } = req.body;
        const updatedOn = new Date();

        Blog.findByIdAndUpdate(
            blogId,
            {title, content, author, updatedOn},
            {new: true}
        )
        .then(blog => {
            return res.status(200).json({
                message: 'Updated successfully',
                blog: blog
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
        const blogId = req.params;

        Blog.findById(blogId)

    } catch (error) {
        res.status(500).json({
            message: 'Internal server error',
            error: error.message
        });
    }
}

//admin actions
const deleteBlog = (req, res) => {
    try {
        const blogId = req.params;

        Blog.findByIdAndDelete(blogId)
        .then(blog => {
            return res.status(200).json({
                message: 'Updated successfully',
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

//remove comment

export default { getAllBlogs, getBlog, postBlog, updateBlog, addComment, removeComment, deleteBlog }
