import { Deck } from "../models/deck";
import DealButton from "./DealButton";

export default function ShowDeck( {deck,dealFunction}:{deck:Deck,dealFunction:Function} ) {

  if (deck.hasCards) {
    return (
      <div className={`card-back`}>
        <DealButton text={"Deal!"} callback={dealFunction} />
      </div>
    );
  } else {
    return (
      <div className={`card-slot`} />
    );
  }
}
