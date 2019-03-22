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
        {(provided, snapshot) => 
          <Container
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            isDragging={snapshot.isDragging}
            draggingOver={snapshot.draggingOver}
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
  box-shadow: ${props => props.isDragging ? '5px 5px 3px grey' : '0px 0px'};
  padding: 8px;
  margin-bottom: 8px;
  background-color: ${({isDragging, draggingOver}) => isDragging && !draggingOver ? 'rgba(100,100,100,0.5)' : 'white'};
`;

export default Card;