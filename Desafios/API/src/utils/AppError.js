class AppError {
  message
  statusCode

  constructor(message, statusCode = 400) { // acessando o método construtor que é carregado automaticamente quando a classe é instanciada 
    this.message = message                 //pegando a mensagem que vai chegar pelo construtor da minha clase e repassando ela pra o message que faz parte do contexto global
    this.statusCode = statusCode           //pegando o statusCode que vai chegar pelo construtor da minha clase e repassando ele pra o statusCode que faz parte do contexto global
  }
}

module.exports = AppError