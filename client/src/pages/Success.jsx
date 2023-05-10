import React from "react";
import styled from "styled-components";
import { emptyCart } from "../redux/cartSlice";
import { useDispatch } from "react-redux";

import { useNavigate } from "react-router-dom";

const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Button = styled.button`
  font-size: 24px;
  font-weight: 500;
  padding: 20px;
  margin-top: 20px;
  background-color: #29a3a3;
  color: white;
  cursor: pointer;
  border: 2px solid #29a3a3;
  border-radius: 10px;

  &:hover {
    background-color: white;
    color: #29a3a3;
  }
`;

const Text = styled.p`
  text-align: center;
`;

const Success = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <Container>
      <Text>
        Congratulations! Your order has been created successfully and will be
        shipped soon.
      </Text>

      <Button
        onClick={() => {
          dispatch(emptyCart());
          navigate("/home");
        }}
      >
        Go to Homepage
      </Button>
    </Container>
  );
};

export default Success;
