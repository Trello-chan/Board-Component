import React from 'react';

const TextAlignImage = () =>
  <TextAlignContainer>
    <Lines>
      <hr/>
      <hr/>
      <hr/>
      <hr/>
    </Lines>
  </TextAlignContainer>

const TextAlignContainer = styled.div`
  align-items: center;
  display: flex;
  height: 32px;
  justify-content: center;
  width: 32px;
`;

const Lines = styled.div`
  height: 16px;
  width: 16px;

  & hr {
    border-color: rgba(121,141,153,0.7);
    border-width: 1px;
    margin: 2px 0px;
  }
  > :nth-child(4) {
    margin-right: 6px;
  }
`

export default TextAlignImage;