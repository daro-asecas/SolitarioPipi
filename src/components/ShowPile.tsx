import { useState, useContext, useRef, useEffect } from 'react'
import { MatchContext } from '../App'
import { Deck } from '../models/deck'
import ShowGroupedCards from './ShowGroupedCards'
import { UsePilesPositionUpdate } from './PilesPositionContext'

export default function ShowPile(
  // prettier-ignore
  {where, pileIndex, pile, stacked, moveSubPile, riseCardWithDoubleClick}:
  // prettier-ignore
  {where:string, pileIndex:number, pile:Deck, stacked:boolean, moveSubPile:Function, riseCardWithDoubleClick:Function},
) {
  const match = useContext(MatchContext)
  const updatePosition = UsePilesPositionUpdate()
  const pileElement = useRef<HTMLDivElement>(null)

  const pileToRender =
    pile.numberOfCards > 2 && stacked
      ? new Deck([pile.cards[pile.numberOfCards - 2], pile.lastCard])
      : pile
  const idName = `${where}-pile-slot-${pileIndex}`
  const classEmpty = pile.hasCards ? '' : ' empty'

  const [classOnDragOver, setClassOnDragOver] = useState('')

  const getPosition = () => {
    const centerX =
      (pileElement.current?.offsetLeft || 0) + (pileElement.current?.offsetWidth || 0) / 2
    const positionY = pileElement.current?.offsetTop || 0

    updatePosition(where, pileIndex, centerX, positionY)
  }

  useEffect(() => {
    window.addEventListener('resize', getPosition)
    getPosition()
    return () => window.removeEventListener('resize', getPosition)
  }, [])

  /* HANDLES FOR DRAGOVER & DROP
  // function handleDrop (e: React.DragEvent) {
  //   setClassOnDragOver("")

  //   let originWhere = e.dataTransfer.getData("originWhere")
  //   let originPileIndex = e.dataTransfer.getData("originPileIndex")
  //   let cardIndex = e.dataTransfer.getData("cardIndex")
  //   let quantityOfCards = e.dataTransfer.getData("quantityOfCards")
  //   setTimeout(()=>callbackOnDrop(originWhere, originPileIndex, cardIndex, quantityOfCards, pileIndex), 1)
  // }

  // function handleDragOverStart (e: React.DragEvent) {
  //   if ( e.dataTransfer.getData("originWhere")===where && e.dataTransfer.getData("originPileIndex")===`${pileIndex}` ) return
  //   setClassOnDragOver(" on-drag-over")
  // }

  // function handleDragOver (e: React.DragEvent) {
  //   e.stopPropagation()
  //   e.preventDefault()
  //   if ( e.dataTransfer.getData("originWhere")===where && e.dataTransfer.getData("originPileIndex")===`${pileIndex}` ) return
  //   setClassOnDragOver(" on-drag-over")
  // }

  // function handleDragOverEnd (e: React.DragEvent) {
  //   setClassOnDragOver("")
  // } */

  return (
    // prettier-ignore
    <div id={idName} className={`pile-slot ${where}${classEmpty}${classOnDragOver}`} ref={pileElement} >
      { pileToRender
        ? <ShowGroupedCards where={where} pileIndex={pileIndex} firsCardIndex={0} group={pileToRender} stacked={stacked} moveSubPile={moveSubPile} riseCardWithDoubleClick={riseCardWithDoubleClick} />
        : <div className="card-slot-empty dragging-over-glow" />
      }

    </div>
  )
}
