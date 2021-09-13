import React, {useEffect, useState} from 'react';
import fruit from '../img/fruit.jpg';
import pokemon from '../img/pokemon.jpg';
import mew from '../img/mew.png';
import timburr from '../img/timburr.png';
import absol from '../img/absol.png';
import { app, db, collection, getDocs, getDoc, doc } from '../firebase';
import App from '../App';
import uniqid from 'uniqid';


const Canvas = ({elapsedTime, winMessage, handleFoundObject, level, objects}) => {
    
    const [resultText, setResultText] = useState('');
    
    const [mouseCoordX, setMouseCoordX] = useState(0);
    const [mouseCoordY, setMouseCoordY] = useState(0);
   
    
    // async function fruitTest() {
    //     const docRef = doc(db, "hiddenObjects", "fruit");
    //     const docSnap = await getDoc(docRef);

    //     if (docSnap.exists()) {
    //         console.log(docSnap.data().option1.left);
    //     } else {
    //         console.log("No such document");
    //     }
    // }
   
    // useEffect(() => {
    //     fruitTest();
    // }, [])


    
    const drawTargetBox = (event) => {
        // console.log(event.target);
        if (event.target === document.querySelector('select')) {
            return;
        }
        let canvasBox = document.querySelector('.canvasDiv').getBoundingClientRect();
        
        let mouseCoordX = (event.clientX > canvasBox.right) ? canvasBox.right : event.clientX - canvasBox.left;
        let mouseCoordY = (event.clientY > canvasBox.bottom) ? canvasBox.bottom : event.clientY - canvasBox.top;
        // console.log("x: " + mouseCoordX, "y: " + mouseCoordY);
        
        setMouseCoordX(mouseCoordX);
        setMouseCoordY(mouseCoordY);

        let targetBox = document.querySelector('.targetBox');
        targetBox.style.display = "block";
        targetBox.style.left = (mouseCoordX - 10) + "px";
        targetBox.style.top = (mouseCoordY + 140) + "px";

        let targetsDropdown = document.querySelector('.targetsDropdown');
        targetsDropdown.style.display = "block";
        targetsDropdown.style.left = (mouseCoordX + 26) + "px";
        targetsDropdown.style.top = (mouseCoordY + 130) + "px";

        targetsDropdown.selectedIndex = 0;
        setResultText('');
    }

    async function checkTarget(level, object) {

        const docRef = doc(db, "hiddenObjects", level);
        const docSnap = await getDoc(docRef);
    
        let canvasWidth = document.querySelector('.canvasDiv').offsetWidth;
        let scaleFactor = canvasWidth / 1000;

        let leftBound = docSnap.data()[object].left * scaleFactor;
        let rightBound = docSnap.data()[object].right * scaleFactor;
        let topBound = docSnap.data()[object].top * scaleFactor;
        let bottomBound = docSnap.data()[object].bottom * scaleFactor;



        if (mouseCoordX > leftBound && mouseCoordX < rightBound && mouseCoordY > topBound && mouseCoordY < bottomBound) {
            // console.log("Found a match!");
            setResultText('Found a match!');
            
            handleFoundObject(object);
            
            

        } else {
            // console.log("not a match!");
            setResultText('Try again!');
        }
    }

    const handleChange = (event) => {
        
        
        if (event.target.value !== 'option0') {
            checkTarget('pokemon', event.target.value);
        }

        let targetBox = document.querySelector('.targetBox');
        targetBox.style.display = "none";
        let targetsDropdown = document.querySelector('.targetsDropdown');
        targetsDropdown.style.display = "none";
    }

        
    return (
        <div className="canvasMarginDiv">
            <div className="canvasDiv" onClick={(e) => drawTargetBox(e)}>
                <img className="photo" src={level} alt="Hidden object search"></img>
                <div className="targetBox"></div>
                
                <select className="targetsDropdown" onChange={handleChange}>
                    <option defaultValue value="option0">Choose an option</option>
                    {
                        objects.map((object) => {
                            return (
                                <option key={object.id} value={object.optionNum}>{object.name}</option>
                            );
                        })
                    }
                </select>

            </div>
            <div>{resultText}</div>
            <div>{winMessage}</div>
        </div>
    )
                    
}

export default Canvas;