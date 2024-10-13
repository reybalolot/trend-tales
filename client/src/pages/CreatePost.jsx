import { Toaster, toast } from "sonner";
import { Container, Row, Form} from "react-bootstrap";


const CreatePost = () => {
    return (
        <>
            <div>
                <Toaster richColors position="top-center" style={{paddingLeft: '0px'}}/>
            </div>
            <Container className="" id="home">
                <Row className="px-4 pt-4 pb-2">
                    <div className="d-flex align-items-center justify-content-between">
                        <div className="fw-bold">Create Post</div>
                        <button className="btn btn-add flex text-sm p-1" onClick={() => toast('Will add toast')}>POST</button>
                    </div>
                </Row>
                <hr  className="m-0 mx-3"/>
                <Form>
                    <Form.Group>
                        <Form.Control>

                        </Form.Control>
                    </Form.Group>

                </Form>
            </Container>
        </>
    )
}

export default CreatePost;
