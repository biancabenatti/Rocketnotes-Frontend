import { FiPlus } from 'react-icons/fi'
import { api } from '../../services/api'
import { Container, Brand, Menu, Search, Content, NewNote } from './styles'
import { Note } from '../../components/Note'
import { Input } from '../../components/Input'
import { Header } from '../../components/Header'
import { Section } from '../../components/Section'
import { ButtonText } from '../../components/ButtonText'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
/* useState - Para criar os estados e useEffect para buscar de forma automatica quando o componente é carregado 
ou seja quando a interface é renderizada */

export function Home() {

  const [tags, setTags] = useState([])
  const [tagsSelected, setTagsSelected] = useState([]) // Criar um estado para quando a tag estiver selecionada para que mude a cor 

  const [search, setSearch] = useState('')
  const [notes, setNotes] = useState([])

  const navigate = useNavigate()

  ///// FUNÇÃO PARA LIDAR COM A SELEÇÃO DA TAG //////////////////////////////////////////////////////////////////////////////////////////
  function handleTagSelected(tagName) { // Parametro o nome da tag que esta sendo selecionada 
    if (tagName === "all") { // Para quando clicar no "Todos"
      return setTagsSelected([]);
    }
    const alreadySelected = tagsSelected.includes(tagName) // Se o nome da tag selecionado existe dentro da tag selecionada 

    if (alreadySelected) { // Se esta selecionado 
      const filteredTags = tagsSelected.filter(tag => tag !== tagName)
      // Fazer um filtro no tagsSelected percorrendo cada tag e me retornando todas as tags que seja diferente do tagName
      setTagsSelected(filteredTags) // Passar todas as tags menos a q eu acabei de deletar 

    } else { // Se nao esta selecionado 
      setTagsSelected(prevState => [...prevState, tagName]); // Seleciona o que estou clicando despejando o restante 
    }
  }
  ///// FUNÇÃO ABRIR NOTA CADASTRADA //////////////////////////////////////////////////////////////////////////////////////////
  function handleDetails(id) { // Levar o usuario para a pagina de details 
    navigate(`/details/${id}`)
  }

  useEffect(() => { // Uma arrow que vai receber um vetor que dira quais sao os estados dependentes 
    async function fetchNotes() {
      const response = await api.get("/tags") // Pegar o resultado que vou buscar na api em /tags 
      setTags(response.data) //  Armazenar no setNotes os dados da resposta 
    }

    fetchNotes()
  }, []) // useEffect - usado uma unica vez devido estar vazio 

  ///// BUSCAR PELAS NOTAS ////////////////////////////////////////////////////////////////////////////////////////
  useEffect(() => {
    async function fetchNotes() {
      const response = await api.get(`/notes?title=${search}&tags=${tagsSelected}`)
      /* “?” é usado para introduzir parâmetros de consulta (query parameters) na URL. 
          a URL está sendo montada para fazer uma requisição GET à API com dois parâmetros de consulta:
    1. `title=${search}`: Este parâmetro está passando um valor para o parâmetro `title`. O `${search}` é uma interpolação de string o que significa que o valor da variável `search` será inserido aqui.
    2. `tags=${tagsSelected}`: Similarmente, este parâmetro está passando um valor para o parâmetro `tags`. O `${tagsSelected}` também é uma interpolação de string.
    Esses parâmetros são separados por `&` dentro da URL e são usados para filtrar ou modificar a resposta da API conforme a necessidade.*/
      setNotes(response.data)
    }
    fetchNotes()

  }, [tagsSelected, search]); // Quando mudar o conteudo do tagsSelected e do search ele vai executar de novo o useEffect


  return (
    <Container>
      <Brand>
        <h1>Rocketnotes</h1>
      </Brand>

      <Header />

      <Menu>
        <li>
          <ButtonText
            title="Todos"
            onClick={() => handleTagSelected("all")}
            isActive={tagsSelected.length === 0} // Como para todos o que importa é nao ter nenhuma tag selecionada o tamanho deve ser 0
          />
        </li>
        { // Envolver por {} pois vou usar uma variavel para percorrer todas essas tags 
          tags && tags.map(tag => ( // Se existe tags entao eu pego tags.map para percorrer elas 
            <li key={String(tag.id)}>
              <ButtonText
                title={tag.name}
                onClick={() => handleTagSelected(tag.name)} // Quando clichar vai chamar a função passando para ela o nome da tag em questao 
                isActive={tagsSelected.includes(tag.name)} // Verificando se a tag existe dentro do array para que use os isactive e ative ela, includes (tag.name) -  vai retornar verdadeiro caso ela exista dentro  
              />
            </li>
          ))
        }
      </Menu>

      <Search>
        <Input
          placeholder="Pesquisar pelo título"
          onChange={(e) => setSearch(e.target.value)} // onChange é utilizado para que seja realizada determinada ação após alguma mudança no caso retornando o valor do input para nosso estado
        />
      </Search>

      <Content>
        <Section title="Minhas Notas">
          {notes.map(note => (
            <Note
              key={String(note.id)} // Como esse componente esta sendo gerado apartir de uma estrutura de repetição precisa de uma key
              data={note}
              onClick={() => handleDetails(note.id)}
            />
          ))}
        </Section>
      </Content>

      <NewNote to="/new">
        <FiPlus />
        Criar nota
      </NewNote>
    </Container>
  )
}