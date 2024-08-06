import styled from 'styled-components'
import backgroundImg from '../../assets/fundo.jpg'

export const Container = styled.div`
  height: 100vh;

  display: flex;
  align-items: center;
  justify-content: space-evenly;
  background: url(${backgroundImg}) no-repeat center center; 
  background-size: cover;
`

export const Form = styled.form`
  padding: 30px 30px 30px 30px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  backdrop-filter: blur(60px);
  border-radius: 20px;
  border: 1px solid gray;

  > h1 {
    font-size: 48px;
    color: ${({ theme }) => theme.COLORS.ORANGE};
  }
  > h2 {
    font-size: 24px;
    margin: 26px 0;
  }

  > p {
    font-size: 14px;
    color: ${({ theme }) => theme.COLORS.GRAY_100};
  }

  > a {
    color: ${({ theme }) => theme.COLORS.ORANGE};
    font-size: 16px;
    margin-top: 30px;
  }
`