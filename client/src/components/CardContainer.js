import React, { Component } from 'react';

import Card from './Card';

//Just to prevent excessive re-rendering of cards, especially since there is going to be tons of cards
class CardContainer extends Component {
  shouldComponentUpdate(nextProps) {
    return !(nextProps.list === this.props.list);
  }

  render(){
    let { list } = this.props;
    return (
      list.cards.map((card, index) => <Card key={index} index={index} list={list.name} card={card}/>)
    )
  }
}

export default CardContainer;