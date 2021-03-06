import React, { Component } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import axios from 'axios';

import Column from './Column';

class BoardService extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lists: {},
      columns: []
    }
  }

  //TODO update database with all new content on specific actions and on unmount
  componentDidMount() {
    let options = {
      params: {
        board_id: Math.ceil(Math.random() * 100)
      }
    }

    axios
      .get('/board-api/cards', options)
      .then(({ data }) => this.setState({ lists: data.lists, columns: data.columns }))
      .catch(() => console.log('error in BoardService CDM'))
  }

  onCardDragEnd = (result) => {
    let { destination, source, type } = result;

    //if destination is not within a droppable
    if (!destination) return;

    //if droppable is the same AND we didnt move it to a new index
    if (destination.droppableId === source.droppableId && destination.index === source.index) return;

    let handler = type === 'list' ? 'handleListChange' : 'handleCardChange';
    this[handler](destination, source);
  }

  handleCardChange = (destination, source) => {
    let sourceId = source.droppableId.split('.')[1];
    let destinationId = destination.droppableId.split('.')[1];

    let lists = {...this.state.lists};
    let sourceList = sourceId === destinationId ? lists[sourceId] : {...lists[sourceId]};
    let destinationList = {...lists[destinationId]};
    destinationList.cards.splice(destination.index, 0, sourceList.cards.splice(source.index, 1)[0]);
    lists[sourceId] = sourceList;
    lists[destinationId] = destinationList;
    this.setState({ lists });
  }

  handleListChange = (destination, source) => {
    let columns = [...this.state.columns];
    columns.splice(destination.index, 0, columns.splice(source.index, 1)[0]);
    this.setState({ columns });
  }

  render() {
    let { columns, lists } = this.state;
    return (
      <BoardServiceContainer>
        <DragDropContext
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
      </BoardServiceContainer>
    )
  }
}

const BoardServiceContainer = styled.div`
  display: inline-flex;
  height: 90vh;
`;

const ColumnContainer = styled.div`
  display: flex;
  max-height: 90vh;
  background-color: ${props => props.isDraggingOver ? 'rgba(100,100,100,0.5)' : 'rgba(0,0,0,0);'};
`;

export default BoardService;