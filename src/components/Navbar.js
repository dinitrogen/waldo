import React from 'react';
import '../styles/Navbar.css';

const Navbar = ({object1, object2, object3, currentTime, handleClick}) => {

    return (
        <nav>
            <button className="startButton" onClick={handleClick}>Start game</button>
            <div className="objectList">
                <div className="object option1">{object1}</div>
                <div className="object option2">{object2}</div>
                <div className="object option3">{object3}</div>
            </div>

            <div className="onScreenTimer">
                <div>Time: {currentTime}</div>
            </div>

        </nav>
    )
}

export default Navbar;