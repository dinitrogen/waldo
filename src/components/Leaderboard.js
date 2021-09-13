import React, {useEffect, useState} from 'react';
import { app, db, collection, getDocs, getDoc, doc } from '../firebase';
import '../styles/Leaderboard.css';


const Leaderboard = ({levelName}) => {

    const [leaders, setLeaders] = useState([]);

    useEffect(() => {
        getLeaders(levelName);
    },[])
    
    const getLeaders = async (levelName) => {

        const docRef = doc(db, 'leaderboards', levelName);
        const docSnap = await getDoc(docRef);
        let sortedLeaders = docSnap.data().leaders.sort((a, b) => {
            return a.time - b.time;
        }).slice(0, 10);
        

        setLeaders(sortedLeaders);
    }

    return (
        <div className="leaderboard">
            <h2>Leaderboards</h2>
            <h3>{levelName}</h3>
            
            <div className="leaderboardList">
                <ol>
                    
                {
                    leaders.map((leader) => {
                        return (
                            <li key={leader.id}>{leader.name + ': ' + leader.time + 's'}</li>
                        );
                    })
                }
                </ol>
            </div>

        </div>
    )
}

export default Leaderboard;