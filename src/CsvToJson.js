import React, { useState, useEffect } from 'react';

const CsvToJson = () => {
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
        obj[header] = values[index];
      });
      return obj;
    });

    return jsonData;
  };

  return (
    <div>
      <h1>CSV to JSON Data</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default CsvToJson;
