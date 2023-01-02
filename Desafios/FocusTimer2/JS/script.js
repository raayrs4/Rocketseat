
const buttonPlay = document.querySelector(".play")
const buttonStop = document.querySelector(".stop")
const buttonMoreFiveMinutes = document.querySelector(".moreFiveMinutes")
const buttonLessFiveMinutes = document.querySelector(".lessFiveMinutes")
const buttonForest = document.querySelector(".forest")
const buttonRain = document.querySelector(".rain")
const buttonCoffeShop = document.querySelector(".coffeShop")
const buttonFireplace = document.querySelector(".fireplace")
const minutesDisplay = document.querySelector(".minutes")
const secondsDisplay = document.querySelector(".seconds")

const svgButtonOne = document.querySelector("#svgOne")
const svgButtonTwo = document.querySelector("#svgTwo")
const svgButtonThree = document.querySelector("#svgThree")
const svgButtonFour = document.querySelector("#svgFour")

let soundPlayedBefore = 0;
let timerTimeOut
let newMinutes

// events:

buttonPlay.addEventListener('click', function() {
  countdown()
  if (soundPlayedBefore != 0) {
    if (soundPlayedBefore == 1) {
      pressForestButton()
    }
    if (soundPlayedBefore == 2) {
      pressRainButton() 
    }
    if (soundPlayedBefore == 3) {
      pressCoffeShopButton()
    }
    if (soundPlayedBefore == 4) {
      pressFireplaceButton()
    }
  }  
})

buttonStop.addEventListener('click', function() {
  hold()
  stopAllSounds()
})

buttonMoreFiveMinutes.addEventListener('click', function(){
  newMinutes = (Number(minutesDisplay.textContent) + Number(5))
  minutesDisplay.textContent = String(newMinutes).padStart(2, "0")
})

buttonLessFiveMinutes.addEventListener('click', function(){
  newMinutes = (Number(minutesDisplay.textContent) - Number(5)) //text.content serve pra mudar os minutos que eu tenho no meu HTML inicialmente
  minutesDisplay.textContent = String(newMinutes).padStart(2, "0") //padStart é um método que preenche uma string até atingir o tamanho que foi fornecido, nesse caso preencher com 0 até atingir o tamanho 2 

  let minutes = Number(minutesDisplay.textContent)

  if (minutes < 0) {
    alert("Não é possível inserir um tempo negativo")
    minutesDisplay.textContent = "00" 
  }
})

buttonForest.addEventListener('click', function() {
  pressForestButton()
  changeSvg()
  svgButtonOne.classList.add("highlight")
  soundPlayedBefore = 1
})

buttonRain.addEventListener('click', function() {
  pressRainButton()
  changeSvg()
  svgButtonTwo.classList.add("highlight")
  soundPlayedBefore = 2
})

buttonCoffeShop.addEventListener('click', function() {
  pressCoffeShopButton()
  changeSvg()
  svgButtonThree.classList.add("highlight")
  soundPlayedBefore = 3
})

buttonFireplace.addEventListener('click', function() {
  pressFireplaceButton()
  changeSvg()
  svgButtonFour.classList.add("highlight")
  soundPlayedBefore = 4
})

//Timer:

function countdown () {

  timerTimeOut = setTimeout(function() { // a variável timerTimeOut vai receber o numero que é retornado de 'setTimeout'

    let seconds = Number(secondsDisplay.textContent)
    let minutes = Number(minutesDisplay.textContent)
    
    if (minutes == 0 && seconds == 0) {
      stopAllSounds()
      timeEnd()
      return
    }
    
    if (seconds <= 0) {
      seconds = 60
      minutesDisplay.textContent = String(minutes - 1).padStart(2, '0')
    }

    secondsDisplay.textContent = String(seconds - 1).padStart(2, '0') //coloquei o calculo na string pra poder usar a funcionalidade padStart

    countdown()

  }, 1000) // setTimeout serve para trabalhar colocando um tempo, e dps desse tempo ele chama uma função de callback
}

function hold () {
  clearTimeout(timerTimeOut)
}

function changeSvg () {
  svgButtonOne.classList.remove("highlight")
  svgButtonTwo.classList.remove("highlight")
  svgButtonThree.classList.remove("highlight")
  svgButtonFour.classList.remove("highlight")
}

// Sounds:

  const forestSong = new Audio("https://github.com/raayrs4/Rocketseat/blob/main/Desafios/TimerFocus/Floresta.wav?raw=true") 
  const rainSong = new Audio("https://github.com/raayrs4/Rocketseat/blob/main/Desafios/TimerFocus/Chuva.wav?raw=true")
  const coffeShopSong = new Audio("https://github.com/raayrs4/Rocketseat/blob/main/Desafios/TimerFocus/Cafeteria.wav?raw=true")
  const fireplaceSong = new Audio("https://github.com/raayrs4/Rocketseat/blob/main/Desafios/TimerFocus/Lareira.wav?raw=true")
  const kitchenTimer = new Audio("https://github.com/maykbrito/automatic-video-creator/blob/master/audios/kichen-timer.mp3?raw=true")

  forestSong.loop = true
  rainSong.loop = true
  coffeShopSong.loop = true
  fireplaceSong.loop = true

  function stopAllSounds () {
    rainSong.pause()
    coffeShopSong.pause()
    fireplaceSong.pause()
    forestSong.pause()
  }
  
  function pressForestButton() {
    stopAllSounds()
    forestSong.play()
  }
  
  function pressRainButton() {
    stopAllSounds()
    rainSong.play()
  }
  
  function pressCoffeShopButton() {
    stopAllSounds()
    coffeShopSong.play()
  }
  
  function pressFireplaceButton() {
    stopAllSounds()
    fireplaceSong.play()
  }

  function timeEnd() {
    kitchenTimer.play()
  }