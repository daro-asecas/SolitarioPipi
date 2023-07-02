import {Deck, Card} from "./deck"
const rules = require("./rules")


export default class Match {
  deck: Deck
  initialDeck: Deck
  pilesTop: Array<Deck>
  pilesBottom: Array<Deck>

  constructor() {
    this.deck = new Deck().join(new Deck()).shuffle()
    this.initialDeck = new Deck(this.deck.cards)
    this.pilesTop = Array(rules.NUMBER_OF_PILES_TOP).map(()=> new Deck([]))
    this.pilesBottom = Array(rules.NUMBER_OF_PILES_BOTTOM).map(()=>new Deck([]))
    
    this.deal()
  }
  
  startNewMatch () {
    this.constructor()
  }

  restartMatch () {
    this.deck = new Deck(this.initialDeck.cards)
    this.pilesTop = Array(rules.NUMBER_OF_PILES_TOP).map(()=> new Deck([]))
    this.pilesBottom = Array(rules.NUMBER_OF_PILES_BOTTOM).map(()=>new Deck([]))
  }

  deal() {
    this.pilesBottom.forEach(pile=>{
      pile.push(this.deck.pop())
      const card = this.deck.pop()
      if (card) {pile.push(card.turn())}
    })
  


  }




}