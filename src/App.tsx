import React, { useState, useEffect } from 'react'
import './styles/styles.css'
import { Deck } from './models/deck'
import Match, { matchBlank } from './models/match'
import { usePointerPosition, $pointerPosition } from './components/hooks/storePointerPosition'
import MatchWrapper from './components/MatchWrapper'
import DealButton from './components/DealButton'


export const MatchContext = React.createContext<Match>(matchBlank())

export default function App() {
  const [match, setMatch] = useState<Match>(new Match())
  const [isMatchStarted, setIsMatchStarted] = useState(false)

  // function consoleLogMatch () {
  //   match.consoleLogMatch()
  // }

  function invalidate() {
    setMatch(m => new Match(m))
  }

  function startGame() {
    setMatch(new Match(match))
    setIsMatchStarted(true)
    deal()
  }

  function deal() {
    if (match) match.deal()
    invalidate()
  }

  // prettier-ignore
  function moveSubPile(originWhere:"top"|"bottom"|"deck", originPileIndex:number, cardIndex:number, quantityOfCards:number, destinWhere:string, destinPileIndex:number) {
    if (destinWhere === 'top') {
      if (quantityOfCards !== 1) return
      match.riseCard(originWhere, originPileIndex, cardIndex, destinPileIndex)
    } else if (destinWhere === 'bottom') {
      match.moveSubPile(originWhere, originPileIndex, cardIndex, quantityOfCards, destinPileIndex)
    } else {
      console.error(new Error('Moving to invalid destin'))
    }
    invalidate()
  }

  // prettier-ignore
  function riseCardWithDoubleClick( originWhere:string, originPileIndex:number, cardIndex:number) {
    match.riseCardWithDoubleClick(originWhere, originPileIndex, cardIndex)
    invalidate()
  }

  useEffect(() => {
    const handle = (event: MouseEvent) => {
      $pointerPosition.set({
        x: event.x,
        y: event.y
      });
      
    };
    window.addEventListener("pointerdown", handle, { capture: true });
    window.addEventListener('pointermove', handle, { capture: true });

    return () => {
      window.removeEventListener("pointerdown", handle, { capture: true });
      window.removeEventListener('pointermove', handle, { capture: true });
    };
  }, []);

  // const { x: pointerX, y: pointerY } = usePointerPosition();

  return (
    <>
      <MatchContext.Provider value={match}>
        {/* {pointerX} {","} {pointerY} */}

        {isMatchStarted ? (
          <MatchWrapper
            deal={deal}
            startGame={startGame}
            moveSubPile={moveSubPile}
            riseCardWithDoubleClick={riseCardWithDoubleClick}
          />
        ) : (
          <DealButton text="Start!" callback={startGame} />
        )}

        {
          /* PARA USAR EN DEV
          <DealButton text={"logMatch"} callback={consoleLogMatch} />
          */
        }
      </MatchContext.Provider>
    </>
  )
}