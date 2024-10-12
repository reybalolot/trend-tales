import { Container, Row, Card } from "react-bootstrap";
import { Toaster, toast } from "sonner";

const Post = () => {

    const addComment = () => {
        toast.message('Comment added.');
    }





    return (
        <>
              <Container className="flex">
                <div>
                    <Toaster richColors position="top-center" style={{paddingLeft: '0px'}}/>
                </div>
                <Row className="justify-content-center py-5 px-4">

                    <Card className="shadow-sm rounded p-0 my-2" onClick={() => addComment()}>
                        <Card.Body className="rounded-top">
                            <Card.Title>Title</Card.Title>
                            <Card.Text className="text-sm">
                                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Officiis assumenda sint animi? Sapiente itaque, similique voluptatum harum aliquam vel accusamus nisi laudantium ducimus quisquam cumque minus illo sequi sunt soluta!
                            </Card.Text>
                        </Card.Body>
                        <Card.Footer className="text-xs card-footer">
                            isReyyy | June 01
                        </Card.Footer>
                    </Card>

                </Row>
            </Container>
        </>
    )
}

export default Post;
