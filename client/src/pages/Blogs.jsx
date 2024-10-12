import { Container, Row, Card } from "react-bootstrap";
import { Toaster, toast } from "sonner";
import { useNavigate } from "react-router-dom";

const Blogs = () => {

    const navigate = useNavigate();

    const viewPost = () => {
        navigate('/post')
    }














    return (
        <>
            <Container className="flex">
                <div>
                    <Toaster richColors position="top-center" style={{paddingLeft: '0px'}}/>
                </div>
                <Row className="justify-content-center py-5 px-4">

                    <Card className="shadow-sm rounded p-0 my-2" onClick={() => viewPost()}>
                        <Card.Body className="rounded-top">
                            <Card.Title>Title</Card.Title>
                            <Card.Subtitle className="text-xxs text-secondary mb-1">June 06 2024</Card.Subtitle>
                            <Card.Text className="text-sm">
                                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Officiis assumenda sint animi? Sapiente itaque, similique voluptatum harum aliquam vel accusamus nisi laudantium ducimus quisquam cumque minus illo sequi sunt soluta!
                                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Officiis assumenda sint animi? Sapiente itaque, similique voluptatum harum aliquam vel accusamus nisi laudantium ducimus quisquam cumque minus illo sequi sunt soluta!
                                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Officiis assumenda sint animi? Sapiente itaque, similique voluptatum harum aliquam vel accusamus nisi laudantium ducimus quisquam cumque minus illo sequi sunt soluta!
                                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Officiis assumenda sint animi? Sapiente itaque, similique voluptatum harum aliquam vel accusamus nisi laudantium ducimus quisquam cumque minus illo sequi sunt soluta!
                                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Officiis assumenda sint animi? Sapiente itaque, similique voluptatum harum aliquam vel accusamus nisi laudantium ducimus quisquam cumque minus illo sequi sunt soluta!
                                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Officiis assumenda sint animi? Sapiente itaque, similique voluptatum harum aliquam vel accusamus nisi laudantium ducimus quisquam cumque minus illo sequi sunt soluta!
                                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Officiis assumenda sint animi? Sapiente itaque, similique voluptatum harum aliquam vel accusamus nisi laudantium ducimus quisquam cumque minus illo sequi sunt soluta!
                            </Card.Text>
                        </Card.Body>
                        <Card.Footer className="text-xs card-footer">
                            By: isReyyy
                        </Card.Footer>
                    </Card>

                </Row>
            </Container>
        </>
    )
}

export default Blogs;
