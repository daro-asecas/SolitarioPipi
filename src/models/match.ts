import { Deck } from './deck'
import { rules } from './rules'

function startingDeck() {
  const deck = new Deck()
  for (let i = 1; i < rules.NUMBER_OF_DECKS_USED; i++) {
    deck.join(new Deck())
  }
  return deck.shuffle()
}

function emptyPilesArray(number: number) {
  return Array(number)
    .fill(undefined)
    .map(() => new Deck([]))
}

export interface MatchInterface {
  initialDeck: Deck
  piles: { deck: Deck[]; top: Deck[]; bottom: Deck[] }
  //  deck:        Deck
  //  suitStacks:  Array<Deck>
  //  pilesBottom: Array<Deck>
}

export default class Match implements MatchInterface {
  initialDeck: Deck
  piles: { deck: Deck[]; top: Deck[]; bottom: Deck[] }

  constructor(
    match?:
      | {
          // deck:        Deck,
          initialDeck: Deck | undefined
          piles: { deck: Deck[]; top: Deck[]; bottom: Deck[] }
          //      suitStacks:  Array<Deck>|undefined,
          //      pilesBottom: Array<Deck>|undefined
        }
      | undefined,
  ) {
    //    this.deck        = (match && match.deck)          || startingDeck()
    this.piles = {
      deck: (match && match.piles.deck) || [startingDeck()],
      top: (match && match.piles.top) || emptyPilesArray(rules.NUMBER_OF_SUIT_STACKS),
      bottom: (match && match.piles.bottom) || emptyPilesArray(rules.NUMBER_OF_PILES_BOTTOM),
    }
    this.initialDeck = (match && match.initialDeck) || new Deck(this.piles.deck[0])

    // this.deal()
  }

  get deck() {
    return this.piles.deck[0]
  }

  get pilesBottom() {
    return this.piles.bottom
  }

  get suitStacks() {
    return this.piles.top
  }

  startNewMatch() {
    this.constructor()
  }

  restartMatch() {
    this.piles.deck[0] = new Deck(this.initialDeck.cards)
    this.piles.top = emptyPilesArray(rules.NUMBER_OF_SUIT_STACKS)
    this.piles.bottom = emptyPilesArray(rules.NUMBER_OF_PILES_BOTTOM)
  }

  deal() {
    if (this.deck.numberOfCards < rules.NUMBER_OF_CARDS_PER_ROUND) return
    this.pilesBottom.forEach((pile, i) => {
      const card1 = this.deck.pop()
      if (card1) {
        pile.push(card1)
      }
      const card2 = this.deck.pop()
      if (card2) {
        pile.push(card2.turn())
      }
    })
    if (this.deck.numberOfCards > 0 && this.deck.numberOfCards < rules.NUMBER_OF_CARDS_PER_ROUND) {
      this.deck.turnUpAll()
    }
  }

  riseCard(
    originWhere: "top"|"bottom"|"deck",
    originPileIndex: number,
    cardIndex: number,
    destinStackIndex: number,
  ) {
    if (originWhere !== 'top' && originWhere !== 'bottom' && originWhere !== 'deck')
      return new Error('Incorrect WHERE')
    if (originWhere === 'top' && originPileIndex === destinStackIndex) return

    if (
      !rules.isRisableAonB(
        this.piles[originWhere][originPileIndex].cards[cardIndex],
        this.suitStacks[destinStackIndex].lastCard,
      )
    )
      return

    this.suitStacks[destinStackIndex].push(
      this.piles[originWhere][originPileIndex].extractCard(cardIndex),
    )
    this.piles[originWhere][originPileIndex].turnUpLastCard()
  }

  riseCardWithDoubleClick(originWhere: string, originPileIndex: number, cardIndex: number) {
    if (originWhere !== 'top' && originWhere !== 'bottom' && originWhere !== 'deck')
      return new Error('Incorrect WHERE')
    let finished = false
    const cardToRise = this.piles[originWhere][originPileIndex].cards[cardIndex]
    this.suitStacks.forEach((stack, destinStackIndex) => {
      if (finished) return
      if (!rules.isRisableAonB(cardToRise, this.suitStacks[destinStackIndex].lastCard)) return

      this.suitStacks[destinStackIndex].push(cardToRise)

      // if (originWhere==="deck") {
      //   this.deck.cards.splice(cardIndex,1)
      // } else {
      //   this.pilesBottom[originPileIndex].spliceLast()?.turnUp()
      //   this.pilesBottom[originPileIndex].turnUpLastCard()
      // }
      this.piles[originWhere][originPileIndex].extractCard(cardIndex)
      this.piles[originWhere][originPileIndex].turnUpLastCard()

      finished = true
    })
  }

  moveSubPile(
    originWhere: "top"|"bottom"|"deck",
    originPileIndex: number,
    cardIndex: number,
    quantityOfCards: number,
    destinPileIndex: number,
  ) {
    if (originWhere !== 'top' && originWhere !== 'bottom' && originWhere !== 'deck')
      return new Error('Incorrect WHERE')
    if (originWhere === 'bottom' && originPileIndex === destinPileIndex) return

    const subPile = new Deck(
      this.piles[originWhere][originPileIndex].cards.slice(
        cardIndex,
        parseInt(`${cardIndex}`) + parseInt(`${quantityOfCards}`),
      ),
    )
    if (!subPile.isDraggable || !subPile.isDropableOnB(this.pilesBottom[destinPileIndex])) return

    this.pilesBottom[destinPileIndex].join(
      this.piles[originWhere][originPileIndex].extractSubPile(cardIndex, quantityOfCards),
    )
    this.piles[originWhere][originPileIndex].turnUpLastCard()
  }

  consoleLogMatch() {
    console.log('-- consoleLogMatch --')
    console.log('Deck', this.deck)
    console.log('Suit-Slots', this.suitStacks)
    console.log('Piles', this.pilesBottom)
    console.log('---------------------')
  }
}

export const matchBlank = () => new Match({
  initialDeck: new Deck(),
  piles: { deck: emptyPilesArray(1), top: emptyPilesArray(1), bottom: emptyPilesArray(1) },
})
