import React from "react";
import styled from "styled-components";
import SearchIcon from "@mui/icons-material/Search";
import { mobile } from "../responsive";

import { useNavigate } from "react-router-dom";

const Container = styled.div`
  height: 60px;
  ${mobile({ height: "50px" })}
`;

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  ${mobile({ padding: "10px 0px" })}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  ${mobile({ display: "none" })}
`;

const SearchContainer = styled.div`
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;

  padding: 5px;
`;
const Input = styled.input`
  border: none;
  ${mobile({ width: "50px" })}
`;
const Center = styled.div`
  flex: 1;
  text-align: center;
  ${mobile({ flex: 1 })}
`;
const Logo = styled.h1`
  font-weight: bold;
  &:hover {
    cursor: pointer;
  }
  color: #29a3a3;

  ${mobile({ fontSize: "30px", paddingLeft: "20px" })}
`;
const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({ flex: 1, paddingRight: "20px" })}
`;
const MenuItems = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;

  &:hover {
    color: #29a3a3;
  }

  ${mobile({ fontSize: "12px" })}
`;

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <Wrapper>
        <Left>
          <SearchContainer>
            <Input />
            <SearchIcon style={{ color: "gray", fontSize: 16 }} />
          </SearchContainer>
        </Left>
        <Center>
          <Logo onClick={() => navigate("/")}>TeeSociety</Logo>
        </Center>
        <Right>
          <MenuItems onClick={() => navigate("/register")}>REGISTER</MenuItems>
          <MenuItems onClick={() => navigate("/login")}>SIGN IN</MenuItems>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;
