import './App.css';
import { Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Map from './components/Map';
import Suggestions from './components/Suggestions';

export default function App() {
    const [mode, setMode] = useState(true);
    return (
        <div>
            <Navbar mode={mode} setMode={setMode} />
            <div className={mode ? 'App-header-dark' : 'App-header-light'}>
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