import express from 'express'
import bodyParser from 'body-parser';
import mongoose from 'mongoose'
import cors from 'cors'
import { connectDB, getExamintroData, getResultsheetData, saveExamIntroData, saveResultsheetData } from './database/db.js'

const app = express();
app.use(bodyParser.json())
app.use(cors())

var examintro = {};
var criterias;

app.get('/',(req, res) => {
    res.send("Hello Banglarmath!");
});


import { calculateRightPercentage, calculateBlankPercentage } from './resultcal.js';

app.get('/result/:examcode/:student_id', async (req, res) => {
    const student_id = req.params.student_id;
    const examcode = req.params.examcode;
    let newresult = [];
    let result;
    try{
        const examinformation = await getExamintroData(examcode);
        result = await getResultsheetData(examcode, student_id);
        console.log("intry:",result);
        for(let i = 1 ; i <= examinformation?.nques ; i++){
            let qnum = "Q"+i;
            newresult.push({
                Id: result.Id,
                Name: result.Name,
                Question: qnum,
                QuestionType: examinformation.tags[qnum]?.types,
                YourAnswer: result[qnum],
            })
        }
    } catch {
        console.error('Failed to fetch data', error);
    }
    console.log("baire",result);
    res.send({
        studentresult:result
    });
});

app.post('/uploadresultsheet', (req, res) => {
    examintro = {
        examcode : req.body.examcode,
        examname : req.body.examname,
        nques : parseInt(req.body.nques),
        tags : req.body.tags,
    }
    // resultsheet = req.body.resultsheet;
    // nques = req.body.nques;
    // tags = req.body.tags;
    console.log('Received post resultsheet: ', examintro);
    if(saveExamIntroData(examintro))
        saveResultsheetData(examintro.examcode, req.body.resultsheet);
    res.send('Sheet Received');
})

app.post('/uploadjudgingcriteria', (req, res) => {
    let data = req.body;
    console.log('Received post criterias: ', data);

    res.send('Criterias Received');
})

app.listen(3001,()=>{
    console.log("server started, listening on port 3001");
})

connectDB();