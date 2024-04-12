import React, { useState } from 'react';
import axios from 'axios';
import './TopRightButtons.css';
import { Link } from 'react-router-dom';
import "./Footer.css";

const Uploader = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [ipfsHash, setIpfsHash] = useState(null);
  const [error, setError] = useState(null);
  const [filename, setFilename] = useState(null);
  const [username, setUsername] = useState(null); 

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    setIpfsHash(null); // Reset ipfsHash when a new file is selected
    setFilename(null)
  };

  const uploadToIPFS = async (e) => {
    e.preventDefault();
    if (!selectedFile) {
      setError('Please select a file.');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('file', selectedFile);
      const response = await axios.post(
        'https://api.pinata.cloud/pinning/pinFileToIPFS',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            'pinata_api_key': '37170179c6c7b35459c4',
            'pinata_secret_api_key': '85c18bc6c64dbac0689efc1f29f52684ec335e0a72edb5164164daa29badfdb7',
          },
        }
      );

      const hash = response.data.IpfsHash;
      setIpfsHash(hash);
      setError(null); // Clear any previous errors
      
      // After successfully uploading to IPFS, send data to server
      await sendToServer(hash, filename); // Assuming you have a function to send data to the server
    } 
    catch (error) {
      setError(`Error uploading to IPFS: ${error.message}`);
      console.log(error);
    }
  };

  const sendToServer = async (hash, filename) => {
    try {
      // Adjust the URL according to your server endpoint
      await axios.post('http://localhost:8000/upload', {
        ipfsHash: hash,
        filename: filename,
        username: username
      });
    } 
    catch (error) {
      console.error('Error sending data to server:', error);
    }
  };

  const backgroundColor = '#da5024';
  return (
    <div style={{ backgroundColor }}>
      <footer className="footer">
        <div className="links-container">
        <Link className="link" to="/home">Home</Link>
        <Link className="link" to="/download">Download</Link>
        <Link className="link" to="/">Logout</Link>
        </div>
      </footer>
      <center>
        <br /><br />
        <h1>Upload Files You Want To Store In IPFS</h1>
        <br /><br />
        <input type="file" onChange={handleFileChange} />
        <br /><br />
        <label>Enter Filename : </label>
        <input type="text" onChange={(e) => { setFilename(e.target.value) }} name="" id="filename" placeholder="Enter Your Filename" size="xs" style={{ width: '200px' }} />
        <br /><br />
        <label>Enter Username : </label>
        <input type="text" onChange={(e) => { setUsername(e.target.value) }} name="" id="username" placeholder="Enter Your Username" size="xs" style={{ width: '200px' }} />
        <br /><br />
        <button onClick={uploadToIPFS}>Upload to IPFS</button>

        <p style={{ color: 'white' }}>After tapping the "Upload to IPFS" button, wait 10 seconds for the process to complete.</p>

        {ipfsHash && (
          <div>
            <p>IPFS Hash: {ipfsHash}</p>
          </div>
        )}

        {error && (
          <div style={{ color: 'red' }}>
            <p>{error}</p>
          </div>
        )}
      </center>
    </div>
  );
};

export default Uploader;
