import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Image1 from "./upload.jpg";
import Image2 from "./download.jpg";
import "./TopRightButtons.css";
import "./Footer.css";
import "./Body.css";

const buttonContainerStyle = {
  display: "flex",
  justifyContent: "space-around",
  marginTop: "20px",
};

const App = () => {
  const backgroundColor = "#da5024";
  return (
    <div style={{ backgroundColor }}>
      <footer className="footer">
        <div className="links-container">
          <Link className="link" to="/">
            Logout
          </Link>
        </div>
      </footer>
      <center>
        <h1 style={{ color: "white" }}>DASHBOARD</h1>
        <h2>Welcome User</h2>
      </center>
      <div style={buttonContainerStyle}>
        <div>
          <br />
          <br />
          <Link to="/upload">
            <img src={Image1} alt="Image 1" />
          </Link>
          <button>
            <Link to="/upload">Upload</Link>
          </button>
        </div>
        <div>
          <br />
          <br />
          <Link to="/download">
            <img src={Image2} alt="Image 2" />
          </Link>
          <button>
            <Link to="/download">Download</Link>
          </button>
        </div>
      </div>
      <div className="container">
        <div className="left">
          {/* Content for the left portion */}
          <h2>UPLOAD FILES</h2>
          <p style={{ textAlign: "justify", fontSize:20 }}>
            Welcome to our IPFS file uploader! With this sleek and user-friendly
            interface, you can effortlessly upload your files to the
            InterPlanetary File System (IPFS) for secure and decentralized
            storage. Simply choose the file you wish to upload, enter a filename
            for easy reference, and provide your username for tracking purposes.
            Once you hit the "Upload to IPFS" button, our system takes care of
            the rest, securely pinning your file to the IPFS network within
            seconds. Plus, with our integrated link navigation in the footer,
            you can seamlessly navigate between different sections of our
            platform, ensuring a smooth and intuitive user experience. So why
            wait? Try our uploader now and experience the future of file storage
            with IPFS!
          </p>
        </div>
        <div className="right">
          {/* Content for the right portion */}
          <h2>DOWNLOAD FILES</h2>
          <p style={{ textAlign: "justify", fontSize:20 }}>
            Welcome to our IPFS file downloader! With this convenient tool, you
            can effortlessly retrieve files stored on the InterPlanetary File
            System (IPFS) with just a few clicks. Simply enter your username to
            search for files associated with your account, and our system will
            promptly fetch the corresponding IPFS hash and filename. Once you've
            identified the file you want to download, assign a filename for
            saving and input the IPFS hash, then hit the "Download from IPFS"
            button. Within moments, your file will be retrieved from the
            decentralized IPFS network and saved locally for your convenience.
            Plus, with our intuitive navigation links in the footer, you can
            seamlessly navigate between different sections of our platform,
            ensuring a smooth and enjoyable user experience. Don't wait any
            longer—try our downloader now and experience the power and
            simplicity of IPFS file retrieval!
          </p>
        </div>
      </div>
    </div>
  );
};

export default App;
