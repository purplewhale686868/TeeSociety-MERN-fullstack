import React from "react";
import NavbarAuth from "../components/NavbarAuth";
import styled from "styled-components";
import { mobile } from "../responsive";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { requestMethod } from "../requestMethods";

import StripeCheckout from "react-stripe-checkout";

const KEY = process.env.REACT_APP_STRIPE;

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 20px;
  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
  margin-bottom: 30px;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const Info = styled.div`
  flex: 3;
`;
const ContainerInside = styled.div`
  width: 100%;
  height: 30vh;

  display: flex;
  align-items: center;

  ${mobile({
    flexDirection: "column",
    height: "55vh",
    marginBottom: "20px",
  })}
`;

const ImgContainer = styled.div`
  flex: 1;
  height: 100%;

  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
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
`;

const UploadImage = styled.img`
  height: 100%;
  object-fit: contain;
  width: 100%;
`;

const InfoContainer = styled.div`
  flex: 2;
  height: 100%;
  width: 100%;
  padding: 20px 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;

  ${mobile({
    flex: 1,
    padding: "20px",
  })}
`;

// flexDirection: "column",
const TitlePriceContainer = styled.div`
  display: flex;
  align-items: center;

  padding-bottom: 20px;
  ${mobile({
    justifyContent: "center",
  })}
`;

const TitleContainer = styled.div`
  ${mobile({
    paddingBottom: "20px",
  })};
`;

const ListingTitle = styled.h1`
  font-size: 26px;
  font-weight: 500;
  cursor: pointer;

  &:hover {
    color: #29a3a3;
  }
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

const AddContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 50%;

  ${mobile({
    width: "100%",
  })}
`;
// ${mobile({ width: "100%" })}

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
  margin-bottom: 20px;
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 60vh;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #29a3a3;
  color: white;
  font-weight: 600;
  border: 2px solid #29a3a3;
  border-radius: 10px;
  cursor: pointer;

  &:hover {
    background-color: white;
    color: #29a3a3;
  }
`;

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const userToken = useSelector((state) => state.user.token);

  const [stripeToken, setStripeToken] = useState(null);
  let navigate = useNavigate();
  // const dispatch = useDispatch();

  const onToken = (token) => {
    setStripeToken(token);
  };

  useEffect(() => {
    const makeRequest = async () => {
      try {
        const res = await requestMethod.post(
          "/checkout/payment",
          {
            tokenId: stripeToken.id,
            amount: cart.total * 100,
          },
          {
            headers: {
              Authorization: `Bearer ${userToken}`,
            },
          }
        );
        navigate("/success", {
          state: {
            stripeData: res.data,
          },
        });
      } catch {}
    };
    stripeToken && makeRequest();
  }, [stripeToken, cart.total, navigate, userToken]);
  // dispatch(emptyCart());

  return (
    <div>
      <NavbarAuth />
      <Container>
        <Wrapper>
          <Title>YOUR CART</Title>
          <Bottom>
            <Info>
              {cart.products.map((product) => (
                <div>
                  <ContainerInside>
                    <ImgContainer>
                      <ImgWrapper>
                        <Image src={`../assets/${product.color}.png`} />

                        <UploadDivNoBorder>
                          <UploadImage src={product.pngPath} />
                        </UploadDivNoBorder>
                      </ImgWrapper>
                    </ImgContainer>

                    <InfoContainer>
                      <TitlePriceContainer>
                        <TitleContainer>
                          <ListingTitle>{product.title}</ListingTitle>
                        </TitleContainer>
                      </TitlePriceContainer>

                      <OtherContainer>
                        <ColorSize>
                          <Colors>
                            <FilterTitle>Color: {product.color}</FilterTitle>
                          </Colors>
                          <Sizes>
                            <FilterTitle>Size: {product.size}</FilterTitle>
                          </Sizes>
                        </ColorSize>

                        <AddContainer>
                          <FilterTitle>
                            Quantity: {product.quantity}
                          </FilterTitle>

                          <FilterTitle>
                            Amount: $ {product.price * product.quantity}
                          </FilterTitle>
                        </AddContainer>
                      </OtherContainer>
                    </InfoContainer>
                  </ContainerInside>
                  <Hr />
                </div>
              ))}
            </Info>
            <Summary>
              <SummaryTitle>ORDER SUMMARY</SummaryTitle>
              <SummaryItem>
                <SummaryItemText>Subtotal</SummaryItemText>
                <SummaryItemPrice>$ {cart.total}</SummaryItemPrice>
              </SummaryItem>
              <SummaryItem>
                <SummaryItemText>Estimated Shipping</SummaryItemText>
                <SummaryItemPrice>$ 5.90</SummaryItemPrice>
              </SummaryItem>
              <SummaryItem>
                <SummaryItemText>Shipping Discount</SummaryItemText>
                <SummaryItemPrice>$ -5.90</SummaryItemPrice>
              </SummaryItem>
              <SummaryItem type="total">
                <SummaryItemText>Total</SummaryItemText>
                <SummaryItemPrice>$ {cart.total}</SummaryItemPrice>
              </SummaryItem>
              <StripeCheckout
                name="TeeSociety"
                image="https://media.istockphoto.com/id/874045548/vector/shirt-icon.jpg?s=612x612&w=0&k=20&c=ZJCxsCczemu1XhYRMDCByrYdwotBESuFdC5tkGf1a6g="
                billingAddress
                shippingAddress
                description={`Your total is $${cart.total}`}
                amount={cart.total * 100}
                token={onToken}
                stripeKey={KEY}
              >
                <Button>CHECKOUT NOW</Button>
              </StripeCheckout>
            </Summary>
          </Bottom>
        </Wrapper>
      </Container>
    </div>
  );
};

export default Cart;
