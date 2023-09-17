const express = require('express');
const app = express();
const port = 5000;

app.use('/', express.static('public'));

const budget = {
    budget: [
    {
        title: 'Eat out',
        budget: 30
    },
    {
        title: 'Rent',
        budget: 300
    },
    {
        title: 'Groceries',
        budget: 100
    },

]}
app.get('/hello',(req,res) => {
    res.send('Hello world');
});
app.get('/budget',(req,res) => {
    res.json(budget);
});
app.listen(port, () => {
    console.log('example app listening at http://localhost:${port}');
});
