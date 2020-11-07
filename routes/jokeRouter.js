const express = require('express');
const app = expres();
const controller = require('../controller/controller');

app.get('/jokes', (request, response) => {
    
});


app.delete('/joke/:id', (request, response) => {

});



module.exports = app;