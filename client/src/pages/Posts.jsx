import { useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";
import { Toaster, toast } from "sonner";
import Post from "../components/Post";

const Posts = () => {

    const [ postData, setPostData ] = useState([]);

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

    useEffect(() => {
        fetchPosts();
    },[])

    return (
        <>
            <Container className="flex">
                <div>
                    <Toaster richColors position="top-center" style={{paddingLeft: '0px'}}/>
                </div>
                <Row className="justify-content-center py-5 px-4">
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
