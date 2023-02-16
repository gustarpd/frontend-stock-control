import styled from "styled-components";

export const ProductResults = styled.div`
  width: 72%;
  height: auto;
  padding: 10px 0;
  border-radius: 3px;
  border: 1px solid #CCC;
  margin: 40px auto;

  p {
    margin-top: 5px;
    display: flex;
    width: 96%;
    margin: 10px auto;
    flex-direction: column;
    padding: 5px;
    background-color: #fff;
    justify-content: space-between;

    div {
      display: flex;
      width: 98%;
      justify-content: space-between;
    }
  }

  div {
    align-items: center;
    padding: 2px 2px 0 4px;
    width: 88%;
    margin: 0 auto;
    justify-content: space-between;
    display: flex;
  }
`;

export const MakeSaleContainer = styled.div`
  width: 70%;
  border-radius: 4px;
  height: auto;
  border: 1px solid #d9e0e3;
  margin: 5px auto;
  padding: 10px;

  p {
    width: 98%;
    height: 40px;
    border-radius: 3px;
    display: flex;
    align-items: center;
    padding: 5px;
    margin: 5px auto;
    justify-content: space-between;
    background-color: #d9e0e3;
  }

  button {
    margin: 15px 20px 0 0;
  }
`;

export const ProductDetail = styled.div`
  width: 100%;
  margin-top: 5px;
  height: 40px;

  div {
    display: flex;
    /* margin-bottom: 10px; */
    background-color: #d9e0e3;
    border-radius: 3px;
    padding: 10px;
    word-break: break-all;
    justify-content: space-between;
  }
`;

export const SelectProductInput = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 72%;
  height: 40px;
  margin: 0 auto;
`;

export const ButtonDelete = styled.div`
  text-align: center;
  color: #fff;
  padding: 2px 10px;
  cursor: pointer;
  border-radius: 3px;
  background-color: red;
`;

export const BoxPagination = styled.div`
  width: 72%;
  margin: 16px auto;
  height: 20px;
`;
