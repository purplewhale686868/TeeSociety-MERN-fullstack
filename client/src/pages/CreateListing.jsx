import React, { useState } from "react";
import NavbarAuth from "../components/NavbarAuth";
import { requestMethod } from "../requestMethods";

import styled from "styled-components";
import { mobile } from "../responsive";
import { colorItems } from "../data";
import {
  // Box,
  // Divider,
  Typography,
  // InputBase,
  // Button,
  // IconButton,
} from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
// import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

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
  ${mobile({ padding: "10px", flexDirection: "column", height: "90%" })}
`;
const ImgContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  ${mobile({ flex: 0.85 })}
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
const UploadDiv = styled.div`
  height: 50%;
  width: 45%;
  z-index: 3;
  position: absolute;
  background-color: transparent;
  border: 1px dashed #29a3a3;
  display: flex;
  align-items: center;
  justify-content: center;
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
  ${mobile({ flex: 1.15 })}
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

const TitleInput = styled.input`
  width: 100%;

  border-radius: 2rem;
  padding: 10px 20px;
  border: 1px solid #29a3a3;
  font-size: 16px;
`;
const Description = styled.p`
  font-size: 14px;
  font-style: italic;
  color: #999999;
`;

const ChooseFileDiv = styled.div``;

const ChooseFile = styled.input``;

const ButtonContainer = styled.div`
  display: flex;

  ${mobile({
    width: "100%",
    justifyContent: "space-between",
  })}
`;
const UploadButton = styled.button`
  width: 30%;
  border-radius: 3rem;
  padding: 10px 0;
  background-color: white;
  color: #248f24;
  font-weight: 600;
  border: 2px solid #248f24;
  cursor: pointer;

  &:hover {
    background-color: #248f24;
    color: white;
  }

  ${mobile({ width: "40%" })}
`;
const RemoveButton = styled.button`
  width: 30%;
  border-radius: 3rem;
  padding: 10px 0;
  margin-left: 20px;
  background-color: white;
  color: #e60000;
  font-weight: 600;
  border: 2px solid #e60000;
  cursor: pointer;

  &:hover {
    background-color: #e60000;
    color: white;
  }
  ${mobile({ width: "40%" })}
`;

const CreateButtonContainer = styled.div`
  display: flex;

  align-items: center;

  width: 100%;
  ${mobile({ justifyContent: "center" })};
`;

const CreateButton = styled.button`
  width: 30%;
  border-radius: 3rem;
  padding: 10px 0;
  font-size: 20px;

  background-color: #29a3a3;
  color: white;
  font-weight: 600;
  border: 2px solid #29a3a3;

  cursor: pointer;

  &:hover {
    background-color: white;
    color: #29a3a3;
  }

  ${mobile({ width: "50%" })};
`;

const ColorContainer = styled.div``;
const Color = styled.p`
  color: #404040;
  font-weight: 500;
  font-size: 20px;
`;

const NoticeText = styled.span`
  color: red;

  font-size: 12px;
`;
const ColorChoice = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-family: "Raleway";
`;
// ${mobile({ flexWrap: "wrap" })}
const ColorDiv = styled.div`
  flex: 1;
