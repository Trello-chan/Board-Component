import React, { Component } from 'react';

class Column extends Component {
  constructor(props) {
    super(props);
    this.state ={

    }
  }

  render() {
    let { list } = this.props;
    return(
      <div>{list.name}</div>
    )
  }
}

export default Column;