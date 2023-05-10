import React from "react";
import styled from "styled-components";

import { mobile } from "../responsive";
import { useNavigate } from "react-router-dom";

// const Container = styled.div`
//   background-color: #f6f6f6;
//   width: 100%;
//   height: 100vh;
// `;

const ButtonDiv = styled.div`
  display: flex;
  flex: 1;
  align-items: center;

  padding-top: 20px;
  padding-bottom: 20px;
  padding-right: 50px;
  justify-content: flex-end;
  ${mobile({ justifyContent: "center", paddingRight: 0 })}
`;
const Button = styled.button`
  padding: 10px;
  font-size: 24px;
  font-weight: 500;
  background-color: #29a3a3;
  color: white;
  cursor: pointer;
  border-radius: 5px;
  border: 2px solid #29a3a3;
  &:hover {
    background-color: white;
    color: #29a3a3;
  }
`;

const CreateButtonAuth = () => {
  const navigate = useNavigate();

  return (
    // <Container>
    <ButtonDiv>
      <Button onClick={() => navigate("/createListing")}>CREATE NOW</Button>
    </ButtonDiv>
    // </Container>
  );
};

export default CreateButtonAuth;
