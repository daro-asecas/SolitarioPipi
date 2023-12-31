import React from 'react'
import { Card } from '../models/deck'
import Icon from '@mdi/react';
import { mdiCardsSpade, mdiCardsClub, mdiCardsHeart, mdiCardsDiamond } from '@mdi/js';

const suitIcon = {
  '♠': mdiCardsSpade,
  '♣': mdiCardsClub,
  '♥': mdiCardsHeart,
  '♦': mdiCardsDiamond
}

interface CardProps {
  card: Card
  isSemiHidden: boolean
  draggable: boolean
  riseCardWithDoubleClick: Function
  // isVisible: boolean;
}

export default class ShowCard extends React.Component<CardProps, {}> {
  public static defaultProps = {
    isSemiHidden: 'false',
    draggable: 'false',
  }

  static this: any

  public render(): JSX.Element {
    const classDraggable = this.props.draggable ? 'draggable' : 'not-draggable'

    // TODO ESTO ES PARA LA VISIBILIDAD AL HACER CLIC DERECHO
    // // const [isVisible, setIsVisible] = useState(false)
    // this.state = { isVisible: false }
    function handleAuxClick() {
      //   // setIsVisible(!isVisible);
      //   this.state = { isVisible: !this.state.isVisible }
    }

    const handleDoubleClick = () => {
      if (!this.props.draggable) return
      this.props.riseCardWithDoubleClick()
    }

    const exists = this.props.card && this.props.card.suit && this.props.card.value

    if (exists && this.props.card.isShowingFace) {
      return (
        <div
          // className={`card ${this.props.card.color} ${isVisible?"full-visible":""}`}
          className={`card ${this.props.card.color} ${this.props.card.suit} ${classDraggable}`}
          data-value={this.props.card.value}
          data-suit={this.props.card.suit}
          onAuxClick={handleAuxClick}
          onDoubleClick={handleDoubleClick}
        >
          { /* @ts-ignore */ }
          <Icon path={suitIcon[this.props.card.suit]} size={"1em"} />
        </div>
      )
    } else if (exists) {
      return (
        <div
          className={`card-back${this.props.isSemiHidden ? ' semi-hidden not-draggable' : ''}`}
        />
      )
    } else {
      return <div className={'card-slot'} />
    }
  }
}
