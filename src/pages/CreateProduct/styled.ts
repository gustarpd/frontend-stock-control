import styled from "styled-components";

export const InputContainer = styled.div`
  width: 100%;
`;

export const AddButton = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: flex-end;
  border: 0;
  outline: none;
  padding: 10px;

  span {
    margin: 0 5px 0 0;
  }
`;

export const TableProducts = styled.div`
  width: 100%;
  height: 200px;
`;

export const ColumnHeaderContainer = styled.div`
  width: 100%;
  height: 100px;
  margin-top: 20px;
`;

export const ColumnHeader = styled.div`
  width: 100%;
  height: 30px;
  display: flex;
  margin-top: 20px;
  padding: 1px;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #ccc;

  div {
    display: flex;
    align-items: center;
    width: 10rem;
    justify-content: flex-start;
  }
`;

export const ColumnContent = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ccc;
  padding: 5px 0;

  div {
    display: flex;
    margin-top: 5px;
    justify-content: flex-start;
    width: 10rem;

    span {
      margin: 0 14px 0 0;
    }
  }
`;

export const EditContainer = styled.div`
  width: 100%;
  height: 100px;
  background-color: red;
`;
