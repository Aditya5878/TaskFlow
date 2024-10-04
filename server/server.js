
const express = require('express');
const cors = require('cors');
const fs = require('fs'); 
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

const dataPath = path.join(__dirname, 'data.json');
let data = {};

fs.readFile(dataPath, 'utf8', (err, jsonString) => {
    if (err) {
        console.error("Error reading file:", err);
        return;
    }
    try {
        data = JSON.parse(jsonString);
    } catch (err) {
        console.error("Error parsing JSON:", err);
    }
});

app.use(cors());
app.use(express.json());

app.get('/api/tickets', (req, res) => {
    res.json(data.tickets);
});

app.get('/api/users', (req, res) => {
    res.json(data.users);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
