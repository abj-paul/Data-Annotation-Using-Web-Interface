
const express = require('express');
const cors = require('cors');
const fs = require('fs');


// Constants
const PORT = 3000;

const app = express();

// Middleware
app.use(express.json());
app.use(cors());


app.post('/api/v1/save', (req, res) => {
    console.log("Received request...");
    console.log(req.body);
    const annotations = req.body.annotations;


    const filePath = 'annotations_'+getCurrentTimeForFilename()+'.txt';
    fs.writeFile(filePath, JSON.stringify(annotations), (err) => {
    if (err) {
        console.error('Error writing to file:', err);
    } else {
        console.log('Data has been written to the file successfully.');
    }
});


});


function getCurrentTimeForFilename() {
    const currentTime = new Date();
    const year = currentTime.getFullYear();
    const month = String(currentTime.getMonth() + 1).padStart(2, '0');
    const day = String(currentTime.getDate()).padStart(2, '0');
    const hours = String(currentTime.getHours()).padStart(2, '0');
    const minutes = String(currentTime.getMinutes()).padStart(2, '0');
    const seconds = String(currentTime.getSeconds()).padStart(2, '0');
  
    return `${year}${month}${day}_${hours}${minutes}${seconds}`;
  }
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
