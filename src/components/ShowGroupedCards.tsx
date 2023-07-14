import { Deck } from "../models/deck";
import { rules } from "../models/rules";
import ShowCard from "./ShowCard";

import { useState } from "react";



export default function ShowGroupedCards( {where, pileIndex, firsCardIndex, group, stacked, suitStacks, riseCardWithDoubleClick}:
                                        {where:string, pileIndex:number, firsCardIndex:number, group:Deck, stacked:boolean, suitStacks:Deck[], riseCardWithDoubleClick:Function } ) {
  const groupToRender = (group.numberOfCards>2&&stacked)?new Deck([group.cards[group.numberOfCards-2],group.lastCard]):group

  const nextGroup = new Deck([...groupToRender.cards])
  const cardToRender = nextGroup.pop()
  
  const draggable = groupToRender?rules.isDraggable(groupToRender):false
  const risable = cardToRender?rules.isRisable(cardToRender, suitStacks):false

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
              ? <ShowGroupedCards where={where} pileIndex={pileIndex} firsCardIndex={firsCardIndex+1} group={nextGroup} stacked={stacked} suitStacks={suitStacks} riseCardWithDoubleClick={riseCardWithDoubleClick} />
              : <div className="dragging-over-glow" />
            }

          </div>

        :
          <></>

      }

    </>
  );
}