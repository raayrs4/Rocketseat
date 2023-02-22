import { GithubUser } from "./githubUser.js"

// para unir as duas classes vamos usar a ideia de herança


// classe que vai conter a lógica dos dados, como os dados serão oganizados/estruturados (lógica dos dados)
export class Favorites { // essa classe tá mexendo com o dados
  constructor(root) { // sendo passado o root que eu quero utilizar, que nesse caso é o app / esse constructor é o super da classe abaixo. // O constructor() é um método especial para criar e inicializar objetos criados dentro de uma classe.
    this.root = document.querySelector(root) //esse this vai existir para as duas classes, aqui estou procurando no documento a #app e colocando no this.root
    this.load() // o entries vai ser carregado no momento que eu passar o meu #app para o 'super(root)' que posteriormente passa para o 'constructor(root)'

    GithubUser.search('diego3g').then(user => console.log(user)) // usar um elemento que tem static -- eu não preciso fazer um NEW (Não tem construtor, apenas static), posso acessar o método direto passando pra ele o nome do usuário // colocando dentro o nome de usuário que eu quero
        // ao rodar essa classe, eu vou receber de volta um objeto com os dados mas o retorno é uma promessa, então eu preciso pegar o USER usando o THEN e colocar no console.log // o user vai ser o objeto que foi retornado
  }

  load() { // função load para carregar os dados
    this.entries =  JSON.parse(localStorage.getItem('@github-favorites:')) || [] // entradas de dados que temos // meus dados vão ser um array contendo objetos, que vão conter informações como login do github, nome de usuários, public repors e followers // OU - se tiver null, undefined transformar em um array
  }
  // LocalStorage: É uma API do browser, é um objeto JavaScript que usamos para armazenar dados no navegador. Ele fornece métodos para armazenar e recuperar a informação.
  // getItem é uma propriedade usada para pegar um item do localStorage
  // @github-favorites: é o nome da minha key do local storage, faltando apenas o value
  // JSON.parse serve para tranformar qualquer tipo de dado em um array -- nesse caso ele tá transformando string em array // no JSON está no formato string mas o parse tranforma em um objeto.
  // Ao pegar direto do localStorage ele tá pegando o array vazio, não vai ter dados. No futuro os dados vão ser armazenados nesse array

  save() { // salvando os entries no localStorage pra não perder tudo quando atualizar a página
    localStorage.setItem('@github-favorites:', JSON.stringify(this.entries)) // o nome do meu item tem que ser O MESMO usado anteriormente (em load()) // JSON.stringify vai tranformar um texto javaScript em um texto no formato JSON, em string
  }

  // quando chegar nessa linha ele vai aguardar a promessa pra execurtar o restante do código (pra usar await tem que colocar o async):
  async add(username) { // pegando o value que eu recebi da função onadd() e chamando de username
    try {    // tente fazer o que segue, se não conseguir capture o erro (é assim que sefaz tratamento de erro com async e await)

      const userExists = this.entries.find(entry => entry.login === username) // Aqui eu vou verificar se o usuário já não está nas minhas entries, para não permitir salvar o mesmo usuário 2 vezes // Find é uma higher order function, que é capaz de receber ou retornar funções como argumento
      // se ele encontrar o user, irá retornar verdadeiro e devolver a entrada como objeto para userExists 

      if (userExists) {
        throw new Error('Usuário já cadastrado!')
      }

      const user = await GithubUser.search(username)// indo buscar no github o user, o que vai ter nessa função vai ser um código assíncrono

      if(user.login === undefined) {  // se o login for undefined, "vomite" um novo erro
        throw new Error('Usuário não encontrado!') // se entrar aqui irá criar um objeto contento o novo erro e irá procurar o próximo catch
      }

      this.entries = [user, ...this.entries] // pegando os meus entries e adicionando meu novo usuário -- vou no array o meu user e vou "espalhando" as entries que eu tinha antes
      this.update() // depois de adicionar um novo user, fazer um update da minha aplicação
      this.save() // salvando a nova configuração
    }catch(error) { // new Error irá vim pra cá como argumento de catch
      alert(error.message) // vou colocar o erro aqui como mensagem
    }
  }

  delete(user) { // deletar uma pessoa da lista de usuários - Higher order functions
    const filteredEntries = this.entries.filter(entry => // o filter vai rodar uma função pra cada entrada, filtrando as entradas exceto a que eu for passar no filtro -- entry é a entrada
      entry.login !== user.login) // se não for diferente é igual, e o meu array é retirado (só pra retonar verdadeiro ou falso e funcionar o filter)
    
    this.entries = filteredEntries // novo array vai ser salvo para ser mostrado, já com os users deletados 
    this.update() // pra deletar o user na visualização da aplicação mas sem verificação/armazenamento da informação de que aquele user foi deletado, ou seja, ao recarregar vai voltar tudo
    this.save()
  }
  // o filter faz o seguinte: se a função que vc tá rodando pra um elemento retornar falso através de alguma lógica, ele remove o elemento do array e retorna um novo array sem aquele elemento, não altera o antigo
}

