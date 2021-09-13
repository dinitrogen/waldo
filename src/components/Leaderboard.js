import React, {useEffect, useState} from 'react';
import { app, db, collection, getDocs, getDoc, doc } from '../firebase';


const Leaderboard = () => {

    const [leaders, setLeaders] = useState([]);

    useEffect(() => {
        getLeaders();
    },[])
    
    const getLeaders = async () => {

        const docRef = doc(db, 'leaderboards', 'fruit');
        const docSnap = await getDoc(docRef);
        let sortedLeaders = docSnap.data().leaders.sort((a, b) => {
            return a.time - b.time;
        }).slice(0, 10);
        

        setLeaders(sortedLeaders);
    }

    return (
        <div>Leaderboard
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
    )
}

export default Leaderboard;