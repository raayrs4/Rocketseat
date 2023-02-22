export default function () {
  const forestSong = new Audio("https://github.com/raayrs4/Rocketseat/blob/main/Desafios/TimerFocus/Floresta.wav?raw=true") 
  const rainSong = new Audio("https://github.com/raayrs4/Rocketseat/blob/main/Desafios/TimerFocus - sounds/Chuva.wav?raw=true")
  const coffeShopSong = new Audio("https://github.com/raayrs4/Rocketseat/blob/main/Desafios/TimerFocus%20-%20sounds/Cafeteria.wav?raw=true")
  const fireplaceSong = new Audio("https://github.com/raayrs4/Rocketseat/blob/main/Desafios/TimerFocus/Lareira.wav?raw=true")
  const kitchenTimer = new Audio("https://github.com/maykbrito/automatic-video-creator/blob/master/audios/kichen-timer.mp3?raw=true")

  forestSong.loop = true
  rainSong.loop = true
  coffeShopSong.loop = true

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

  return {
    pressForestButton,
    pressRainButton,
    pressCoffeShopButton,
    pressFireplaceButton,
    stopAllSounds,
    timeEnd
  }
}