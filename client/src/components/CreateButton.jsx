import React from "react";
import styled from "styled-components";

import { mobile } from "../responsive";
import { useNavigate } from "react-router-dom";

const ButtonDiv = styled.div`
  display: none;
  flex: 1;

  align-items: center;
  margin: 20px 0;
  justify-content: center;
  ${mobile({ display: "flex" })}
`;
const Button = styled.button`
  padding: 10px;
  font-size: 20px;
  font-weight: 500;
  background-color: #29a3a3;
  color: white;
  cursor: pointer;
  border-radius: 5px;
  border: 1px solid #29a3a3;
  &:hover {
    background-color: white;
    color: #29a3a3;
  }
  ${mobile({ fontSize: "30px" })}
`;

const CreateButton = () => {
  const navigate = useNavigate();

  return (
    <ButtonDiv>
      <Button onClick={() => navigate("/login")}>CREATE NOW</Button>
    </ButtonDiv>
  );
};

export default CreateButton;
