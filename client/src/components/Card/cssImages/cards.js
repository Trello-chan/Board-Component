import React from 'react';
const styled = window.styled;

const CardImage = () =>
  <StyledCardImage>
    <div>
      <div></div>
      <div><div></div></div>
    </div>
  </StyledCardImage>

const StyledCardImage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 32px;
  width: 32px;
  > :nth-child(1) {
    border: 2px solid #798d99;
    border-radius: 3px;
    height: 10px;
    width: 12px;
    > :nth-child(1) {
      border-bottom: 2px solid #798d99;
      height: 65%;
    }
    > :nth-child(2) {
      display: flex;
      justify-content: flex-end;
      height: 30%;
      > :nth-child(1) {
        border-left: 2px solid #798d99;
        width: 15%;
      }
    }
  }
`

export default CardImage;