export function Timer({
  secondsDisplay,
  minutesDisplay,
  timerTimeOut,
  stopAllSounds,
  timeEnd,
  changeSvg
}) {

  // é o mesmo que: export {Timer} -- É um tipo de named export 

  function countdown () {

    timerTimeOut = setTimeout(function() { // a variável timerTimeOut vai receber o numero que é retornado de 'setTimeout'

      let seconds = Number(secondsDisplay.textContent)
      let minutes = Number(minutesDisplay.textContent)
      
      if (minutes == 0 && seconds == 0) {
        stopAllSounds()
        timeEnd()
        changeSvg()
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

  return {
    countdown,
    hold
  }
}

/* quando eu exporto by default posso usar qualquer nome no import, mas um módulo só pode ter um export by default.
Mas eu posso usar vários named export (Com os nomes exatos):
ex: export {countdown, hold} */

/* no return eu vou colocar o que eu vou precisar lá fora */