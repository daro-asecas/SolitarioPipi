import { useContext } from 'react';
import { MatchContext } from '../App';

import WrapperTop from "./WrapperTop"
import WrapperBottom from "./WrapperBottom"


export default function MatchWrapper( {moveSubPile,riseCardWithDoubleClick,startGame,deal}:
                        {moveSubPile:Function,riseCardWithDoubleClick:Function,startGame:Function,deal:Function} ) {

  const match = useContext(MatchContext)

  return (
    <div id="wrapper-match">
      <WrapperTop dealFunction={deal} moveSubPile={moveSubPile} riseCardWithDoubleClick={riseCardWithDoubleClick} />
      <WrapperBottom moveSubPile={moveSubPile} riseCardWithDoubleClick={riseCardWithDoubleClick} />
    </div>
  );
}