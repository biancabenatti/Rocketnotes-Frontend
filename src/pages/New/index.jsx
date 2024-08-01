
import { useState } from 'react'
import { Header } from '../../components/Header'
import { Input } from '../../components/Input'
import { Textarea } from '../../components/Textarea'
import { NoteItem } from '../../components/NoteItem'
import { Section } from '../../components/Section'
import { Button } from '../../components/Button'
import { api } from '../../services/api'
import { useNavigate } from 'react-router-dom'
import { ButtonText } from '../../components/ButtonText'

import { Container, Form } from './styles'

export function New() {

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  const [links, setLinks] = useState([]) // Guarda todos os links 
  const [newLink, setNewLink] = useState('') // Estado para guardar o link adicionado

  const [tags, setTags] = useState([])
  const [newTag, setNewTag] = useState('')

  const navigate = useNavigate()

  function handleBack() {
    navigate(-1)
  }


// FUNÇOES LINKS ADD E REMOVE

  function handleAddLink() { // A função vai para onde clica para adicionar um novo link 
    setLinks(prevState => [...prevState, newLink]) 
    /* acessando o setLinks no estado anterior pegando o que estava antes e montando um novo vetor
    ...prevState - Despejando tudo que havia antes com o novo link (newLink) */
    setNewLink("");//Limpar o estado
  }

  function handleRemoveLink(linkDeleted) { // Qual é o link que quero deletar 
    setLinks(prevState => prevState.filter(link => link !== linkDeleted))
    /* No prevState eu tenho todo o conteudo antes de ser atualizado e vou aplicar um filtro que vai retornar
    uma nova lista.
    Nesse caso como quero remover um link significa que quero retornar todos os links dentro 
    do meu estado menos o link que quero deletar ou seja vou ter uma lista nova sem o link que removi 
    link => link !== linkDeleted - Verifica onde o link é diferente do que estou deletando */
  }

// FUNÇOES TAGS ADD E REMOVE

function handleAddTag () {
  setTags(prevState => [...prevState, newTag]) 
  setNewTag("");
}

function handleRemoveTag(tagDeleted) {
  setTags(prevState => prevState.filter(tag => tag !== tagDeleted))
}

// FUNÇOES NOTAS ADD E REMOVE

async function handleNewNote() {
  await api.post('/notes', { // Aguardar a api enviar pelo metodo post em /notes {os objetos que quero mandar}
    title,
    description,
    tags,
    links
  })
    alert ("Nota criada com sucesso!")
    navigate(-1); // Apos nota criada navegar de volta para a home 
};

  return (
    <Container>
      <Header />

      <main>
        <Form>
          <header>
            <h1>Criar nota</h1>
            <ButtonText 
            title ="Voltar" 
            onClick = {handleBack}/> 
          </header>

          <Input 
          placeholder="Título" 
          onChange={e => setTitle(e.target.value)}
          />

          <Textarea 
          placeholder="Observações" 
          onChange={e => setDescription(e.target.value)}
          />

          <Section title="links úteis">
            {
              links.map((link, index) => (// Percorrer o array de links e retornar os links // index é a posição do elemento 
                <NoteItem
                key = {String(index)} // Sempre quando tiver um componente que esta sendo renderizado por uma lista tem que colocar uma key "chave" no caso estou forçando ela ser uma string passando a posição 
                value={link} 
                onClick={() => handleRemoveLink(link)} // Quando tem parametro tem que usar () =>
               />
               ))} 
            <NoteItem
              isNew 
              placeholder="Novo link" 
              value={newLink} 
              onChange = {e => setNewLink(e.target.value)} //Pegar o valor do link novo 
              onClick={handleAddLink} // e ao clicar usar a função handleAddLink
             />
              
          </Section>

          <Section title="Marcadores">
            <div className="tags">
              {tags.map((tag, index) => (
                <NoteItem
                  key={String(index)}
                  value={tag}
                  onClick={() => handleRemoveTag(tag)}
                />
              ))}
              <NoteItem
                isNew
                placeholder="Nova Tag"
                value={newTag}
                onChange={e => setNewTag(e.target.value)} //Pegar o valor da tag nova 
                onClick={handleAddTag} // e ao clicar usar a função handleAddLink
                />
            </div>
          </Section>

          <Button 
          title="Salvar"
          onClick= {handleNewNote}
          />
        </Form>
      </main>
    </Container>
  )
}
