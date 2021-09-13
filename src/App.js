import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Switch, Route, Link, useHistory } from 'react-router-dom';
import { db, doc, setDoc, updateDoc, arrayUnion, Timestamp } from './firebase';
import uniqid from 'uniqid';
import Canvas from './components/Canvas';
import Navbar from './components/Navbar';
import Leaderboard from './components/Leaderboard';
import './App.css';
import './styles/Canvas.css';
import pokemon from './img/pokemon.jpg';
import mew from './img/mew.png';
import timburr from './img/timburr.png';
import absol from './img/absol.png';

const App = () => {

  let history = useHistory();
  
  const [level, setLevel] = useState(pokemon);
  const [levelName, setLevelName] = useState('pokemon');
  const [objects, setObjects] = useState([
      {
          name: 'Mew',
          img: mew,
          id: uniqid(),
          listId: uniqid(),
          optionNum: 'option1'
      },
      {
          name: 'Timburr',
          img: timburr,
          id: uniqid(),
          listId: uniqid(),
          optionNum: 'option2'
      },
      {
          name: 'Absol',
          img: absol,
          id: uniqid(),
          listId: uniqid(),
          optionNum: 'option3'
      },
    ])


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
        elem.style.opacity='1';
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
    
    document.querySelector(`.${object}`).style.opacity='0.3';
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
    promptUserforName(levelName);
    setGameActive(false);
    history.replace('/leaderboard');
  
  }

  

  const promptUserforName = async (levelName) => {
    let userName = prompt(`You win (${elapsedTime}s)! Enter your name`);
    const userScoreData = {
      name: userName,
      time: elapsedTime,
      date: Timestamp.fromDate(new Date()),
      id: uniqid()
    }
    
    await updateDoc(doc(db, "leaderboards", levelName), {leaders: arrayUnion(userScoreData)});
    
  }



  return (
    
      <div className="App">
        <Navbar
          
          objects={objects}
          currentTime={elapsedTime}
          handleClick={startNewGame} />
        <Switch>
          <Route exact path="/game">
            <Canvas
              elapsedTime={elapsedTime}
              winMessage={winMessage}
              handleFoundObject={handleFoundObject}
              level={level}
              objects={objects}
              />
          </Route>
          <Route exact path="/leaderboard">
            <Leaderboard 
              levelName={levelName}
            />
          </Route>
        
        </Switch>
      </div>
    
  );
}

export default App;
