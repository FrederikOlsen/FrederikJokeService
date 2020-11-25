const mongoose = require('mongoose');
const fetch = require('node-fetch');

const joke = new mongoose.Schema({
    setup:String,
    punchline:String
});

const jokeModel = mongoose.model('jokes', joke);
