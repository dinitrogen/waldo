import React, { useState, useEffect } from 'react';
import Canvas from './components/Canvas';
import Navbar from './components/Navbar';
import './App.css';
import './styles/Canvas.css';

const App = () => {

  const [elapsedTime, setElapsedTime] = useState(0);
  const [gameActive, setGameActive] = useState(false);
  const [winMessage, setWinMessage] = useState('');
    const [foundObjects, setFoundObjects] = useState({
        option1: {
            isFound: false
        },
        option2: {
            isFound: false
        },
        option3: {
            isFound: false
        }
    });

  useEffect(() => {
      checkFoundList();
  });

  const resetFoundList= () => {
      setFoundObjects({
          option1: {
              isFound: false
          },
          option2: {
              isFound: false
          },
          option3: {
              isFound: false
          }
      });
      setWinMessage('');
      document.querySelectorAll('.object').forEach((elem) => {
        elem.style.color='black';
      });
  }

  const checkFoundList = () => {
      if (foundObjects.option1.isFound === true && foundObjects.option2.isFound === true && foundObjects.option3.isFound === true) {
          // console.log('you win!');
          setWinMessage(`YOU WIN! - ${elapsedTime} s`);
          handleWin();

      } else {
          return;
      }
  }

  const handleFoundObject = (object) => {
    setFoundObjects({...foundObjects,
      [object]: {isFound: true}
    });
    document.querySelector(`.${object}`).style.color='green';
  }


  useEffect(() => {
    if (gameActive) {
      setTimeout(() => {
        setElapsedTime(elapsedTime + 1);
      }, 1000);
    }
  },[gameActive, elapsedTime]);


  const startNewGame = () => {
    document.querySelector('.startButton').disabled = true;
    resetFoundList();
    setElapsedTime(0);
    setGameActive(true);
  }

  const handleWin = () => {
    document.querySelector('.startButton').disabled = false;
    setGameActive(false);
  }



  return (
    <div className="App">
      <Navbar
        object1="avocado"
        object2="grapefruit"
        object3="orange"
        currentTime={elapsedTime}
        handleClick={startNewGame} />
      <Canvas
        elapsedTime={elapsedTime}
        winMessage={winMessage}
        handleFoundObject={handleFoundObject}
         />
    </div>
  );
}

export default App;
