import styled from "styled-components";

export const Container = styled.div`
  width: 100%;

  > header {
    width: 100%;
    height: 144px;

    background: ${({ theme }) => theme.COLORS.BACKGROUND_900};

    display: flex;
    align-items: center;

    padding: 0 124px;

    svg {
      color: ${({ theme }) => theme.COLORS.GRAY_100};
      font-size: 24px;
    }
  }
`

export const Form = styled.form`
  max-width: 340px;
  margin: 30px auto 0;

  > div:nth-child(4) {
    margin-top: 24px;
  // usando esse seletor só pra dar um espaço entre nome&email e senhas
  }
`

export const Avatar = styled.div`
  position: relative;
  margin: -124px auto 32px; // -124 pra img subir um pouco o header

  width: 186px;
  height: 186px;  // Definindo altura e largura do AVATAR

  > img {
    width: 186px;
    height: 186px;
    border-radius: 50%  // Definindo altura e largura da IMG
  }

  > label {
    width: 48px;
    height: 48px;

    background: ${({ theme }) => theme.COLORS.ORANGE};
    border-radius: 50%;

    display: flex;
    align-items: center;
    justify-content: center;

    position: absolute;
    bottom: 7px; // de baixo a 7px
    right: 7px;  // do lado direito a 7px

    cursor: pointer;

    input {
      display: none;
    }

    svg {
      width: 20px;
      height: 20px;

      color: ${({ theme }) => theme.COLORS.BACKGROUND_800};

    }

  }
  
`
