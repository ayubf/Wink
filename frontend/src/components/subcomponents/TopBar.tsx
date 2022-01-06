import Cookies from 'universal-cookie';
import { useNavigate} from 'react-router';
import {Nav } from 'react-bootstrap';
import { Navbar } from 'react-bootstrap';
import React from 'react';
const cookies = new Cookies();



function TopBar() {
    let navigate = useNavigate();

    const logOutHandle = (e: React.ChangeEvent<any>) => {
                    cookies.remove('authed');
                    cookies.remove('username');
                    navigate("/login", {replace: true});
    }

    return (
        <div>
            <Navbar>
                <Navbar.Brand href="/" className="title">Wink</Navbar.Brand> 
                <Nav.Link href="/settings">Settings</Nav.Link> |
                <Nav.Link href="/profile">Profile</Nav.Link> |
                <Nav.Link href="/posts/createpost">Post</Nav.Link> |
                <Nav.Link onClick={logOutHandle}>Log Out</Nav.Link> 
            </Navbar>
        </div>
    )

}

export default TopBar;
