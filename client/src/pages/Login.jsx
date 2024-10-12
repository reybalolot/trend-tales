import { useContext, useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Form, Button, Container, Row, Col, Card } from "react-bootstrap";
import { Toaster, toast } from "sonner";
import UserContext from "../context/UserContext";
import { jwtDecode } from "jwt-decode";

const Login = () => {

    const { user, setUser } = useContext(UserContext);
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ isActive, setIsActive ] = useState(false);

    const navigate = useNavigate();
    const url = import.meta.env.VITE_REACT_API_URL || 'http://localhost:4000';

    const authenticate = (e) => {
        e.preventDefault();
        toast.success(<div className="p-3">TEST TOAST</div>)
        // fetch(`${url}/user/login`, {
		// 	method: 'POST',
		// 	headers: {
		// 		"Content-Type": "application/json"
		// 	},
		// 	body: JSON.stringify({
		// 		email: email,
		// 		password: password
		// 	})
		// })
		// .then(res => res.json())
		// .then(data => {
		// 	if (data.access) {

        //         localStorage.setItem('token', data.access);
        //         setUser(jwtDecode(data.access))
        //         navigate('/movies')

		// 	} else {
        //         toast.info('This is an info.')
		// 		// swal.fire({
		// 		// 	title: "Authentication failed",
		// 		// 	icon: "error",
		// 		// 	text: "Check your login details and try again."
		// 		// });
		// 	}
		// })
		// .catch(() => {
        //     console.log('error')
		// 	// swal.fire({
		// 	// 	title: "Login Failed",
		// 	// 	icon: "error",
		// 	// 	text: "Something went wrong. Please try again later."
		// 	// });
		// });
    }
    useEffect(() => {
        if (email !== '' && password !== '') {
            setIsActive(true);
        } else {
            setIsActive(false);
        }
    }, [email, password]);

    return (
        <>
            <Container className="flex">
                <div>
                    <Toaster richColors position="top-center" style={{paddingLeft: '0px'}}/>
                </div>
                <Row className="justify-content-center">
                    <Card className="m-5 p-0 shadow border-0" style={{width:'400px'}}>
                        <div className="rounded-top" style={{height:'30px', backgroundColor: '#37bc9b'}}></div>
                        <Form onSubmit={authenticate} className="p-5">
                            <h2 className="fw-bold">Login</h2>
                            <hr />
                            <Form.Group className="my-2">
                                <Form.Label className="fw-bold">Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="email"
	        	                    value={email}
            				        onChange={(e) => setEmail(e.target.value)}
	        	                    required
                                />
                            </Form.Group>
                            <Form.Group className="my-2">
                                <Form.Label className="fw-bold">Password</Form.Label>
                                <Form.Control
                                    type="password"
	        	                    placeholder="password"
	        	                    value={password}
            				        onChange={(e) => setPassword(e.target.value)}
	        	                    required
                                />
                            </Form.Group>

                             { isActive ?
	        	                <Button type="submit" id="submitBtn" className="text-white mt-3 w-100" style={{backgroundColor: '#3bafda',border:'1px solid #3bafda'}}>
	        	                    Login
	        	                </Button>
	        	                 :
	        	                <Button variant="secondary" type="submit" id="submitBtn" disabled className="mt-3 w-100">
	        	                    Login
	        	                </Button>
	        	            }
					            <p className="text-center mt-3 text-small">
                                    Do not have an account? Click <Link to="/register">here</Link> to register.
                	            </p>
                        </Form>
                    </Card>
                </Row>
            </Container>
        </>
    )
}

export default Login;
