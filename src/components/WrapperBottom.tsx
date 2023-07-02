import { Deck, Card } from "../models/deck";
import {ShowPile} from "./ShowPile"

export function WrapperBottom({pilesBottom}:{pilesBottom:Array<Deck>}) {
  const NUMBER_OF_SLOTS = 10

  return (
    <div className="wrapper" id="wrapper-bottom">

      {[...Array(NUMBER_OF_SLOTS)].map((e, i) => { return (
        <ShowPile deck={new Deck()} pileNumber={i} />
      )})}

    </div>
  );
}