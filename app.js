require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const date = require(__dirname + '/date.js');
const mongoose = require('mongoose');
const Items = require('./models/items');
const WorkItems = require('./models/work');


console.log(date);

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


mongoose.connect(process.env.DB_URI, {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', function(){
    console.log('Connected to MongoDB');
});


app.get('/', function(req, res){
    Items.find()
        .then((items) => {
            res.render('list',{listTitle: date, items: items});
        })
        .catch((err) => {
            console.log(err);
        });
});

app.post('/', function(req, res){

    let item = req.body.newItem;

    if(req.body.list === "Work"){
        const item = new WorkItems();
        item.name = req.body.newItem;
        item.save()
            .then(() => {
            res.redirect('/work');
        })
        .catch((err) => {
            console.log(err);
        });
    }else{  
        const item = new Items();
        item.name = req.body.newItem;
        item.save()
            .then(() => {
            res.redirect('/');
        })
        .catch((err) => {
            console.log(err);
        });
    }
});


app.get('/work', function(req, res){
    WorkItems.find()
    .then((items) => {
        res.render('list',{listTitle: "Work List", items: items});
    })
    .catch((err) => {
        console.log(err);
    });
});


app.post('/work', function(req, res){
    const item = new WorkItems();
    item.name = req.body.newItem;
    item.save()
        .then(() => {
        res.redirect('/work');
    })
    .catch((err) => {
        console.log(err);
    });
});

app.get('/about', function(req, res){
    res.render('about');
});

app.post('/delete', function(req, res){
    const checkedItemId = req.body.checkbox;
    const list = req.body.list;

    console.log(list);

    if(list === "Work"){
        WorkItems.findByIdAndRemove(checkedItemId)
            .then(() => {
                res.redirect('/work');
            })
            .catch((err) => {
                console.log(err);
            });
    }else{
        Items.findByIdAndRemove(checkedItemId)
            .then(() => {
                res.redirect('/');
            })
            .catch((err) => {
                console.log(err);
            });
    }
});

app.listen(3000, function(){
    console.log('Server is running on port 3000');
});
