import React from "react";
import { Card } from "../models/deck";

interface CardProps {
  card: Card;
  isSemiHidden: boolean;
  draggable: boolean;
  risable: boolean;
  riseCardWithDoubleClick: Function
  // isVisible: boolean;
}

export default class ShowCard extends React.Component<CardProps, {}> {
    public static defaultProps = {
      isSemiHidden: "false",
      draggable: "false",
      risable: "false",
    };
  static this: any;


    public render(): JSX.Element {

// TODO ESTO ES PARA LA VISIBILIDAD AL HACER CLIC DERECHO
      // // const [isVisible, setIsVisible] = useState(false)
      // this.state = { isVisible: false }
      function handleAuxClick() {
      //   // setIsVisible(!isVisible);
      //   this.state = { isVisible: !this.state.isVisible }
      };

      const handleDoubleClick =  () => {
        this.props.riseCardWithDoubleClick()
      }

      

      const exists = ( this.props.card && this.props.card.suit && this.props.card.value )

      if ( exists && this.props.card.isShowingFace ) {
          return (
            <div 
              // className={`card ${this.props.card.color} ${isVisible?"full-visible":""}`}
              className={`card ${this.props.card.color}`}
              data-value={this.props.card.value}
              data-suit={this.props.card.suit}
              onAuxClick={handleAuxClick}
              onDoubleClick={()=>handleDoubleClick()}
            >
                {this.props.card.suit}
            </div>
          );
        } else if (exists) {
          return (
            <div className={`card-back${this.props.isSemiHidden?" semi-hidden":""}`} />
          );
        } else {
          return (
            <div className={`card-slot`} />
          );
        }
    }
  }