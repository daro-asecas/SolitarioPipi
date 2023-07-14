import { rules } from "./rules"

const SUITS = ["♠", "♣", "♥", "♦"]
const VALUE = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"]
// const VALUE = ["A", "2", "3"]
// const CARD_NUMBER_MAP = {"A": 1, "2": 2, "3": 3, "4": 4, "5": 5, "6": 6, "7": 7, "8": 8, "9":9, "10": 10, "J": 11, "Q": 12, "K": 13}

function freshDeck() {
  return SUITS.flatMap(suit   => {
    return VALUE.map(value => {
      return new Card(suit, value)
    })
  })
}

export class Deck {
  cards: Array<Card>
  
  constructor(deck: Array<Card>|Deck = freshDeck()) {
    this.cards = (deck instanceof Deck)?[...deck.cards]:[...deck]
  }

  get numberOfCards() {
    return this.cards.length
  }

  get hasCards() {
    return !!this.numberOfCards
  }

  get firstCard() {
    return this.cards[0]
  }

  get lastCard() {
    return this.cards[this.numberOfCards-1]
  }

  get copy () {
    return new Deck([...this.cards])
  }

  get isDraggable() {
    return this.hasCards && rules.isDraggable(this)
  }

  isDropableOnB (pile:Deck) {
    if (!this.isDraggable) console.error(new Error("Consulting DROPABILITY of a non-draggable pile"))
    return rules.isDropableAonB(this.firstCard, pile.lastCard)
  }


  play(index: number) {
    return this.cards.splice(index, 1)[0]
  }

  pop() {
    if (this.cards.length) return this.cards.shift()
  }

  spliceLast() {
    if (this.cards.length) return this.cards.splice(-1)[0]
  }

  extractSubpileOfLast(quantityOfCards:number) {
    return new Deck(this.cards.splice(-quantityOfCards))
  }

  turnUpLastCard () {
    if (this.hasCards) this.lastCard.isShowingFace = true
  }

  push(card?: Card, isShowingFace:boolean=false) {
    if (card) {this.cards.push(card)}
    return this
  }

  join(pile: Deck) {
    pile.cards.forEach(card => {
      this.cards.push(card)
    })
    return this
  }

  turnUpAll() {
    this.cards.forEach(card => {card.turnUp()})
    return this
  }

  shuffle() {
    for (let i = this.numberOfCards - 1; i >= 0; i--) {
      const newIndex = Math.floor(Math.random() * (i + 1))
      const oldValue = this.cards[newIndex]
      this.cards[newIndex] = this.cards[i]
      this.cards[i] = oldValue
    }
    return this
  }



}

export class Card {
  suit: string
  value: string
  isShowingFace: boolean

  constructor(suit: string, value: string, isShowingFace:boolean=false) {
    this.suit = suit
    this.value = value
    this.isShowingFace = isShowingFace
  }

  get color() {
    if (this.suit==="♥" || this.suit==="♦") {return "red"}
    else {return "black"}
  }

  get numericValue() {
    if (this.value==="K") return 13
    if (this.value==="Q") return 12
    if (this.value==="J") return 11
    if (this.value==="A") return 1
    return Number(this.value)
  //  return CARD_NUMBER_MAP[this.value]
  }

  get isNotShowingFace() { return !this.isShowingFace}

  turn() {
    this.isShowingFace = !this.isShowingFace
    return this
  }

  turnUp() {
    if (!this) return
    this.isShowingFace = true
    return this
  }

}