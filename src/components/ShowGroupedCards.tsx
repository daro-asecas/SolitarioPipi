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
  {where:string, pileIndex:number, firsCardIndex:number, group:Deck, stacked:boolean, moveSubPile:Function, riseCardWithDoubleClick:Function},
) {
  const match = useContext(MatchContext)
  // const pointerPosition = UseDraggingData()
  const pilesPosition = UsePilesPosition()

  let lastClickTimestamp = Date.now()

  const groupToRender =
    group.numberOfCards > 2 && stacked
      ? new Deck([group.cards[group.numberOfCards - 2], group.lastCard])
      : group

  const nextGroup = new Deck([...groupToRender.cards])
  const cardToRender = nextGroup.pop()

  const draggable = groupToRender ? rules.isDraggable(groupToRender) : false
  // const risable = cardToRender ? rules.isRisable(cardToRender, match.suitStacks) : false

  const classStacked = stacked ? ' stacked' : ''
  const classFirst = firsCardIndex === 0 ? ' first' : ''
  const [classOnDrag, setClassOnDrag] = useState('')
  const [draggingX, setDraggingX] = useState('0')
  const [draggingY, setDraggingY] = useState('0')
  const [clicked, setClicked] = useState(false)
  const [startingX, setStartingX] = useState(0)
  const [startingY, setStartingY] = useState(0)

  // let clicked = false
  // let startingX = 0
  // let startingY = 0

  const calculateClosestPile = (X: number, Y: number) => {
    const where = Y > pilesPosition.verticalLimit ? 'bottom' : 'top'
    const pileDistancesToClic = pilesPosition[where].map(pileX => (pileX - X) ** 2)
    const minDistance = Math.min(...pileDistancesToClic)
    const pileIndex = pileDistancesToClic.indexOf(minDistance)
    return { where, pileIndex }
  }

  const handleDoubleClick = () => {
    riseCardWithDoubleClick(where, pileIndex, firsCardIndex)
  }

  const handleDragStart = (e: React.PointerEvent<HTMLDivElement>) => {
    e.stopPropagation()
    e.preventDefault()

    if (Date.now() - lastClickTimestamp < 500) {
      handleDoubleClick()
      return
    } else {
      lastClickTimestamp = Date.now()
    }

    setClicked(true)

    if (!draggable) return
    if (!classOnDrag) {
      setClassOnDrag(' on-drag')
    }

    setStartingX(e.pageX)
    setStartingY(e.pageY)
    // handleDragMove(e)

    window.addEventListener('pointermove', handleDragMove)
  }

  const handleDragMove = (e: React.PointerEvent<HTMLDivElement> | PointerEvent) => {
    if (!clicked) return
    e.preventDefault()
    e.stopPropagation()
    // if (!clicked) return

    // const X = ('pageX' in e)? e.pageX : e.changedTouches[0].pageX
    // const Y = ('pageY' in e)? e.pageX : e.changedTouches[0].pageY

    setDraggingX(`${e.pageX - startingX}`)
    setDraggingY(`${e.pageY - startingY}`)
  }

  function handleDragEnd(e: React.PointerEvent<HTMLDivElement>) {
    e.preventDefault()
    e.stopPropagation()

    setClicked(false)

    window.removeEventListener('pointermove', handleDragMove)
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
          className={`card-group${classFirst}${classStacked}${classOnDrag}`}
          style={
            {
              '--dragging-X': `${draggingX}`,
              '--dragging-Y': `${draggingY}`,
            } as React.CSSProperties
          }
          onPointerDown={e => handleDragStart(e)}
          onPointerMove={e => handleDragMove(e)}
          onPointerUp={e => handleDragEnd(e)}
          onPointerCancel={e => handleDragEnd(e)}
          // onPointerLeave={e => handleDragEnd(e)}
        >
          {
            // prettier-ignore
            <ShowCard card={cardToRender} draggable={draggable} riseCardWithDoubleClick={() => riseCardWithDoubleClick(where, pileIndex, firsCardIndex)} />
          }

          {nextGroup.hasCards ? (
            // prettier-ignore
            <ShowGroupedCards where={where} pileIndex={pileIndex} firsCardIndex={firsCardIndex + 1} group={nextGroup} stacked={stacked} moveSubPile={moveSubPile} riseCardWithDoubleClick={riseCardWithDoubleClick} />
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
