import React, { useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';

import CardModal from './Card/Card';

const Card = ({ card, index }) => {
  const [showOverlay, setOverlay] = useState(false);
  
  return (<Draggable draggableId={`card.${card.id}`} index={index}>
    {(provided, snapshot) => 
      <Container
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        ref={provided.innerRef}
        isDragging={snapshot.isDragging}
        draggingOver={snapshot.draggingOver}
      >
        <div onClick={() => setOverlay(true)}>{card.label}</div>
        {showOverlay && <CardModal card={card} handleCardClick={() => setOverlay(false)}/>}
      </Container>
    }
  </Draggable>)
}

const Container = styled.div`
  border: 1px solid lightgrey;
  border-radius: 3px;
  border-bottom: 1px solid grey;
  box-shadow: ${props => props.isDragging ? '5px 5px 3px grey' : '0px 0px'};
  padding: 8px;
  margin-bottom: 8px;
  background-color: ${({isDragging, draggingOver}) => isDragging && !draggingOver ? 'rgba(100,100,100,0.5)' : 'white'};
  &:hover{
    cursor: pointer;
  }
`;

export default Card;