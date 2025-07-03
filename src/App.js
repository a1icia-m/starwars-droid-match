import { useEffect, useState } from 'react'
import './App.css'
import SingleCard from './components/SingleCard.js';

//Create constant array of cards where each points to a star wars droid
const cardImages =[
  {"src": "/img/images/bb8.png", matched: false},
  {"src": "/img/images/c3po.png", matched: false},
  {"src": "/img/images/chopper.webp", matched: false},
  {"src": "/img/images/r2d2.png", matched: false},
  {"src": "/img/images/bb9e.webp", matched: false},
  {"src": "/img/images/battledroid.webp", matched: false},
]

function App() {
  //State updates
  const[cards, setCards] = useState([])
  const[turns, setTurns] = useState(0)
  const[choiceOne, setChoiceOne] = useState(null)
  const[choiceTwo, setChoiceTwo] = useState(null)
  const[disabled, setDisabled] = useState(false)
  
  //Shuffle the cards and duplicate them to make array of 12 cards with random ids
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
    .sort(() => Math.random()-0.5 )  
    .map((card) => ({...card, id: Math.random()}))

    setChoiceOne(null)
    setChoiceTwo(null)
    setCards(shuffledCards)
    setTurns(0)
  }

  //Determine what happens when the user clicks a carrd
  const handleChoice = (card) => {
    if(card.id === choiceOne?.id) return;

    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
   }

  //Compare 2 selected cards to determine if they are the same
  useEffect(() => {
    if (choiceOne && choiceTwo){
      setDisabled(true)
      if (choiceOne.src === choiceTwo.src){
        setCards(prevCards =>{
          return prevCards.map(card => {
            if (card.src === choiceOne.src) {
              return {...card, matched: true}
            } else {
              return card
            }
          })
        })
        resetTurn()
      } else{
        setTimeout(() => resetTurn(), 1000)
      }
    }
  }, [choiceOne, choiceTwo])
  console.log(cards)

  // Reset choices & increase turn count
  const resetTurn = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(prevTurns => prevTurns +1)
    setDisabled(false)
  }

  //Start a new game automatically when component first mounts/runs
  useEffect(() => {
    shuffleCards()
  }, [])

  return (
    <div className="App">
      <h1>Star Wars Droid Match</h1>
      <p style={{ fontSize: '0.7em' }}> A long, long, time ago, in a galaxy far, far, away ... <br /> Some droids mysteriously disappeared... <br /> Help locate the missing droids by matching them! </p>
      <button onClick={shuffleCards}>New Game</button>
      
      <div className = "card-grid">
        {cards.map(card => (
          <SingleCard 
            key = {card.id} 
            card ={card}
            handleChoice= {handleChoice}
            flipped = {card === choiceOne || card=== choiceTwo || card.matched}
            disabled ={disabled}
            />
  
        ))}
      </div>
      <p>Turns: {turns}</p>
    </div>
  );
}

export default App