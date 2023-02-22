export class GithubUser {
  static search(username) { // duvida: pq static???
    const endpoint =  `https://api.github.com/users/${username}`

    return fetch(endpoint).then(data => data.json()).then(({login, name, public_repos, followers}) => ({
      login, 
      name, 
      public_repos,
      followers
    })) //duvida: não entendi pq as vezes o argumento vem dentro de parenteses (amarelo) e as vezes não
  }
}