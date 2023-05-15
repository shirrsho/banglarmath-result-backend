import express from 'express'
import bodyParser from 'body-parser';
import mongoose from 'mongoose'
import cors from 'cors'

const app = express();
app.use(bodyParser.json())
app.use(cors())

app.get('/',(req, res) => {
    res.send("Hello Banglarmath!");
});

app.get('/result/:id',(req, res) => {
    const id = req.params.id;
});

app.post('/uploadresultsheet', (req, res) => {
    console.log("post");
    let data = req.body;
    console.log('Received POST request with data:', data[0].Name);
    res.send('Sheet Received');
})

app.post('/uploadquestioninfo', (req, res) => {
    console.log("post");
    let data = req.body;
    console.log('Received POST request with data:', data);
    res.send('Ques Received');
})

app.post('/questiontags', (req, res) => {
    console.log("post");
    let data = req.body;
    console.log('Received POST request with data:', data);
    res.send('Tags Received');
})

app.listen(3001,()=>{
    console.log("server started, listening on port 3001");
})