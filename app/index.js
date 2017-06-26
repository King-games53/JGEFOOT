const path = require('path');
const express = require('express');
const IndexCtrl = require('./controllers/IndexCtrl');

const app = express();

const indexCtrl = new IndexCtrl();

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, '/../views'));

app.get('/', indexCtrl.register.bind(indexCtrl));

app.listen(3000, () => {
    console.log("Started on 3000.")
});