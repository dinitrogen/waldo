import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Switch, Route, Link, useHistory } from 'react-router-dom';
import { db, doc, setDoc, updateDoc, arrayUnion, Timestamp } from './firebase';
import uniqid from 'uniqid';
import Canvas from './components/Canvas';
import Navbar from './components/Navbar';
import Leaderboard from './components/Leaderboard';
import './App.css';
import './styles/Canvas.css';

const App = () => {

  let history = useHistory();
  
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
    if (gameActive) {  
    checkFoundList();
    }
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
    document.querySelector('.leaderboardButton').disabled = true;
    resetFoundList();
    setElapsedTime(0);
    setGameActive(true);
  }

  const handleWin = () => {
    document.querySelector('.startButton').disabled = false;
    document.querySelector('.leaderboardButton').disabled = false;
    setWinMessage(`YOU WIN! - ${elapsedTime} s`);
    promptUserforName();
    setGameActive(false);
    history.replace('/leaderboard');
  
  }

  

  const promptUserforName = async () => {
    let userName = prompt(`You win (${elapsedTime}s)! Enter your name`);
    const userScoreData = {
      name: userName,
      time: elapsedTime,
      date: Timestamp.fromDate(new Date()),
      id: uniqid()
    }
    
    await updateDoc(doc(db, "leaderboards", "fruit"), {leaders: arrayUnion(userScoreData)});
    
  }



  return (
    
      <div className="App">
        <Navbar
          object1="avocado"
          object2="grapefruit"
          object3="orange"
          currentTime={elapsedTime}
          handleClick={startNewGame} />
        <Switch>
          <Route exact path="/game">
            <Canvas
              elapsedTime={elapsedTime}
              winMessage={winMessage}
              handleFoundObject={handleFoundObject}
              />
          </Route>
          <Route exact path="/leaderboard">
            <Leaderboard />
          </Route>
        
        </Switch>
      </div>
    
  );
}

export default App;
