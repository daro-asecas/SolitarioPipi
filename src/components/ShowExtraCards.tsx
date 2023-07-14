import { Deck } from "../models/deck";
import { rules } from "../models/rules";
import ShowCard from "./ShowCard";

import { useState } from "react";



export default function ShowExtraCards( {deck, riseCardWithDoubleClick}:{deck:Deck, riseCardWithDoubleClick:Function } ) {
  console.log(deck)
  console.log(deck.hasCards)
  const [classOnDrag,setClassOnDrag] = useState("")

  function handleDragging (e: React.DragEvent<HTMLDivElement>, index:number) {
    e.stopPropagation()
    // e.preventDefault()

    if (!classOnDrag) {setClassOnDrag("on-drag")}

    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.dropEffect = "link";
    e.dataTransfer.setData("originWhere", "deck")
    e.dataTransfer.setData("originPileIndex", "1")
    e.dataTransfer.setData("cardIndex",`${index}`)
    e.dataTransfer.setData("quantityOfCards", "1")
  }

  function handleDragEnd (e: React.DragEvent<HTMLDivElement>) {
    if (classOnDrag!="") {setClassOnDrag("")}
  }

  return (
    <div id="extra-cards-wrapper">

      { deck.hasCards

        ? deck.cards.map((card, index)=> { return (

          <div key={index} draggable="true" className={`card-extra draggable ${deck.numberOfCards-1===index?"full-size":""}`} onDragStart={(e)=>handleDragging(e, index)} onDragEnd={(e)=>handleDragEnd(e)} >
            <ShowCard card={card} draggable risable riseCardWithDoubleClick={()=>riseCardWithDoubleClick("deck", 0, index)} />
          </div>
        )})

        :
          <></>

      }

    </div>
  );
}