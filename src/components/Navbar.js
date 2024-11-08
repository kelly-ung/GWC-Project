import './Navbar.css';
import { Link } from 'react-router-dom';
import logo from './images/orange-logo.png';

export default function Navbar({ mode, setMode }) {
    const handleClick = () => {
        setMode(!mode);
        if (mode === 'dark') {
            document.documentElement.setAttribute('data-theme', 'light');
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
        }
    }
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
                <li>
                    <button className={mode ? 'dark' : 'light'} onClick={handleClick}>
                        {mode ? 'Dark Mode' : 'Light Mode'}
                    </button>
                    
                </li>
            </ul>
        </nav>
    );
};