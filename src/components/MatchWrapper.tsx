// import { Deck, Card } from '../models/deck';
import Match from '../models/match';
import WrapperTop from "./WrapperTop"
import WrapperBottom from "./WrapperBottom"


export default function MatchWrapper( {match,riseCard,moveSubPile,riseCardWithDoubleClick,startGame,deal}:
                        {match:Match,riseCard:Function,moveSubPile:Function,riseCardWithDoubleClick:Function,startGame:Function,deal:Function} ) {
  return (
    <div>
      <WrapperTop suitStacks={match.suitStacks} deck={match.deck} dealFunction={deal} riseCard={riseCard} riseCardWithDoubleClick={riseCardWithDoubleClick} />
      <WrapperBottom pilesBottom={match.pilesBottom} suitStacks={match.suitStacks} moveSubPile={moveSubPile} riseCardWithDoubleClick={riseCardWithDoubleClick} />
    </div>
  );
}