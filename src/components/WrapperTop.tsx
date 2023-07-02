import { Deck, Card } from "../models/deck";
import {ShowCard} from "./ShowCard"

export function WrapperTop( {pilesTop}:{pilesTop:Array<Deck>} ) {
  const NUMBER_OF_SLOTS = 8

  return (
    <div className="wrapper" id="wrapper-top">

      {pilesTop.map((pile, i) => {
        const card = pile.cards.length?pile.cards[0]:new Card("0","0")
        return (
          <div className="suit-slot" id={`suit-slot-${i}`} >
            <ShowCard card={card} />
          </div>
      )})}

      <div className="card-slot-empty" />

      <ShowCard card={new Card("♥","Q",true)} />

    </div>
  );
}