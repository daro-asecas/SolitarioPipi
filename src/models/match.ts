import { Deck } from "./deck"
import { rules } from "./rules"

function startingDeck() {
  const deck = new Deck()
  for (let i=1 ; i<rules.NUMBER_OF_DECKS_USED; i++) { deck.join(new Deck()) }
  return deck.shuffle()
}

function emptyPilesArray(number:number) {
  return Array(number).fill(undefined).map(()=> new Deck([]))
}

export default class Match {
  deck:        Deck
  initialDeck: Deck
  piles:       {top:Deck[] , bottom:Deck[]}
//  suitStacks: Array<Deck>
//  pilesBottom: Array<Deck>


  constructor ( match:{
      deck:        Deck,
      initialDeck: Deck|undefined,
      piles:       {top:Deck[] , bottom:Deck[]}
//      suitStacks:  Array<Deck>|undefined,
//      pilesBottom: Array<Deck>|undefined
  } | undefined ) {

    this.deck        = (match && match.deck)          || startingDeck()
    this.initialDeck = (match && match.initialDeck)   || new Deck(this.deck)
    this.piles = {
      top:    (match && match.piles.top)    || emptyPilesArray(rules.NUMBER_OF_SUIT_STACKS),
      bottom: (match && match.piles.bottom) || emptyPilesArray(rules.NUMBER_OF_PILES_BOTTOM)
    }
  
    // this.deal()
  }

  get pilesBottom () {
    return this.piles.bottom
  }

  get suitStacks () {
    return this.piles.top
  }
  
  startNewMatch () {
    this.constructor()
  }

  restartMatch () {
    this.deck         = new Deck(this.initialDeck.cards)
    this.piles.top    = emptyPilesArray(rules.NUMBER_OF_SUIT_STACKS)
    this.piles.bottom = emptyPilesArray(rules.NUMBER_OF_PILES_BOTTOM)
  }

  deal () {
    if (this.deck.numberOfCards<rules.NUMBER_OF_CARDS_PER_ROUND) return
    this.pilesBottom.forEach((pile,i)=>{
        const card1 = this.deck.pop()
        if (card1) {pile.push(card1)}
        const card2 = this.deck.pop()
        if (card2) {pile.push(card2.turn())}
    })
    if ( 0<this.deck.numberOfCards && this.deck.numberOfCards<rules.NUMBER_OF_CARDS_PER_ROUND ) {
      this.deck.turnUpAll()
    }
  }
 
  riseCard (originWhere:string, originPileIndex:number, destinStackIndex:number) {
    if ( originWhere!=="top" && originWhere!=="bottom" ) return new Error("Incorrect WHERE")
    if ( originWhere==="top" && originPileIndex===destinStackIndex ) return

    if (!rules.isRisableAonB(this.piles[originWhere][originPileIndex].lastCard,this.suitStacks[destinStackIndex].lastCard)) return
    
    this.suitStacks[destinStackIndex].push(this.piles[originWhere][originPileIndex].spliceLast()?.turnUp())
    this.piles[originWhere][originPileIndex].turnUpLastCard()
  }

  riseCardWithDoubleClick (originWhere:string, originPileIndex:number, cardIndex:number) {
    let finished = false
    let cardToRise = (originWhere==="bottom")?this.pilesBottom[originPileIndex].lastCard:this.deck.cards[cardIndex]
    this.suitStacks.forEach((stack,destinStackIndex)=>{
      if (finished) return
      if (!rules.isRisableAonB(cardToRise, this.suitStacks[destinStackIndex].lastCard)) return

      this.suitStacks[destinStackIndex].push(cardToRise)

      if (originWhere==="deck") {
        this.deck.cards.splice(cardIndex,1)
      } else {
        this.pilesBottom[originPileIndex].spliceLast()?.turnUp()
        this.pilesBottom[originPileIndex].turnUpLastCard()
      }

      finished = true
    })
  }

  moveSubPile (originWhere:string, originPileIndex:number, cardIndex:number, quantityOfCards:number, destinPileIndex:number) {
    if ( originWhere!=="top" && originWhere!=="bottom" && originWhere!=="deck" ) return new Error("Incorrect WHERE")
    if ( originWhere==="bottom" && originPileIndex===destinPileIndex ) return

    const subPile = this.pilesBottom[originPileIndex].copy.extractSubpileOfLast(quantityOfCards)
    if ( !subPile.isDraggable || !subPile.isDropableOnB(this.pilesBottom[destinPileIndex]) ) return

    if (originWhere === "deck") {
      this.pilesBottom[destinPileIndex]
      .push(this.deck.cards.splice(cardIndex,1)[0])
    } else {

      
      //    const originArrayReference = (originWhere==="bottom")?this.pilesBottom:this.suitStacks
      this.pilesBottom[destinPileIndex]
      .join(this.piles[originWhere][originPileIndex].extractSubpileOfLast(quantityOfCards))
      this.piles[originWhere][originPileIndex].turnUpLastCard()
    }
  }



  consoleLogMatch() {
    console.log("-- consoleLogMatch --")
    console.log("Deck",this.deck)
    console.log("Suit-Slots",this.suitStacks)
    console.log("Piles",this.pilesBottom)
    console.log("---------------------")
  }



}