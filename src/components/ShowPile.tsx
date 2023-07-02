import { Deck, Card } from "../models/deck";
import { ShowCard } from "./ShowCard";


export function ShowPile( {deck, pileNumber}:{deck:Deck, pileNumber:number} ) {
  return (
    <div className="pile-slot" id={`pile-slot-${pileNumber}`}>

      {deck.cards.map((e, i) => { return (
        <div className={`card-slot${i+1===deck.cards.length?"":" semi-hidden"}`}>
          <ShowCard card={e} />
        </div>
      )})}

    </div>
  );
}