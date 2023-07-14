import { Deck, Card } from "./deck";

export const rules = {

    NUMBER_OF_DECKS_USED:   2,
    NUMBER_OF_SUIT_STACKS:  8,
    NUMBER_OF_PILES_BOTTOM: 10,
    NUMBER_OF_CARDS_PER_ROUND: 20,
    NUMBER_OF_BONUS_CARDS:  4,

    isLastOfPile: (pile:Deck, index:number) => {
        return (pile.numberOfCards===index+1)?true:false
    },

    isDropableAonB: ((cardToStack: Card, cardBase: Card) => {
        if (cardToStack.numericValue===13 && cardBase==null)            {return true}
        if (cardBase==null)                                             {return false}
        if (cardToStack.isNotShowingFace || cardBase.isNotShowingFace)  {return false}
        if (cardToStack.color===cardBase.color)                         {return false}
        if (cardToStack.numericValue+1!==cardBase.numericValue)         {return false}
        return true
    }),

    isDraggable(group:Deck) {
        if (group.numberOfCards===1 && group.firstCard.isShowingFace)   {return true}
        for (let i=group.numberOfCards-1; i>0; i--) {
            if (!rules.isDropableAonB(group.cards[i],group.cards[i-1])) {return false}
        }
        return true
    },

    isRisableAonB: ((cardToRise: Card, cardBase: Card) => {
        if (cardBase===undefined && cardToRise.value==="A")             {return true}
        if (cardBase===undefined)                                       {return false}
        if (cardToRise.isNotShowingFace || cardBase.isNotShowingFace)   {return false}
        if (cardToRise.suit!==cardBase.suit)                            {return false}
        if (cardToRise.numericValue-1!==cardBase.numericValue)          {return false}

        return true
    }),

    isRisable: ( card:Card, suitStacks:Deck[] ) => {
        if (card.isNotShowingFace) {return false}
        let result = false
        suitStacks.forEach((stack)=>{
            if (stack.hasCards&&rules.isRisableAonB(card, stack.lastCard)) {result = true}
        })
        return result
    },



}