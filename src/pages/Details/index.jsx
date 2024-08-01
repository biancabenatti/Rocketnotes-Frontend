import { Container, Links, Content } from './styles'
import { useParams, useNavigate } from 'react-router-dom'
// useParams - Para buscar os parametros que existe na rota 
import { useState, useEffect } from 'react'
// useEffect - Utilizar para buscar esse parametro/notas quando a interface for carregada 
// useState -  Para criar um estado para armazenar essas informações 
import { api } from '../../services/api'
import { Tag } from '../../components/Tag'
import { Header } from '../../components/Header'
import { Button } from '../../components/Button'
import { Section } from '../../components/Section'
import { ButtonText } from '../../components/ButtonText'

export function Details() {

  const [data, setData] = useState(null)

  const params = useParams()
  const navigate = useNavigate()

  /// BUSCAR AS INFORMAÇÕES DA NOTA ///////////////////////////////////////////////////////////////////////////////////
  useEffect(() => {
    async function fetchNote() {
      const response = await api.get(`/notes/${params.id}`) // Requisição para a api 
      setData(response.data)
    }
    fetchNote() // Chamar para que seja executad
  }, []) // Carregar uma unica vez 


  /// FUNÇÃO PARA O BOTAO DE VOLTAR  ///////////////////////////////////////////////////////////////////////////////////
  function handleBack() {
    navigate(-1)
  }

  /// FUNÇÃO PARA EXCLUIR NOTAS ///////////////////////////////////////////////////////////////////////////////////
  async function handleRemove() {
    const confirm = window.confirm("Deseja realmente remover a nota?") // Funcionalidade do proprio JS que guarda um verdadeiro ou falso 

    if (confirm) { // Se ele confirmou ou seja verdadeiro 
      await api.delete(`/notes/${params.id}`)
      navigate("/")
    }
  }


  return (
    <Container>
      <Header />
      { // Envolver a main por {} pois ela so sera apresentada se existir conteudo 
        data && // Se tem conteudo mostra o data
        <main>
          <Content>
            <ButtonText
              title="Excluir nota"
              onClick={handleRemove}
            />

            <h1>
              {data.title}
            </h1>

            <p>
              {data.description}
            </p>
            {
              data.links && // Se existe links faça
              // O atributo key ajuda o React a identificar quais elementos mudaram, foram adicionados ou removidos, o que melhora a performance ao renderizar listas dinâmicas.
              //Dentro de cada item de lista (`<li>`), há um link (`<a>`) 
              // `href={link.url}` define a URL para a qual o link aponta. 
              //`target="_blanck"` Esse atributo indica que o link deve abrir em uma nova aba ou janela do navegador.
              // {link.url}: O Link sera exibido na tela 
              <Section title="Links úteis">
                <Links>
                  {
                    data.links.map(link => (
                      <li key={String(link.id)}>
                        <a href={link.url} target="_blanck">
                          {link.url}
                        </a>
                      </li>))
                  }
                </Links>
              </Section>
            }

            {
              data.tags && // Se existe tags faça 
              <Section title="Marcadores">
                {
                  data.tags.map(tag => (
                    <Tag
                      key={String(tag.id)}
                      title={tag.name}
                    />
                  ))
                }
              </Section>
            }

            <Button
              title="Voltar"
              onClick={handleBack}
            />
          </Content>
        </main>
      }
    </Container>
  )
}

