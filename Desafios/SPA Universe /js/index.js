import {RouterClass} from "./router.js"

// mapeamento da rota para achar a página que eu quero
const router = new RouterClass()
router.registerPage('/', "/pages/home.html")
router.registerPage('/ouniverso', "/pages/ouniverso.html")
router.registerPage('/exploracao', "/pages/exploracao.html")
router.registerPage(404, "/pages/404.html")

await router.getHTMtofNewPage() //chamo a função handle logo de inicio pra ler o html referente a page "home"

const buttonHome = document.querySelector(".initiation")
const buttonExploracao = document.querySelector(".exploration")
const buttonOUniverso = document.querySelector(".universe")
const body = document.querySelector("body")
const app = document.querySelector("#app")
const buttonQueroSaberMais = document.querySelector(".moreInfo")


window.onpopstate = () => router.getHTMtofNewPage() // para poder mudar as páginas pela setinha do navegador 
window.route = () => router.getHTMtofNewPage() // uma função que vai disparar a função route, pq não estava funcionando no navegador, ou posso colocar também o window.route() lá no index.html

buttonHome.addEventListener('click', function () {
  removeAllBackgrounds()
  removeHighlight()
  body.classList.add("home");
  buttonHome.classList.add("active")
  app.classList.add("homeConfigurations")
})

buttonExploracao.addEventListener('click', function () {
  removeAllBackgrounds()
  removeHighlight()
  body.classList.add("exploracao")
  buttonExploracao.classList.add("active")
  removeHomeConfigurations()
})

buttonOUniverso.addEventListener('click', function () {
  removeAllBackgrounds()
  removeHighlight()
  body.classList.add("ouniverso")
  buttonOUniverso.classList.add("active")
  removeHomeConfigurations()
})

buttonQueroSaberMais.addEventListener('click', function(){
  router.addNewPageToHistoryString('ouniverso')
  removeAllBackgrounds()
  removeHighlight()
  body.classList.add("ouniverso")
  buttonOUniverso.classList.add("active")
  removeHomeConfigurations()
  
})

function removeAllBackgrounds() {
  body.classList.remove("ouniverso");
  body.classList.remove("exploracao");
  body.classList.remove("home");
}

function removeHighlight() {
  buttonHome.classList.remove("active")
  buttonExploracao.classList.remove("active")
  buttonOUniverso.classList.remove("active")
}

function removeHomeConfigurations() {
  app.classList.remove("homeConfigurations")
}