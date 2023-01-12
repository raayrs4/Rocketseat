export class RouterClass {

  routes = {} // declarando o objeto

  registerPage(routeName, link) {   // função dentro da classe "RouterClass" que é chamada de método, ela tá definindo com as pages devem ser registradas. Recebendo (routeName, link)
    this.routes[routeName] = link  // fazendo o que aqui?
  }

  // a funcão "addNewPageToHistory" vai tirar o padrão de recarregamento da página quando eu clicar em algum outro link e colocar o pathname que mudou no topo do his†órico
  addNewPageToHistory(event) {
    event = event || window.event // verificando se o evento foi passado, geralzão mesmo pq é para todos os eventos que acontecerem na window
    event.preventDefault() // evitar o padrão de recarregamento
  
    window.history.pushState({}, "", event.target.href) //para fazer o pathname mudar -- usamos o "pushState" para colocar o estado no histórico, pegar o href de quem disparou o evento e colocar no histórico
  
    this.getHTMLtoNewPage() //dentro da instância, sempre que eu quiser usar uma função ou uma propriedade, eu preciso usar o this, pois ele vai ser referência a alguma coisa aqui dentro do par de chaves
  }

  addNewPageToHistoryString(rota) {
    window.history.pushState({}, "", rota) //para fazer o pathname mudar -- "pushState" para colocar o estado no histórico, pegar o href de quem disparou o evento e colocar no histórico
  
    this.getHTMLtoNewPage() // Chamo essa função para pegar o HTML da página que ficou por último no meu histórico, portanto a última que eu cliquei 
  }

  async getHTMLtoNewPage() {  // assíncrono por que eu quero esperar pelo fetch
    const {pathname} = window.location //desestruturação do objeto para ficar mais fácil de pegar as propriedades do objeto -- a página que vai estar no window location é a última do meu histórico e vou pegar o pathname dela 
    const route = this.routes[pathname] || this.routes[404] // mudar o conteudo do link pegando alguma rota de página ou então mostrar a página de erro 404, preciso usar o "routes[pathname]" por que é uma das propriedades do objeto "routes" e salvar na variável "route"
 
    // pegando o conteudo de uma outra página html e jogando numa página com uma "promessa" pra ficar assíncrono
    await fetch(route)  // passando como  argumento "route", que é a rota da última página que eu visitei 
    .then(this.getTextFromData) // pegar os textos da propriedade data (que tem o HTML)
    .then(this.assignHTMLToApp) // colocar o HTML dentro da div #app
  }

    // private
    // data => data.text()
  
  getTextFromData (data) {  // pegar os textos da propriedade data (que tem o HTML) e retornar 
      return data.text() // por que retorno data.text e na função de baixo uso HTML como argumento?
  }

   // private
  assignHTMLToApp (html) { // colocando o HTML da página dentro da div #app para mudar só ela, e não a página toda
    const appElement = document.querySelector("#app") // salvando a variável para ser usada depois 
    appElement.innerHTML = html // innerHTML - O html interno do elemento app será o html recebido 
  }
 
}