const path = require('path');
const express = require('express');
const PageCtrl = require('./controllers/PageCtrl');

const app = express();

const pageCtrl = new PageCtrl();

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, '/../views'));

app.get('/', pageCtrl.register.bind(pageCtrl));

app.listen(3000, () => {
    console.log("Started on 3000.")
});