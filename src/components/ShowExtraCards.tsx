import { Deck } from '../models/deck'
import ShowGroupedCards from './ShowGroupedCards'

export default function ShowExtraCards(
  // prettier-ignore
  {deck,moveSubPile,riseCardWithDoubleClick}:
  {deck: Deck, moveSubPile: Function, riseCardWithDoubleClick: Function},
) {
  return (
    <div id="extra-cards-wrapper">
      {deck.hasCards ? (
        deck.cards.map((card, index) => {
          return (
            // prettier-ignore
            <div key={index} className={`card-extra ${deck.numberOfCards-1===index?'full-size':''}`} >
              <ShowGroupedCards
                where='deck'
                pileIndex={0}
                firstCardIndex={index}
                group={new Deck([card])}
                stacked={false}
                moveSubPile={moveSubPile}
                riseCardWithDoubleClick={riseCardWithDoubleClick}
              />

              {/* <ShowCard card={card} riseCardWithDoubleClick={()=>riseCardWithDoubleClick("deck", 0, index)} /> */}
            </div>
          )
        })
      ) : (
        <></>
      )}
    </div>
  )
}
