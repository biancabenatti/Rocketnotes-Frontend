import { BrowserRouter } from "react-router-dom";
import { useAuth } from "../hooks/auth"; //Importando para acessar o usuario  

import { AppRoutes } from "./app.routes";
import { AuthRoutes } from "./auth.routes";

export function Routes() {
  const {user} = useAuth();
  return (
    <BrowserRouter>
      {user ? < AppRoutes />:< AuthRoutes />} 
    </BrowserRouter>
  )
}
/* {user ? < AppRoutes />:< AuthRoutes />}  - Se tem um usuario entao renderizar o AppRoutes */