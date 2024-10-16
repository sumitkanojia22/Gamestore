function shuffleChars(chars){
    return chars.split("").sort(function(){return 0.5 - Math.random()}).join("");
}

let chars =
"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890!@#$%^&*-+?";
chars = shuffleChars(chars);

function getRandomChar(except){
    while(true){
        let randomChar = Math.trunc(Math.random()*chars.length);
        if(chars[randomChar] !== except){
            return chars[randomChar];
        }  
    } 
}

function delay(time){
    return new Promise(function(resolve){
        setTimeout(function(){
            resolve();
        },time);
    })
}

async function decodeEffect(index,turn,node) {
    if (turn === 0) {
        node.innerText = chars[index];
    } else{
        node.innerText = chars[chars.length -1 - index];
    }
    if ([...node.classList].includes("block")) {
        node.classList.remove("block");
    }
    if ([...node.classList].includes("box")) {
        node.classList.remove("box");
    }
    if (node.innerText === node.getAttribute("char")) {
        return;
    }
    const value = Math.trunc(Math.random()*4);
    if (value === 0) {
        node.classList.add("block");
    } else if(value === 1){
        node.classList.add("box");
    }
    await delay(50 + Math.trunc(Math.random()*80));
    decodeEffect(index+1,turn,node);
}

let charSpanHTML = document.querySelector(".text-animation").innerText.trim().split("").map(function(char){ 
    if (char === " "){
        return `<span char=" "&nbsp;></span>`
    }
    return `<span char="${char}">${char}</span>`;
}).join("");

document.querySelector("text-animation").innerHTML = charSpanHTML;
document.querySelector("text-animation").style.display = "block";

let spans = document.querySelectorAll(".text-animation span");
for (let i = 0; i < spans.length; i++) {
    if (spans[i].getAttribute("char") !== " ") {
        decodeEffect(0,i%2,spans[i]);
    }
    
}