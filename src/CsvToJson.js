import React, { useState, useEffect } from 'react';

const CsvToJson = ({address}) => {
  const [data, setData] = useState([]);
  const [found, setFound] = useState([]);
  const SHEET_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSa05FqW_RcHpLANcN1veZxu5z4sHPWsa6_phdBrX7SC0dO5NEcjPWYuJR4qaFIhgk-gEdsHYTyNVFo/pub?output=csv';

  useEffect(() => {
    fetchCsvData();
  }, []);

  useEffect(() => {
    cityFinder(); // Call cityFinder whenever address updates
  }, [address]);

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
        obj[header] = values[index];
      });
      return obj;
    });

    return jsonData;
  };

  const cityFinder = () => {
    let current;
    let results = [];
    for (let i = 0; i < data.length; i++) {
      current = data.length > 0 ? JSON.stringify(data[i]["Address"], null, 2) : 'No data available';
      current = current.toLowerCase();
      address = address.toLowerCase();
      if (current.includes(address)) {
        results.push(current);
      }
    }
    setFound(results);
  }
  

  return (
    <div>
      <h1>CSV to JSON Data</h1>
      {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
      {/* <pre>{data.length > 0 ? JSON.stringify(data[1]["Address"], null, 2) : 'No data available'}</pre> */}
      {/* <pre>{current}</pre> */}
      {found}
    </div>
  );
};

export default CsvToJson;
