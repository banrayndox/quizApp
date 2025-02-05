let startBtn = document.querySelector(".myButton button");
let rulesbox = document.querySelector(".rulesBox");
let quizRound = document.querySelector(".quizRound");
let exit = document.querySelector(".one");
let next = document.querySelector(".two");
let nextQ = document.querySelector("#nextQ");
let ul = document.querySelector("ul")
const timeLine = document.querySelector(".timeLine");
let qCount = 0;
let counter;
let timeValue=15;
let userScore = 0 ;
let resultBox = document.querySelector(".resultBox");
let repeatGame = document.querySelector(".repeat");
let resultPoint = document.querySelector(".finalScore");
let resultExit = document.querySelector(".quit");
let timeCount = document.querySelector(".seconds");
let counterLine;

repeatGame.onclick = ()=>{
    qCount = 0; 
    userScore = 0;
    widthValue = 0;  
    clearInterval(counter);
    clearInterval(counterLine);
    timeCount.textContent = timeValue; 
    timeLine.style.width = "0px"; 
    rulesbox.classList.remove("activeInfo");
    quizRound.classList.add("activeQuiz");

    resultBox.classList.remove("activeResultBox");
    ul.innerHTML = "";

    showQuestion(qCount); 
    startTimer(timeValue);
    startTimeLine(widthValue);
}
resultExit.onclick = ()=> {
    window.location.reload();
}
let widthValue = 0;
startBtn.onclick=()=>{
    rulesbox.classList.add("activeInfo");
}

exit.onclick=()=>{
    rulesbox.classList.remove("activeInfo");
}
next.onclick=()=>{
    
    rulesbox.classList.remove("activeInfo");
    quizRound.classList.add("activeQuiz");
    showQuestion(qCount);
    startTimer(timeValue);
    startTimeLine(timeValue);
}
 

function showQuestion(index){
    let queText = document.querySelector(".question span");
let queTag = question[index].number + '.' + question[index].ques ;
    queText.innerText = queTag;

    let bottomText = document.querySelector(".leftQuestion span");
    let qnum = question.length;
    bottomText.innerText = question[index].number + "out of" + qnum ;

const options = question[index].options;
options.forEach ((option) => {
  
    let li = document.createElement("li");
    li.innerText = option;
   ul.append(li);
  
 
})
let userOption = ul.querySelectorAll("li");
for(let i=0; i<userOption.length; i++){
    userOption[i].setAttribute("onclick", "optionSelected(this)");
}


}
let correct = `<div class="correct"> <i class="fa-solid fa-check"></i> </div>`
let incorrect = `<div class="incorrect"><i class="fa-regular fa-circle-xmark"></i> </div>`
function optionSelected(answer){
 
    clearInterval(counter);
    clearInterval(counterLine);
    let userAns = answer.textContent;
   
   let corrAns = question[qCount].ans;
 let allOptions =  ul.children.length;
if(userAns==corrAns){
    console.log("you are correct");
    answer.classList.add("correct");
    answer.insertAdjacentHTML("beforeend", correct); userScore++;

}
else{
    answer.classList.add("incorrect");
    answer.insertAdjacentHTML("beforeend", incorrect);
    for(let i=0; i<allOptions; i++)
        if(ul.children[i].textContent==corrAns){
ul.children[i].setAttribute("class", "correct");
ul.children[i].insertAdjacentHTML("beforeend", correct);
        }

   
 
}

for(let i=0; i<allOptions; i++){
    ul.children[i].classList.add("disabled");
}
nextQ.style.display = "block";
}
function showResultBox(){
    rulesbox.classList.remove("activeInfo");
    quizRound.classList.remove("activeQuiz");

    resultBox.classList.add("activeResultBox");
    if(userScore === question.length){
        document.querySelector(".finalAch").innerText = "Carry On. You Got" ;
        
       }
       else if(userScore === 0 ){
           document.querySelector(".finalAch").innerText = "Bhul koros kan?" ;
           
          } else{
           document.querySelector(".finalAch").innerText = "okey. You Got" ;
           
          }
    document.querySelector(".userp").innerText = userScore;
    document.querySelector(".quizp").innerText = question.length;
   
    
}
function startTimer(time){
counter = setInterval(timer, 1000);
function timer(){
    timeCount.textContent = time < 10 ? "0" + time : time;
    time-- ;
    if (time <= 0) {
        
        clearInterval(counter);
        timeCount.textContent = "00";
        nextQ.style.display = "block";
        for (let i = 0; i < ul.children.length; i++) {
            ul.children[i].classList.add("disabled"); }

}
} }
function startTimeLine(time){
counterLine = setInterval(timer, 50);
function timer(){
    time += 1;
    timeLine.style.width = time + "px";
    if(time > 319){
        clearInterval(counterLine);
    }
}

}


nextQ.onclick =()=>{ 
    nextQ.style.display = "none";
    if( qCount < question.length - 1){
    
    qCount++;
    let ul = document.querySelector("ul")
    ul.innerHTML = "";
    showQuestion(qCount);
  clearInterval(counter);
   startTimer(timeValue);
   clearInterval(counterLine);
   startTimeLine(widthValue);
}
else{
    console.log("you have complete your task");
    showResultBox();
}
}
