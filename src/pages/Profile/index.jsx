import { FiArrowLeft, FiUser, FiMail, FiLock, FiCamera } from 'react-icons/fi'
import { Input } from '../../components/Input'
import { Button } from '../../components/Button'
import avatarPlaceholder from '../../assets/avatar_placeholder.svg'
import { useState } from 'react';
import { useAuth } from '../../hooks/auth'
import { api } from '../../services/api'
import { Container, Form, Avatar } from "./styles";
import { useNavigate } from 'react-router-dom';



export function Profile() {
  const { user, updateProfile } = useAuth();
  const navigate = useNavigate()

  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [passwordOld, setpasswordOld] = useState();
  const [passwordNew, setpasswordNew] = useState();


  const avatarUrl = user.avatar ? `${api.defaults.baseURL}/files/${user.avatar}` : avatarPlaceholder;
  //user.avatar - Verifica se o usuario tem o avatar 
  //? - se tiver entao mostrar uma string 
  // `` - que sera montada como padrao a baseUrl da api /files/${user.avatar}
  // : avatarPlaceholder - caso contrario mostrar nossa imagem padrao 

  const [avatar, setAvatar] = useState(avatarUrl); // Para caso ja tiver um avatar
  const [avatarFile, setAvatarFile] = useState(null); // Carregar a nova imagem 

  function handleBack() {
    navigate(-1)
  }

  async function handleUpdate() {
    const updated = {
      name,
      email,
      password: passwordNew,
      old_password: passwordOld,
      // Como nao estamos chamando o avatar quando atualizado qualquer dado a foto ira sumir e para mudar isso criamos um Object.assign
    }
    const userUpdated = Object.assign(user, updated);// Ele ira manter a foto e alterar os dados 

    await updateProfile({ user: userUpdated, avatarFile }) //Passar o avatarFile que é o arquivo de fato selecionado pelo usuário
  }

  function handleChangeAvatar(event) { //Vai receber um evento de alteração
    const file = event.target.files[0]; // Extrair o arquivo e vamos pegar ele de event.target.files na primeira posição
    setAvatarFile(file) // Arquivo que o usuario acabou de carregar 

    /*Todas as vezes que atualizar o avatar queremos gerar uma URL para atualizar esse estado 
    const [avatar, setAvatar] = useState(user.avatar) que exibe o avatar. */

    const imagePreview = URL.createObjectURL(file)
    setAvatar(imagePreview)
  }


  return (
    <Container>
      <header>
        <button type="button" onClick={handleBack}>
          <FiArrowLeft />
        </button>
      </header>

      <Form>
        <Avatar>
          <img
            src={avatar}
            alt="Foto do usuário"
          />
          <label htmlFor="avatar">
            <FiCamera />

            <input
              id="avatar"
              type="file"
              onChange={handleChangeAvatar}
            />
          </label>
        </Avatar>

        <Input
          placeholder="Nome"
          type="text"
          icon={FiUser}
          value={name}
          onChange={e => setName(e.target.value)}
        />

        <Input
          placeholder="E-mail"
          type="text"
          icon={FiMail}
          value={email}
          onChange={e => setEmail(e.target.value)}
        />

        <Input
          placeholder="Senha atual"
          type="password"
          icon={FiLock}
          onChange={e => setpasswordOld(e.target.value)}
        />

        <Input
          placeholder="Nova atual"
          type="password"
          icon={FiLock}
          onChange={e => setpasswordNew(e.target.value)}
        />

        <Button title="Salvar" onClick={handleUpdate} />
      </Form>
    </Container>
  )
}
