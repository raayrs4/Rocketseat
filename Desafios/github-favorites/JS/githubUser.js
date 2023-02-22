export class GithubUser { // classe que vai pegar no github os dados do usuário, através da API
  static search(username) {  // entrou aqui quando roda a classe GithubUser, pegando o nome do usuário que foi passado para criar o endpoint e fazer o fetch
    const endpoint = `https://api.github.com/users/${username}` //endpoint é o local onde vou chegar com a aplicação

    return fetch(endpoint) // fetch vai buscar as coisas na internet em qualquer url que eu colocar, nesse caso no endpoint. 
    .then(data => data.json()) // fetch é uma promessa, então quando retornar os dados eu vou transformar esses dados em json. Depois de transformado em json eu quero retonar um objeto com a arrow function, esse dado vai ter a modelagem que está dentro do objeto
    .then((/*data*/ {login, name, public_repos, followers}) => ({ //pegando só o que eu quero dos dados
      login,
      name,
      public_repos,
      followers  // short hand -- objeto que o fetch vai retornar pra mim depois de tudo
    })) // o objeto está desestrturado, permitindo usar a short hand, usando a ideia de desestruturar direto como argumento
    // .catch (e => console.log('encontrei um erro'))
    // para tratamento de erro usando o then usamos um catch como acima, não teria nenhum objeto de erro então só mostraria a mensagem
  }
}
