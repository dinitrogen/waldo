import React, {useEffect, useState} from 'react';
import fruit from '../img/fruit.jpg';

const fruitCoords = {
    option0: {
        name: 'none',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0
    },
    option1: {
        name: 'avocado',
        left: 275,
        right: 375,
        top: 126,
        bottom: 264
    },
    option2: {
        name: 'grapefruit',
        left: 400,
        right: 543,
        top: 280,
        bottom: 424
    },
    option3: {
        name: 'orange',
        left: 590,
        right: 702,
        top: 186,
        bottom: 293
    }
}

const Canvas = () => {
    
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


    // useEffect(() => {
    //     if (object !== 'option0') {
    //         checkTarget(object);
    //     }

    // }, [object])

    useEffect(() => {
        checkFoundList();
    });

    const checkFoundList = () => {
        if (foundObjects.option1.isFound === true && foundObjects.option2.isFound === true && foundObjects.option3.isFound === true) {
            console.log('you win!');
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
        // let canvasBox = event.target.getBoundingClientRect();
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
    }

    const checkTarget = (object) => {
        // let objectBox = document.querySelector(`.${object}`).getBoundingClientRect();
        let leftBound = fruitCoords[object].left;
        let rightBound = fruitCoords[object].right;
        let topBound = fruitCoords[object].top;
        let bottomBound = fruitCoords[object].bottom;
        

        if (mouseCoordX > leftBound && mouseCoordX < rightBound && mouseCoordY > topBound && mouseCoordY < bottomBound) {
            console.log("Found a match!");
            setFoundObjects({...foundObjects,
                [object]: {isFound: true}
            })

        } else {
            console.log("not a match!");
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
        </div>
    )
                    
}

export default Canvas;