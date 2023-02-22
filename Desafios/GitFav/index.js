/**
 * Funcao FIND
 * Recebe como parametros: uma lista e um callback
 * execute esse callback para cada elemento da lista, dentro da funcao find
 * e retorno o resultado esse callback
 * 
 * esse callback deve, para um elemento, retornar a string "numeroL: X", onde X eh o value
 * 
 * 
 * 
 */

const lista = [
  {text: "numeroE", value: 1},
  {text: "numeroD", value: 2},
  {text: "numeroC", value: 3},
  {text: "numeroB", value: 4},
  {text: "numeroA", value: 5},
]
 
const exec = (elemento) => { 
  return `${elemento.text}: ${elemento.value}`
}

function find(listap, callback) {

  for(let i=0; i <= lista.length - 1; i++) {
    callback(listap[i])
  }
}

const resultado = find(lista, exec)
console.info(resultado)

// ["numeroE: 1","numeroD: 2","numeroC: 3","numeroB: 4","numeroA: 5"]