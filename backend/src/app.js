const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
require("dotenv").config();
const app = express();

app.use(cors({
    origin: ['http://localhost:3000', 'https://localhost:3000', 'https://localhost:3001', 'http://localhost:3001'],

    credentials: true
}));

app.use(logger("dev")); // for logs 
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// view engine setup
app.set('view engine', 'ejs');
app.set('views', './view');

app.get('/', (req, res) => {
    res.status(200).json({
        message: "server is up and running 🛠"
    })
});

app.use("/api/auth", require("../routes/authRoute"));
app.use("/api/admin", require("../routes/adminRoute"));
app.use("/api/system", require("../routes/systemRoute"));
app.use("/api/product", require("../routes/productRoute"));
app.use("/api/vendor", require("../routes/vendorRoute"));
app.use("/api/canteen", require("../routes/canteenRoute"));


app.get('*', (req, res) => {
    return res.status(404).json({ message: 'Not found, Check the URL properly !!!' });
})

app.use((err, req, res, next) => {
    console.log(err);
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        return res.status(400).json({ message: 'Invalid JSON payload' });
    }
    return res.status(500).json({ message: 'Internal Server Error' });
});

module.exports = app;