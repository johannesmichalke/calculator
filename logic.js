let printString = "";
let display = document.getElementById("display");

function updateScreen(){
    display.style.lineHeight = "100px";
    display.textContent = printString;
}

function add(firstNum,secondNum){
    return(parseFloat(firstNum)+parseFloat(secondNum));
}

function subtract(firstNum,secondNum){
    return(parseFloat(firstNum)-parseFloat(secondNum));
}

function multiply(firstNum,secondNum){
    return(parseFloat(firstNum)*parseFloat(secondNum));
}

function divide(firstNum,secondNum){
    if(parseFloat(secondNum)==0){
        return("You are an Idiot!");
    }
    else{
        return(parseFloat(firstNum)/parseFloat(secondNum));
    }
}

function calculate(first,operator,second){
    if(operator=="x"){
        return(multiply(first,second));
    }
    else if(operator=="/"){
        return(divide(first,second));
    }
    else if(operator=="+"){
        return(add(first,second));
    }
    else if(operator=="-"){
        return(subtract(first,second));
    }
}

function recursiveMath(nums,ops){
    if(ops.length==0){
        return(nums[0]);
    }
    else{
        nums[1]=calculate(nums[0],ops[0],nums[1]);
        nums.shift();
        ops.shift();
        return(recursiveMath(nums,ops));
    }
}


function confirm(input){
    let numbers = [];
    let operators = [];
    let char;
    let curNum = "";
    for(let i = 0; i<input.length; i++){
        char = input.slice(i,i+1);
        if(char=="+"||char=="-"||char=="/"||char=="x"){
            operators.push(char);
            numbers.push(parseFloat(curNum));
            curNum="";
        }
        else{
            curNum+=char;
        }
    }
    numbers.push(parseFloat(curNum));
    display.style.lineHeight="50px";
    let result = Math.round(recursiveMath(numbers,operators)*(10**digits))/(10**digits);
    display.innerHTML+=('<br />= '+result);
    /*printString+=recursiveMath(numbers,operators);
    updateScreen();*/
}


let numberButtons = document.querySelectorAll("button");

numberButtons.forEach(element => {
    if(element.textContent!="Clear"&&element.textContent!="Delete"&&element.textContent!="Change"&&element.textContent!="="){
        element.addEventListener("click", ()=>{
            printString+=element.textContent;
            updateScreen();
        })
    }
});

let equal = document.getElementById("equal");
equal.addEventListener("click", ()=>{
    confirm(printString);
})

let clear = document.getElementById("clear");
clear.addEventListener("click", ()=>{
    printString="";
    updateScreen();
})

let back = document.getElementById("delete");
back.addEventListener("click", ()=>{
    printString = printString.slice(0,printString.length-1);
    updateScreen();
})

let digits = 4;
let changeRound = document.getElementById("change");
changeRound.addEventListener("click", ()=>{
    digits = prompt("How many digits do you want the calculator to round to?");
})
