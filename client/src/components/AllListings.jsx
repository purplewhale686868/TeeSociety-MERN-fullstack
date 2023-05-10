import React from "react";
import styled from "styled-components";
import { mobile } from "../responsive";
import Listing from "./Listing";
import { useEffect } from "react";
import { useState } from "react";
import { requestMethod } from "../requestMethods";
import { useSelector } from "react-redux";

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 50px;
  ${mobile({ padding: "10px" })}
`;

const AllListings = () => {
  const [listings, setListings] = useState([]);

  const token = useSelector((state) => state.user.token);
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    const getListings = async () => {
      const response = await requestMethod.get(`/users/${user._id}/listings`, {
        headers: {
          Authorization: `Bearer ${token}`,
          // "Content-Type": "application/json",
        },
      });

      const data = response.data;
      setListings(data);

      console.log(data);
    };
    getListings();
  }, [user._id, token]);

  console.log(listings);

  return (
    <Container>
      {listings.map((listing) => (
        <Listing listing={listing} key={listing._id} />
      ))}
    </Container>
  );
};

export default AllListings;
