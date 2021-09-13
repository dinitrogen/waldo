import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';


const Navbar = ({objects, currentTime, handleClick}) => {

    return (
        <nav>
            <Link to="/game">
                <button className="startButton" onClick={handleClick}>Start game</button>
            </Link>
            
            <Link to="/leaderboard">
                <button className="leaderboardButton">Leaderboard</button>
            </Link>

            <div className="objectList">
                
                {
                    objects.map((object) => {
                        return (
                            <div key={object.listId}><img className={`object ${object.optionNum}`} src={object.img} alt="object"></img>
                                <span>{object.name}</span>
                            </div>
                        )
                    })
                }

            </div>

            <div className="onScreenTimer">
                <div>Time:</div><div className="timeText">{currentTime}</div>
            </div>

        </nav>
    )
}

export default Navbar;