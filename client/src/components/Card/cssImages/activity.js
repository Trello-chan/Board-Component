import React from 'react';
const styled = window.styled;

const ActivityImage = () =>
  <ActivityContainer>
    <div>
      <Dots>
        <div></div>
        <div></div>
      </Dots>
      <Lines>
        <hr/>
        <hr/>
        <hr/>
        <hr/>
      </Lines>
    </div>
  </ActivityContainer>

const ActivityContainer = styled.div`
  align-items: center;
  display: flex;
  height: 32px;
  justify-content: center;
  width: 32px;
  > div {
    display: flex;
    flex-direction: row;
    width: 16px;
    height: 16px;
  }
  border-color: rgba(121,141,153,0.7);
`;

const Dots = styled.div`
  margin-top: 2px;
  width: 30%;
  >:nth-child(n) {
    background-color: #6b808c;
    border-radius: 50%;
    width: 3px;
    height: 3px;
    margin-bottom: 5px;
  }
`;

const Lines = styled.div`
  height: 16px;
  width: 70%;
  > :nth-child(2n) {
    margin-right: 4px;
  }
  & hr {
    border-color: rgba(121,141,153,0.7);
    margin: 2px 0px;
  }
`;

export default ActivityImage;