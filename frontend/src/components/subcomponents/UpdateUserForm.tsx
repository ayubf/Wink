import {Form, Button, Card} from 'react-bootstrap';
import React, {useState} from 'react';
import {Navigate, useNavigate} from 'react-router';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

function UpdateUserForm() {

    let navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [oldPassword, setOldPassword] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleUpdateUser = async (e: React.ChangeEvent<any>) => {
        e.preventDefault();
        const updateData = {
            oldUsername: cookies.get('username'),
            username: username,
            oldPassword: oldPassword,
            password: password,
            confirmPassword: confirmPassword
        }
        await fetch("http://localhost:3001/signup", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updateData),
        }).then((res) => {
            if (res.status === 200) {
                cookies.remove('username')
                cookies.set('username',updateData.username)
                navigate('/', {replace : true})
            } 
        });
    }

    if (cookies.get('authed')) {
        return (
            <div>
            <Card>
                <Card.Subtitle>
                    Update User
                </Card.Subtitle>
                <Card.Body>
                    <Form onSubmit={handleUpdateUser}>
                        <Form.Group>
                            <Form.Label>
                                New Username
                            </Form.Label>
                            <Form.Control autoComplete="off" type="text" value={username} onChange={(e: React.ChangeEvent<any>) => {setUsername(e.target.value)}} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>
                                Old Password
                            </Form.Label>
                            <Form.Control autoComplete="off" type="password" value={oldPassword} onChange={(e: React.ChangeEvent<any>) => {setOldPassword(e.target.value)}} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>
                                New Password
                            </Form.Label>
                            <Form.Control autoComplete="off" type="password" value={password} onChange={(e: React.ChangeEvent<any>) => {setPassword(e.target.value)}} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>
                                Confirm Password
                            </Form.Label>
                            <Form.Control autoComplete="off" type="password" value={confirmPassword} onChange={(e: React.ChangeEvent<any>) => {setConfirmPassword(e.target.value)}} />
                        </Form.Group>
                        <Form.Group>
                                {password === confirmPassword ? "" : "Passwords don't match"}
                        </Form.Group>
                        <Button type="submit" variant="primary">Submit</Button>
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

export default UpdateUserForm;