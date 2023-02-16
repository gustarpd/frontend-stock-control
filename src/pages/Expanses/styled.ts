import styled from "styled-components";

export const CreateExitContainer = styled.div`
  width: 70%;
  height: auto;
  display: flex;
  margin: 0 auto;
  align-items: center;
  justify-content: space-between;

  div {
    width: 70%;
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
  width: 70%;
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
  width: 70%;
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
    margin: 0 0 0 30px;
  }
`;
export const ExitsTable = styled.div`
  width: 68%;
  padding: 10px;
  height: auto;
  background-color: red;
  margin: 0 auto;

  div {
    display: flex;
    justify-content: space-between;
  }

  div:nth-child(3) {
    background-color: yellow;
  }
`;
export const ExitsColumn = styled.div`
  width: 100%;
  text-align: center;
  align-items: center;
  background-color: red;
  background-color: azure;

  div {
    width: 12rem;
    background-color: blue;
  }
`;
