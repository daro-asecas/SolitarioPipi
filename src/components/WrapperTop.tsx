import { useContext } from 'react'
import { MatchContext } from '../App'

import { rules } from '../models/rules'
import ShowPile from './ShowPile'
import ShowDeck from './ShowDeck'
import ShowExtraCards from './ShowExtraCards'

export default function WrapperTop ({ moveSubPile, riseCardWithDoubleClick, dealFunction }:
                        {moveSubPile:Function, riseCardWithDoubleClick:Function, dealFunction:Function}) {
  const match = useContext(MatchContext)

  return (
    <div className="wrapper" id="wrapper-top">

      {match.suitStacks.map((pile, i) => {
        return (
        <ShowPile key={i} where={'top'} pileIndex={i} pile={pile} stacked={true} moveSubPile={moveSubPile} riseCardWithDoubleClick={() => {}} />
        )
      })}

      { match.deck.numberOfCards > rules.NUMBER_OF_CARDS_PER_ROUND
        ? <>
          <div className="card-slot-placeholder" />
          <ShowDeck deck={match.deck} dealFunction={dealFunction} />
        </>

        : <ShowExtraCards deck={match.deck} moveSubPile={moveSubPile} riseCardWithDoubleClick={riseCardWithDoubleClick} />
      }

    </div>
  )
}
