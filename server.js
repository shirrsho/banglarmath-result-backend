import express from 'express'
import bodyParser from 'body-parser';
import mongoose from 'mongoose'
import cors from 'cors'

const app = express();
app.use(bodyParser.json())
app.use(cors())

var resultsheet = [];
var tags;
var nques = 0;
var student_name = "";

app.get('/',(req, res) => {
    res.send("Hello Banglarmath!");
});


import { calculateRightPercentage, calculateBlankPercentage } from './resultcal.js';

app.get('/result/:student_id',(req, res) => {
    const student_id = req.params.student_id;
    student_name = resultsheet.find((result)=>result.Id===student_id).Name
    let newresult = [];
    for(let i = 1 ; i <= nques ; i++){
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
    res.send({
        studentresult:newresult,
        Name:student_name
    });
});

app.post('/uploadresultsheet', (req, res) => {
    resultsheet = req.body.resultsheet;
    nques = req.body.nques;
    tags = req.body.tags;
    console.log('Received post resultsheet: ', resultsheet);

    res.send('Sheet Received');
})

app.listen(3001,()=>{
    console.log("server started, listening on port 3001");
})