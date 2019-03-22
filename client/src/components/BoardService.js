import React, { Component } from 'react';

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

  render() {
    let { lists } = this.state;
    return (
      <div>
        hello
        {lists.map((list, index) => 
          <Column key={list.id} list={list} />
        )}
      </div>
    )
  }
}

export default BoardService;