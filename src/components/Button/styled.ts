import styled from "styled-components";

interface Props {
  btnType: 'edit' | 'delete' | 'source';
}

export const Button = styled.button<Props>`
  border: 0;
  outline: none;
  cursor: pointer;
  background: ${props => props.btnType === 'edit' ? 'hsl(217, 71%, 53%)' : 'hsl(348, 100%, 61%)'};
  border-radius: 6px;
  color: #fff;
  padding: 10px 20px;
`;
