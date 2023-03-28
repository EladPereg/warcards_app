import React from 'react'
import { useState } from 'react'
import Card from './Card'

let playerScore = 0, pcScore = 0;

export default function Gamepage(props) {
    const [cardIndex, setcardIndex] = useState(0)

    const drawCardGamePage = () => {                                                          /* <= פונקציה שבודקת מי מנצח באותה היד,ומעלה לו את הניקוד */
        if (props.player.cards[cardIndex] > props.pc.cards[cardIndex]) {
            playerScore++
        }
        else if (props.player.cards[cardIndex] < props.pc.cards[cardIndex]) {
            pcScore++
        }
        console.log(`${props.player.name}-${playerScore}:${pcScore}-computer`)

        if (cardIndex == 25) {                                                                /* <=  מריץ בדיקה אם סיימנו את כל הלקפים בחפיסה,ובעצם סיימנו את המשחק */
            props.player.games++;
            setcardIndex(0)
            if (playerScore > pcScore) {
                props.player.wins++;
                props.setWins(true)
            }
            else if (playerScore < pcScore) {
                props.player.loses++;
                props.setLosse(true)
            }
            else {
                props.player.tie++
                props.setTie(true)
            }
            props.next(2)
            playerScore = 0
            pcScore = 0
        }
        else {
            setcardIndex(cardIndex + 1)                                                         /*  <=  כל עוד לא סיימתי את החפיסה,תשלוף את הקלף הבא */
        }
    }

    return (
        <div id='gamePageDiv'>
            <h1>{props.player.name}</h1>
            <Card cardIndex={props.player.cards[cardIndex]} />
            <h3>{`${props.player.name} score: ${playerScore}`}</h3>
            round number:<h2> {cardIndex + 1}</h2>
            <h3>{`${props.pc.name} score: ${pcScore}`}</h3>
            <Card cardIndex={props.pc.cards[cardIndex]} />
            <h1>{props.pc.name}</h1>
            <button id='GnamePageBtn' onClick={() => { drawCardGamePage() }}>draw crad</button>
        </div>
    )
}
