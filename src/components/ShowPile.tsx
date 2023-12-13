import { useState, useContext, useRef, useEffect } from 'react'
import { MatchContext } from '../App'
import { updatePilesPosition } from './hooks/storePilesPosition'
import { $draggingData } from './hooks/storeDraggingData'
import { Deck } from '../models/deck'
import ShowGroupedCards from './ShowGroupedCards'

export default function ShowPile(
  // prettier-ignore
  {where, pileIndex, pile, stacked, moveSubPile, riseCardWithDoubleClick}:
  {where:"top" | "bottom" | "deck", pileIndex:number, pile:Deck, stacked:boolean, moveSubPile:Function, riseCardWithDoubleClick:Function},
) {
  const match = useContext(MatchContext)
  const pileElement = useRef<HTMLDivElement>(null)

  const pileToRender =
    pile.numberOfCards > 2 && stacked
      ? new Deck([pile.cards[pile.numberOfCards - 2], pile.lastCard])
      : pile
  const idName = `${where}-pile-slot-${pileIndex}`
  const classEmpty = pile.hasCards ? '' : ' empty'

  const [isBeingDraggedOver, setIsBeingDraggedOver] = useState(false);
  const classOnDragOver = isBeingDraggedOver ? " on-drag-over" : "";

  const getPosition = () => {
    const centerX =
      (pileElement.current?.offsetLeft || 0) + (pileElement.current?.offsetWidth || 0) / 2
    const positionY = pileElement.current?.offsetTop || 0

    updatePilesPosition(where, pileIndex, centerX, positionY)
  }

  // useEffect(() => {
  //   window.addEventListener('resize', getPosition)
  //   getPosition()
  //   return () => window.removeEventListener('resize', getPosition)
  // }, [])

  // HANDLES FOR DRAGOVER & DROP
  function handleDrop (e: React.PointerEvent) {

    const {isDraggingActive,originWhere,originPileIndex,cardIndex,quantityOfCards} = $draggingData.get()
    setIsBeingDraggedOver(false)
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
    e.stopPropagation()
    e.preventDefault()
    const {isDraggingActive,originWhere,originPileIndex,cardIndex,quantityOfCards} = $draggingData.get()
    if (!isDraggingActive) return
    if ( originWhere===where && originPileIndex===pileIndex ) return

    setIsBeingDraggedOver(true)
  }

  function handleDragOver (e: React.PointerEvent) {
    e.stopPropagation()
    e.preventDefault()
    const {isDraggingActive,originWhere,originPileIndex,cardIndex,quantityOfCards} = $draggingData.get()

    if ( originWhere===where && originPileIndex===pileIndex ) return
    setIsBeingDraggedOver(true)
  }

  function handleDragOverEnd (e: React.PointerEvent) {
    setIsBeingDraggedOver(false)
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
