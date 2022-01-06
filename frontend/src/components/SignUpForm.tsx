import {useState} from 'react';
import { Navigate, useNavigate } from 'react-router';
import Cookies from 'universal-cookie';
import {Card, Form, Button} from 'react-bootstrap';


const cookies = new Cookies();

function SignUpForm() {

    let navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSignUp = async (e: React.ChangeEvent<any>) => {
        e.preventDefault();
        const userData = JSON.stringify({
          username: username,
          password: password,
          confirmPassword: confirmPassword
        });
    
        await fetch("http://localhost:3001/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: userData,
        }).then((res) => {
            if (res.status === 201) {
                navigate("/login", {replace: true})
            } 
        });

    };

    if (!cookies.get('authed')) {
        return (
            <div className="signUpForm">
                <Card>
                    <h1 className='logsigTitle'>Wink</h1>
                    <Card.Body>
                        <Form onSubmit={handleSignUp}>
                            <Form.Group>
                                <Form.Label>
                                    Username:
                                </Form.Label>
                                <Form.Control type="text" value={username} onChange={(e) => setUsername(e.target.value)}/>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>
                                    Password:
                                </Form.Label>
                                <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>
                                    Confirm Password
                                </Form.Label>
                                <Form.Control type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                            </Form.Group>
                            <Form.Group>
                                {password === confirmPassword ? "" : "Passwords don't match"}
                            </Form.Group>
                            <Button variant='primary' type="submit">Sign up</Button>
                        </Form>

                        <p>Already a user? 
                            <a href="http://localhost:3000/login"> login here...</a>
                        </p>
                    </Card.Body>
                </Card>


            </div>


        )
    } else {
        return (
            <Navigate to='/' />
        )
    }
}

export default SignUpForm;