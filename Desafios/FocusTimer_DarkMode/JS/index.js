import {Events}from "./events.js"
import {Timer} from "./timer.js"
import {Sounds} from "./sounds.js"

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
const buttonLightMode = document.querySelector(".light")
const buttonDarkMode = document.querySelector(".dark")
const bodyColor = document.querySelector(".bodyColor")
const cardsColor = document.querySelector("#cards")


const svgButtonOne = document.querySelector(".svgOne")
const svgButtonTwo = document.querySelector(".svgTwo")
const svgButtonThree = document.querySelector(".svgThree")
const svgButtonFour = document.querySelector(".svgFour")

let soundPlayedBefore = 0;
let timerTimeOut
let newMinutes

let sliderOne = document.querySelector(".sliderOne")
let sliderTwo = document.querySelector(".sliderTwo")
let sliderThree = document.querySelector(".sliderThree")
let sliderFour = document.querySelector(".sliderFour")

const buttonChangeVolumeForest = document.querySelector(".sliderOne")
const buttonChangeVolumeRain = document.querySelector(".sliderTwo")
const buttonChangeVolumeCoffeShop = document.querySelector(".sliderThree")
const buttonChangeVolumeFireplace = document.querySelector(".sliderFour")

let volumeOne = sliderOne.value
let volumeTwo = sliderTwo.value
let volumeThree = sliderThree.value
let volumeFour = sliderFour.value

//Sounds:
const sounds = Sounds({
})

//Timer - vou injetar as dependencias da função Timer e vou receber um objeto, as dependencia sao tudo aquilo que eu uso dentro do modulo timer.js que não estão lá, ai preciso "enviar":
const timer = Timer({
  secondsDisplay,
  minutesDisplay,
  timerTimeOut,
  stopAllSounds: sounds.stopAllSounds, //nesse caso eu não posso usar o short hand pq a propriedade não tem o mesmo nome da função, já que a função veio de outro módulo (sounds). 
  timeEnd: sounds.timeEnd,
  changeSvg // nesse caso eu posso usar o short hand por que a função changeSvg está acessível no meu index.js, não veio de outro módulo.
}) 

//Events - vou injetar as dependencias da função Events e vou receber um objeto, as dependencia sao tudo aquilo que eu uso dentro do modulo events.js que não estão lá, ai preciso "enviar":

const events = Events ({
  buttonPlay,
  countdown: timer.countdown, //nesse caso eu não posso usar o short hand pq a propriedade não tem o mesmo nome da função, já que a função veio de outro módulo (timer). 
  buttonStop,
  buttonMoreFiveMinutes,
  buttonLessFiveMinutes,
  buttonForest,
  buttonRain,
  buttonCoffeShop,
  buttonFireplace,
  soundPlayedBefore,
  hold: timer.hold,
  stopAllSounds: sounds.stopAllSounds,
  newMinutes,
  minutesDisplay,
  pressForestButton: sounds.pressForestButton,
  pressRainButton: sounds.pressRainButton,
  pressCoffeShopButton: sounds.pressCoffeShopButton,
  pressFireplaceButton: sounds.pressFireplaceButton,
  changeSvg,
  svgButtonOne,
  svgButtonTwo,
  svgButtonThree,
  svgButtonFour,
  buttonLightMode,
  buttonDarkMode,
  bodyColor,
  cardsColor,
  forestSong: sounds.forestSong, 
  rainSong: sounds.rainSong,
  coffeShopSong: sounds.coffeShopSong,
  fireplaceSong: sounds.fireplaceSong,
  sliderOne, 
  sliderTwo, 
  sliderThree, 
  sliderFour, 
  volumeOne,
  volumeTwo,
  volumeThree,
  volumeFour,
  buttonChangeVolumeForest,
  buttonChangeVolumeRain,
  buttonChangeVolumeCoffeShop,
  buttonChangeVolumeFireplace,
})

function changeSvg() {
  svgButtonOne.classList.remove("lightHighlight","darkHighlight" )
  svgButtonTwo.classList.remove("lightHighlight", "darkHighlight")
  svgButtonThree.classList.remove("lightHighlight", "darkHighlight")
  svgButtonFour.classList.remove("lightHighlight", "darkHighlight")
}

