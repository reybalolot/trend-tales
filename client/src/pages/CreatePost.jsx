import { useEffect, useRef, useState } from 'react';
import { Container, Row, Form} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from "sonner";
import { MdArrowBackIosNew } from 'react-icons/md';

const CreatePost = () => {

    const [ title, setTitle ] = useState('');
    const [ body, setBody ] = useState('');
    const [ isContent, setIsContent ] = useState(false);
    const textAreaRef = useRef(null);
    const navigate = useNavigate();
    const url = import.meta.env.VITE_REACT_API_URL;

    const back = () => {
        setTitle('');
        setBody('');
        navigate(-1);
    }

    const savePost = () => {
        fetch(`${url}/posts/add`, {
            method: 'POST',
			headers: {
				"Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem('token')}`
			},
			body: JSON.stringify({
				title: title,
				content: body
			})
        })
        .then(res => res.json())
		.then(data => {
			if (data.message === 'Post created successfully') {
                toast.success('Post created successfully')
                setTitle('');
                setBody('');
                setTimeout(() => {
                    navigate(-1);
                }, 2000);
            }
		})
		.catch(() => {
            toast.error('Something went wrong. Please try again.')
		});
    }

    useEffect(() => {
        const textarea = textAreaRef.current;
        const autoResize = () => {
            textarea.style.height = 'auto';
            textarea.style.height = `${textarea.scrollHeight}px`;
        };
        textarea.addEventListener('input', autoResize);
    },[])

    useEffect(() => {
        if (title !== '' && body !== '') {
            setIsContent(true);
        }
        if (title === '' || body === '') {
            setIsContent(false);
        }
    }, [title, body])

    return (
        <>
            <div>
                <Toaster richColors position="top-center" style={{paddingLeft: '0px'}}/>
            </div>
            <Container className="" id="create">
                <Row className="px-4 pt-4 pb-2">
                    <div className="d-flex align-items-center justify-content-between">
                        <button className="btn btn-add flex text-sm p-1 me-3" onClick={() => back(-1)}><MdArrowBackIosNew className="pe-1"/>Back</button>
                    </div>
                </Row>
                <hr  className="m-0 mx-3"/>
                <Form className="mx-4 py-3">
                    <div className="d-flex align-items-center justify-content-between">
                        <div className="fw-bold mx-1">Create Post</div>
                        { isContent ? (
                            <div className="btn btn-success flex text-sm px-3 py-1" onClick={() => savePost()}>POST</div>
                        ) : (
                            <div className="disabled btn btn-success-outline flex text-sm px-3 py-1" onClick={() => savePost()}>POST</div>
                        )}
                    </div>
                    <Form.Group className="my-2">
                        <Form.Control type="text" maxLength={100} size="sm" placeholder="Title" value={title}  onChange={(e) => setTitle(e.target.value)}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Control as="textarea" className="text-area"  size='sm' value={body} ref={textAreaRef} onChange={(e) => setBody(e.target.value)}/>
                    </Form.Group>
                </Form>
                <hr />
            </Container>
        </>
    )
}

export default CreatePost;
