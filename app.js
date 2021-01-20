const express   = require('express');
const favicon   = require('serve-favicon');
const path      = require('path');
const app       = express();
const port      = 80;

app.use(express.static(path.join(__dirname, '/public')));
app.engine('.html', require('ejs').__express);
app.use(favicon(path.join(__dirname, 'public/images/favicon.ico')));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

// Index site
app.get('/', (req, res) => {
    res.render('index');
});
// Server is running
app.listen(port, () => {
    console.log(`UtiFood-Server is running at http://localhost:${port}`);
});