import { useContext, useEffect, useState } from "react";
import { Card, Button } from 'react-bootstrap';
import { MdDeleteOutline } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from "sonner";
import UserContext from "../context/UserContext";

const Comment = ({id, postId, content, author, date}) => {

    const { user } = useContext(UserContext);
    const [ commentAuthor, setCommentAuthor ] = useState('');
    const navigate = useNavigate();
    const url = import.meta.env.VITE_REACT_API_URL || 'http://localhost:4000';
    //
    const fetchCommentAuthor = () => {
        fetch(`${url}/users/${author}`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(res => res.json())
        .then(data => {
            if (data) {
                setCommentAuthor(data.user.username);
            } else if (data.error) {
                setCommentAuthor('user');
            }
        })
		.catch(() => {
            setCommentAuthor('user');
		});
    }

    //
    const removeComment = () => {
        fetch(`${url}/posts/comments/remove/${id}`, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                toast.warning('Deleting comment.');
                setTimeout(() => {
                    location.reload();
                }, 1500);
            } else if (data.error) {
                toast.error('Something went wrong.')
            }
        })
		.catch(() => {
            toast.error('Something went wrong.')
		});
    }

    useEffect(() => {
        fetchCommentAuthor()
    },[])

    return (
        <>
            <div>
                <Toaster richColors position="top-center" style={{paddingLeft: '0px', boxShadow: 'none'}}/>
            </div>
            <Card className="comment-card p-1 px-2 my-1 rounded-1 text-sm">
                <Card.Body className="px-0 py-1 rounded-top">
                    { content }
                </Card.Body>
                { user.isAdmin ? (
                    <Card.Footer className="comment-footer text-xs card-footer p-1 d-flex justify-content-between">
                        <div>{ commentAuthor } | { date }</div>
                        <div><Button className="text-sm py-0 px-1" variant="outline-danger" onClick={removeComment}><MdDeleteOutline/></Button></div>
                    </Card.Footer>
                ) : (
                    <Card.Footer className="comment-footer text-xs card-footer p-1 d-flex justify-content-between">
                        { commentAuthor } | { date }
                    </Card.Footer>
                )}
            </Card>
        </>
    )
}

export default Comment;
