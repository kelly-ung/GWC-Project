import './Home.css';
import { useState, useEffect } from 'react';

export default function Home() {
    const [input, setInput] = useState('');
    const [results, setResults] = useState([]);
    const [data, setData] = useState([]);
    const [filter, setFilter] = useState('');
    const [searchClicked, setSearchClicked] = useState(false);


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
        let currentAddress;
        let currentType;
        let address = input.toLowerCase();
        let type = filter.toLowerCase();
        let matches = [];
        for (let i = 0; i < data.length; i++) {
            currentAddress = data.length > 0 ? data[i]["Address"] : 'No data available';
            currentType = data.length > 0 ? data[i]["Type"] : 'No data available';
            currentAddress = currentAddress.toLowerCase();
            currentType = currentType.toLowerCase();
            if (currentAddress.includes(address) && (currentType.includes(type))) {
                matches.push(data[i]);
                console.log(data[i]);
            }
        }
        setResults(matches);
    }
    
    const handleSubmit = (e) => {
        e.preventDefault();
        cityFinder();
        setSearchClicked(true);
    }

    const handleFilter = (option) => {
        if (option === "Food Pantry") {
            setFilter("Food Pantry");
        }
        else if (option === "Church") {
            setFilter("Church");
        }
        else if (option === "Affordable Grocery") {
            setFilter("Affordable Grocery");
        }
        else if (option === "Food Bank") {
            setFilter("Food Bank");
        }
        else if (option === "Distribution Center") {
            setFilter("Distribution Center");
        }
        else if (option === "Soup Kitchen") {
            setFilter("Soup Kitchen");
        }
        else if (option == "None"){
            setFilter("");
        }
        console.log(filter)
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
                 
                <div className="dropdown">
                <button className="dropbtn">{filter !== '' ? filter : "Assistance Type"}</button>
                <div className="dropdown-content">
                    <button className="save-button" onClick={() => handleFilter("None")}>None </button>
                    <button className="save-button" onClick={() => handleFilter("Food Pantry")}>Food Pantry </button>
                    <button className="save-button" onClick={() => handleFilter("Food Bank")}>Food Bank </button>
                    <button className="save-button" onClick={() => handleFilter("Church")}>Church </button>
                    <button className="save-button" onClick={() => handleFilter("Affordable Grocery")}>Affordable Grocery </button>
                    <button className="save-button" onClick={() => handleFilter("Distribution Center")}>Distribution Center </button>
                    <button className="save-button" onClick={() => handleFilter("Soup Kitchen")}>Soup Kitchen </button>
                </div>
                </div>


                    <button className='search-button' type='submit'>Search</button>
                </div>
            </form>
            
            {searchClicked ?
                (results && results.length > 0 ? 
                    (results.map((item, index) => (
                        <div className='container' key={index}>
                            <h4 className='result-name'>Name: {item.Name}</h4>
                            <li className="result-info">Address: {item.Address}</li>
                            <li className="result-info">Phone: {item.Phone}</li>
                            <li className="result-info">Website: <a href={item.Website} target="_blank" rel="noopener noreferrer">{item.Website}</a></li>
                            <li className="result-info">Type: {item.Type}</li>
                            <li className="result-info">Notes: {item.Notes}</li>
                        </div>
                    )))
                    :
                    <p>No results found. Please check your spelling or try a different keyword or filter.</p>
                )
                :
                null
            }
        </div>
    );
};


