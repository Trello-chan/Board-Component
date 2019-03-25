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
      <Draggable draggableId={`list.${listId}`} index={index}>
        {(provided, snapshot) => 
          <Container
            {...provided.draggableProps}
            ref={provided.innerRef}
            isDragging={snapshot.isDragging}
            draggingOver={snapshot.draggingOver}
          >
            <Title {...provided.dragHandleProps}>{list.name}</Title>
            <Droppable 
              droppableId={`list.${listId}`}
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
  color: #17394d;
  font-family: Helvetica Neue,Arial,Helvetica,sans-serif;
  font-size: 14px;
  margin: 4px;
  border: 1px solid lightgrey;
  border-radius: 3px;
  display: flex;
  flex-direction: column;
  max-width: 275px;
  min-width: 275px;
  background-color: #dfe3e6;
  height: auto;
`;

const Title = styled.div`
  padding: 8px;
  font-weight: 700;
`;

const BoardList = styled.div`
  background-color: ${props => props.isDraggingOver ? 'rgba(100,100,100,0.5)' : '#dfe3e6'};
  padding: 8px;
  flex-grow: 1;
  max-height: 100%;
  overflow: scroll;
`;

const BlankSpace = styled.div`
  height: auto;
`

export default Column;