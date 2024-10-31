import './App.css';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Map from './components/Map';
import Suggestions from './components/Suggestions';

export default function App() {
    return (
        <div>
            <Navbar />
            <div className='App-header'>
                <Routes>
                        <Route path='/' element={<Home />} />
                        <Route path='/Home' element={<Home />} />
                        <Route path='/Map' element={<Map />} />
                        <Route path='/Suggestions' element={<Suggestions />} />
                </Routes>
            </div>
        </div>
    );
}