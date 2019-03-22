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

  onDragEnd = (result) => {
    console.log(result)
    let { destination, source, draggableId } = result;

    //if no destination
    if (!destination) {
      return;
    } 

    //if location didn't change, then don't do anything (dropped at original position)
    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }

    //if list order has changed, will have to change column order
    // let { columns, lists } = this.state;
    // let newColumns = [...columns];



    //if only card order has changed 
    this.handleCardChange(destination, source);
  }

  handleCardChange = (destination, source) => {
    let lists = {...this.state.lists};
    let currentList = lists[destination.droppableId];
    let { cards } = currentList;
    cards.splice(destination.index, 0, cards.splice(source.index, 1)[0]);

    this.setState({ lists });
  }

  render() {
    let { columns, lists } = this.state;
    return (
      <DragDropContext
        // onDragStart
        // onDragUpdate
        onDragEnd={this.onDragEnd}
      >
        <div>
          hello
          {columns.map((listId, index) => 
            <Column key={index} list={lists[listId]} listId={listId}/>
          )}
        </div>
      </DragDropContext>
    )
  }
}

export default BoardService;