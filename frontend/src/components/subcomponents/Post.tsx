import {Card} from 'react-bootstrap';

function Post(postTitle: any, user: any, postBody: any) {
    return(
        <Card>
                    {/* <Card.Subtitle>
                                        <a href={`http://localhost:3000/user/${user}`}>{user}</a>
                                    </Card.Subtitle> */}
            <Card.Body>
                <Card.Title> 
                    {postTitle}
                </Card.Title>
                <Card.Subtitle>
                    <a href={`localhost:3000/user/${user}`}>{user}</a>
                </Card.Subtitle>
                {postBody}
            </Card.Body>
        </Card>

    )
}

export default Post;

