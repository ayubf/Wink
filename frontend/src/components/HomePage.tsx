import Cookies from 'universal-cookie';
import { Navigate } from 'react-router'; 
import TopBar from './subcomponents/TopBar';
import Footer from './subcomponents/Footer';
import PostArea from './subcomponents/PostArea';
const cookies = new Cookies();




function HomePage() {

    if (cookies.get('authed')) {
        return(
            <div className="HomePage">
                <TopBar />
                <h2> Welcome, {cookies.get('username')}!</h2>
                <PostArea />
                <Footer />
            </div>
        )
    } else {
        return(
            <Navigate to="/login" />
        )
    }
}

export default HomePage;