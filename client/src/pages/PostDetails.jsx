import { useEffect, useState } from "react";
import { Container, Row, Card, Button } from "react-bootstrap";
import { Link, useNavigate, useParams} from "react-router-dom";
import { Toaster, toast } from "sonner";
import Comment from "../components/Comment";

const Post = () => {

    const [ postDetails, setPostDetails ] = useState(null);
    const [ fetchedAuthor, setFetchedAuthor ] = useState('');
    const { id } = useParams();
    const url = import.meta.env.VITE_REACT_API_URL || 'http://localhost:4000';
    const navigate = useNavigate();
    const dateOptions = {
        weekday: 'short',
        day: 'numeric',
        month: 'short',
        year: 'numeric',
    };

    const fetchPost = () => {
        fetch(`${url}/posts/${id}`, {
             headers: {
				"Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(res => res.json())
        .then(data => {
            if (data) {
                setPostDetails(data.post);
            }
        })
		.catch(() => {
            toast.error('Something went wrong. Please try again.')
		});
    }

    const fetchAuthorUser = (author) => {
        fetch(`${url}/user/${author}`, {
             headers: {
				"Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(res => res.json())
        .then(data => {
            if (data) {
                setFetchedAuthor(data.user.username);
            } else if (data.error) {
                setFetchedAuthor(author);
            }
        })
		.catch(() => {
            setFetchedAuthor(author);
		});
    }

    const addComment = () => {
        toast.message('Comment added.');
    }

    useEffect(() => {
        fetchPost()
    }, [])

    useEffect(() => {
        if (postDetails) {
            fetchAuthorUser(postDetails.author);
        }
    }, [postDetails])

    return (
        <>
              <Container className="flex">
                <div>
                    <Toaster richColors position="top-center" style={{paddingLeft: '0px'}}/>
                </div>
                <Row className="justify-content-center py-5 px-4">
                    <Button onClick={() => navigate(-1)}>Back</Button>
                    { postDetails ? (
                        <>
                            <Card className="shadow-sm rounded p-0 my-2">
                                <Card.Body className="rounded-top">
                                    <Card.Title>{ postDetails.title }</Card.Title>
                                    <Card.Text className="text-sm">
                                        { postDetails.content }
                                    </Card.Text>
                                </Card.Body>
                                <Card.Footer className="text-xs card-footer">
                                    { fetchedAuthor } | { new Date(postDetails.updatedOn).toLocaleString('en-US', dateOptions) }
                                </Card.Footer>
                            </Card>

                            <Card className="flex justify-content-center py-2">
                                <h6 className="text-secondary">Comments <span className="text-secondar text-sm">{postDetails.comments.length}</span></h6>

                                { postDetails.comments.length > 0 ? (
                                    postDetails.comments.map(comment => (
                                        <Comment commentContent={comment} key={comment._id}/>
                                    ))
                                ) : (
                                    null
                                )}

                                <Link className="comment-add-btn btn" onClick={() => addComment()}>Add Comment</Link>
                            </Card>
                        </>
                    ) : (
                        null
                    )}
                </Row>
            </Container>
        </>
    )
}

export default Post;
