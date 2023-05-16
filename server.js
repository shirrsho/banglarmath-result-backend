import express from 'express'
import bodyParser from 'body-parser';
import mongoose from 'mongoose'
import cors from 'cors'

const app = express();
app.use(bodyParser.json())
app.use(cors())

var resultsheet = [];
var tags;
var n_ques = 0;

app.get('/',(req, res) => {
    res.send("Hello Banglarmath!");
});


import { calculateRightPercentage, calculateBlankPercentage } from './resultcal.js';

app.get('/result/:n_ques/:student_id',(req, res) => {
    const student_id = req.params.student_id;
    n_ques = req.params.n_ques;

    let newresult = [];
    for(let i = 1 ; i <= n_ques ; i++){
        let qnum = "Q"+i;
        newresult.push({
            Question: qnum,
            QuestionType: tags[qnum]?.types,
            YourAnswer: resultsheet.find((result)=>result.Id===student_id)[qnum],
            Correct: calculateRightPercentage(resultsheet,qnum),
            Wrong: 100-calculateRightPercentage(resultsheet,qnum),
            Blank:calculateBlankPercentage(resultsheet,qnum)
        })
    }
    res.send(newresult);
});

app.post('/uploadresultsheet', (req, res) => {
    resultsheet = req.body;
    console.log('Received post resultsheet:');
    res.send('Sheet Received');
})

app.post('/uploadquestioninfo', (req, res) => {
    // console.log("post");
    let data = req.body;
    console.log('Received post qinfo:', data);
    res.send('Ques Received');
})

app.post('/questiontags', (req, res) => {
    tags = req.body;
    console.log('Received post tags:');
    res.send('Tags Received');
})

app.listen(3001,()=>{
    console.log("server started, listening on port 3001");
})