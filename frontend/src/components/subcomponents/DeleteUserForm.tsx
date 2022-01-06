import {Form, Button, Card} from 'react-bootstrap';
import React, {useState} from 'react';
import {Navigate, useNavigate} from 'react-router';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

function DeleteUserForm() {
    let navigate = useNavigate();

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("")

    const handleDeleteUser = async (e: React.ChangeEvent<any>) => {
        e.preventDefault();
        const userData = {
            username: cookies.get("username"),
            password: password,
            confirmPassword: confirmPassword
        }

        await fetch("http://localhost:3001/signup", {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(userData)
          }).then((res) => {
              if (res.status === 200) {
                  cookies.remove('username');
                  cookies.remove('authed');
                  navigate("/login", {replace: true});
              }
          });

    }  

    if (cookies.get('authed')) {
        return (
            <div>
                <Card>
                    <Card.Subtitle>
                        Delete User
                    </Card.Subtitle>
                    <Card.Body>
                        <Form onSubmit={handleDeleteUser}>
                            <Form.Group>
                                <Form.Label>
                                    Password
                                </Form.Label>
                                <Form.Control type="password" value={password} onChange={(e) => {setPassword(e.target.value)}} />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>
                                    Confirm Password
                                </Form.Label>
                                <Form.Control type="password" value={confirmPassword} onChange={(e) => {setConfirmPassword(e.target.value)}}/>
                            </Form.Group>
                            <Form.Group>
                                {password === confirmPassword ? "" : "Passwords don't match"}
                            </Form.Group>
                            <Button type="submit" variant='primary'>Submit</Button>
                        </Form>
                    </Card.Body>
                </Card>
            </div>
        )
    } else {
        return (
            <Navigate to="/login" />
        )
    }

}

export default DeleteUserForm;