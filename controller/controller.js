const jokeUrl = 'https://krdo-joke-registry.herokuapp.com/';
const jokeModel = require('../model/jokes');



exports.getAllJokes = () => {
    return await jokeModel.find();
};

exports.getJokeById = (id) => {

};

exports.deleteJokeById = (id) => {

};

exports.createJoke = (setup, punchline) => {
    return await Joke.create({ setup, punchLine });
}

/**
 * async function createJoke(setUp, punchLine) {
    return await Joke.create({ setUp, punchLine });
}

async function getJoke(id) {
    return await Joke.findOne().where(id).eq('_id').exec();
}

async function getJokes() {
    return await Joke.find().exec();
}

async function updateJoke(setUp, punchLine) {
    Joke.setUp = setUp;
    Joke.punchLine = punchLine;
    return await Joke.save();
}

async function deleteJoke(Joke) {
    Person.deleteOne().where('_id').eq(Joke._id).exec();
}

 * 
 * 
 * 
 */