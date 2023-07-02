const SUITS = ["♠", "♣", "♥", "♦"]
const VALUE = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"]
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
  
  constructor(cards: Array<Card> = freshDeck()) {
    this.cards = cards
  }

  get numberOfCards() { 
    return this.cards.length
  }

  play(index: number) {
    return this.cards.splice(index, 1)[0]
  }

  pop() {
    if (this.cards.length) return this.cards.shift()
  }

  push(card: Card|undefined|null , isShowingFace:boolean=false) {
    if (card) {this.cards.push(card)}
    return this
  }

  join(pile: Deck) {
    pile.cards.forEach(card => {
      this.cards.push(card)
    })
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
    return Number(this.value)
  //  return CARD_NUMBER_MAP[this.value]
  }

  turn() {
    this.isShowingFace = !this.isShowingFace
    return this
  }

}