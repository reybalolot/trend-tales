import { useContext, useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Form, Button, Container, Row, Col, Card } from "react-bootstrap";
import { Toaster, toast } from "sonner";

const Register = () => {

    const [ firstName, setFirstName ] = useState('');
    const [ lastName, setLastName ] = useState('');
    const [ username, setUsername ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ isActive, setIsActive ] = useState(false);
    const [ isUsername, setIsUsername] = useState(false);
    const [ isPassword, setIsPasword] = useState(false);

    const navigate = useNavigate();
    const url = import.meta.env.VITE_REACT_API_URL || 'http://localhost:4000';

    const register = (e) => {
        e.preventDefault();

        fetch(`${url}/user/register`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                firstName: firstName,
                lastName: lastName,
                username: username,
                email: email,
                password: password
            })
        })
        .then(res => res.json())
        .then(data => {

            if (data) {
                if (data.error) {

                    if (data.error === 'Invalid name format') {
                        toast.error('Invalid name format.');
                    } else if (data.error === 'Invalid Email') {
                        toast.error('Invalid email');
                    } else if (data.error === 'Password must be at least 8 characters') {
                        toast.error('Password must be at least 8 characters.');
                    }
                    toast.error("Error registering. Please try again later.");
                } else if (data.success === false) {
                    toast.info("Email already exists. Try loggin in.");
                    navigate('/login');
                } else if (data.success === true) {
                    toast.success("Registered successfully.");
                    navigate('/login');
                }
            } else {
                toast.error('Something went wrong. Please try again later.')
            }
        })
        .catch(() => {
            toast.error('Something went wrong. Please try again later.')
        })
    }


    useEffect(() => {
        const nameRegex = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (nameRegex.test(firstName) &&
            nameRegex.test(lastName) &&
            emailRegex.test(email) &&
            username.length >= 3 &&
            password.length >= 8
        ) {
            setIsActive(true);
        } else {
            setIsActive(false);
        }

        //display username text
        if (username.length > 0) {
            setIsUsername(true);
        } else {
            setIsUsername(false);
        }

        //display password text
        if (password.length > 0 && password.length !== 8) {
            setIsPasword(true);
        } else {
            setIsPasword(false);
        }
    }, [ firstName, lastName, username, email, password ])

    return (
        <>
           <Container className="flex">
                <div>
                    <Toaster richColors position="top-center" style={{paddingLeft: '0px'}}/>
                </div>
                <Row className="justify-content-center">
                    <Card className="m-5 p-0 shadow border-0" style={{width:'400px'}}>
                        <div className="rounded-top" style={{height:'30px', backgroundColor: '#37bc9b'}}></div>
                        <Form onSubmit={register} className="p-5">
                            <h2 className="fw-bold">Register</h2>
                            <hr />
                            <Form.Group className="my-2">
                                <Form.Label className="fw-bold">First Name</Form.Label>
                                <Form.Control
                                    type="text"
	        	                    placeholder="first name"
	        	                    value={firstName}
            				        onChange={(e) => setFirstName(e.target.value)}
	        	                    required
                                />
                            </Form.Group>
                            <Form.Group className="my-2">
                                <Form.Label className="fw-bold">Last Name</Form.Label>
                                <Form.Control
                                    type="text"
	        	                    placeholder="last name"
	        	                    value={lastName}
            				        onChange={(e) => setLastName(e.target.value)}
	        	                    required
                                />
                            </Form.Group>
                            <Form.Group className="my-2">
                                <Form.Label className="fw-bold">Username</Form.Label>
                                <Form.Control
                                    type="text"
	        	                    placeholder="username"
	        	                    value={username}
            				        onChange={(e) => setUsername(e.target.value)}
	        	                    required
                                />
                                {!isUsername ? (null) : (
                                    <Form.Text className="text-xs">
                                        This will serve as your display name. | At least 3 characters.
                                    </Form.Text>
                                )}
                            </Form.Group>
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
                                {!isPassword ? (null) : (
                                    <Form.Text className="text-xs">
                                        Password must be at least 8 characters.
                                    </Form.Text>
                                )}
                            </Form.Group>

                             { isActive ?
	        	                <Button type="submit" id="submitBtn" className="text-white mt-3 w-100" style={{backgroundColor: '#3bafda',border:'1px solid #3bafda'}}>
	        	                    Submit
	        	                </Button>
	        	                 :
	        	                <Button variant="secondary" type="submit" id="submitBtn" disabled className="mt-3 w-100">
	        	                    Submit
	        	                </Button>
	        	            }
					            <p className="text-center mt-3 text-sm">
                                    Already have an account? Click <Link to="/login">here</Link> to login.
                	            </p>
                        </Form>
                    </Card>
                </Row>
            </Container>
        </>
    )
}

export default Register;
