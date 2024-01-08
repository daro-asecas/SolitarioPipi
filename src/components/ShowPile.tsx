import { useState, useContext, useRef, useEffect } from 'react'
import { rules } from '../models/rules'
import { MatchContext } from '../App'
import { $draggingData } from './hooks/storeDraggingData'
import { Card, Deck } from '../models/deck'
import ShowGroupedCards from './ShowGroupedCards'

export default function ShowPile(
  // prettier-ignore
  {where, pileIndex, pile, stacked, moveSubPile, riseCardWithDoubleClick}:
  {where:"top" | "bottom" | "deck", pileIndex:number, pile:Deck, stacked:boolean, moveSubPile:Function, riseCardWithDoubleClick:Function},
) {
  const match = useContext(MatchContext)
  const pileElement = useRef<HTMLDivElement>(null)

  const pileToRender = pile
  // const pileToRender =
  //   pile.numberOfCards > 2 && stacked
  //     ? new Deck([pile.cards[pile.numberOfCards - 2], pile.lastCard])
  //     : pile

  const idName = `${where}-pile-slot-${pileIndex}`
  const classEmpty = pile.hasCards ? '' : ' empty'

  const [isBeingDraggedOver, setIsBeingDraggedOver] = useState("");
  const classOnDragOver = isBeingDraggedOver ? ` on-drag-over drop-${isBeingDraggedOver}` : "";


  // HANDLES FOR DRAGOVER & DROP
  function handleDrop (e: React.PointerEvent) {

    const {isDraggingActive,originWhere,originPileIndex,cardIndex,quantityOfCards} = $draggingData.get()
    setIsBeingDraggedOver("")
    if (!isDraggingActive) return

    // let originPileIndex = $draggingData.originPileIndex
    // let cardIndex = e.dataTransfer.getData("cardIndex")
    // let quantityOfCards = e.dataTransfer.getData("quantityOfCards")
    // setTimeout(()=>callbackOnDrop(originWhere, originPileIndex, cardIndex, quantityOfCards, pileIndex), 1)
    moveSubPile(
      originWhere,
      originPileIndex,
      cardIndex,
      quantityOfCards,
      where,
      pileIndex,
    )
  }

  function handleDragOverStart (e: React.PointerEvent) {
    handleDragOver(e) // por si se requieren hacer cosas distintas, por el momento ambas son iguales.
  }
  
  function handleDragOver (e: React.PointerEvent) {
    e.stopPropagation()
    e.preventDefault()
    const {isDraggingActive,originWhere,originPileIndex,cardIndex,quantityOfCards} = $draggingData.get()

    if (!originWhere) return
    if (!isDraggingActive) return
    if ( originWhere===where && originPileIndex===pileIndex ) return
    
    const draggedGroupBaseCard = match.piles[originWhere][originPileIndex].cards[cardIndex]

    if (
      where==="top" && quantityOfCards===1 && rules.isRisableAonB(draggedGroupBaseCard, pile.lastCard) ||
      where==="bottom" && rules.isDropableAonB(draggedGroupBaseCard, pile.lastCard)
    ) {
      setIsBeingDraggedOver("allowed")
    } else {
      setIsBeingDraggedOver("disabled")
    }

  }

  function handleDragOverEnd (e: React.PointerEvent) {
    setIsBeingDraggedOver("")
  }

  return (
    // prettier-ignore
    <div id={idName} className={`pile-slot ${where}${classEmpty}${classOnDragOver}`} ref={pileElement}
      onPointerEnter={handleDragOverStart}
      onPointerLeave={handleDragOverEnd}
      onPointerUp={handleDrop}
    >
      { pileToRender
        ? <ShowGroupedCards where={where} pileIndex={pileIndex} firstCardIndex={0} group={pileToRender} stacked={stacked} moveSubPile={moveSubPile} riseCardWithDoubleClick={riseCardWithDoubleClick} />
        : <div className="card-slot-empty dragging-over-glow" />
      }

    </div>
  )
}
