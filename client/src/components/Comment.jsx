import { Card } from 'react-bootstrap';

const Comment = ({content, author, date}) => {


    return (
        <>
            <Card className="comment-card p-1 px-2 my-1 text-sm">
                <Card.Body className="px-0 py-1 rounded-top">
                    { content }
                </Card.Body>
                <Card.Footer className="comment-footer text-xs card-footer p-1">
                    { author } | { date }
                </Card.Footer>
            </Card>
        </>
    )
}

export default Comment;
