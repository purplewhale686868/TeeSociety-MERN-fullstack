import React from "react";
import styled from "styled-components";
import SearchIcon from "@mui/icons-material/Search";
import { mobile } from "../responsive";
import { useDispatch, useSelector } from "react-redux";
import { setLogout } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";
import {
  InputBase,
  Typography,
  Select,
  MenuItem,
  FormControl,
  Box,
} from "@mui/material";
import Badge from "@mui/material/Badge";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";

const Container = styled.div`
  height: 60px;
  background-color: #29a3a3;
  color: white;
`;

// const Hr = styled.hr`
//   background-color: #eee;
//   border: none;
//   height: 1px;
// `;

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

  ${mobile({ fontSize: "30px", paddingLeft: "20px" })}
`;
const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({ flex: 1, paddingRight: "20px" })}
`;

const NavbarAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.user);
  const quantity = useSelector((state) => state.cart.quantity);

  const username = user.user.username;

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
          <Logo onClick={() => navigate("/home")}>TeeSociety</Logo>
        </Center>

        <Right>
          <Box sx={{ mr: "20px" }}>
            <Badge badgeContent={quantity} color="secondary">
              <ShoppingCartOutlinedIcon
                onClick={() => navigate("/cart")}
                sx={{ "&:hover": { cursor: "pointer" } }}
              />
            </Badge>
          </Box>

          <FormControl variant="standard" value={username}>
            <Select
              value={username}
              sx={{
                backgroundColor: "white",

                borderRadius: "0.25rem",
                p: "0.25rem 1rem",
                "& .MuiSvgIcon-root": {
                  pr: "0.25rem",
                  width: "3rem",
                },
                "& .MuiSelect-select:focus": {
                  backgroundColor: "white",
                },
              }}
              input={<InputBase />}
            >
              <MenuItem value={username}>
                <Typography sx={{ fontFamily: "Raleway" }}>
                  {username}
                </Typography>
              </MenuItem>
              <MenuItem
                sx={{ fontFamily: "Raleway" }}
                onClick={() => {
                  dispatch(setLogout());

                  navigate("/");
                }}
              >
                Log Out
              </MenuItem>
            </Select>
          </FormControl>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default NavbarAuth;
