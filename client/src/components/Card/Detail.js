import React, { Component } from 'react';

import CardImage from './cssImages/cards';
import TextAlignImage from './cssImages/textAlign';
import ActivityImage from './cssImages/activity';

class Detail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showDescription: false
    }
  }

  render() {
    let { showDescription } = this.state;
    let { card } = this.props;
    return (
      <DetailContainer>

        <div>
          <TextAlignImage />
          <DescriptionBox>
            <div><h3>Description</h3> {card.description && <span><u>Edit</u></span>}</div>
            {card.description ? 
              <div>{card.description}</div>
              :
              <div>Add a more detailed description</div>
            }
            {showDescription && <textarea/>}
          </DescriptionBox>
        </div>
        <div>
          <CardImage />
          Comment
        </div>
        <div>
          <ActivityImage />
          Activity
        </div>
      </DetailContainer>
    )
  }
}

const DetailContainer = styled.div`
  width: 75%;
  >:nth-child(n) {
    display: flex;
    flex-direction: row;
    padding: 10px 0px;
  }
  & h3 {
    color: #17394d;
    display: inline;
    margin: 0px;
  }
`;

const DescriptionBox = styled.div`
  padding-left: 10px;
  padding-top: 5px;
`

export default Detail;