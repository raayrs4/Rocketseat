import { GithubUser } from "./githubUser.js"


// classe com a lógica dos dados:
export class Favorites {
  constructor(root) {
    this.root = document.querySelector(root)
    this.load()

    GithubUser.search('raayrs4').then(user => console.log(user)) // duvida: pq console.log???
  }

  load() {
    this.entries = JSON.parse(localStorage.getItem('@github-favorites:')) || []
  }

  save() {
    localStorage.setItem('@github-favorites:', JSON.stringify(this.entries))
  }

  async add(username) {
    try {
      const userExists = this.entries.find(entry => username === entry.login)
      
      if(userExists) {
        throw new Error('Usuário já cadastrado!')
      }

      const user = await GithubUser.search(username)

      if(user.login === undefined) {
        throw new Error('Usuário não encontrado')
      }

      this.entries= [user, ...this.entries] 
      this.update()
      this.save()
    } catch(error) {
      alert(error.message)
    }
  }

  delete(user) {
    const filteredEntries = this.entries.filter( entry => entry.login !== user.login) // duvida: não entendi essa lógica aqui

    this.entries = filteredEntries
    this.update()
    this.save()
  }
}

//classe de vizualizações e eventos do html:
export class FavoritesView extends Favorites {
  constructor(root) {
    super(root)

    this.tbody = this.root.querySelector('table tbody')

    this.update()
    this.onadd()
  }

  onadd() {
    const addButton = this.root.querySelector('.search button')

    addButton.onclick = () => { 
      const {value} = this.root.querySelector('.search input')

      this.add(value) 
    }
  }

  createRow() {
    const tr = document.createElement('tr')

    tr.innerHTML = `
      <td class="user">
        <img src="https://github.com/raayrs4.png" alt="imagem de Rayane Santos">
        <a href="https://github.com/raayrs4"></a>
        <div class="wrapper">
          <p>Rayane Santos</p>
          <span>raayrs4</span>
        </div>
      </td>
      <td class="repositories"> 
        20 
      </td>
      <td class="followers"> 
        2 
      </td>
      <td> 
        <button class="remove">
          Remover
        </button>
      </td>
    `
    return tr
  }

  update() {
    this.removeAllTr()

    this.entries.forEach (user => {
      const row = this.createRow()   //duvida: cada user vai ser salvo na mesma variável row??

      row.querySelector('.user img').src = `https://github.com/${user.login}.png` 
      row.querySelector('.user img').alt = `Imagem de ${user.name}` 
      row.querySelector('.user a').href = `https://github.com/${user.login}` 
      row.querySelector('.user p').textContent = user.name 
      row.querySelector('.user span').textContent = user.login 
      row.querySelector('.repositories').textContent = user.public_repos
      row.querySelector('.followers').textContent = user.followers 

      row.querySelector('.remove').onclick = () => {
        const isOk = confirm('Tem certeza que deseja deletar essa linha?')
        if (isOk) {
          this.delete(user)
        }
      }

      this.tbody.append(row)
    })
  }

  removeAllTr() {
    this.tbody.querySelectorAll('tr').forEach((tr) => {tr.remove()})
  }
}

