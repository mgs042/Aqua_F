import React from 'react';
import Papa from 'papaparse';

class CSVDownloader extends React.Component {
  constructor(props) {
    super(props);
    this.downloadCSV = this.downloadCSV.bind(this);
  }

  async downloadCSV() {
    try {
      const response = await fetch('https://ec2-13-239-43-135.ap-southeast-2.compute.amazonaws.com/download');
      const jsonData = await response.json();

      // Convert JSON data to CSV format
      const csv = Papa.unparse(jsonData);

      // Create a Blob object containing the CSV data
      const blob = new Blob([csv], { type: 'text/csv' });

      // Create a URL for the Blob
      const url = window.URL.createObjectURL(blob);

      // Create an anchor element to trigger the download
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'data.csv');

      // Append the anchor element to the document body and trigger the click event
      document.body.appendChild(link);
      link.click();

      // Clean up by removing the anchor element
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error downloading CSV:', error);
    }
  }

  render() {
    const buttonStyle = {
      backgroundColor: '#247cf5',
      color: '#fff',
      border: 'none',
      padding: '10px 20px',
      textAlign: 'center',
      textDecoration: 'none',
      display: 'inline-block',
      fontSize: '16px',
      cursor: 'pointer',
      borderRadius: '5px'
    };
  
    return (
      <button onClick={this.downloadCSV} style={buttonStyle}>
        Download CSV
      </button>
    );
  }
}

export default CSVDownloader;