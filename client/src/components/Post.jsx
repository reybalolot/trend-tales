import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Post = ({postContent}) => {

    const { _id, title, content, author, updatedOn } = postContent;
    const [ fetchedAuthor, setFetchedAuthor ] = useState('');

    const url = import.meta.env.VITE_REACT_API_URL || 'http://localhost:4000';
    const navigate = useNavigate();
    const dateOptions = {
        weekday: 'short',
        day: 'numeric',
        month: 'short',
        year: 'numeric',
    };


    const viewPost = (_id) => {
        navigate(`/post/${_id}`)
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

    useEffect(() => {
        fetchAuthorUser(author);
    }, [postContent])

    return (
        <>
        <Card className="card-blog shadow-sm rounded p-0 my-1" onClick={() => viewPost(_id)}>
            <Card.Body className="rounded-top">
                <Card.Title>{ title }</Card.Title>
                <Card.Subtitle className="text-xxs text-secondary mb-1"></Card.Subtitle>
                <Card.Text className="text-sm">
                    { content }
                </Card.Text>
            </Card.Body>
            <Card.Footer className="text-xs card-footer">
                By: { fetchedAuthor } | { new Date(updatedOn).toLocaleString('en-US', dateOptions) }
            </Card.Footer>
        </Card>
        </>
    )
}

export default Post;
