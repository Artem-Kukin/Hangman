let answer = '';
let answerState = [];
let mistakesCount = 0;
let lettersState;

startGame();

function startGame() {
  mistakesCount = 0;
  setDefaultKeyboard();
  drawPerson(mistakesCount);
  drawBoard(defaultKeyboard);
  generateWord();
}

function generateWord() {
  const randomNumber = Math.floor(Math.random() * dictionary.length);
  answer = dictionary[randomNumber];
  answerState = [];

  for (let i = 0; i < answer.length; i++) {
    answerState.push('*')
  }
  drawAnswerState(answerState);
}

function onKeyClick(letter) {
  if (mistakesCount === 7) {
    startGame();
    return;
  }
  let letterFromState ;
  for (let i = 0; i < lettersState.length; i++) {
    if (lettersState[i].char === letter) {
      letterFromState = lettersState[i];
      break;
    }

  }
  if (!answer.includes(letter) && !letterFromState.error) {
    mistakesCount++;
    letterFromState.error = true;
  }

  if (answer.includes(letter) && !letterFromState.success) {
    letterFromState.success = true;
  }

  for (let i = 0; i < answer.length; i++) {
    if (answer[i] == letter) {
      answerState.splice(i, 1, letter);
    }
  }

  drawPerson(mistakesCount);
  drawBoard(lettersState);
  drawAnswerState(answerState);

  if (answerState.join('') === answer) {
    winGame();
  }
}