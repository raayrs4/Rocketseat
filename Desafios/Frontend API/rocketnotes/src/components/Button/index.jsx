import { Container } from "./styles";

export function Button({title, loading = false, ...rest}) { //desestruturando o title de props 

  return(
    <Container 
      type="button"
      disabled={loading}
      {...rest}
    >
      {loading ? 'Carregando...' : title}
    </Container>
  )
}

