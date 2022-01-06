import Cookies from 'universal-cookie';
import {Navigate} from 'react-router';
import { useEffect, useState } from 'react';
import TopBar from './subcomponents/TopBar';
import Footer from './subcomponents/Footer';
import { Card } from 'react-bootstrap';

const cookies = new Cookies();

function ProfilePage() {

    let [usrData, setUsrData] = useState({
        user : {
            username: "",
            views: "",
            date: Date.now()
        },
        posts: []
    });


    useEffect(() => {
        const handleProfile = async () => {
            await fetch("http://localhost:3001/profile", {
                method: "POST", 
                headers: {
                    "Content-Type":"application/json"
                },
                body: JSON.stringify({username: cookies.get('username')})
            })
            .then(res => res.json())
            .then(data => setUsrData(data))
        }

        handleProfile();
    }, [])


    console.log(usrData.posts);
    
    if (cookies.get('authed')) {
        return (
            <div className='profilePageDiv'>
                <TopBar />
                <h1>Profile Page</h1>
                <Card>
                    <Card.Title>
                        {usrData.user.username}
                    </Card.Title>
                    <Card.Body>
                       <Card.Subtitle>
                           Date Joined: {usrData.user.date}
                       </Card.Subtitle>
                       <Card.Subtitle>
                           Views: {usrData.user.views}
                       </Card.Subtitle>
                    </Card.Body>
                </Card>
                <Card>
                    {usrData.posts.map(({ postTitle, postBody }) => {
                        return (
                            <>
                                <Card>
                                    <Card.Body>
                                        <Card.Title> 
                                            {postTitle}
                                        </Card.Title>
                                        {postBody}
                                    </Card.Body>
                                </Card>
                            </>
                        )
                    })}
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

export default ProfilePage;