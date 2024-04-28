const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

//Kết nối tới database
const db = require('./src/config/db');
db.connect();

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
