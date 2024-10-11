import './Home.css';
import { useState, useEffect } from 'react';
import CsvToJson from '../CsvToJson';

export default function Home() {
    const [input, setInput] = useState('')

    const handleSubmit = () => {
        setInput(input);
    };

    return (
        <div>
            <h1>Welcome</h1>
            <p>Try out our food finder by entering zip code or address</p>

            <form>
                <input
                    type='text'
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    placeholder='Enter City?...'
                />
                <button type='submit' onClick={handleSubmit}>Search</button>
            </form>
            <CsvToJson address={input}/>
        </div>
    );
};


