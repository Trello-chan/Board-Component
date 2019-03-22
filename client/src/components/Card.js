import React, { Component } from 'react';
import { Draggable } from 'react-beautiful-dnd';

class Card extends Component {
  constructor(props) {
    super(props);
    this.state ={

    }
  }

  render(){ 
    let { card, index } = this.props;
    return (
      <Draggable draggableId={card.id} index={index}>
        {(provided) => 
          <Container
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
          >
          {card.label}
          </Container>
        }
      </Draggable>
    )
  }
}

const Container = styled.div`
  border: 1px solid lightgrey;
  border-radius: 2px;
  padding: 8px;
  margin-bottom: 8px;
  background-color: white;
`;

export default Card;