//classe que vai criar a visualização e eventos do html (construção da tabela)
export class FavoritesView extends Favorites { // é através desse extends que as duas classes estão sendo unidas 
  constructor(root) { // no lugar de root eu passei o #app, que também é passado para o "super"
    super(root) //criando o link entre as duas classes, o super vai chamar o constructor, passando o root pra dentro // Super é usada para acessar a classe pai de uma classe, nesse caso a classe pai é a favorites já que tem o extends -- palavra-chave é usada para chamar o construtor de sua classe pai para acessar as propriedades e métodos do pai. -- em resumo estou dizendo aqu que vou usar o método construtor da minha classe pai (Favorites)
  
    this.tbody = this.root.querySelector('table tbody') // ou seja vou procurar dentro da minha div #app onde tem a table tbody

    this.update()
    this.onadd() //chamando logo no começo
  }

  onadd() {
    const addButton = this.root.querySelector('.search button') // root nesse caso é a div #app
    addButton.onclick = () => {  // recebendo a funcionalidade, que é pegar o valor que vai ser inserido no input
      const {value} = this.root.querySelector('.search input')  // desestruturando pra pegar apenas o value do input, que tem muitos outros dados

      this.add(value) // passando pra função add o value como argumento
    }
    
  }

  update() { // essa função vai ser chamada toda vez que eu mudar um dado
    this.removeAllTr() // removendo os tr's antigos

    // colocando em cada row esse objeto:
    this.entries.forEach ( user => { // cada objeto dentro do array vai ser um user
      const row = this.createRow()  // criando uma variável nova onde vai ser salva a row criada

      row.querySelector('.user img').src = `https://github.com/${user.login}.png` //com a DOM eu vou mudando as coisas
      row.querySelector('.user img').alt = `Imagem de ${user.name}` //com a DOM eu vou mudando as coisas
      row.querySelector('.user a').href = `https://github.com/${user.login}` //com a DOM eu vou mudando as coisas
      row.querySelector('.user p').textContent = user.name //com a DOM eu vou mudando as coisas
      row.querySelector('.user span').textContent = user.login //com a DOM eu vou mudando as coisas
      row.querySelector('.repositories').textContent = user.public_repos //com a DOM eu vou mudando as coisas
      row.querySelector('.followers').textContent = user.followers //com a DOM eu vou mudando as coisas com os dados que eu tenho em load

      // fazendo o botão de remover:
      row.querySelector('.remove').onclick = () => { // onclick por que eu vou usar só um evento de clique na minha aplicação inteira, sendo mais de um precisa colocar o addEventListener
        const isOk = confirm('Tem certeza que deseja deletar essa linha?') 
        if (isOk) {
          this.delete(user)
        }
      } 

      this.tbody.append(row) // depois de criada a row, ela vai pra dentro do tbody, a funcionalidade append serve para inserir o conteúdo especificado.
    })

    
  }

  createRow() { // o tr (conteiner que vai ter todo o conteudo, e apenas ele) não pode ser criado em texto, precisa ser criado com a DOM
    const tr = document.createElement('tr')

    tr.innerHTML = ` 
      <td class="user">
        <img src="https://github.com/diego3g.png" alt="imagem de Rayane Santos">
        <a href="https://github.com/diego3g" target="_blank"> <!-- target blank para abrir em outra janela-->
          <p>Diego Fernandes</p>
          <span>diego3g</span>
        </a>
      </td> <!-- dentro do tbody fazemos colunas com o td -->
      <td class="repositories">
        48
      </td>
      <td class="followers">
        22503
      </td>
      <td>
        <button class="remove">&times;</button>
      </td>
    ` // template literals do conteudo da tr do meu html // colocando o conteudo dentro da minha tr     
    
    return tr  // retornando tr para usar a estrutura de row para cada elemento que eu tiver nos meus dados
  }

  removeAllTr() {
    this.tbody.querySelectorAll('tr') // pegando todos os seletores (todas as linhas) do tbody / esse elemento vai retornar um array like, que tem as funcionalidade do array
      .forEach((tr) => { // for each é uma das funcionalidade do array, para cada tr ele vai executar a funcão (arrow function) 
        tr.remove()   // removendo cada tr
      }) 
  }
}

// como a classe está extendendo do Favorites, o super é o constructor da classe Favorites  