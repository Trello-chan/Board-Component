import React, { Component } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

import Column from './Column';

import { columnsData, listsData } from '../dummyData/data';

class BoardService extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lists: listsData,
      columns: columnsData
    }
  }

  //TODO update database with all new content on specific actions and on unmount

  onCardDragEnd = (result) => {
    let { destination, source, draggableId, type } = result;

    //if destination is not within a droppable
    if (!destination) return;

    //if droppable is the same AND we didnt move it to a new index
    if (destination.droppableId === source.droppableId && destination.index === source.index) return;

    let handler = type === 'list' ? 'handleListChange' : 'handleCardChange';
    this[handler](destination, source);
  }

  //TODO: this rerenders ALL lists, see if we can update only one list
  handleCardChange = (destination, source) => {
    let lists = {...this.state.lists};

    let sourceList = lists[source.droppableId];
    let destinationList = lists[destination.droppableId];
    destinationList.cards.splice(destination.index, 0, sourceList.cards.splice(source.index, 1)[0]);

    this.setState({ lists });
  }

  handleListChange = (destination, source) => {
    console.log('here')
    let columns = [...this.state.columns];
    columns.splice(destination.index, 0, columns.splice(source.index, 1)[0]);
    this.setState({ columns });
  }

  render() {
    let { columns, lists } = this.state;
    return (
      <DragDropContext
        // onDragStart
        // onDragUpdate
        onDragEnd={this.onCardDragEnd}
      >
        <Droppable
          droppableId={'master-list'}
          direction="horizontal"
          type="list"
        >
        {(provided, snapshot) =>
          <ColumnContainer
            ref={provided.innerRef}
            {...provided.droppableProps}
            isDraggingOver={snapshot.isDraggingOver}
          >
            {columns.map((listId, index) => 
              <Column key={index} index={index} list={lists[listId]} listId={listId}/>
            )}
            {provided.placeholder}
          </ColumnContainer>
        }
        </Droppable>
      </DragDropContext>
    )
  }
}

const ColumnContainer = styled.div`
  display: flex;
  max-height: 90vh;
`

export default BoardService;