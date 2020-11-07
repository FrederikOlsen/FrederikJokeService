const mongoose = require('mongoose');
const fetch = require('node-fetch');


const joke = new mongoose.Schema({
    setup:String,
    punchline:String
});


const Joke = mongoose.model('jokes', joke);
