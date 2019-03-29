import React from 'react';

import Actions from './Actions';
import Add from './Add';
import Detail from './Detail';
import CardImage from './cssImages/cards';

const CardOverlay = ({ card, handleCardClick, list }) => 
  <ModalOverlay onClick={handleCardClick}>
    <CardDisplay onClick={(e) => e.stopPropagation()}>
      <CardHeader>
        <CardImage />
        <div>
          <CardHeaderTextArea>{card.label}</CardHeaderTextArea>
          <div>in list <u>{list}</u></div>
        </div>
        <div onClick={handleCardClick}>&#215;</div>
      </CardHeader>
      <div>
        <Detail card={card}/>
        <div>
          <Actions />
          <Add />
        </div>
      </div>
    </CardDisplay>
  </ModalOverlay>

const ModalOverlay = styled.div`
  background-color: rgba(0,0,0,.64);
  display: flex;
  height: 100vh;
  justify-content: center;
  left: 0;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 100;
`;

const CardDisplay = styled.div`
  cursor: default;
  background-color: #ebeef0; 
  border-radius: 2px;
  height: 650px;
  padding: 16px;
  position: absolute;
  width: 730px;
  top: 45px;

  >:nth-child(2) {
    display: flex;
    flex-direction: row;
  }
  @media screen and (max-width: 750px) {
    width: 400px;
  }
`;

const CardHeader = styled.div`
  display: flex;
  flex-direction: row;
  padding-bottom: 10px;
  >:nth-child(1) {

  }
  >:nth-child(2) {
    padding-left: 10px;
    width: 95%;
  }
  >:nth-child(3) {
    font-size: 35px;
    font-weight: 300;
    border-radius: 50%;
    height: 40px;
    line-height: 32px;
    text-align: center;
    width: 40px;
    &:hover {
      cursor: pointer;
      background-color: #D1D1D1;
    }
  }
`;

const CardHeaderTextArea = styled.textarea`
  background-color: #ebeef0;
  border-radius: 3px;
  border-width: 0px;
  color: #17394d;
  font-size: 20px;
  font-weight: 700;
  height: 30px;
  line-height: 30px;
  resize: none;
  width: 98%;
  &:focus {
    box-shadow: inset 0 0 0 2px #0079bf;
    outline: none;
  }
`;

export default CardOverlay;
