import styled from 'styled-components';

export const CustomTextArea = styled.textarea`
  width: 100%;
  height: 80px;
  margin-bottom: 8px;
  margin-top: 8px;
  border: 1px solid rgb(107, 114, 12);
  resize: none;
  padding: 10px;
  border-radius: 5px;
`;

export const FormButton = styled.button`
  font-size: 16px;
  padding: 8px 16px;
  background: green;
  border-radius: 8px;
  color: white;
  cursor: pointer;
  transition: all .3s ease;
  letter-spacing: 0.1em;

  &:hover {
    background: #029602;
  }

  &.cancel {
    background: red;
    margin-left: 10px;

    &:hover {
      background: #ff4848;
    }
  }
  
  &:disabled {
    filter: grayscale(.7);
    pointer-events: none;
  }
`;