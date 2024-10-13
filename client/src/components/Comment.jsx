import { Card } from 'react-bootstrap';

const Comment = ({commentContent}) => {

    const { comment, user, date } = commentContent;

    return (
        <>
        <Card className="comment-card    p-1 px-2 my-1 text-sm">
            <Card.Body className="px-0 py-1 rounded-top">
                { comment }
            </Card.Body>
            <Card.Footer className="comment-footer text-xs card-footer p-1">
                { user } | {date}
            </Card.Footer>
        </Card>
        </>
    )
}

export default Comment;
