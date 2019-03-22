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
        <Droppable droppableId={listId}>
          {provided =>
            <BoardList
              ref={provided.innerRef}
              {...provided.droppableProps}
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
`;

const Title = styled.h3`
  padding: 8px;
`;

const BoardList = styled.div`
padding: 8px;
`;

export default Column;