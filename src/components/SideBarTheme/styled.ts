import styled from "styled-components";

export const SideBarContainer = styled.div`
  width: 14rem;
  height: 90%;
  margin-top: 80px;
  display: flex;
  flex-direction: column;
  background-color: #fff;
`;

export const SideBarDataGroup = styled.div`
  width: 100%;
  height: 400px;
  margin: 20px auto;

  div {
    margin-top: 5px;
    padding: 10px 0;

    a {
      text-decoration: none;
      margin: 0 0 0 20px;
    }
  }
  div:hover {
    background-color: #eef0f2;
    cursor: pointer;
  }
`;
