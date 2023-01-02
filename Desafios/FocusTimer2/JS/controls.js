export default function Controls(
  buttonPlay,
  buttonStop,
  buttonMoreFiveMinutes,
  buttonLessFiveMinutes,
  buttonCoffeShop,
  buttonFireplace,
  buttonForest,
  buttonRain
) {

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
    return
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
}