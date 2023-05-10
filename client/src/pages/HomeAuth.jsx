import React from "react";
import NavbarAuth from "../components/NavbarAuth";
import CreateButtonAuth from "../components/CreateButtonAuth";
import styled from "styled-components";
import AllListings from "../components/AllListings";

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

const HomeAuth = () => {
  return (
    <div>
      <NavbarAuth />
      <Container>
        <CreateButtonAuth />
        <AllListings />
      </Container>
    </div>
  );
};

export default HomeAuth;
