import React, { useState } from "react";
import NavbarAuth from "../components/NavbarAuth";
import { useEffect } from "react";
import { requestMethod } from "../requestMethods";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { mobile } from "../responsive";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useDispatch } from "react-redux";
import { addProduct } from "../redux/cartSlice";

const Container = styled.div`
  background-color: #f0f0f0;
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 90%;
  height: 80%;

  margin-top: -30px;
  background-color: white;
  border-radius: 10px;
  border: 1px solid #29a3a3;
  display: flex;
  align-items: center;
  ${mobile({ padding: "10px", flexDirection: "column", height: "80%" })}
`;
const ImgContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ImgWrapper = styled.div`
  width: 90%;

  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  ${mobile({ width: "100%" })}
`;

const Image = styled.img`
  width: 100%;

  object-fit: scale-down;

  z-index: 2;
  ${mobile({ width: "100%" })}
`;

const UploadDivNoBorder = styled.div`
  height: 50%;
  width: 45%;
  z-index: 3;
  position: absolute;
  background-color: transparent;

  display: flex;
  align-items: center;
  justify-content: center;
`;

const UploadImage = styled.img`
  height: 100%;
  object-fit: contain;
  width: 100%;
`;

const InfoContainer = styled.div`
  flex: 1;
  height: 100%;
  width: 100%;
`;
const InfoWrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 50px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  ${mobile({ padding: "20px", alignItems: "center" })}
`;

const Title = styled.h1`
  color: #404040;
  font-weight: 500;
  font-size: 30px;
`;
const Price = styled.h1`
  color: #404040;
  font-weight: 500;
  font-size: 30px;
`;

const Colors = styled.div``;
const Sizes = styled.div``;

const FilterTitle = styled.span`
  font-size: 18px;
  font-weight: 400;
`;
const FilterSize = styled.select`
  margin-left: 10px;
  padding: 5px;
`;
const FilterSizeOption = styled.option``;

const FilterColor = styled.select`
  margin-left: 10px;
  padding: 5px;
`;
const FilterColorOption = styled.option``;
const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
`;

const Amount = styled.span`
  width: 30px;
  height: 30px;
  border-radius: 10px;
  border: 1px solid teal;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 5px;
`;

const Button = styled.button`
  width: 40%;
  padding: 10px;
  border: 2px solid #29a3a3;
  background-color: white;
  cursor: pointer;
  font-weight: 600;
  border-radius: 3rem;
  color: #29a3a3;

  &:hover {
    background-color: #29a3a3;
    color: white;
  }

  ${mobile({
    padding: "20px",
    width: "60%",
  })};
`;

const Listing = () => {
  const [listing, setListing] = useState(null);
  const location = useLocation();
  const listingId = location.pathname.split("/")[2];

  const token = useSelector((state) => state.user.token);

  const [quantity, setQuantity] = useState(1);
  const [color, setColor] = useState(null);
  const [size, setSize] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    const getListing = async () => {
      const response = await requestMethod.get(`/listings/find/${listingId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          // "Content-Type": "application/json",
        },
      });

      const data = response.data;
      setListing(data);

      console.log(data);
    };
    getListing();
  }, [listingId, token]);

  const handleQuantity = (type) => {
    if (type === "remove") {
      quantity > 1 && setQuantity(quantity - 1);
    } else {
      setQuantity(quantity + 1);
    }
  };
  console.log(color);

  const handleClick = () => {
    color &&
      size &&
      dispatch(addProduct({ ...listing, quantity, color, size }));
  };

  return (
    <div>
      <NavbarAuth />
      <Container>
        <Wrapper>
          <ImgContainer>
            <ImgWrapper>
              {color === null ? (
                <Image src={listing?.colors[0].colorPath} />
              ) : (
                <Image src={`../assets/${color}.png`} />
              )}
              <UploadDivNoBorder>
                <UploadImage src={listing?.pngPath} />
              </UploadDivNoBorder>
            </ImgWrapper>
          </ImgContainer>

          <InfoContainer>
            <InfoWrapper>
              <Title>{listing?.title}</Title>
              <Price>$ {listing?.price}</Price>
              <Colors>
                <FilterTitle>Color</FilterTitle>
                <FilterColor
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                >
                  {listing?.colors.map((color) => (
                    <FilterColorOption>{color.colorName}</FilterColorOption>
                  ))}
                </FilterColor>
              </Colors>
              <Sizes>
                <FilterTitle>Size</FilterTitle>
                <FilterSize
                  value={size}
                  onChange={(e) => setSize(e.target.value)}
                >
                  {listing?.sizes.map((size) => (
                    <FilterSizeOption>{size}</FilterSizeOption>
                  ))}
                </FilterSize>
              </Sizes>
              <AmountContainer>
                <RemoveIcon
                  sx={{ "&:hover": { cursor: "pointer" } }}
                  onClick={() => handleQuantity("remove")}
                />
                <Amount>{quantity}</Amount>
                <AddIcon
                  sx={{ "&:hover": { cursor: "pointer" } }}
                  onClick={() => handleQuantity("add")}
                />
              </AmountContainer>

              <Button onClick={handleClick}>ADD TO CART</Button>
            </InfoWrapper>
          </InfoContainer>
        </Wrapper>
      </Container>
    </div>
  );
};

export default Listing;
