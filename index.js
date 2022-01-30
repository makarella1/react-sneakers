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

app.get('/campgrounds', async (req, res) => {
    const allCamps = await Campground.find({});
    res.render('campgrounds/index', {allCamps});
});

app.get('/campgrounds/:id', async (req, res) => {
    const camp = await Campground.findById(req.params.id);
    res.render('campgrounds/show', {camp});
});

app.listen(3000, () => {
    console.log('Ready to go on 3000');
});