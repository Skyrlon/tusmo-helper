const wordLengthInput = document.getElementById("word-length")
const wordLengthButton = document.getElementById("word-length-button")
const lettersSubmitButton = document.getElementById("letters-submit")
const results = document.getElementById("results")
const letters = document.getElementById("letters")

wordLengthButton.addEventListener("click", handleWordLengthSubmit)
lettersSubmitButton.addEventListener("click", handleLettersSubmit)

let lettersFound = []

function handleWordLengthSubmit() {
  lettersFound = []
  letters.innerHTML = ""
  results.innerHTML = ""
  for (let i = 0; i < parseInt(wordLengthInput.value); i++) {
    const letterContainer = `<div class="letter-container">
<input class="letter-input" type="text" maxlength="1" size="1" />
<button class="letter-button">Found</button>
</div>`
    letters.innerHTML = letters.innerHTML + letterContainer
  }
  const letterButtons = document.getElementsByClassName("letter-button")
  const letterInputs = document.getElementsByClassName("letter-input")
  letterInputs[0].classList.add("found")
  addEventListeners(letterButtons, "click", handleLetterButtonClick)
}

function addEventListeners(elements, eventType, eventHandler) {
  for (let i = 0; i < elements.length; i++) {
    elements[i].addEventListener(eventType, eventHandler)
  }
}

function handleLetterButtonClick(e) {
  e.preventDefault()
  const buttons = document.getElementsByClassName("letter-button")
  const letterInputToModify = document.getElementsByClassName("letter-input")[indexInClass(buttons, e.target)]
  letterInputToModify.classList.toggle("found")
}

function handleLettersSubmit(e) {
  handleLettersFound()
  getAllResults(e)
}

function handleLettersFound() {
  const letterInputs = document.getElementsByClassName("letter-input")
  for (let i = 0; i < letterInputs.length; i++) {
    if (/^[a-zA-Z]+$/.test(letterInputs[i].value) && letterInputs[i].classList.contains("found")) {
      lettersFound.push(letterInputs[i].value)
    } else {
      lettersFound.push("?")
    }
  }
}

function getAllResults(e) {
  e.preventDefault()
  const lettersArray = []
  for (let i = 0; i < parseInt(wordLengthInput.value); i++) {
    lettersArray.push(document.getElementsByClassName("letter-input")[i].value)
  }

  const wordsArray = []

  for (let i = 1; i < lettersArray.length; i++) {
    const lettersArrayClone = lettersArray.filter((x, index) => index !== i)
    const letterToMove = lettersArray[i]

    for (let j = 0; j < lettersArrayClone.length; j++) {
      let lettersArrayCloneClone = [...lettersArrayClone]
      lettersArrayCloneClone.splice(j + 1, 0, letterToMove)
      wordsArray.push(lettersArrayCloneClone.join(''))
    }
  }

  const uniqueWordsArray = wordsArray.filter(onlyUnique)

  const wordsOnlyWithLettersFound = uniqueWordsArray.filter(onlyWordWithLettersFound)

  for (let i = 0; i < parseInt(wordsOnlyWithLettersFound.length); i++) {
    const newItem = document.createElement("li")
    newItem.textContent = wordsOnlyWithLettersFound[i].toUpperCase()
    results.appendChild(newItem)
  }
}

function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}

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