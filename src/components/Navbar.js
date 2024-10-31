import './Navbar.css';
import { Link } from 'react-router-dom';
import logo from './images/orange-logo.png';

export default function Navbar({ user }) {
    return (
        <nav className="nav">
            <div class="header">
                <img src={logo} className="logo" alt="Logo" />
                <div className="site-title">Orange Compass</div>
            </div>
            <ul>
                <li>
                    <Link to='/Home'>Home</Link>
                </li>
                <li>
                    <Link to='/Map'>Map</Link>
                </li>
    
                <li>
                    <Link to='/Suggestions'>Suggestions</Link>
                </li>
            </ul>
        </nav>
    );
};