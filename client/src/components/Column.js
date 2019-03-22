import React, { Component } from 'react';
import { Droppable } from 'react-beautiful-dnd';

import Card from './Card';

class Column extends Component {
  constructor(props) {
    super(props);
    this.state ={

    }
  }

  render() {
    let { list, listId } = this.props;
    return(
      <Container>
        <Title>{list.name}</Title>
        <Droppable 
          droppableId={listId}
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
  flex-grow: 1
`;

export default Column;