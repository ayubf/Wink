import Cookies from 'universal-cookie';
import {Navigate} from 'react-router';
import { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';

const cookies = new Cookies();

function PostArea() {

    let [postData, setPostData] = useState([])

    useEffect(() => {
        const loadPosts = async () => {
            await fetch("http://localhost:3001/posts", {
                method: "GET",
                headers: {
                    "Content-type":"application/json"
                }
            })
            .then(res => res.json())
            .then(data => setPostData(data)) 
        }

        loadPosts()
    }, [])


    if (cookies.get('authed')) {
        return (
            <div>
                {
                    postData.map(({postTitle, user, postBody}) => {
                        return (
                            <>
                                <Card>
                                    <Card.Title>
                                        <a href={`http://localhost:3000/user/${user}`}>{user}</a>
                                    </Card.Title>
                                    <Card.Subtitle>
                                        {postTitle}
                                    </Card.Subtitle>
                                    <Card.Body>
                                        {postBody}
                                    </Card.Body>
                                </Card>

                            </>
                        )
                    })
                }
            </div>
        )
    } else {
        return (
            <Navigate to="/login" />
        )
     }
    

}

export default PostArea;