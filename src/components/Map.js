import './Map.css';
import { useState, useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import markerIcon from './images/marker.png';

export default function Map() {
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

    useEffect(() => {
        // displays a view of Santa Ana by taking latitude and longitude coordinates 
        const map = L.map('map').setView([33.7455, -117.8677], 12); 
    
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(map);
        
        // custom marker icon
        var myIcon = L.icon({
            iconUrl: markerIcon,
            iconSize: [50, 50],
            iconAnchor: [22, 94],
            popupAnchor: [-3, -76],
        });

        const createMarkers = () => {
            for (let i = 0; i < data.length; i++) {
                let latitude = data.length > 0 ? data[i]["Latitude"] : 'No data available';
                let longitude = data.length > 0 ? data[i]["Longitude"] : 'No data available';
                var marker = L.marker([latitude, longitude], {icon: myIcon}).addTo(map);

                // adding popup information 
                let name = data.length > 0 ? data[i]["Name"] : 'No data available';
                let address = data.length > 0 ? data[i]["Address"] : 'No data available';
                let phone = data.length > 0 ? data[i]["Phone"] : 'No data available';
                let website = data.length > 0 ? data[i]["Website"] : 'No data available';
                marker.bindPopup(`
                    <b>${name}</b>
                    <br>${address}
                    <br>${phone}
                    <br><a href="${website}" target="_blank" rel="noopener noreferrer">${website}</a>
                `).openPopup();
            }
        }
        createMarkers();
    
        // Cleanup function
        return () => {
            map.remove();
        };
    }, [data]);



    return (
        <div className="map-page">
            <div className="map-page" id="map"></div>
        </div>
    );
};