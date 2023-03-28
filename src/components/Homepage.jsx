import React from 'react'
import { useState } from 'react'
import PlayersTable from './PlayersTable';
import './styles/homepage.css'

export default function Homepage(props) {
    const [name, setName] = useState('');                                                      /* <=  הוק ששומר את השם שאכניס לו באינפוט */
    const validName = () => {                                                                 /* <=  פונקציה שבודקת אם השם ריק או מלא  */
        if (name.length > 1) {
            props.initGame(name);
        }
        else {
            alert('Please enter your name')
        }
    };

    const [showTable, setShowTable] = useState(false)
    const showTab = () => {
        if (showTable == true) {
            return <PlayersTable allPlayers={props.allPlayers} />
        }
    }
    const changeShow = () => {
        setShowTable(!showTable)
    }

    const win = () => {
        props.allPlayers.sort((a, b) => b.wins - a.wins)
    }


    return (
        <div>
            <div id='homeDiv' >
                <div id='homePageDiv'>
                    <h1>Ready for war?</h1>
                    <h3>please enter your name:</h3>
                    <input id='HomePageInp' onChange={(e) => { setName(e.target.value) }} type="text" />
                    <br />
                    <button className='Hompagebtn' onClick={() => { validName() }}>Go</button>
                    <br />
                    <button className='Hompagebtn' onClick={() => { win(); setShowTable(true); changeShow() }}>show tabelScore</button>
                    {showTab()}
                </div>

            </div>
        </div>
    )
}
