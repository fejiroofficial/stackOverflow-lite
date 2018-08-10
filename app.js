import express from 'express';

var app = express();

app.get('/', function(req, res){
    res.send('Stack Overflow-lite!');
});

app.listen(1357);
console.log('Running on port 1357...');
