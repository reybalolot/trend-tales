import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row } from "react-bootstrap";
import { MdAdd } from "react-icons/md";
import { Toaster, toast } from "sonner";
import Post from "../components/Post";

const Posts = () => {

    const [ postData, setPostData ] = useState([]);
    const navigate = useNavigate();
    const url = import.meta.env.VITE_REACT_API_URL || 'http://localhost:4000';

    const fetchPosts = () => {
        fetch(`${url}/posts/`, {
            headers: {
				"Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(res => res.json())
        .then(data => {
            if (data) {
                if (data.message === 'No post found') {
                    toast.info('No posts found.');
                } else {
                    setPostData(data.posts.map(post => post));
                }
            } else if (data.error) {
                toast.error('Something went wrong. Please try again.')
            }
        })
		.catch(() => {
            toast.error('Something went wrong. Please try again.')
		});
    }

    const createPost = () => {
        navigate('/post/create')
    }

    useEffect(() => {
        fetchPosts();
    },[])

    return (
        <>
            <div>
                <Toaster richColors position="top-center" style={{paddingLeft: '0px'}}/>
            </div>
            <Container className="" id="home">
                <Row className="px-4 pt-4 pb-2">
                    <div className="d-flex align-items-center justify-content-between">
                        <div className="fw-bold">All Blog Posts</div>
                        <button className="btn btn-add flex text-sm p-1" onClick={() => createPost()}><MdAdd/> Add</button>
                    </div>
                </Row>
                <hr  className="m-0 mx-3"/>
                <Row className="justify-content-center py-2 px-4">
                    {postData ? (
                        postData.map(post => (
                            <Post key={post._id} postContent={post}/>
                        ))
                    ) : (
                        <h6 className="text-center">NO POST FOUND.</h6>
                    )}
                </Row>
            </Container>
        </>
    )
}

export default Posts;
