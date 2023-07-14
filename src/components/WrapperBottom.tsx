import { Deck } from "../models/deck";
import ShowPile from "./ShowPile"

export default function WrapperBottom({pilesBottom,suitStacks,moveSubPile,riseCardWithDoubleClick}:
                                      {pilesBottom:Array<Deck>,suitStacks:Array<Deck>,moveSubPile:Function,riseCardWithDoubleClick:Function}) {
  return (
    <div className="wrapper" id="wrapper-bottom">

      {pilesBottom.map((pile, i) => {
        
        return (
          <ShowPile key={i} where={"bottom"} pileIndex={i} pile={pile} stacked={false} suitStacks={suitStacks} callbackOnDrop={moveSubPile} riseCardWithDoubleClick={riseCardWithDoubleClick} />
      )})}

    </div>
  );
}