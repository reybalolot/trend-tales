import { useContext, useEffect, useState } from "react";
import { Card, Button } from 'react-bootstrap';
import { MdDeleteOutline } from "react-icons/md";
import UserContext from "../context/UserContext";

const Comment = ({content, author, date}) => {

    const { user } = useContext(UserContext);
    const [ commentAuthor, setCommentAuthor ] = useState('');
    const url = import.meta.env.VITE_REACT_API_URL || 'http://localhost:4000';
    //
    const fetchCommentAuthor = () => {
        fetch(`${url}/user/${author}`, {
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

    useEffect(() => {
        fetchCommentAuthor()
    },[])

    return (
        <>
            <Card className="comment-card p-1 px-2 my-1 rounded-1 text-sm">
                <Card.Body className="px-0 py-1 rounded-top">
                    { content }
                </Card.Body>
                { user.isAdmin ? (
                    <Card.Footer className="comment-footer text-xs card-footer p-1 d-flex justify-content-between">
                        <div>{ commentAuthor } | { date }</div>
                        <div><Button className="text-sm py-0 px-1" variant="outline-danger"><MdDeleteOutline/></Button></div>
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
