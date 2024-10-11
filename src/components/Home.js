import './Home.css';
import { useState } from 'react';

export default function Home() {
    const [input, setInput] = useState('')



    return (
        <div>
            <h1>Home</h1>
            <p>Welcome Try out our food finder by entering zip code or address</p>

            <form>
                <input
                    type='text'
                    input={input}
                    onChange={e => setInput(e.target.value)}
                    placeholder='Enter ZIP?...'
                />
                <button type='submit'>Search</button>
            </form>
        </div>
    );
};


