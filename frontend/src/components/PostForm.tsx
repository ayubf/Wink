import {Form, Button, Card} from 'react-bootstrap';
import React, {useState} from 'react';
import { Navigate, useNavigate } from 'react-router';
import Cookies from 'universal-cookie';
import Footer from './subcomponents/Footer';
import TopBar from './subcomponents/TopBar';

const cookies = new Cookies();

function PostForm() {
    
    let navigate = useNavigate();

    const [postTitle, setPostTitle] = useState("");
    const [postBody, setPostBody] = useState("");


    const handlePostForm = async (e: React.ChangeEvent<any>) => {
        e.preventDefault();
        const postData = {  
            postTitle: postTitle,
            postBody: postBody,
            user: cookies.get('username')
        }

        await fetch("http://localhost:3001/posts/createpost", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(postData)
        }).then((res) => {
            if (res.status === 200) {
                navigate('/', {replace: true})
            }
        })
    }

    if (cookies.get("authed")) {
        return (
            <div>
                <TopBar />
                <Card>
                    <Card.Subtitle>
                        Create Post
                    </Card.Subtitle>
                    <Card.Body>
                        <Form onSubmit={handlePostForm}>
                            <Form.Group>
                                <Form.Label>
                                    Post Title
                                </Form.Label>
                                <Form.Control type='text' value={postTitle} onChange={(e: React.ChangeEvent<any>) => {setPostTitle(e.target.value)}}/>
                            </Form.Group>
                            <Form.Group>
                                <Form.Control as="textarea" value={postBody} onChange={(e: React.ChangeEvent<any>) => {setPostBody(e.target.value)}}/>
                            </Form.Group>
                            <Button type="submit" variant='primary'> Submit</Button>
                        </Form>
                    </Card.Body>
                </Card>
                <Footer />
            </div>
        )
    } else {
        return (
            <Navigate to="/login" />
        )
    }

}

export default PostForm;