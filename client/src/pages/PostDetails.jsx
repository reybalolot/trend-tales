import { useEffect, useState } from "react";
import { Container, Row, Card, Button } from "react-bootstrap";
import { Link, useNavigate, useParams} from "react-router-dom";
import { Toaster, toast } from "sonner";
import Comment from "../components/Comment";

const Post = () => {

    const [ postDetails, setPostDetails ] = useState(null);
    const [ fetchedAuthor, setFetchedAuthor ] = useState('');
    const [ commentAuthor, setCommentAuthor ] = useState('');
    const [ comments, setComments ] = useState([]);
    const { id } = useParams();
    const url = import.meta.env.VITE_REACT_API_URL || 'http://localhost:4000';
    const navigate = useNavigate();
    const dateOptions = {
        weekday: 'short',
        day: 'numeric',
        month: 'short',
        year: 'numeric',
    };

    //
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

    //
    const fetchComments = () => {
        fetch(`${url}/posts/${id}/comments/`, {
             headers: {
				"Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(res => res.json())
        .then(data => {
            if (data.success === true) {
                setComments(data.comments);
            } else if (data.error) {
                setComments([]);
            }
        })
		.catch(() => {
            toast.error('There was an error fetching comments');
        });
    }

    //
    const fetchAuthorUser = (author) => {
        return fetch(`${url}/user/${author}`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(res => res.json())
        .then(data => {
            if (data) {
                return data.user.username;
            } else if (data.error) {
                return author;
            }
        })
		.catch(() => {
            return author;
		});
    }

    const addComment = () => {
        toast.message('Comment added.');
    }

    useEffect(() => {
        fetchPost();
        fetchComments();
    }, [])

    useEffect(() => {
        if (postDetails) {

            fetchAuthorUser(postDetails.author)
            .then(postUser => {
                setFetchedAuthor(postUser);
            })

            comments.map(comment => {
                fetchAuthorUser(comment.userId)
                .then(commentUser => {
                    setCommentAuthor(commentUser)
                })
            })
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
                                    comments.map(comment => (
                                        <Comment
                                            key={comment._id}
                                            content={comment.comment}
                                            author={commentAuthor}
                                            date={new Date(comment.createdOn).toLocaleString('en-US', dateOptions)}
                                            />
                                    ))
                                ) : (
                                    null
                                )}

                                <Link className="comment-add-btn btn mt-3" onClick={() => addComment()}>Add Comment</Link>
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
