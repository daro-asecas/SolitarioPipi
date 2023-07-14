import { useState } from 'react';
import './styles/styles.css';
import { Deck } from './models/deck';
import Match from './models/match';
import MatchWrapper from "./components/MatchWrapper"
import DealButton from './components/DealButton';

export default function App() {

  const [match, setMatch] = useState<Match>(new Match(undefined));
  const [isMatchStarted, setIsMatchStarted] = useState(false);
  // eslint-disable-next-line
  const [suitStacks, setSuitStacks] = useState<Deck[]>();
  // eslint-disable-next-line
  const [pilesBottom, setPilesBottom] = useState<Deck[]>();
  // eslint-disable-next-line
  const [deck, setDeck] = useState<Deck>();

  // function consoleLogMatch () {
  //   match.consoleLogMatch()
  // }

  function renderMatch () {
    if (match) {
      setSuitStacks([...match.suitStacks])
      setPilesBottom([...match.pilesBottom])
      setDeck(new Deck(match.deck))
    }
  }

  function startGame () {
    setMatch(new Match(match))
    setIsMatchStarted(true)
    deal()
    renderMatch()
  }
  
  function deal () {
    if (match) match.deal()
    renderMatch()
  }
  
  function riseCard (originWhere:string, originPileIndex:number, cardIndex:number, quantityOfCards:number, destinStackIndex:number) {
  // eslint-disable-next-line
    if (quantityOfCards != 1) return
    match.riseCard(originWhere, originPileIndex, cardIndex, destinStackIndex)
    renderMatch()
  }

  function riseCardWithDoubleClick (originWhere:string, originPileIndex:number, cardIndex:number) {
    match.riseCardWithDoubleClick(originWhere, originPileIndex, cardIndex)
    renderMatch()
  } 

  function moveSubPile (originWhere:string, originPileIndex:number, cardIndex:number, quantityOfCards:number, destinPileIndex:number) {
    match.moveSubPile(originWhere, originPileIndex, cardIndex, (quantityOfCards), destinPileIndex)
    renderMatch()
  }

  return (
    <>
      { (isMatchStarted)
        ? <MatchWrapper match={match} deal={deal} startGame={startGame} moveSubPile={moveSubPile} riseCard={riseCard} riseCardWithDoubleClick={riseCardWithDoubleClick} />
        : <DealButton text={"Start!"} callback={startGame} />
      }

{/* PARA USAR EN DEV
      <DealButton text={"logMatch"} callback={consoleLogMatch} />
*/}

    </>
  );
}