const arrayNaoOrdenado = [ 1, 2, -3, 0, 0, -2, 10, 21, 23, 21]

const bubbleSort = (lista) => { 
  for(let i=0; i < lista.length; i++) {
    for(let j=i; j < lista.length; j++) {
     if(lista[j] > lista[i]) {
      let numeroGuardado = lista[i]
      lista[i] = lista[j]
      lista[j] = numeroGuardado
     }
    }
  }
  return lista
}

const backup = [...arrayNaoOrdenado]
const listaOrdenada = bubbleSort(arrayNaoOrdenado)

backup.sort((a,b) => a - b)
console.info({backup, listaOrdenada})
