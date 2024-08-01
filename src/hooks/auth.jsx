import {createContext, useContext, useState, useEffect} from "react";
import {api} from '../services/api'
import Swal from 'sweetalert2'

export const AuthContext = createContext({});

function AuthProvider({children}){ // Prover um filho 
    const [data, setData] = useState({})

    async function signIn({email, password}){
        try{
            const response = await api.post("/sessions", {email, password})
            const{user, token} = response.data;
           
            localStorage.setItem("@api:user", JSON.stringify(user));
            localStorage.setItem("@api:token", token)
            
            api.defaults.headers.common ['Authorization'] = `Bearer ${token}`;
            setData({token, user})

        } catch (error) {
            if(error.response){
                alert(error.response.data.message)
            } else{
                alert("Não foi possível entrar")
            }
        }
    }

    function signOut(){
        localStorage.removeItem("@api:user")
        localStorage.removeItem("@api:token")

        setData({}) 

    }

    async function updateProfile({ user, avatarFile }) { // Alem do usuário agora vamos receber tb um avatarFile
      try {
        if (avatarFile) { // Se existe um avatarFile ou seja um arquivo selecionado 
          const fileUploadForm = new FormData() //Estou enviando um arquivo que la no backend esta esperando um avatar  
  
          fileUploadForm.append('avatar', avatarFile) // Adicionar dentro do formulario um campo chamado avatar passando o avatarFile
  
          const response = await api.patch('/users/avatar', fileUploadForm) // patch - fazer uma requisição psra o users/avatar mandando o formulario
  
          user.avatar = response.data.avatar
        }
  
        await api.put('/users', user)
  
        localStorage.setItem('@rocketnotes:user', JSON.stringify(user))
  
        setData({ user, token: data.token })
        Swal.fire({
          icon: 'success',
          title: 'Dados alterados com sucesso!',
          showConfirmButton: false,
          timer: 1500
        })
      } catch (error) {
        if (error.response) {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: error.response.data.message
          })
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Não foi possível atualizar o perfil '
          })
        }
      }
    }

    useEffect(()=> {
        const token =  localStorage.getItem("@api:token") // Pegar token
        const user = localStorage.getItem("@api:user") // Pegar user

        if(token && user){ // Se o token e o usuario forem informados faça
            api.defaults.headers.common ['Authorization'] = `Bearer ${token}`;
            setData ({
                token,
                user: JSON.parse(user) // Peguei o user que era um texto e converti para um obj do tipo JSON  
            })
        }

    }, [] )

    /*  useEffect - Importar, ele tem duas partes a primeira uma arrow function que é o que vc quer que ele execute.
        E no [] é um vetor que pode colocar o estado que quiser, e quando esse estato informado mudar ele executa 
        a arrow function novamente.
        localStorage.setItem("@rocketnotes:user", JASON.stringfy(user)) - estou pegando o usuario do arquivo 
        rocketnotes:user, como ele é um obj com varias caracteristicas vamos converter e para isso basta fazer 
        JASON.stringfy(user). */

    return(
        <AuthContext.Provider value={{
            signIn, 
            signOut,
            updateProfile,
            user: data.user,
        }}>
            {children} 
        </AuthContext.Provider>
    )
}

function useAuth(){
    const context = useContext(AuthContext);
    return context;
}

export {AuthProvider, useAuth };

