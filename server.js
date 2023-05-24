import express from 'express'
import bodyParser from 'body-parser';
import cors from 'cors'
import { connectDB, getAllExamintroData, getCriteriaData, getExamintroData, getResultsheetData, saveCriteriaData, saveExamIntroData, saveResultsheetData } from './database/db.js'
import { setAssesment } from './resultcal.js';

const app = express();
app.use(bodyParser.json())
app.use(cors())

var examintro = {};

app.get('/',(req, res) => {
    res.send("Hello Banglarmath!");
});


app.get('/result/:examcode/:student_id', async (req, res) => {
    const student_id = req.params.student_id;
    const examcode = req.params.examcode;
    let answers = [];
    let criterias = [];
    let result;
    let examinformation;
    let assesments = [];
    /*studentresultsheet = {
        studentId:
        studentName:
        school:
        medium:
        class:
        answers:[]
        assesments:[{
            type:
            segment:
            status:
        }]
    }*/
    try{
        examinformation = await getExamintroData(examcode);
        result = await getResultsheetData(examcode, student_id);
        criterias = await getCriteriaData(examcode);
        
        for(let i = 1 ; i <= examinformation?.nques ; i++){
            let qnum = "Q"+i;
            answers.push({
                // Id: result.Id,
                // Name: result.Name,
                Question: qnum,
                QuestionSegment: examinformation.tags.find(tag=>tag.id===i)?.segments,
                QuestionType: examinformation.tags.find(tag=>tag.id===i)?.types,
                YourAnswer: result[qnum]
            })
        }

        criterias.criterias.forEach(criteria=>{
            assesments.push(setAssesment(criteria, answers));
        })
        // console.log(assesments);
    } catch(error) {
        console.error('Failed to fetch data', error);
    }
    // console.log(examinformation.tags.find(tag=>tag.id===1)?.types);
    /*studentresultsheet = {
        studentId:
        studentName:
        school:
        medium:
        class:
        answers:[]
        assesments:[{
            type:
            segment:
            status:
        }]
    }*/
    res.send({
        studentId:result.Id,
        studentName:result.Name,
        school: result.School,
        // medium: result["Medium"]
        class: result.Class,
        answers:answers,
        criterias:criterias.criterias,
        assesments:assesments
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
    console.log('Received post criterias: ',data);
    saveCriteriaData(data)
    res.send('Criterias Received');
})

app.listen(3001,()=>{
    console.log("server started, listening on port 3001");
})

connectDB();