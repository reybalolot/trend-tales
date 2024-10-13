import { useContext, useEffect, useState } from "react";
import { Container, Row, Card, Form } from "react-bootstrap";
import { MdArrowBackIosNew } from "react-icons/md";
import { Link, useNavigate, useParams} from "react-router-dom";
import { Toaster, toast } from "sonner";
import UserContext from '../context/UserContext';
import Comment from "../components/Comment";

const Post = () => {

    const { user } = useContext(UserContext);
    const [ postDetails, setPostDetails ] = useState(null);
    const [ fetchedAuthor, setFetchedAuthor ] = useState('');
    const [ commentAuthor, setCommentAuthor ] = useState('');
    const [ comments, setComments ] = useState([]);
    const [ hideInputComment, setHideInputComment ] = useState(true);
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
        setHideInputComment(false);
        // toast.message('Comment added.');
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
                 <Row className="px-4 pt-4 pb-2">
                    <div className="d-flex align-items-center ps-0">
                        <button className="btn btn-add flex text-sm p-1 me-3" onClick={() => navigate(-1)}><MdArrowBackIosNew className="pe-1"/>Back</button>
                    </div>
                </Row>
                <Row className="justify-content-center py-1 px-4">
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

                                <div>
                                <hr className="mt-2 mb-2 mx-1" />
                                <Form hidden={hideInputComment}>
                                    <Card className="comment-card p-1 px-2 my-1 text-sm" style={{backgroundColor: '#f3f3f3'}}>
                                        <Card.Body className="px-0 py-1 rounded-top">
                                            <Form.Control size="sm"/>
                                        </Card.Body>
                                        <Card.Footer className="comment-footer text-xs card-footer p-1" style={{backgroundColor: '#f3f3f3'}}>
                                            { user.username }
                                        </Card.Footer>
                                    </Card>
                                </Form>
                                </div>
                                <Link className="comment-add-btn btn mt-2" onClick={() => addComment()}>Add Comment</Link>
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
