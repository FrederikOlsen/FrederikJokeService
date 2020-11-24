const express = require('express');
const jokeController = require('../controller/controller');
const jokeSchema = require('../models/jokeschema');
const fetch = require('node-fetch');
const bodyParser = require('body-parser'); // Grabs body-parser
const app = express();


/**
 * Router endpoint to add a joke
 */
app.post('/jokes', (request, response) => {
    if (request.body.setup != 0 && request.body.punchline != 0) {
        const newJoke = new jokeSchema({
            setup: request.body.setup,
            punchline: request.body.punchline
        });
        jokeController.createJoke(newJoke)
        .then(joke => {
            joke.save();
            response.render('main', { layout: 'index', createdJoke: 'Joke has been created' });
        })
        .catch(error => console.log(error));       
    }
});

app.get('/create/joke', (request, response) => {
    response.render('createjoke', { layout: 'index', listExists: true});
});

/**
 * Router endpoint to get joke by id
 * @param id to get joke by
 */
app.get('/joke/:id', (request, response) => {
    if (request.params.id != null) {
        jokeController.getJokeById(request.params.id)
        .then(foundEl => {
            response.send(foundEl);
        })
        .catch(error => console.log(error));
    }
});

/**
 * Router endpoint to get all jokes
 */
app.get('/jokes', ( async(request, response) => {
    let jokes = await jokeController.getAllJokes();  
    response.send(jokes);
}));

/**
 * Router endpoint to delete joke by id
 * @param id joke with id to delete 
 */
app.delete('/joke/:id', (request, response) => {
    console.log(request.params);
    if (request.params.id != null) {
        jokeController.deleteJoke(request.params.id).then(value => {
        })
        .catch(error => console.log(error))
        const msg = { msg: 'joke deleted'};   
        const jsonMSG = JSON.stringify(msg);
        response.send(jsonMSG);
    }
});

//The 404 Route (ALWAYS Keep this as the last route)
app.get('*', function(req, res){
    res.status(404).send('what???');
});

module.exports = app;