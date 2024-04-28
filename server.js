const express = require('express');
const { engine } = require('express-handlebars');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

//Kết nối tới database
const db = require('./src/config/db');
db.connect();

//cấu hình handlebars
app.engine(
    'hbs',
    engine({
        extname: '.hbs',
    }),
);
app.set('view engine', 'hbs');

//Đặt folder chứa các file view là folder views
app.set('views', path.join(__dirname, 'src','views'));

app.get('/', (req, res) => {
    res.render('home');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
