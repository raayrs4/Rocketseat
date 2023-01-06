export function Sounds() { 

  // é o mesmo que: export {Sounds} -- É um tipo de named export 
  // Não preciso de nenhuma dependencia de fora, pq tudo que eu preciso está aqui dentro dessa função
  
  const forestSong = new Audio("https://github.com/raayrs4/Rocketseat/blob/main/Desafios/TimerFocus/Floresta.wav?raw=true") 
  const rainSong = new Audio("https://github.com/raayrs4/Rocketseat/blob/main/Desafios/TimerFocus/Chuva.wav?raw=true")
  const coffeShopSong = new Audio("https://github.com/raayrs4/Rocketseat/blob/main/Desafios/TimerFocus/Cafeteria.wav?raw=true")
  const fireplaceSong = new Audio("https://github.com/raayrs4/Rocketseat/blob/main/Desafios/TimerFocus/Lareira.wav?raw=true")
  const kitchenTimer = new Audio("https://github.com/maykbrito/automatic-video-creator/blob/master/audios/kichen-timer.mp3?raw=true")

  forestSong.loop = true
  rainSong.loop = true
  coffeShopSong.loop = true
  fireplaceSong.loop = true

  function stopAllSounds() {
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
    stopAllSounds,
    pressForestButton,
    pressRainButton,
    pressCoffeShopButton,
    pressFireplaceButton,
    timeEnd, 
    forestSong,
    rainSong,
    fireplaceSong,
    coffeShopSong,
  }
}

/* A função vai retornar um objeto by short hand property, no caso de um objeto. */
/* no return eu vou colocar o que eu vou precisar lá fora */
