import React, { useState } from "react";
import KeyboardArrowLeftOutlinedIcon from "@mui/icons-material/KeyboardArrowLeftOutlined";
import KeyboardArrowRightOutlinedIcon from "@mui/icons-material/KeyboardArrowRightOutlined";
import styled from "styled-components";
import { sliderItems } from "../data";
import { mobile } from "../responsive";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  width: 100%;
  height: 100vh;
  position: relative;
  display: flex;
  overflow: hidden;
  ${mobile({ height: "35vh" })}
`;

// display: "none"

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  transition: all 1.5s ease;
  transform: translateX(${(props) => props.slideIndex * -100}vw);
`;

const Slide = styled.div`
  align-items: center;
  display: flex;
  width: 100vw;
  height: 100%;
  background-color: #${(props) => props.bg};
`;

const ImgContainer = styled.div`
  flex: 1;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Image = styled.img`
  height: 80%;
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 40px;
  display: flex;
  flex-direction: column;

  justify-content: space-between;
  align-items: start;
  ${mobile({
    padding: "40px 20px",
  })}
`;

const TextDiv = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  margin: 30px 0;
`;

const Title = styled.h1`
  font-size: 50px;
  color: #404040;
  ${mobile({ fontSize: "33px" })}
`;

const Desc = styled.p`
  font-size: 20px;
  font-weight: 500;
  letter-spacing: 1px;
  color: #333333;
  ${mobile({ fontSize: "14px" })}
`;
const ButtonDiv = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  margin: 30px 0;
  ${mobile({ display: "none" })}
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
  ${mobile({ fontSize: "14px" })}
`;
// transform: scale(1.1);

const Arrow = styled.div`
  height: 50px;
  width: 50px;
  background-color: #f2f2f2;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  bottom: 0;
  left: ${(props) => props.direction === "left" && "10px"};
  right: ${(props) => props.direction === "right" && "10px"};
  margin: auto;
  cursor: pointer;
  opacity: 0.5;
  z-index: 2;
`;

const Slider = () => {
  const navigate = useNavigate();
  const [slideIndex, setSlideIndex] = useState(0);
  const handleClick = (direction) => {
    if (direction === "left") {
      setSlideIndex(slideIndex > 0 ? slideIndex - 1 : 2);
    } else {
      setSlideIndex(slideIndex < 2 ? slideIndex + 1 : 0);
    }
  };
  return (
    <Container>
      <Arrow direction="left" onClick={() => handleClick("left")}>
        <KeyboardArrowLeftOutlinedIcon />
      </Arrow>
      <Wrapper slideIndex={slideIndex}>
        {sliderItems.map((item) => (
          <Slide key={item.id} bg={item.bg}>
            <ImgContainer>
              <Image src={item.img} />
            </ImgContainer>
            <InfoContainer>
              <TextDiv>
                <Title>{item.title}</Title>
              </TextDiv>

              <TextDiv>
                <Desc>{item.desc}</Desc>
              </TextDiv>

              <ButtonDiv>
                <Button onClick={() => navigate("/login")}>CREATE NOW</Button>
              </ButtonDiv>
            </InfoContainer>
          </Slide>
        ))}
      </Wrapper>
      <Arrow direction="right" onClick={() => handleClick("right")}>
        <KeyboardArrowRightOutlinedIcon />
      </Arrow>
    </Container>
  );
};

export default Slider;
