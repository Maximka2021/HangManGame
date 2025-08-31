const {checkLetter, chooseDifficulty, isValidNumber, isValidLetter, wasLetterEntered, calculateScore, checkFullWord, isValidUsername, scoreHolder} = require('./functions')

let prompt = require('prompt-sync')()

console.log("+------------+----------+-------+");
console.log("| Date       | Name     | Score |");
console.log("+------------+----------+-------+");
console.log("| 2025-08-28 | Alice    |   150 |");
console.log("| 2025-08-27 | Bob      |   145 |");
console.log("| 2025-08-26 | Charlie  |   137 |");

let database = [{"name":"Maxim", "score":100, "date":"2025-08-24"},{"name":"Anton", "score":130, "date":"2025-08-23"},{"name":"Sveta", "score":110, "date":"2025-08-29"}]
database = database.sort((a, b) => b.score - a.score)
for(i = 0; i < database.length; i++){
    console.log(`| ${database[i].date} | ${database[i].name}    |   ${database[i].score} |`);   
}
console.log("+------------+----------+-------+");

//Add score-saving system with database

console.log("WELCOME TO MY HANG MAN GAME!!!")
function mainMenu(){
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
    let score = 0
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
        word = wordList[0][1]
        scoreScale = 1.3
    }
    else if(difficulty == "Medium"){
        word = wordList[1][2]
        scoreScale = 1.5
    }
    else if(difficulty == "Hard"){
        word = wordList[2][0]
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
                checkFullWord(word, scoreScale, attempts, score)
                scoreSaving(score)
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
                isPlaying = calculateScore(attempts, scoreScale, score)
                attempts = 0
                scoreSaving(score)
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

function scoreSaving(score){
    score = scoreHolder(0)
    console.log(`=>>>> ${score}`)
    console.log(`\n Would you like to save your score`)
    console.log(`\n 1. Yes \n 2. No \n 3. Main Menu`)
    let response = prompt("Please choose one of the options above by entering corresponding number: ")

    while(!isValidNumber(response)){
        response = prompt("Please choose one of the options above by entering corresponding number: ")
    }

        if(response === "1"){
            response = prompt("Enter you name ")
            while(!isValidUsername(response)){
                response = prompt("Enter you name ")
                // Finish isValidUsername
            }

            console.log(`Your score is saved ${response}`)

        }
        else if(response === "2") console.log("Not saving")
        else console.log("Main menu")


}

mainMenu()
