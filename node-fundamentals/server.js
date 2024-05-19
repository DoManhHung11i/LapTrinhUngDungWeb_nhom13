const express = require('express');
const { engine } = require('express-handlebars');
const path = require('path');
const sass = require('sass');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

const route = require('./src/routes')

app.use(express.static(path.join(__dirname,'src', 'public')));

// Sử dụng middleware body-parser để phân tích nội dung của yêu cầu POST
app.use(bodyParser.json());

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

app.use(
    express.urlencoded({
        extended: true,
    }),
);

// Sử dụng cookie-parser middleware
app.use(cookieParser());

route(app);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
