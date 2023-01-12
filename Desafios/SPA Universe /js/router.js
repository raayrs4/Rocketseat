export class RouterClass {

  routes = {}

  registerPage(routeName, link) {
    this.routes[routeName] = link
  }

  // a funcão route vai tirar o padrão de recarrgamento da página quando eu clicar em algum outro link
  addNewPageToHistory(event) {  
    event = event || window.event // verificando se o evento foi passado, geralzão mesmo pq é para todos os eventos 
    event.preventDefault() // evitar o padrão de recarregamento
  
    window.history.pushState({}, "", event.target.href) //para fazer o pathname mudar -- "pushState" para colocar o estado no histórico, pegar o href de quem disparou o evento e colocar no histórico
  
    this.getHTMtofNewPage() //dentro da instância, sempre que eu quiser usar uma função ou uma propriedade, eu preciso usar o this, pois ele vai ser referência a alguma coisa aqui dentro do par de chaves
  }

  addNewPageToHistoryString(rota) {
    window.history.pushState({}, "", rota) //para fazer o pathname mudar -- "pushState" para colocar o estado no histórico, pegar o href de quem disparou o evento e colocar no histórico
  
    this.getHTMtofNewPage()
  }

  async getHTMtofNewPage() {
    const {pathname} = window.location //desestruturação do objeto para ficar mais fácil de pegar as propriedades do objeto
    const route = this.routes[pathname] || this.routes[404] // mudar o conteudo do link pegando alguma rota de página ou então mostrar a página de erro 404
   
    console.info({route})
    // pegando o conteudo de uma outra página html e jogando numa página com uma "promessa" pra ficar assíncrono
    await fetch(route)
    .then(this.getTextFromData)
    .then(this.assignHTMLToApp)
  
    console.log(pathname)
  }

   // private
  //data => data.text()
  getTextFromData (data) {
      return data.text()
  }

   // private
   assignHTMLToApp (html) {
    const appElement = document.querySelector("#app")
    appElement.innerHTML = html // innerHTML - O html interno do elemento app será o html recebido 
  }

 
}