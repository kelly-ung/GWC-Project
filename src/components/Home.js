import './Home.css';
import { useState, useEffect } from 'react';

export default function Home() {
    const [input, setInput] = useState('');
    const [results, setResults] = useState([]);
    const [data, setData] = useState([]);


    const SHEET_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSa05FqW_RcHpLANcN1veZxu5z4sHPWsa6_phdBrX7SC0dO5NEcjPWYuJR4qaFIhgk-gEdsHYTyNVFo/pub?output=csv';
    
    useEffect(() => {
        fetchCsvData();
    }, []);
    
    const fetchCsvData = async () => {
        try {
        const response = await fetch(SHEET_URL);
        const text = await response.text();
        
        const jsonData = csvToJson(text);
        setData(jsonData);
        } catch (error) {
        console.error('Error fetching CSV:', error);
        }
    };
    
    // Function to convert CSV to JSON
    const csvToJson = (csv) => {
        const lines = csv.split('\n');
        const headers = lines[0].split(',');
    
        const jsonData = lines.slice(1).map(line => {
        const values = line.split(',');
        let obj = {};
        headers.forEach((header, index) => {
            const trimmedHeader = header.trim(); // remove any extra whitespace or characters
            obj[trimmedHeader] = values[index].trim();
        });
        return obj;
        });
    
        return jsonData;
    };
    
    const cityFinder = () => {
        let current;
        let address;
        let matches = [];
        for (let i = 0; i < data.length; i++) {
            current = data.length > 0 ? data[i]["Address"] : 'No data available';
            current = current.toLowerCase();
            address = input.toLowerCase();
            if (current.includes(address)) {
                matches.push(data[i]);
                console.log(data[i]);
            }
        }
        setResults(matches);
    }
    
    const handleSubmit = (e) => {
        e.preventDefault();
        cityFinder();
    }

    return (
        <div>
            <h1>Welcome</h1>
            <p>Try out our food assistance finder to locate places near you.</p>

            <form onSubmit={handleSubmit}>
                <div className='search-input'>
                    <input className='search-bar'
                        type='text'
                        value={input}
                        onChange={e => setInput(e.target.value)}
                        placeholder='Enter zip code or city...'
                    />
                    <button className='search-button' type='submit'>Search</button>
                </div>
            </form>
            
            {results.map((item, index) => (
                <div className='container' key={index}>
                    <h4 className='result-name'>Name: {item.Name}</h4>
                    <li className="result-info">Address: {item.Address}</li>
                    <li className="result-info">Phone: {item.Phone}</li>
                    <li className="result-info">Website: <a href={item.Website} target="_blank" rel="noopener noreferrer">{item.Website}</a></li>
                    <li className="result-info">Type: {item.Type}</li>
                    <li className="result-info">Notes: {item.Notes}</li>
                </div>
            ))}
        </div>
    );
};