`;

const CreateListing = () => {
  const token = useSelector((state) => state.user.token);
  const user = useSelector((state) => state.user.user);
  const [pngFile, setPngFile] = useState(null);
  const [PNGurl, setPNGurl] = useState(null);

  const [title, setTitle] = useState("");

  let allColors = [];

  const [color, setColor] = useState(null);
  const [selectedColors, setSelectedColors] = useState([]);

  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setPngFile(e.target.files[0]);
  };

  // Handle file upload
  const handleUpload = async () => {
    // document.getElementById("getFile").click();
    const formData = new FormData();
    if (pngFile) {
      formData.append("image", pngFile);
    }

    console.log(pngFile);

    try {
      const response = await requestMethod.post("/uploadPNG", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(response);

      const { url } = response.data;
      setPNGurl(url);

      console.log(url);
    } catch (error) {
      // Handle any errors
      console.error(error);
    }
  };

  console.log(PNGurl);

  const handleRemove = () => {
    setPngFile(null);
    setPNGurl(null);

    console.log(pngFile);
    console.log(PNGurl);
  };

  // console.log(color);

  const handleColor = (event) => {
    const option = event.target.value;
    const index = selectedColors.indexOf(option);

    if (index > -1) {
      setSelectedColors(selectedColors.filter((item) => item !== option));
    } else {
      setSelectedColors([...selectedColors, option]);
    }

    if (event.target.checked) {
      setColor(option);
    } else {
      setColor(null);
    }
  };

  console.log(selectedColors);
  console.log(color);

  // allColors.push(color);
  selectedColors.forEach((color) =>
    allColors.push({
      colorName: color,
      colorPath: `../assets/${color}.png`,
    })
  );
  console.log(allColors);
  console.log(title);

  const handleCreate = async () => {
    const response = await requestMethod.post(
      "/listings/newListing",
      {
        userId: user._id,
        title: title,
        pngPath: PNGurl,
        colors: allColors,
      },

      {
        headers: {
          Authorization: `Bearer ${token}`,
          // "Content-Type": "application/json",
        },
      }
    );
    const allListings = response.data;

    console.log(allListings);
    navigate("/home");
  };

  return (
    <div>
      <NavbarAuth />
      <Container>
        <Wrapper>
          <ImgContainer>
            <ImgWrapper>
              {color === null ? (
                <Image src="../assets/beige.png" />
              ) : (
                <Image src={`../assets/${color}.png`} />
              )}

              {pngFile === null ? (
                <UploadDiv>
                  <UploadImage
                  // src={PNGurl}
                  />
                  {/* src="../assets/fall.png" */}
                </UploadDiv>
              ) : (
                <UploadDivNoBorder>
                  <UploadImage src={PNGurl} />
                  {/* src="../assets/fall.png" */}
                </UploadDivNoBorder>
              )}
            </ImgWrapper>
          </ImgContainer>

          <InfoContainer>
            <InfoWrapper>
              <Title>Title:</Title>

              <TitleInput
                onChange={(e) => setTitle(e.target.value)}
                value={title}
              />
              <Description>
                (Upload a PNG artwork file (150DPI, maximum 10MB) and select
                color(s) to design your product.)
              </Description>
              <ChooseFileDiv>
                <ChooseFile
                  type="file"
                  onChange={handleFileChange}
                  id="getFile"
                  // style={{ display: "none" }}
                />
              </ChooseFileDiv>

              <ButtonContainer>
                <UploadButton onClick={handleUpload}>
                  Upload Artwork
                </UploadButton>
                <RemoveButton onClick={handleRemove}>
                  Remove Artwork
                </RemoveButton>
              </ButtonContainer>

              <ColorContainer>
                <Color>
                  Color: <NoticeText>(Pick at least two*)</NoticeText>
                </Color>

                <FormControl component="fieldset" variant="standard">
                  <FormGroup>
                    <ColorChoice>
                      {colorItems.map((color) => (
                        <ColorDiv>
                          <FormControlLabel
                            control={
                              <Checkbox
                                key={color.id}
                                checked={selectedColors.includes(color.title)}
                                onChange={handleColor}
                                name={color.title}
                                value={color.title}
                                sx={{
                                  color: color.bg,
                                  "&.Mui-checked": {
                                    color: color.bg,
                                  },
                                }}
                              />
                            }
                            label={
                              <Typography
                                variant="body2"
                                color="textSecondary"
                                sx={{ fontFamily: "Raleway" }}
                              >
                                {color.title}
                              </Typography>
                            }
                          />
                        </ColorDiv>
                      ))}
                    </ColorChoice>
                  </FormGroup>
                </FormControl>
              </ColorContainer>

              <CreateButtonContainer>
                <CreateButton onClick={handleCreate}>CREATE</CreateButton>
              </CreateButtonContainer>
            </InfoWrapper>
          </InfoContainer>
        </Wrapper>
      </Container>
    </div>
  );
};

export default CreateListing;
