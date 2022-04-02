import { useState } from 'react'
import { Card } from './components/Text'

import "./App.css"

function App() {
  const [tweets, setCard] = useState<string[]>([
    "tweet 1",
    "tweet 2",
    "tweet 3"
  ])

  function createCard() {
    setCard([...tweets, "tweet novo"])
  }

  return (
    <div>
      <button
        onClick={createCard}
        style={{
          backgroundColor: "#8257e6",
          border: 0,
          padding: "6px 12px",
          color: "#fff"
        }}
      >Adicionar tweet</button>

      {tweets.map(tweet => {
        return <Card text={tweet} />
      })}
    </div>
  )  
}

export default App
