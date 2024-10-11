import './Navbar.css';
import { Link } from 'react-router-dom';

export default function Navbar({ user }) {
    return (
        <nav className="nav">
            <div className="site-title">Site Name</div>
                <ul>
                    <li>
                        <Link to='/Home'>Home</Link>
                    </li>
                    <li>
                        <Link to='/Map'>Map</Link>
                    </li>
        
                    <li>
                        <Link to='/Explore'>Explore</Link>
                    </li>
                </ul>
        </nav>
    );
};