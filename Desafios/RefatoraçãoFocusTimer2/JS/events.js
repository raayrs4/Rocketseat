export function Events({
  buttonPlay,
  buttonStop,
  buttonMoreFiveMinutes,
  buttonLessFiveMinutes,
  buttonForest,
  buttonRain,
  buttonCoffeShop,
  buttonFireplace,
  countdown, // posso usar sem o timer.countdown pq já salvei o nome da variável apenas como countdown na hora de passar as dependencias 
  soundPlayedBefore,
  hold,
  stopAllSounds,
  newMinutes,
  minutesDisplay,
  pressForestButton,
  pressRainButton,
  pressCoffeShopButton,
  pressFireplaceButton,
  changeSvg,
  svgButtonOne,
  svgButtonTwo,
  svgButtonThree,
  svgButtonFour
}) {

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
}

// quando eu exporto by default posso usar qualquer nome no import, mas um módulo só pode ter um export by default 
// posso usar vários named export (Com os nomes exatos)