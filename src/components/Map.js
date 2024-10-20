import './Map.css';
import { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import markerIcon from './images/marker.png';

export default function Map() {
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
        
        // testing a marker
        var marker = L.marker([33.7455, -117.8677], {icon: myIcon}).addTo(map);
        
        // Cleanup function
        return () => {
          map.remove();
        };
      }, []);



    return (
        <div className="map-page">
            <div className="map-page" id="map"></div>
        </div>
    );
};