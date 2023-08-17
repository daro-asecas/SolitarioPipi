import { useContext, useState } from 'react';
import { MatchContext } from '../App';

import { Deck } from "../models/deck";
import { rules } from "../models/rules";
import ShowCard from "./ShowCard";



export default function ShowGroupedCards( {where, pileIndex, firsCardIndex, group, stacked, riseCardWithDoubleClick}:
                          {where:string, pileIndex:number, firsCardIndex:number, group:Deck, stacked:boolean, riseCardWithDoubleClick:Function } ) {

  const match = useContext(MatchContext)

  const groupToRender = (group.numberOfCards>2&&stacked)?new Deck([group.cards[group.numberOfCards-2],group.lastCard]):group

  const nextGroup = new Deck([...groupToRender.cards])
  const cardToRender = nextGroup.pop()
  
  const draggable = groupToRender?rules.isDraggable(groupToRender):false
  const risable = cardToRender?rules.isRisable(cardToRender, match.suitStacks):false

  const classStacked = stacked?"stacked":""
  const [classOnDrag,setClassOnDrag] = useState("")

  function handleDragging (e: React.DragEvent<HTMLDivElement>) {
    e.stopPropagation()
    // e.preventDefault()

    if (!classOnDrag) {setClassOnDrag("on-drag")}

    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.dropEffect = "link";
    e.dataTransfer.setData("originWhere", where)
    e.dataTransfer.setData("originPileIndex",`${pileIndex}`)
    e.dataTransfer.setData("cardIndex",`${firsCardIndex}`)
    e.dataTransfer.setData("quantityOfCards",`${group.numberOfCards}`)
  }

  function handleDragEnd (e: React.DragEvent<HTMLDivElement>) {
    if (classOnDrag!=="") {setClassOnDrag("")}
  }

  return (
    <>

      { groupToRender && cardToRender

        ?
        <div draggable={draggable} className={`card-group ${classStacked} ${classOnDrag}`} onDragStart={(e)=>handleDragging(e)} onDragEnd={(e)=>handleDragEnd(e)} >
            <ShowCard
              card = {cardToRender}
              draggable = {draggable}
              risable = {risable}
              riseCardWithDoubleClick={()=>riseCardWithDoubleClick(where, pileIndex, firsCardIndex)}
            />

            { nextGroup.hasCards
              ? <ShowGroupedCards where={where} pileIndex={pileIndex} firsCardIndex={firsCardIndex+1} group={nextGroup} stacked={stacked} riseCardWithDoubleClick={riseCardWithDoubleClick} />
              : <div className="dragging-over-glow" />
            }

          </div>

        :
          <></>

      }

    </>
  );
}