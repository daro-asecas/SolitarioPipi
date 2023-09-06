import { useContext, useState } from 'react'
import { MatchContext } from '../App'
// import { UseDraggingData } from './PointerPositionContext';
import { UsePilesPosition } from './PilesPositionContext'
import { Deck } from '../models/deck'
import { rules } from '../models/rules'
import ShowCard from './ShowCard'

export default function ShowGroupedCards(
  // prettier-ignore
  {where, pileIndex, firsCardIndex, group, stacked, moveSubPile, riseCardWithDoubleClick}:
  // prettier-ignore
  {where:string, pileIndex:number, firsCardIndex:number, group:Deck, stacked:boolean, moveSubPile:Function, riseCardWithDoubleClick:Function},
) {
  const match = useContext(MatchContext)
  // const pointerPosition = UseDraggingData()
  const pilesPosition = UsePilesPosition()

  const groupToRender =
    group.numberOfCards > 2 && stacked
      ? new Deck([group.cards[group.numberOfCards - 2], group.lastCard])
      : group

  const nextGroup = new Deck([...groupToRender.cards])
  const cardToRender = nextGroup.pop()

  const draggable = groupToRender ? rules.isDraggable(groupToRender) : false
  // const risable = cardToRender ? rules.isRisable(cardToRender, match.suitStacks) : false

  const classStacked = stacked ? 'stacked' : ''
  const [classOnDrag, setClassOnDrag] = useState('')
  const [draggingX, setDraggingX] = useState('0')
  const [draggingY, setDraggingY] = useState('0')

  let startingX = 0
  let startingY = 0

  const calculateClosestPile = (X: number, Y: number) => {
    const where = Y > pilesPosition.verticalLimit ? 'bottom' : 'top'
    const pileDistancesToClic = pilesPosition[where].map(pileX => (pileX - X) ** 2)
    const minDistance = Math.min(...pileDistancesToClic)
    const pileIndex = pileDistancesToClic.indexOf(minDistance)
    return { where, pileIndex }
  }

  const handleDragging = (e: React.PointerEvent<HTMLDivElement>) => {
    e.stopPropagation()
    // e.preventDefault()
    if (!draggable) return
    if (!classOnDrag) {
      setClassOnDrag('on-drag')
    }

    startingX = e.pageX
    startingY = e.pageY
    handleCardMove(e)

    window.addEventListener('mousemove', handleCardMove)
  }

  const handleCardMove = (e: MouseEvent | React.PointerEvent<HTMLDivElement>) => {
    setDraggingX(`${e.pageX - startingX}`)
    setDraggingY(`${e.pageY - startingY}`)
  }

  function handleDragEnd(e: React.PointerEvent<HTMLDivElement>) {
    if (!draggable) return
    window.removeEventListener('mousemove', handleCardMove)
    setClassOnDrag('')
    setDraggingX('0')
    setDraggingY('0')

    const destin = calculateClosestPile(e.pageX, e.pageY)
    if (destin.where === where && destin.pileIndex === pileIndex) return

    moveSubPile(
      where,
      pileIndex,
      firsCardIndex,
      group.numberOfCards,
      destin.where,
      destin.pileIndex,
    )

    // const DraggingData = {
    //   isDraggingActive: true,
    //   dropPositionX:    0,
    //   dropPositionY:    0,
    //   currentPositionX: 0,
    //   currentPositionY: 0,
    //   originWhere:      where,
    //   originPileIndex:  pileIndex,
    //   cardIndex:        firsCardIndex,
    //   quantityOfCards:  0,
    //   destinPileIndex:  0
    // }
  }

  return (
    <>
      {groupToRender && cardToRender ? (
        <div
          className={`card-group ${classStacked} ${classOnDrag}`}
          style={
            {
              '--dragging-X': `${draggingX}`,
              '--dragging-Y': `${draggingY}`,
            } as React.CSSProperties
          }
          onPointerDown={e => handleDragging(e)}
          onPointerUp={e => handleDragEnd(e)}
        >
          <ShowCard
            card={cardToRender}
            draggable={draggable}
            riseCardWithDoubleClick={() => riseCardWithDoubleClick(where, pileIndex, firsCardIndex)}
          />

          {nextGroup.hasCards ? (
            <ShowGroupedCards
              where={where}
              pileIndex={pileIndex}
              firsCardIndex={firsCardIndex + 1}
              group={nextGroup}
              stacked={stacked}
              moveSubPile={moveSubPile}
              riseCardWithDoubleClick={riseCardWithDoubleClick}
            />
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
