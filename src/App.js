import './App.css';
import { useState } from 'react';
import Homepage from './components/Homepage';
import Scorepage from './components/Scorepage';
import Gamepage from './components/Gamepage';

let comp;
let found;
let player1;
function App() {
  const [allPlayers, setAllPlayers] = useState([])                                       /*מערך של שחקנים */
  const initGame = (name) => {                                                           /* <=  פונקציה שמקבלת את השם של השחקן  */
    var playerHand = [], compHand = [];                                                  /*  <= יצירה של חפיסת קלפים לכל שחקן */
    var cards = new CardDeck();
    for (let i = 0; i < 26; i++) {                                                         /* <= לולאה שכל פעם מחלקת קלף אחד לכל שחקן */
      playerHand.push(cards.drawCard());
      compHand.push(cards.drawCard());
    }
    found = allPlayers.find((val) => val.name === name)
    if (found === undefined) {
      player1 = new Player(name, playerHand)
    }
    else {
      player1 = found;
      player1.cards = playerHand
    }
    comp = new Player('computer', compHand)
    setPage(1)
  }

  const [win, setWins] = useState(false)
  const [losse, setLosse] = useState(false)
  const [tie, setTie] = useState(false)

  const [page, setPage] = useState(0);  /* <= הוק שמרענן ומאפשר לעבור בין העמודים*/
  const showPage = () => {
    if (page == 0) {
      return <Homepage allPlayers={allPlayers} initGame={initGame} setPage={setPage} />
    }
    if (page == 1) {
      return <Gamepage player={player1} pc={comp} next={setPage} 
      setWins={setWins} setLosse={setLosse} setTie={setTie}
      />
    }
    else {
      return <Scorepage CardDeck={CardDeck} comp={comp} setAllPlayers={setAllPlayers} allPlayers={allPlayers} found={found} player={player1} next={setPage} 
      setWins={setWins} setLosse={setLosse} setTie={setTie}
      win={win} losse={losse} tie={tie}
      />
    }
  }

  return (
    <div className="App">
      {showPage()} {/*  <=  קריאה לפונקציה שיצרנו שמשנה את העמודים*/}
    </div>
  );
}
/*יצירת מחלקות */
class Player {    /* <=  מחלקת שחקן */
  name = '';
  wins = 0;
  loses = 0;
  tie = 0;
  games = 0;
  cards = [];
  constructor(name, cards) {
    this.name = name;
    this.cards = cards;
  }
}
class CardDeck {   /* <=   מחלקה של חפיסת קלפים,שהיא ריקה,כי אנחנו רוצים שכל פעם שנתחיל משחק,תהיה חפיסת קלפים חדשה */
  cardsArr = [];
  constructor() {
    this.initDeck();
  }
  initDeck() {           /*   <=  פונקציה שיוצרת חפיסת קלפים */
    for (let i = 1; i < 14; i++) {
      for (let j = 0; j < 4; j++) {
        this.cardsArr.push(i)
      }
    }
  }
  drawCard() {                                /* <=   פונקציה שמחלקת/זורקת קלפים לכל שחקן */
    let rand = Math.floor(Math.random() * this.cardsArr.length)          /*פונקציה שבוחרת קלף מסויים מאפס ועד לכמות הקלפים שנשארה בחבילה  */
    let card = this.cardsArr.splice(rand, 1)         /*משתנה שמקבל את הלקף בתור מערך בגלל שהשתמשנו בספלייס */
    return card[0]                       /*אומרים לפונקציה להחזיר את הקלף שקיבלנו */
  }
}
export default App;
// Math.floor(Math.random()*(max-min)+min) פונקציה ליצירת מספר רנדומאלי

// const points = [40, 100, 1, 5, 25, 10];
// points.sort(function(){return 0.5 - Math.random()});     <= מסדר את המערך בצורה רנדומאלית כל פעם