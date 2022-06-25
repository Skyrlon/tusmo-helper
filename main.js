const wordLengthInput = document.getElementById("word-length")
const wordLengthButton = document.getElementById("word-length-button")
const lettersSubmitButton = document.getElementById("letters-submit")
const results = document.getElementById("results")
const letters = document.getElementById("letters")
const wordForm = document.querySelector(".word-form")

wordLengthButton.addEventListener("click", handleWordLengthSubmit)
lettersSubmitButton.addEventListener("click", handleLettersSubmit)

let lettersFound = []

//Create inputs as much there are letters in the word 
function handleWordLengthSubmit() {
  if (!parseInt(wordLengthInput.value)) {
    return
  }
  if (!wordForm.classList.contains("show")) {
    wordForm.classList.add("show")
  }
  //Reset all data
  lettersFound = []
  letters.innerHTML = ""
  results.innerHTML = ""
  //Create inputs container, inputs, and found toggle buttons
  for (let i = 0; i < parseInt(wordLengthInput.value); i++) {
    const letterContainer = `<div class="letter-container">
<input class="letter-input" type="text" maxlength="1" size="1" />
<button class="letter-button">Found</button>
</div>`
    letters.innerHTML = letters.innerHTML + letterContainer
  }
  const letterButtons = document.getElementsByClassName("letter-button")
  const letterInputs = document.getElementsByClassName("letter-input")
  //First is always already found
  letterInputs[0].classList.add("found")
  //Add click events for found toggle buttons
  addEventListeners(letterButtons, "click", handleLetterButtonClick)
}

//Create event listeners
function addEventListeners(elements, eventType, eventHandler) {
  for (let i = 0; i < elements.length; i++) {
    elements[i].addEventListener(eventType, eventHandler)
  }
}

//Toggle letters is already found or not
function handleLetterButtonClick(e) {
  e.preventDefault()
  const buttons = document.getElementsByClassName("letter-button")
  const letterInputToModify = document.getElementsByClassName("letter-input")[indexInClass(buttons, e.target)]
  letterInputToModify.classList.toggle("found")
}

//Handle letters submitted
function handleLettersSubmit(e) {
  handleLettersFound()
  getAllResults(e)
}


function handleLettersFound() {
  lettersFound = []
  const letterInputs = document.getElementsByClassName("letter-input")
  for (let i = 0; i < letterInputs.length; i++) {
    //Check if there is a letter submitted or else replace it by "?"
    if (/^[a-zA-Z]+$/.test(letterInputs[i].value) && letterInputs[i].classList.contains("found")) {
      lettersFound.push(letterInputs[i].value)
    } else {
      lettersFound.push("?")
    }
  }
}

function getAllResults(e) {
  e.preventDefault()
  results.innerHTML = ""
  const lettersArray = []

  //Fill lettersArray with letters submitted
  for (let i = 0; i < parseInt(wordLengthInput.value); i++) {
    lettersArray.push(document.getElementsByClassName("letter-input")[i].value)
  }

  const wordsArray = []

  //Move each letters at time
  for (let i = 1; i < lettersArray.length; i++) {
    const letterToMove = lettersArray[i]

    for (let j = 0; j < lettersArray.length - 1; j++) {
      const lettersWithoutLetterToMove = lettersArray.filter((x, index) => index !== i)
      lettersWithoutLetterToMove.splice(j + 1, 0, letterToMove)
      wordsArray.push(lettersWithoutLetterToMove.join(''))
    }
  }

  const uniqueWordsArray = wordsArray.filter(onlyUnique)

  const wordsOnlyWithLettersFound = uniqueWordsArray.filter(onlyWordWithLettersFound)

  //Show all results
  wordsOnlyWithLettersFound.forEach((word) => {
    let lettersHtml = []
    word.split("").forEach((letter, index) => {
      if (letter === lettersFound[index]) {
        lettersHtml.push(`<span class="found">${letter}</span>`)
      } else {
        lettersHtml.push(`<span>${letter}</span>`)
      }
    })

    const newItem = document.createElement("li")
    newItem.innerHTML = lettersHtml.join("")
    results.appendChild(newItem)
  })
}

//Create array with unique values
function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}

//Filter words with no letters already found
function onlyWordWithLettersFound(word) {
  return lettersFound.every((letter, index) => {
    if (letter === "?") {
      return true
    }
    return letter === word.split("")[index]
  })
}


function indexInClass(collection, node) {
  for (var i = 0; i < collection.length; i++) {
    if (collection[i] === node)
      return i;
  }
  return -1;
}