import { Routes, Route, Navigate} from 'react-router-dom'

import { SignIn } from '../pages/SignIn'
import { SignUp } from '../pages/SignUp'

export function AuthRoutes() {
  return (
    <Routes>
      <Route path="/" element={<SignIn />} />
      <Route path="/register" element={<SignUp />} />

      <Route path="*" element={<Navigate to= "/"/>} /> 

    </Routes>
  )
}
/*  Ele mostra um cenário em que o usuário tenta acessar uma rota que não existe e como redirecioná-lo de 
volta para a tela de login. 
Se estivermos na pagina de login e tentarmos acessar um caminho pela URL que nao existe aqui no auth como por 
exemplo o details sera renderizado uma tela cinza pois nao tem o que ser mostrado.
Entao vamos utilizar o React Router DOM para adicionar uma nova rota com um asterisco 
como padrão e utilizar o componente Navigate para fazer o redirecionamento.
0 "*" funciona como se fosse um else, quando ele nao encontrar as rotas ele ira para o que o Navigate esta 
informando.*/ 