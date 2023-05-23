import express from 'express'
import bodyParser from 'body-parser';
import cors from 'cors'
import { connectDB, getAllExamintroData, getExamintroData, getResultsheetData, saveCriteriaData, saveExamIntroData, saveResultsheetData } from './database/db.js'

const app = express();
app.use(bodyParser.json())
app.use(cors())

var examintro = {};
var criterias;

app.get('/',(req, res) => {
    res.send("Hello Banglarmath!");
});


app.get('/result/:examcode/:student_id', async (req, res) => {
    const student_id = req.params.student_id;
    const examcode = req.params.examcode;
    let newresult = [];
    let result;
    let examinformation;
    try{
        examinformation = await getExamintroData(examcode);
        result = await getResultsheetData(examcode, student_id);
        
        for(let i = 1 ; i <= examinformation?.nques ; i++){
            let qnum = "Q"+i;
            newresult.push({
                Id: result.Id,
                Name: result.Name,
                Question: qnum,
                QuestionType: examinformation.tags.find(tag=>tag.id===i)?.types,
                YourAnswer: result[qnum]
            })
        }
    } catch(error) {
        console.error('Failed to fetch data', error);
    }
    // console.log(examinformation.tags.find(tag=>tag.id===1)?.types);
    res.send({
        studentresult:newresult
    });
});

app.get('/exams', async (req, res) => {
    const intros = await getAllExamintroData();
    let infos = [];
    intros.forEach(intro=>{
        infos.push({
            examcode:intro.examcode,
            examname: intro.examname
        })
    })
    res.send({
        infos:infos
    })
});

app.post('/uploadresultsheet', (req, res) => {
    examintro = {
        examcode : req.body.examcode,
        examname : req.body.examname,
        nques : parseInt(req.body.nques),
        tags : req.body.tags
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
    console.log('Received post criterias: ');
    saveCriteriaData(data)
    res.send('Criterias Received');
})

app.listen(3001,()=>{
    console.log("server started, listening on port 3001");
})

connectDB();