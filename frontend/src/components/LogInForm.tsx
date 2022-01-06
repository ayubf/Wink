import {useState} from 'react';
import { Navigate, useNavigate } from 'react-router';
import Cookies from 'universal-cookie';
import {Card, Form, Button} from 'react-bootstrap';

const cookies = new Cookies();

function LogInForm() {
    

    let navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e: React.ChangeEvent<any>) => {
        e.preventDefault();
        const userData = JSON.stringify({
          username: username,
          password: password,
        });
    
        await fetch("http://localhost:3001/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: userData,
        }).then((res) => {
            if (res.status === 200) {
                cookies.set('username', username)
                cookies.set('authed', true);
                navigate("/", {replace: true});
            } 
        });


    };

    if (!cookies.get('authed')) {
        return (
            <div className="loginForm">
                <Card className='loginFormForm' >
                    <h1 className='logsigTitle' >Wink</h1>
                    <Card.Body>
                        <Form onSubmit={handleLogin}>
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
                            <Button type="submit">Login</Button>
                        </Form>
                        <p> No account?
                            <a href="http://localhost:3000/signup"> signup here...</a>
                        </p>
                    </Card.Body>
                </Card>
            </div>
        )
    } else {
        return(
            <Navigate to="/" />
        )
    }
}


export default LogInForm;
