import { Deck, Card } from "./deck";

const rules = {

    NUMBER_OF_PILES_TOP: 8,
    NUMBER_OF_PILES_BOTTOM: 10,

    isStackable: ((cardToStack: Card, cardBase: Card) => {
    if (cardToStack.color===cardBase.color) {return false}
    if (cardToStack.numericValue+1!==cardBase.numericValue) {return false}
    return true
}),


}

module.exports = rules
