import React, { Component } from 'react';
import { Draggable, Droppable } from 'react-beautiful-dnd';

import Card from './Card';

class Column extends Component {
  constructor(props) {
    super(props);
    this.state ={

    }
  }

  render() {
    let { list, listId, index } = this.props;
    return(
      <Draggable draggableId={listId} index={index}>
        {(provided, snapshot) => 
          <Container
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            isDragging={snapshot.isDragging}
            draggingOver={snapshot.draggingOver}
          >
            <Title>{list.name}</Title>
            <Droppable 
              droppableId={listId}
              type="card"
            >
              {(provided, snapshot) =>
                <BoardList
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  isDraggingOver={snapshot.isDraggingOver}
                >
                  {list.cards.map((card, index) => <Card key={index} index={index} card={card}/>)}
                  {provided.placeholder}
                </BoardList>
              }
            </Droppable>
          </Container>
        }
      </Draggable>
    )
  }
}

const Container = styled.div`
  margin: 8px;
  border: 1px solid lightgrey;
  border-radius: 2px;
  display: flex;
  flex-direction: column;
  max-width: 275px;
  min-width: 275px;
`;

const Title = styled.h3`
  padding: 8px;
`;

const BoardList = styled.div`
  background-color: ${props => props.isDraggingOver ? 'rgba(100,100,100,0.5)' : 'white'};
  padding: 8px;
  flex-grow: 1;
  max-height: 100%;
  overflow: scroll;
`;

export default Column;