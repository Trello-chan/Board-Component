import React, { Component } from 'react';
import { Draggable, Droppable } from 'react-beautiful-dnd';

import CardContainer from './CardContainer';

class Column extends Component {
  shouldComponentUpdate(nextProps) {
    return !(nextProps.list === this.props.list);
  }

  render() {
    let { list, listId, index } = this.props;
    return(
      <Draggable draggableId={listId} index={index}>
        {(provided, snapshot) => 
          <Container
            {...provided.draggableProps}
            ref={provided.innerRef}
            isDragging={snapshot.isDragging}
            draggingOver={snapshot.draggingOver}
          >
            <Title {...provided.dragHandleProps}>{list.name}</Title>
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
                  <CardContainer list={list}/>
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
  background-color: white;
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