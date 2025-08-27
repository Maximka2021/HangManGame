const {checkLetter, chooseDifficulty, isValidNumber, isValidLetter, wasLetterEntered, calculateScore, checkFullWord} = require('./functions')

let prompt = require('prompt-sync')()
function mainMenu(){
    
    console.log("WELCOME TO MY HANG MAN GAME!!!")
    console.log("\n 1. Start New Game")
    console.log("\n 2. Rules")
    console.log("\n 3. Exit")

    let response = prompt("Please choose one of the options above by entering corresponding number: ")

    while(!isValidNumber(response)){
        response = prompt("Please choose one of the options above by entering corresponding number: ")
    }

    response = parseInt(response)

    if(response == 1){
        startGame()
    }
    else if(response == 2){
        showRules()
    }
    else if(response == 3){
        gameStop()
    }

}


function startGame(){
    let isPlaying = true
    let scoreScale = 0
    let usedLetters = []
    let attempts = 0;
    let wordList = [["work", "dog", "cat"],["mouse", "picture", "remote"],["computer", "appartment", "recommendation"]]
    let word = ""
    let difficulty = chooseDifficulty()
    console.log("Game is about to begin!!!")
    console.log("You choose " + difficulty)

    if(difficulty == "Easy"){
        word = wordList[0][0]
        scoreScale = 1.3
    }
    else if(difficulty == "Medium"){
        word = wordList[1][1]
        scoreScale = 1.5
    }
    else if(difficulty == "Hard"){
        word = wordList[2][2]
        scoreScale = 1.9
    }

    console.log(word)

    word = word.split('')

    attempts = word.length + 5

    let hiddenWord = new Array(word.length).fill("*").join("")
    console.log("\n\nHere is the word => " + hiddenWord.split('').join(' ') + "\n You have " + attempts + " attempts")

mainLoop: while(attempts > 0 && isPlaying){
        let response = prompt("Please enter next letter or press 0 to enter a full word => ")

        while(!isValidLetter(response) || !wasLetterEntered(usedLetters, response)){
            if(response.trim() === "0"){
                checkFullWord(word, scoreScale, attempts)
                mainMenu()
                break mainLoop
            }
            response = prompt("Please enter one letter or press 0 to enter a full word => ")  
        } 

        response = response.toLowerCase()

        if(word.includes(response)){
            hiddenWord = checkLetter(word, hiddenWord, response)
            attempts--
            console.log(`You have attempts ${attempts} left`)
            if(!hiddenWord.split("").includes("*")){
                isPlaying = calculateScore(attempts, scoreScale)
                attempts = 0
                mainMenu()
            }

        }else if(response != 0 && !word.includes(response)){
            console.log(response + " is not in word")
            attempts--
            console.log(`You have attempts ${attempts} left`)
        
        }
    }

}

function showRules(){
    console.log("Rules")
}

function gameStop(){
    console.log("Stop Game")
    return
}

mainMenu()
