const express = require('express');
const res = require('express/lib/response');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const Campground = require('./models/campground');

main().then(console.log('connected')).catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb+srv://admin:admin@cluster0.souit.mongodb.net/myFirstDatabase?retryWrites=true&w=majority');
};

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
    res.render('dummy');
});

app.get('/makecamp', async (req, res) => {
    const camp = new Campground({title: 'Test'});
    await camp.save();
    res.send(camp);
});

app.listen(3000, () => {
    console.log('Ready to go on 3000');
});