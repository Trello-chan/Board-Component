import React, { Component } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';

import Column from './Column';

import lists from '../dummyData/data';

class BoardService extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // lists: [],
      lists,
    }
  }

  onDragEnd = (result) => {

  }

  render() {
    let { lists } = this.state;
    return (
      <DragDropContext
        // onDragStart
        // onDragUpdate
        onDragEnd={this.onDragEnd}
      >
        <div>
          hello
          {lists.map((list, index) => 
            <Column key={list.id} list={list} />
          )}
        </div>
      </DragDropContext>
    )
  }
}

export default BoardService;