import React from 'react'
import './styles/homepage.css'


export default function Scorepage(props) {
    const remove = () => {
        var playerHand = [], compHand = [];      /*  <= יצירה של חפיסת קלפים לכל שחקן */
        var cards = new props.CardDeck();
        for (let i = 0; i < 26; i++) {            /* <= לולאה שכל פעם מחלקת קלף אחד לכל שחקן */
            playerHand.push(cards.drawCard());
            compHand.push(cards.drawCard());
        }
        props.player.cards = playerHand
        props.comp.cards = compHand
        console.clear()
        props.next(1)
    }

    const exitGame = () => {
        if (props.found === undefined) {
            props.setAllPlayers([...props.allPlayers, props.player])
        }
        else {
            props.allPlayers.forEach((val) => {
                if (val.name === props.player.name) {
                    val.wins = props.player.wins
                    val.loses = props.player.loses
                    val.games = props.player.games
                }
            })
        }
        props.next(0)
        console.clear()
    }

    const check = () => {
        if (props.win === true) {
            return <div class="pyro">
                <div><h1 style={{ color: 'green' }}>you win ! </h1>
                <h3 style={{color:'green'}}>Your points status is -</h3>   <h2 style={{color:'green'}}>{`wins=${props.player.wins}/loses=${props.player.loses}/tie=${props.player.tie}`}</h2>
                </div>
            <div class="before"></div>
            <div class="after"></div>
          </div>
        }
        else if (props.losse === true) {
            return <div>
                <h1 style={{ color: 'red' }}>you lose .. </h1>
                <h3 style={{color:'red'}}>Your points status is -</h3>   <h2 style={{color:'red'}}>{`wins=${props.player.wins}/loses=${props.player.loses}/tie=${props.player.tie}`}</h2>
                <h4 style={{color:'red'}}>try again !</h4>
            </div>
        }
        else if (props.tie === true) {
            return <div>
                <h1 style={{ color: 'green' }}>You almost win </h1>
                <h3 style={{ color: 'green' }}>Your points status is -</h3>   <h2 style={{ color: 'green' }}>{`wins=${props.player.wins}/loses=${props.player.loses}/tie=${props.player.tie}`}</h2>
            </div>
        }
    }

    return (
        <div>
            {check()}
            <h3>please choose your next move</h3>
            <button style={{backgroundColor:'yellowgreen',width:'100px',height:'40px',borderRadius:'25px'}} onClick={() => { remove(); props.setWins(false); props.setLosse(false); props.setTie(false); }}>play again!</button>
            <button style={{backgroundColor:'yellowgreen',width:'100px',height:'40px',borderRadius:'25px',marginLeft:'20px'}} onClick={() => { exitGame(); props.setWins(false); props.setLosse(false); props.setTie(false); }}>Leave Game</button>
        </div>
    )
}
