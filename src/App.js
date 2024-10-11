import './App.css';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Map from './components/Map';
import Explore from './components/Explore';
import Csv from './CsvToJson'

export default function App() {
    return (
        <div>
            <Navbar />
            <div class="App-header">
                <Routes>
                        <Route path='/' element={<Home />} />
                        <Route path='/Home' element={<Home />} />
                        <Route path='/Map' element={<Map />} />
                        <Route path='/Explore' element={<Explore />} />
                </Routes>
            </div>
        </div>
    );
}