import { useContext, useEffect, useState } from "react";
import { Container, Row, Card, Form, Button } from "react-bootstrap";
import { MdArrowBackIosNew, MdDeleteOutline } from "react-icons/md";
import { Link, useNavigate, useParams} from "react-router-dom";
import { Toaster, toast } from "sonner";
import UserContext from '../context/UserContext';
import Comment from "../components/Comment";

const Post = () => {

    const { user } = useContext(UserContext);
    const { id } = useParams();
    const [ postDetails, setPostDetails ] = useState(null);
    const [ fetchedAuthor, setFetchedAuthor ] = useState('');
    const [ comments, setComments ] = useState([]);
    const [ showInputComment, setShowInputComment ] = useState(false);
    const [ commentContent, setCommentContent ] = useState('');
    const [ btnClassName, setBtnClassName ] = useState('btn-outline-secondary btn mt-2 disabled');
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
    const fetchComments = async () => {
        try {
          const response = await fetch(`${url}/posts/${id}/comments/`, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          });

          if (!response.ok) {
            throw new Error('Network response was not ok');
          }

          const data = await response.json();

          if (data.success) {
            setComments(data.comments);
          } else {
            setComments([]);
          }
        } catch (error) {
          toast.error('There was an error fetching comments');
          console.error('Fetch error:', error);
        }
    };

    //
    const fetchPostAuthor = (author) => {
        fetch(`${url}/users/${author}`, {
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

    //
    const addComment = () => {
        fetch(`${url}/posts/${id}/comments/add`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                comment: commentContent
            })
        })
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                toast('Comment added.');
                fetchComments();
                setCommentContent('');
                setShowInputComment(false);
                setBtnClassName('btn-outline-secondary btn mt-2 disabled');
            } else if (data.error) {
                localStorage.clear();
                navigate('/login');
            }
        })
		.catch(() => {
            toast.error('Something went wrong.');
		});
    }

    //
    const deletePost = () => {
         fetch(`${url}/posts/delete/${id}`, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                toast.warning('Deleting post.');
                setTimeout(() => {
                    navigate('/posts');
                }, 1000);
            } else if (data.error) {
                toast.error('Something went wrong.')
            }
        })
		.catch(() => {
            toast.error('Something went wrong.')
		});
    }

    //
    useEffect(() => {
        fetchPost();
        fetchComments();
    }, [])

    useEffect(() => {
        if (commentContent !== '') {
            setBtnClassName('btn-outline-primary btn mt-2');
        }
    }, [commentContent])

    useEffect(() => {
        if (postDetails) {
            fetchPostAuthor(postDetails.author)
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
                        <button className="btn btn-add flex text-sm p-1 me-3" onClick={() => navigate('/posts')}><MdArrowBackIosNew className="pe-1"/>Back</button>
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
                                {/* <Card.Footer className="text-xs card-footer">
                                    { fetchedAuthor } | { new Date(postDetails.updatedOn).toLocaleString('en-US', dateOptions) }
                                </Card.Footer> */}
                                { user.isAdmin ? (
                                    <Card.Footer className="comment-footer text-xs card-footer p-1 d-flex justify-content-between">
                                        <div className="d-flex align-items-center ms-1" >{ fetchedAuthor } | { new Date(postDetails.updatedOn).toLocaleString('en-US', dateOptions) }</div>
                                        <div><Button className="text-sm py-0 px-1" variant="outline-danger" onClick={deletePost}><MdDeleteOutline/></Button></div>
                                    </Card.Footer>
                                ) : (
                                    <Card.Footer className="comment-footer text-xs card-footer p-1 d-flex justify-content-between">
                                        { fetchedAuthor } | {  new Date(postDetails.updatedOn).toLocaleString('en-US', dateOptions) }
                                    </Card.Footer>
                                )}
                            </Card>


                            <Card className="flex justify-content-center py-2">
                                <h6 className="text-secondary">Comments <span className="text-secondar text-sm">{postDetails.comments.length}</span></h6>

                                { postDetails.comments.length > 0 ? (
                                    comments.map(comment => (
                                        <Comment
                                        key={comment._id}
                                        id={comment._id}
                                        postId={id}
                                        content={comment.comment}
                                        author={comment.userId}
                                        date={new Date(comment.createdOn).toLocaleString('en-US', dateOptions)}
                                        />
                                    ))
                                ) : (
                                    null
                                )}

                                <div>
                                <hr className="mt-2 mb-2 mx-1" />
                                <Form onSubmit={addComment} hidden={!showInputComment}>
                                    <Card className="comment-card p-1 px-2 my-1 text-sm" style={{backgroundColor: '#f3f3f3'}}>
                                        <Card.Body className="px-0 py-1 rounded-top">
                                            <Form.Control size="sm" value={commentContent} onChange={(e) => setCommentContent(e.target.value)}/>
                                        </Card.Body>
                                        <Card.Footer className="comment-footer text-xs card-footer p-1" style={{backgroundColor: '#f3f3f3'}}>
                                            { user.username }
                                        </Card.Footer>
                                    </Card>
                                </Form>
                                </div>

                                { showInputComment ? (
                                    <Link className={btnClassName} type="submit" onClick={addComment}>Post Comment</Link>
                                ) : (
                                    <Link className="comment-add-btn btn mt-2" onClick={() => setShowInputComment(true)}>Comment</Link>
                                )}

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
