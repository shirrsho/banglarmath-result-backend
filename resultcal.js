export const calculateBlankPercentage = (resultsheet, qnum) => {
    let blanks = 0;
    let total = 0;
    console.log(resultsheet);
    resultsheet.forEach(result => {
        if(result[qnum]==="Did not Attempt"){
            blanks++;
        }
        if(result[qnum]!=="Absent"){
            total++;
        }
    });
    return (blanks/total)*100;
}

export const calculateRightPercentage = (resultsheet, qnum) => {
    let rights = 0;
    let total = 0;
    resultsheet.forEach(result => {
        if(result[qnum]==="Right Answer"){
            rights++;
        }
        if(result[qnum]!=="Absent"){
            total++;
        }
    });
    return (rights/total)*100;
}

export const setAssesment = (criteria, answers) => {
    let rights = 0;
    let wrongs = 0;
    answers.forEach(answer=>{
        if(answer.QuestionType?.includes(criteria.type) && answer.QuestionSegment?.includes(criteria.segment)){
            if(answer.YourAnswer === "Right Answer"){
                rights += 1;
            } else{
                wrongs += 1;
            }
        }
    })
    if(rights >= criteria.furnishThreshold){
        return {
            type: criteria.type,
            segment: criteria.segment,
            status: "Scope to Furnish"
        }
    }
    if(wrongs >= criteria.learnThreshold){
        return {
            type: criteria.type,
            segment: criteria.segment,
            status: "Scope to Learn"
        }
    }
    else return {
        type: criteria.type,
        segment: criteria.segment,
        status: "Scope to Improve"
    }
}