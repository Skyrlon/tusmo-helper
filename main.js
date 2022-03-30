const wordLengthInput = document.getElementById("word-length")
const wordLengthButton = document.getElementById("word-length-button")
const lettersSubmitButton = document.getElementById("letters-submit")
const results = document.getElementById("results")
const letters = document.getElementById("letters")
const letterButtons = document.getElementsByClassName("letter-button")

wordLengthButton.addEventListener("click", handleWordLengthSubmit)
lettersSubmitButton.addEventListener("click", getAllResults)

function handleWordLengthSubmit() {
  for (let i = 0; i < parseInt(wordLengthInput.value); i++) {
    const letterContainer = `<div class="letter-container">
<input class="letter-input" type="text" maxlength="1" size="1" />
</div>`
    letters.innerHTML = letters.innerHTML + letterContainer
  }
}

function addEventListeners(elements, event) {
  for (let i = 0; i < elements.length; i++) {
    elements[i].addEventListener("click", event)
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
  
  for (let i = 0; i < parseInt(uniqueWordsArray.length); i++) {
    const newItem = document.createElement("li")
    newItem.textContent = uniqueWordsArray[i].toUpperCase()
    results.appendChild(newItem)
  }

}

function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}

function indexInClass(collection, node) {
  for (var i = 0; i < collection.length; i++) {
    if (collection[i] === node)
      return i;
  }
  return -1;
}