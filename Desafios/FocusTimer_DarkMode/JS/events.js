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
  svgButtonFour,
  buttonLightMode,
  buttonDarkMode,
  bodyColor,
  cardsColor,
  forestSong,
  rainSong,
  coffeShopSong,
  fireplaceSong,
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
    if (cardsColor.classList.contains("lightMode")) {
      svgButtonOne.classList.add("lightHighlight")
      removeAllLightHighLight()
      this.classList.add("lightHighlight")
    }
    if (cardsColor.classList.contains("darkMode")) {
      svgButtonOne.classList.add("darkHighlight")}
    soundPlayedBefore = 1
  })

  sliderOne.oninput = function() {
  volumeOne = (this.value)/100
  }

  buttonChangeVolumeForest.addEventListener('input', function () {
    forestSong.volume = volumeOne
  })

  buttonRain.addEventListener('click', function() {
    pressRainButton()
    changeSvg()
    if (cardsColor.classList.contains("lightMode")) {
      svgButtonTwo.classList.add("lightHighlight")
      removeAllLightHighLight()
      this.classList.add("lightHighlight")
    }
    if (cardsColor.classList.contains("darkMode")) {
      svgButtonTwo.classList.add("darkHighlight")}
    soundPlayedBefore = 2
  })

  sliderTwo.oninput = function() {
    volumeTwo = (this.value)/100
  }
  
  buttonChangeVolumeRain.addEventListener('input', function () {
    rainSong.volume = volumeTwo
  })

  buttonCoffeShop.addEventListener('click', function() {
    pressCoffeShopButton()
    changeSvg()
    if (cardsColor.classList.contains("lightMode")) {
      svgButtonThree.classList.add("lightHighlight")
      removeAllLightHighLight()
      this.classList.add("lightHighlight")
    }
    if (cardsColor.classList.contains("darkMode")) {
      svgButtonThree.classList.add("darkHighlight")}
    soundPlayedBefore = 3
  })

  sliderThree.oninput = function() {
    volumeThree = (this.value)/100
  }
  
  buttonChangeVolumeCoffeShop.addEventListener('input', function () {
    coffeShopSong.volume = volumeThree
  })
  
  buttonFireplace.addEventListener('click', function() {
    pressFireplaceButton()
    changeSvg()
    if (cardsColor.classList.contains("lightMode")) {
      svgButtonFour.classList.add("lightHighlight")
      removeAllLightHighLight()
      this.classList.add("lightHighlight")
    }
    if (cardsColor.classList.contains("darkMode")) {
      svgButtonFour.classList.add("darkHighlight")
    }
    soundPlayedBefore = 4
  })

  sliderFour.oninput = function() {
    volumeFour = (this.value)/100
  }
  
  buttonChangeVolumeFireplace.addEventListener('input', function () {
    fireplaceSong.volume = volumeFour
  })

  buttonLightMode.addEventListener('click', function() {
    bodyColor.classList.add("darkMode")
    bodyColor.classList.remove("lightMode")
    buttonLightMode.classList.add("hide")
    buttonDarkMode.classList.remove("hide")
    cardsColor.classList.add("darkMode")
    cardsColor.classList.remove("lightMode")
    removeAllLightHighLight()

    

    if (svgButtonFour.classList.contains("lightHighlight")) {
      svgButtonFour.classList.add("darkHighlight")
      svgButtonFour.classList.remove("lightHighlight")
    }
    if (svgButtonThree.classList.contains("lightHighlight")) {
      svgButtonThree.classList.add("darkHighlight")
      svgButtonThree.classList.remove("lightHighlight")
    }
    if (svgButtonTwo.classList.contains("lightHighlight")) {
      svgButtonTwo.classList.add("darkHighlight")
      svgButtonTwo.classList.remove("lightHighlight")
    }
    if (svgButtonOne.classList.contains("lightHighlight")) {
      svgButtonOne.classList.add("darkHighlight")
      svgButtonOne.classList.remove("lightHighlight")
    }
  })

  buttonDarkMode.addEventListener('click', function () {
    bodyColor.classList.add("lightMode")
    bodyColor.classList.remove("darkMode")
    buttonLightMode.classList.remove("hide")
    buttonDarkMode.classList.add("hide")
    cardsColor.classList.add("lightMode")
    cardsColor.classList.remove("darkMode")

    if (svgButtonFour.classList.contains("darkHighlight")) {
      svgButtonFour.classList.remove("darkHighlight")
      svgButtonFour.classList.add("lightHighlight")
    }
    if (svgButtonThree.classList.contains("darkHighlight")) {
      svgButtonThree.classList.remove("darkHighlight")
      svgButtonThree.classList.add("lightHighlight")
    }
    if (svgButtonTwo.classList.contains("darkHighlight")) {
      svgButtonTwo.classList.remove("darkHighlight")
      svgButtonTwo.classList.add("lightHighlight")
    }
    if (svgButtonOne.classList.contains("darkHighlight")) {
      svgButtonOne.classList.remove("darkHighlight")
      svgButtonOne.classList.add("lightHighlight")
    }

    if (soundPlayedBefore == 1) {
      buttonForest.classList.add("lightHighlight")
    }
    if (soundPlayedBefore == 2) {
      buttonRain.classList.add("lightHighlight")
    }
    if (soundPlayedBefore == 3) {
      buttonCoffeShop.classList.add("lightHighlight")
    }
    if (soundPlayedBefore == 4) {
      buttonFireplace.classList.add("lightHighlight")
    }
  })  

  function removeAllLightHighLight () {
    buttonForest.classList.remove("lightHighlight")
    buttonRain.classList.remove("lightHighlight")
    buttonCoffeShop.classList.remove("lightHighlight")
    buttonFireplace.classList.remove("lightHighlight")
  }
}

// quando eu exporto by default posso usar qualquer nome no import, mas um módulo só pode ter um export by default 
// posso usar vários named export (Com os nomes exatos)