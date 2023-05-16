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