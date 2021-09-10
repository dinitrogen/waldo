import React, {useEffect, useState} from 'react';
import fruit from '../img/fruit.jpg';
import { app, db, collection, getDocs, getDoc, doc } from '../firebase';

// const fruitCoords = {
//     option0: {
//         name: 'none',
//         left: 0,
//         right: 0,
//         top: 0,
//         bottom: 0
//     },
//     option1: {
//         name: 'avocado',
//         left: 275,
//         right: 375,
//         top: 126,
//         bottom: 264
//     },
//     option2: {
//         name: 'grapefruit',
//         left: 400,
//         right: 543,
//         top: 280,
//         bottom: 424
//     },
//     option3: {
//         name: 'orange',
//         left: 590,
//         right: 702,
//         top: 186,
//         bottom: 293
//     }
// }

const Canvas = () => {
    
    const [resultText, setResultText] = useState('');
    const [winMessage, setWinMessage] = useState('');

    const [mouseCoordX, setMouseCoordX] = useState(0);
    const [mouseCoordY, setMouseCoordY] = useState(0);
    const [object, setObject] = useState('option0');
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


    useEffect(() => {
        checkFoundList();
    });

    const checkFoundList = () => {
        if (foundObjects.option1.isFound === true && foundObjects.option2.isFound === true && foundObjects.option3.isFound === true) {
            // console.log('you win!');
            setWinMessage('YOU WIN!');
        } else {
            return;
        }
    }

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
        targetBox.style.top = (mouseCoordY - 10) + "px";

        let targetsDropdown = document.querySelector('.targetsDropdown');
        targetsDropdown.style.display = "block";
        targetsDropdown.style.left = (mouseCoordX + 26) + "px";
        targetsDropdown.style.top = (mouseCoordY - 26) + "px";

        targetsDropdown.selectedIndex = 0;
        setObject('option0');
        setResultText('');
    }

    async function checkTarget(object) {

        const docRef = doc(db, "hiddenObjects", "fruit");
        const docSnap = await getDoc(docRef);
    
        let leftBound = docSnap.data()[object].left;
        let rightBound = docSnap.data()[object].right;
        let topBound = docSnap.data()[object].top;
        let bottomBound = docSnap.data()[object].bottom;



        if (mouseCoordX > leftBound && mouseCoordX < rightBound && mouseCoordY > topBound && mouseCoordY < bottomBound) {
            // console.log("Found a match!");
            setResultText('Found a match!');
            setFoundObjects({...foundObjects,
                [object]: {isFound: true}
            })

        } else {
            // console.log("not a match!");
            setResultText('Try again!');
        }
    }

    const handleChange = (event) => {
        setObject(event.target.value);
        
        if (event.target.value !== 'option0') {
            checkTarget(event.target.value);
        }

        let targetBox = document.querySelector('.targetBox');
        targetBox.style.display = "none";
        let targetsDropdown = document.querySelector('.targetsDropdown');
        targetsDropdown.style.display = "none";
    }

        
    return (
        <div className="canvasMarginDiv">
            <div className="canvasDiv" onClick={(e) => drawTargetBox(e)}>
                <img className="photo" src={fruit} alt="fruit"></img>
                <div className="targetBox"></div>
                
                <select className="targetsDropdown" onChange={handleChange}>
                    <option defaultValue value="option0">Choose an option</option>
                    <option value="option1">avocado</option>
                    <option value="option2">grapefruit</option>
                    <option value="option3">orange</option>
                </select>

            </div>
            <div>{resultText}</div>
            <div>{winMessage}</div>
        </div>
    )
                    
}

export default Canvas;