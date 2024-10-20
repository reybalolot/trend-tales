import { useContext, useEffect, useState } from "react";
import { Button, Container, Row, Card} from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import { Toaster, toast } from "sonner";
import UserContext from '../context/UserContext.js';

const HomePage = () => {
    const { user } = useContext(UserContext);
    const navigate = useNavigate();
    const [ posts, setPosts ] = useState([]);
    const url = import.meta.env.VITE_REACT_API_URL;

    const fetchFeatured = () => {
        fetch(`${url}/posts/featured`)
        .then(res => res.json())
        .then(data => {
            if (data) {
                setPosts(data.posts.map(post => post));
            } else if (data.error) {
                toast.error('Something went wrong. Please try again.')
            }
        })
		.catch(() => {
            toast.error('Something went wrong. Please try again.')
		});
    }

    useEffect(() => {
        if (user.id) {
            navigate('/posts')
        } else {
            fetchFeatured()
        }
    },[])


        return (
        <>
            <Container>
                <div>
                    <Toaster richColors position="top-center" style={{paddingLeft: '0px'}}/>
                </div>
                <Row className="flex justify-content-center">
                    <h4 className="text-center m-2">Recent Blog Post</h4>
                    <div className="d-block flex-column" style={{justifyContent:'center', alignItems:'center'}} key={1}>
                        { posts ? (
                            posts.map(post => {
                                return <CardFeature  key={post._id} title={post.title} content={post.content}/>
                            })
                        ) : (
                            null
                        )}
                        <p className="text-center mt-3 text-sm">
                            Please <Link to="/login">log in</Link> or <Link to='/register'>register</Link> to view more.
                        </p>
                    </div>
                </Row>
            </Container>
        </>
    )
}
const CardFeature = ({ title, content}) => {

    return (
        <Card className="shadow-sm rounded p-0 my-2">
            <Card.Body className="rounded-top">
                <Card.Title>{ title }</Card.Title>
                <Card.Text className="text-sm">
                    { content }
                </Card.Text>
            </Card.Body>
        </Card>
    )
}

export default HomePage;
