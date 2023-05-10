import React from "react";
import styled from "styled-components";
import { mobile } from "../responsive";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  width: 100%;
  height: 30vh;
  background-color: white;
  border-radius: 10px;
  border: 1px solid #29a3a3;
  display: flex;
  align-items: center;
  margin-bottom: 30px;
  ${mobile({
    flexDirection: "column",
    height: "70vh",
    marginBottom: "20px",
  })}
`;

const ImgContainer = styled.div`
  flex: 0.9;
  height: 100%;

  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  ${mobile({
    flex: 1,
  })}
`;

const ImgWrapper = styled.div`
  width: 90%;
  height: 90%;

  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  ${mobile({
    width: "100%",
  })}
`;

const Image = styled.img`
  width: 100%;
  height: 100%;

  object-fit: scale-down;

  z-index: 2;
`;

const UploadDivNoBorder = styled.div`
  height: 50%;
  max-width: 45%;
  z-index: 3;
  position: absolute;
  background-color: transparent;

  display: flex;
  align-items: center;
  justify-content: center;
  ${mobile({
    width: "45%",
  })}
`;

const UploadImage = styled.img`
  height: 100%;
  object-fit: contain;
  width: 100%;
`;

const InfoContainer = styled.div`
  flex: 3;
  height: 100%;
  width: 100%;
  padding: 20px 50px;

  ${mobile({
    flex: 1,
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  })}
`;

// flexDirection: "column",
const TitlePriceContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 20px;
  ${mobile({
    flexDirection: "column",
  })};
`;

const TitleContainer = styled.div`
  ${mobile({
    paddingBottom: "20px",
  })};
`;

const Title = styled.h1`
  font-size: 26px;
  font-weight: 500;
  cursor: pointer;

  &:hover {
    color: #29a3a3;
  }
`;

const PriceContainer = styled.div``;

const Price = styled.h1`
  font-size: 26px;
  font-weight: 500;
`;

const OtherContainer = styled.div``;

const ColorSize = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 20px;
  width: 50%;
  ${mobile({ width: "100%" })}
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

const AddContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 50%;

  ${mobile({
    flexDirection: "column",
    width: "100%",
  })}
`;
// ${mobile({ width: "100%" })}
const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;

  ${mobile({
    paddingBottom: "20px",
  })};
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
  padding: 10px;
  border: 2px solid #29a3a3;
  background-color: white;
  cursor: pointer;
  font-weight: 600;
  border-radius: 3rem;

  &:hover {
    background-color: #29a3a3;
    color: white;
  }

  ${mobile({
    padding: "20px",
  })};
`;

const Listing = ({ listing }) => {
  const navigate = useNavigate();
  return (
    <Container>
      <ImgContainer>
        <ImgWrapper>
          <Image src={listing.colors[0].colorPath} />

          <UploadDivNoBorder>
            <UploadImage src={listing.pngPath} />
          </UploadDivNoBorder>
        </ImgWrapper>
      </ImgContainer>

      <InfoContainer>
        <TitlePriceContainer>
          <TitleContainer>
            <Title onClick={() => navigate(`/listing/${listing._id}`)}>
              {listing.title}
            </Title>
          </TitleContainer>
          <PriceContainer>
            <Price>$ {listing.price}</Price>
          </PriceContainer>
        </TitlePriceContainer>

        <OtherContainer>
          <ColorSize>
            <Colors>
              <FilterTitle>Color</FilterTitle>
              <FilterColor>
                {listing.colors?.map((color) => (
                  <FilterColorOption>{color.colorName}</FilterColorOption>
                ))}
              </FilterColor>
            </Colors>
            <Sizes>
              <FilterTitle>Size</FilterTitle>
              <FilterSize>
                {listing.sizes?.map((size) => (
                  <FilterSizeOption>{size}</FilterSizeOption>
                ))}
              </FilterSize>
            </Sizes>
          </ColorSize>

          <AddContainer>
            <AmountContainer>
              <RemoveIcon sx={{ "&:hover": { cursor: "pointer" } }} />
              <Amount>1</Amount>
              <AddIcon
                sx={{ "&:hover": { cursor: "pointer" } }}
                // onClick={() => handleQuantity("inc")}
              />
            </AmountContainer>

            <Button
              // onClick={handleClick}
              onClick={() => navigate(`/listing/${listing._id}`)}
            >
              SHOP NOW
            </Button>
          </AddContainer>
        </OtherContainer>
      </InfoContainer>
    </Container>
  );
};

export default Listing;
