import React from "react";

import { Card } from "../models/deck";



interface CardProps {
  card: Card;
  isSemiHidden: boolean;
}

export class ShowCard extends React.Component<CardProps, {}> {
    public static defaultProps = {
      isSemiHidden: "false"
    };

    public render(): JSX.Element {

      const exists = (this.props.card&&this.props.card.suit&&this.props.card.value)?true:false

      if (exists&&this.props.card.isShowingFace) {
          return (
            <div className={`card ${this.props.card.color}`} data-value={this.props.card.value} data-suit={this.props.card.suit} >{this.props.card.suit}</div>
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
