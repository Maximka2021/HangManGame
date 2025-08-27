const prompt = require('prompt-sync')({
    'fake_val': 'OPTIONAL CONFIG VALUES HERE'
});

function checkLetter(word, hiddenWord, letter){
    hiddenWord = hiddenWord.split('')
    for(let i = 0; i < word.length; i++){
        if(word[i] === letter) hiddenWord[i] = letter
    }
    hiddenWord = hiddenWord.join('')
    console.log("=> " + hiddenWord.split('').join(' '))
    return hiddenWord
}

function chooseDifficulty(){
    let diffList = ["Easy", "Medium", "Hard"]
    console.log("Choose difficulty (enter the corresponding number): \n1.Easy \n2.Medium \n3.Hard")

    let response = prompt("Your choice: ")

    while(!isValidNumber(response)){
        response = prompt("Your choice: ")
    }

    response = parseInt(response)
    let diff = diffList[response - 1]
    return diff;
}

function isValidNumber(num){

    if (num.trim().split('').length > 1){
        console.log("You must enter 1 , 2 or 3. \nYou entered => " + num)
        return false
    }
    else if (parseInt(num) >= 1 && parseInt(num) <= 3){
        return true
    }else{
        console.log("You must enter 1, 2 or 3. \nYou entered => " + num)
        return false
    }
    
}

function isValidLetter(letter){
    let alphabet = [
  'a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']

    if (letter.trim().split('').length > 1){
        console.log("You must enter one letter only \nYou entered => " + letter)
        return false
    }

    if(!alphabet.includes(letter)){
        console.log('You must enter a single letter \n You have entered ' + letter)
        return false
    }

    return true
}

function wasLetterEntered(usedLetters, letter){
    if(usedLetters.includes(letter)){
        console.log("You have tried letter " + letter)
        return false
    }else{
        usedLetters.push(letter)
        return {ok: true, usedLetters}
    }
}

function checkFullWord(word, scoreScale, attempts){
    console.log("!!!!!      BE CAREFULL YOU ONLY HAVE 1 ATTEMPT     !!!!!")
    let response = prompt("Please enter a full word => ")
    if (response.trim().toLowerCase().split(' ').join('') === word.join('')){
        word = word.join('')
        calculateScore(attempts, scoreScale, word)
    }else{
        console.log("Wrong => " + word)
        calculateScore(attempts = 0, scoreScale = 0)
    }
   return false
}

function calculateScore(attempts, scoreScale){
    if(scoreScale === 0){
        console.log("You Lost")
        console.log("\n Score: "+ 0)
    }else{ 
        console.log("You WON!!!")
        console.log("You total score is " + Math.ceil(attempts * scoreScale * 100))
    }
    return false
}

module.exports = {checkLetter, chooseDifficulty, isValidNumber, isValidLetter, wasLetterEntered, checkFullWord, calculateScore}
