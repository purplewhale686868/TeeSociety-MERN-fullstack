import React from "react";
import SendIcon from "@mui/icons-material/Send";
import styled from "@emotion/styled";
import { mobile } from "../responsive";

const Container = styled.div`
  height: 40vh;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  ${mobile({ height: "25vh" })}
`;
const Title = styled.h1`
  font-size: 40px;
  margin-bottom: 20px;
  color: #404040;
  ${mobile({ fontSize: "30px" })}
`;

const Desc = styled.div`
  font-size: 20px;
  color: #404040;
  font-weight: 300;
  margin-bottom: 20px;
  ${mobile({ textAlign: "center", fontSize: "16px" })}
`;
const InputContainer = styled.div`
  width: 50%;
  height: 40px;
  background-color: white;
  display: flex;
  justify-content: space-between;
  border: 1px solid lightgray;
  ${mobile({ width: "80%" })}
`;
const Input = styled.input`
  border: none;
  flex: 8;
  padding-left: 20px;
`;
const Button = styled.button`
  flex: 1;
  border: none;
  background-color: #29a3a3;
  color: white;
  cursor: pointer;
`;

const Newsletter = () => {
  return (
    <Container>
      <Title>Newsletter</Title>
      <Desc>Stay informed about the updates and special offers</Desc>
      <InputContainer>
        <Input placeholder="Your email" />
        <Button>
          <SendIcon />
        </Button>
      </InputContainer>
    </Container>
  );
};

export default Newsletter;
