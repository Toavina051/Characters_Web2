import { useState, useEffect } from 'react'
import axios from 'axios'
import Characters from './compements/Characters'
import NewChararaters from './compements/NewCharacters'

function App() {
  const [items, setItems] = useState([])
  const [charToDelete, setCharToDelete] = useState()
  
  useEffect(() => {
    axios.get("http://localhost:8080/characters")
    .then(
      response => {
        setItems(response.data)
      } 
    )
  },[charToDelete])

  return (
    <div>
      <Characters characters={items} takeCharToDelete={setCharToDelete}/>
      {charToDelete && <Delete char={charToDelete}/>}
      <NewChararaters update={setItems}/>
    </div>
  )
}

export default App
