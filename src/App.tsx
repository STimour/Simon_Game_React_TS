import { useEffect, useState } from 'react';
import './App.css';

const colors = ["green", "red", "yellow", "blue"];

const App = () => {
  const [colorToChoose, setColorToChoose] = useState<string[]>();
  const [position, setPosition] = useState(0);
  const [isPlayerToPlay, setIsPlayerToPlay] = useState(true)
  const [play, setPlay] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [nbTour, setNombreTour] = useState(0)
  console.log('state', position, colorToChoose, play, gameOver)


  const gameOverFunction = () => {
    setColorToChoose([]);
    setGameOver(true);
    setPlay(false);
    setPosition(0);
  };
  const StartGame = () => {
    setPlay(true);
    setColorToChoose([colors[Math.floor(Math.random() * colors.length)]]);
    setIsPlayerToPlay(false);
    setGameOver(false);
    setPosition(0);
    setNombreTour(0)
  };
  
  useEffect(() => {
    if (play && !isPlayerToPlay) {
      if (position < colorToChoose!.length) {
        setTimeout(() => {
          setPosition(position + 1);
        }, 500);
      } else {
        setIsPlayerToPlay(true);
        setPosition(0);
      }
    }
  }, [isPlayerToPlay, position, colorToChoose, play]);

  
  const handleColorClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (isPlayerToPlay) {
      console.log('thomas')
      const target = event.currentTarget;
      const clickColor = target.getAttribute('color');
    
      if (colorToChoose![position] === clickColor) {
        setNombreTour(nbTour + 1)
        if (position === colorToChoose!.length - 1) {
          const color = colors[Math.floor(Math.random() * colors.length)];
          const newcolorToChoose = [color];
          setColorToChoose(newcolorToChoose);
          setPosition(0);
          setIsPlayerToPlay(false)
        } else {
          setPosition(position + 1);
        }
      } else {
        gameOverFunction();
      }
    }
  };
  let msg
  if(gameOver){
    msg = 'You lost';
  }
  return (
    <div className='game-container'>
     
      <div className="row">
        <div className={'game-container--fBlock' + (!isPlayerToPlay && colorToChoose![position] === "red" ? " border" : "")} onClick={handleColorClick} color='red'></div>
        <div className={'game-container--sBlock' + (!isPlayerToPlay && colorToChoose![position] === "blue" ? " border" : "")}  onClick={handleColorClick} color='blue'></div>
      </div>
      <div className="row">
        <div className={'game-container--tBlock' + (!isPlayerToPlay && colorToChoose![position] === "yellow" ? " border" : "")} onClick={handleColorClick} color='yellow'></div>
        <div className={'game-container--frBlock' + (!isPlayerToPlay && colorToChoose![position] === "green" ? " border" : "")} onClick={handleColorClick} color='green'></div>
      </div>
      <button onClick={() => StartGame()}>Play</button>
      <p>Nombre de Coups: {nbTour}</p>
      <p>{msg}</p>
    </div>
  );
};

export default App;
