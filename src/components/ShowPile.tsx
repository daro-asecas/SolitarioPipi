import { useContext } from 'react';
import { MatchContext } from '../App';

import { Deck } from "../models/deck";
import ShowGroupedCards from "./ShowGroupedCards";
import { useState } from "react";


export default function ShowPile( {where, pileIndex, pile, stacked, callbackOnDrop, riseCardWithDoubleClick}:
                  {where:string, pileIndex:number, pile:Deck, stacked:boolean, callbackOnDrop:Function, riseCardWithDoubleClick:Function} ) {

  const match = useContext(MatchContext)

  const pileToRender = (pile.numberOfCards>2&&stacked)?new Deck([pile.cards[pile.numberOfCards-2],pile.lastCard]):pile
  const idName = `${where}-pile-slot-${pileIndex}`
  const classEmpty = (pile.hasCards)?"":"empty"

  const [classOnDragOver, setClassOnDragOver] = useState("")
  // let classOnDragOver = ""

  function handleDrop (e: React.DragEvent) {
    setClassOnDragOver("")
    let originWhere = e.dataTransfer.getData("originWhere")
    let originPileIndex = e.dataTransfer.getData("originPileIndex")
    let cardIndex = e.dataTransfer.getData("cardIndex")
    let quantityOfCards = e.dataTransfer.getData("quantityOfCards")
    setTimeout(()=>callbackOnDrop(originWhere, originPileIndex, cardIndex, quantityOfCards, pileIndex), 1)
  }
  
  function handleDragOverStart (e: React.DragEvent) {
    if ( e.dataTransfer.getData("originWhere")===where && e.dataTransfer.getData("originPileIndex")===`${pileIndex}` ) return
    setClassOnDragOver("on-drag-over")
  }
  
  function handleDragOver (e: React.DragEvent) {
    e.stopPropagation()
    e.preventDefault()
    if ( e.dataTransfer.getData("originWhere")===where && e.dataTransfer.getData("originPileIndex")===`${pileIndex}` ) return
    setClassOnDragOver("on-drag-over")
  }
  
  function handleDragOverEnd (e: React.DragEvent) {
    setClassOnDragOver("")
  }


  return (
    <div
      id={idName}
      className={`pile-slot ${where} ${classEmpty} ${classOnDragOver}`}
      onDrop={handleDrop}
      onDragEnter={handleDragOverStart}
      onDragOver={handleDragOver}
      onDragLeave={handleDragOverEnd}
    >

      { pileToRender
        ?<ShowGroupedCards where={where} pileIndex={pileIndex} firsCardIndex={0} group={pileToRender} stacked={stacked} riseCardWithDoubleClick={riseCardWithDoubleClick} />
        :<div className="card-slot-empty dragging-over-glow" />
      }

    </div>
  );
}





