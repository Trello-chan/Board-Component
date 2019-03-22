import React, { Component } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';

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
    let { destination, source, draggableId } = result;
    //if destination is not within a droppable
    if (!destination) return;

    //if droppable is the same AND we didnt move it to a new index
    if (destination.droppableId === source.droppableId && destination.index === source.index) return;

    //if only card order has changed 
    //TODO: this rerenders ALL lists, see if we can update only one list
    this.handleCardChange(destination, source);
  }

  handleCardChange = (destination, source) => {
    let lists = {...this.state.lists};

    let sourceList = lists[source.droppableId];
    let destinationList = lists[destination.droppableId];
    destinationList.cards.splice(destination.index, 0, sourceList.cards.splice(source.index, 1)[0]);

    this.setState({ lists });
  }

  render() {
    let { columns, lists } = this.state;
    return (
      <DragDropContext
        // onDragStart
        // onDragUpdate
        onDragEnd={this.onCardDragEnd}
      >
        <ColumnContainer>
          {columns.map((listId, index) => 
            <Column key={index} list={lists[listId]} listId={listId}/>
          )}
        </ColumnContainer>
      </DragDropContext>
    )
  }
}

const ColumnContainer = styled.div`
  display: flex;
`

export default BoardService;