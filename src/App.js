import { useEffect, useState } from 'react'
import './App.css'
import SingleCard from './components/SingleCard.js';

//Create const array of cards where each points to a star wars droid
// don't need to be in component so it won't be recreated every time + bc it's a constant
// each card is an object with a source property which is a path  
const cardImages =[
  {"src": "/img/images/bb8.png", matched: false},
  {"src": "/img/images/c3po.png", matched: false},
  {"src": "/img/images/chopper.webp", matched: false},
  {"src": "/img/images/r2d2.png", matched: false},
  {"src": "/img/images/bb9e.webp", matched: false},
  {"src": "/img/images/battledroid.webp", matched: false},
]

//What happens every time you click on New Game

function App() {
  const[cards, setCards] = useState([])
  const[turns, setTurns] = useState(0)
  const[choiceOne, setChoiceOne] = useState(null)
  const[choiceTwo, setChoiceTwo] = useState(null)
  const[disabled, setDisabled] = useState(false)
  //shuffle cards
  //duplicates cards -> array w 12 cards
  //then sort and assign a random id number
  //update card state
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
    .sort(() => Math.random()-0.5 ) //if return # >0, random order
    .map((card) => ({...card, id: Math.random()}))

    setChoiceOne(null)
    setChoiceTwo(null)
    setCards(shuffledCards)
    setTurns(0)
  }

  //handle a choice
  const handleChoice = (card) => {
    // Stop the user from being able to click the first card twice
    if(card.id === choiceOne?.id) return;

    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
    //can't check if the cards are the same here becaue then the check fires before the state update
  }

  //compare 2 selected cards
  //useEffect fire when comoponent first mounts, then again whenver a dependecy changes
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

  // reset choices & increase turn
  const resetTurn = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(prevTurns => prevTurns +1)
    setDisabled(false)
  }

  //start a new game automatically when component first mounts/runs
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