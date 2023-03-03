import styled from "styled-components";

export const Container = styled.div`
  width: 80%;
  height: auto;
  margin: 0 auto;
`;

export const HeaderContainer = styled.div`
  width: 94%;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  span {
    margin: 0 10px 0 0;
    padding: 5px;
    border-radius: 3px;
    background-color: #D9E0E3;
  }
`;

export const InputContainer = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
  margin-top: 20px;

  input {
    width: 15rem;
    height: 30px;
    margin: 0 10px 0 0;
  }
`;
export const SaleContainer = styled.div`
  width: 15rem;
  margin: 30px 10px 0 0;
  
  border-radius: 3px;
  height: 160px;
  padding-bottom: 5px;
  background-color: #D9E0E3;
  div {
    width: 90%;
    margin: 10px auto;
    justify-content: space-between;
    display: flex;

    span {
      margin: 10px 0 0 0;
    }
  }
`;

export const BoxSale = styled.div`
  height: auto;
  border-radius: 4px;
  padding: 0 4px 0 4px;
  background-color: #fff;
`;

export const SaleContainerBody = styled.div`
  display: flex;
  word-break: break-all;
  height: 300px;
  background-color: #fff;
`