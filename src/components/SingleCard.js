import './SingleCard.css';

export default function SingleCard({ card, handleChoice, flipped, disabled }) {
  const handleClick = () => {
    if (!disabled){
      handleChoice(card)
    }
  };

  return (
  <div className="card">
      <div className={`card-inner ${flipped ? "flipped" : ""}`}>
        <img className="front" src={card.src} alt="card front" />
        <img 
          className="back" 
          src="/img/images/card.jpg" 
          onClick={handleClick} 
          alt="card back" 
        />
      </div>
    </div>
  );
}
