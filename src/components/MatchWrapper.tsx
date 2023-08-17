import { useContext } from 'react';
import { MatchContext } from '../App';

import WrapperTop from "./WrapperTop"
import WrapperBottom from "./WrapperBottom"


export default function MatchWrapper( {riseCard,moveSubPile,riseCardWithDoubleClick,startGame,deal}:
                        {riseCard:Function,moveSubPile:Function,riseCardWithDoubleClick:Function,startGame:Function,deal:Function} ) {

  const match = useContext(MatchContext)

  return (
    <div id="wrapper-match">
      <WrapperTop dealFunction={deal} riseCard={riseCard} riseCardWithDoubleClick={riseCardWithDoubleClick} />
      <WrapperBottom moveSubPile={moveSubPile} riseCardWithDoubleClick={riseCardWithDoubleClick} />
    </div>
  );
}