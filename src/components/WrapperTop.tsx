import { Deck } from "../models/deck";
import { rules } from "../models/rules";
import ShowPile from "./ShowPile"
import ShowDeck from "./ShowDeck"
import ShowExtraCards from "./ShowExtraCards"

export default function WrapperTop( {suitStacks,deck,riseCard,riseCardWithDoubleClick,dealFunction}:{suitStacks:Array<Deck>,deck:Deck,riseCard:Function,riseCardWithDoubleClick:Function,dealFunction:Function} ) {
  return (
    <div className="wrapper" id="wrapper-top">

      {suitStacks.map((pile, i) => { return (
        <ShowPile key={i} where={"top"} pileIndex={i} pile={pile} stacked={true} suitStacks={suitStacks} callbackOnDrop={riseCard} riseCardWithDoubleClick={()=>{return}} />
      )})}

      { deck.numberOfCards > rules.NUMBER_OF_CARDS_PER_ROUND
        ?
        <>
          <div className="card-slot-placeholder" />
          <ShowDeck deck={deck} dealFunction={dealFunction} />
        </>

        :
          <ShowExtraCards deck={deck} riseCardWithDoubleClick={riseCardWithDoubleClick} />
      }


    </div>
  );
}