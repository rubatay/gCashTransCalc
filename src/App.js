import React from 'react';
import './App.css';
import Upload from './components/fileUploadComponent'; // Import the upload module

function App() {
  return (
    <div className="App">
      <h1>GCash Transaction Fee Calculator</h1>
      <Upload /> {/* Use the fileUpload module */}
    </div>
  );
}

export default App;
