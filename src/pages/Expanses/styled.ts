import styled from "styled-components";

export const CreateExitContainer = styled.div`
  width: 90%;
  height: auto;
  display: flex;
  margin: 0 auto;
  align-items: center;
  justify-content: space-between;

  div {
    width: 90%;
    display: flex;

    input {
      width: 90%;
    }
  }

  button {
    height: 40px;
  }
`;

export const TitleHeader = styled.div`
  width: 90%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 auto;

  div {
    width: 70px;
    height: auto;
    padding: 2px;
    background-color: #ccc;
  }
`;

export const ListExits = styled.div`
  width: 90%;
  height: auto;
  margin: 30px auto;

  div {
    display: flex;
    justify-content: space-between;

    input {
      width: 14rem;
    }
  }

  button {
    margin: 0 320px 0 30px;
  }
`;
export const ExitsTable = styled.div`
  width: 90%;
  padding: 10px;
  height: auto;
  margin: 0 auto;

  div {
    display: flex;
    justify-content: space-between;
  }
`;

export const ExitTableHeader = styled.div`
  border-bottom: 1px solid #ccc;

  span {
    width: 18%;
    margin-bottom: 10px;
  }
`;

export const ExitsColumn = styled.div`
  width: 100%;
  text-align: center;
  align-items: center;

  div {
    margin: 10px 0 0 0;
    width: 10rem;
  }
  button {
    margin: 0 10px 0 0;
  }
`;
