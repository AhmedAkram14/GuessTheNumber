const outPut = document.querySelector(".output");
const allNums = document.querySelectorAll("p");
const nums = document.querySelector(".nums");
const spans = document.querySelectorAll("span");
const content = document.querySelector(".res-cont");
let randomNumber = Math.floor(Math.random() * 100);
if (randomNumber < 10){
    randomNumber = `0${randomNumber}`
}
let myArr = [];
let storedNums = [];
let chance = 0;

let secondsElement = document.getElementById('seconds');
let startTime = performance.now();
let seconds;

function updateSeconds() {
  var elapsedTime = performance.now() - startTime;
  seconds = Math.floor(elapsedTime / 1000);
}

setInterval(updateSeconds, 1000);

start();

function start() {
  for (let num in allNums) {
    allNums[num].onclick = () => {
      setTimeout(() => {
        if (!mediaQuery.matches) playClickSound();
      }, 1);

      myArr.push(allNums[num].innerHTML);
      storedNums.push(myArr.join(""));

      for (let i = 0; i < storedNums.length; i++) {
        if (storedNums[i].length < 2) {
          storedNums.splice(i, 1);
          chance++;
        }

        if (storedNums[i] < randomNumber && storedNums[i].length == 2) {
          spans[i].innerHTML = `<i class="fa-solid fa-arrow-up" />`;
        } else if (storedNums[i] > randomNumber && storedNums[i].length == 2) {
          spans[i].innerHTML = `<i class="fa-solid fa-arrow-down"></i>`;
        }

        if (chance == 5 && storedNums[i] != randomNumber && storedNums[i]?.length == 2) {
          showGameOver();
        } else if (storedNums[i] == randomNumber) {
          showCongratulations();
        }
      }

      appending();
    };
  }
}

function showGameOver() {
  content.style.display = "block";
  content.style.textAlign = "center";
  content.style.marginTop = "100px";
  content.innerHTML = `<h2 class="finish">GAME OVER !</h2>
                     <h3>The correct Number is <span>${randomNumber} </span></h3>
                     <h4>Duration : <span>${seconds} seconds</span></h4>`;
  againBtn();
  setTimeout(() => playSound(), 10);
  centerMessage();
  document.querySelector(".finish").classList.add('celebrate');
}

function showCongratulations() {
  playSound();
  content.style.display = "block";
  content.style.textAlign = "center";
  content.style.marginTop = "100px";
  content.innerHTML = `<h2 class="finish" style="color: cornsilk;">Congratulations!</h2>
                        <h3> You guessed the correct number: <span>${randomNumber}</span> </h3>
                        <h4>Duration : <span>${seconds} seconds</span></h4>`;
  centerMessage();
  document.querySelector(".finish").classList.add('celebrate');
  againBtn();
}

function appending() {
  let res = document.createElement("div");
  res.className = "res";
  if (myArr.length == 1) {
    res.innerHTML = myArr[0];
    outPut.appendChild(res);
  } else if (myArr.length == 2) {
    outPut.lastElementChild.innerHTML = myArr.join("");
    myArr = [];
  }
}

function centerMessage() {
  content.style.display = "flex";
  content.style.flexDirection = "column";
  content.style.alignItems = "center";
  content.style.justifyContent = "center";
  content.style.textAlign = "center";
  content.style.marginTop = "25vh";
  content.style.transform = "translateY(-50%)";
}

const mediaQuery = window.matchMedia('(max-width: 800px)');

function playClickSound() {
  var audio = new Audio('click.mp3');
  audio.play();
}

function playSound() {
  var lose = new Audio('wrong.mp3');
  var win = new Audio('win.mp3');

  let correctGuess = storedNums.some(num => num == randomNumber);

  if (correctGuess) {
    win.play();
  } else if (chance == 5) {
    setTimeout(() => lose.play(), 10);
  }
}

function againBtn() {
  nums.innerHTML = `<button class="again">Play Again!</button>`;
  let btn = nums.firstElementChild;
  btn.style.backgroundColor = 'rgb(60 62 64)';
  btn.style.color = '#f16fa3';
  btn.style.cursor = 'pointer';
  btn.style.border = 'none';
  btn.style.padding = '20px 25px';
  btn.style.borderRadius = '10px';
  btn.style.fontSize = '28px';
  btn.style.fontWeight = 'bold';
  btn.style.transform = 'translateY(-60px)';
  btn.style.boxShadow = '5px 5px 10px 5px rgba(0, 0, 0, 0.5)';
  btn.onclick = () => {
    location.reload();
  };
}
