import { useContext, useState, useRef } from 'react'
import { MatchContext } from '../App'
import { $pointerPosition } from './hooks/storePointerPosition'
import { updateDraggingData, resetDraggingData, $draggingData } from './hooks/storeDraggingData'
import { Deck } from '../models/deck'
import { rules } from '../models/rules'
import ShowCard from './ShowCard'

export default function ShowGroupedCards(
  // prettier-ignore
  {where, pileIndex, firstCardIndex, group, stacked, moveSubPile, riseCardWithDoubleClick}:
  {where:"top"|"bottom"|"deck", pileIndex:number, firstCardIndex:number, group:Deck, stacked:boolean, moveSubPile:Function, riseCardWithDoubleClick:Function},
) {
  const match = useContext(MatchContext)

  const groupToRender =
    group.numberOfCards > 2 && stacked
      ? new Deck([group.cards[group.numberOfCards - 2], group.lastCard])
      : group

  const nextGroup = new Deck([...groupToRender.cards])
  const cardToRender = nextGroup.pop()

  const draggable = groupToRender ? rules.isDraggable(groupToRender) : false
  // const risable = cardToRender ? rules.isRisable(cardToRender, match.suitStacks) : false

  const classStacked = stacked ? ' stacked' : ''
  const classFirst = firstCardIndex === 0 ? ' first' : ''
  const [isBeingDragged, setIsBeingDragged] = useState(false);
  const classOnDrag = isBeingDragged ? " on-drag" : "";

  const clicked = useRef(false)
  const lastClickTimestamp = useRef(0)
  const startingX = useRef(0)
  const startingY = useRef(0)
  const [draggingX, setDraggingX] = useState(0)
  const [draggingY, setDraggingY] = useState(0)
  let unsuscribePointerPosition: (() => void) | null = null;

  const handleDoubleClick = () => {
    riseCardWithDoubleClick(where, pileIndex, firstCardIndex)
  }

  const handleDragStart = (e: React.PointerEvent) => {
    e.stopPropagation()

    if (Date.now() - lastClickTimestamp.current < 500) {
      handleDoubleClick()
      return
    } else {
      lastClickTimestamp.current = Date.now()
    }

    if (!draggable) return
    
    if ($draggingData.get().isDraggingActive) return

    updateDraggingData({
      isDraggingActive: true,
      originWhere: where,
      originPileIndex: pileIndex,
      cardIndex: firstCardIndex,
      quantityOfCards: group.numberOfCards,
      // currentPositionX: 0,
      // currentPositionY: 0,
      // destinPileIndex: -1,
      // dropPositionX: 0,
      // dropPositionY: 0,
    })

    clicked.current = true
    setIsBeingDragged(true)

    const { x: x0, y: y0 } = $pointerPosition.get()
    startingX.current = x0
    startingY.current = y0

    
    handleDragMove($pointerPosition.get());
    unsuscribePointerPosition = $pointerPosition.subscribe(handleDragMove)
    document.addEventListener("pointerup", handleDragEnd)
    document.addEventListener("pointercancel", handleDragEnd)
  }

  const handleDragMove = ({ x, y }: { x: number, y: number }) => {
    if (!clicked.current) return
    setDraggingX(x - startingX.current)
    setDraggingY(y - startingY.current)
  }

  function handleDragEnd() {
    unsuscribePointerPosition?.()
    document.removeEventListener("pointerup", handleDragEnd);
    document.removeEventListener("pointercancel", handleDragEnd);
    clicked.current = false
    setIsBeingDragged(false)
    setDraggingX(0)
    setDraggingY(0)
    resetDraggingData()

    // const destin = calculateClosestPile($pointerPosition.get().x, $pointerPosition.get().y)
    // // const destin = calculateClosestPile(e.pageX, e.pageY)
    // if (destin.where === where && destin.pileIndex === pileIndex) return

    // moveSubPile(
    //   where,
    //   pileIndex,
    //   firstCardIndex,
    //   group.numberOfCards,
    //   destin.where,
    //   destin.pileIndex,
    // )

  }


  return (
    <>
      {groupToRender && cardToRender ? (
        <div
          className={`card-group${classFirst}${classStacked}${classOnDrag}`}
          style={
            {
              '--dragging-X': `${draggingX}`,
              '--dragging-Y': `${draggingY}`,
            } as React.CSSProperties
          }
          onPointerDown={handleDragStart}
          // onPointerMove={handleDragMove}
          // onPointerUp={handleDragEnd}
          // onPointerCancel={handleDragEnd}
          // onPointerLeave={handleDragEnd}
        >
          {
            // prettier-ignore
            <ShowCard card={cardToRender} draggable={draggable} riseCardWithDoubleClick={() => riseCardWithDoubleClick(where, pileIndex, firstCardIndex)} />
          }

          {nextGroup.hasCards ? (
            // prettier-ignore
            <ShowGroupedCards where={where} pileIndex={pileIndex} firstCardIndex={firstCardIndex + 1} group={nextGroup} stacked={stacked} moveSubPile={moveSubPile} riseCardWithDoubleClick={riseCardWithDoubleClick} />
          ) : (
            <div className="dragging-over-glow" />
          )}
        </div>
      ) : (
        <></>
      )}
    </>
  )
}
