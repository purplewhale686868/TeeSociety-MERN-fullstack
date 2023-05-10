import React from "react";
import styled from "styled-components";
import { mobile } from "../responsive";
import { useNavigate } from "react-router-dom";
import { Formik } from "formik";
import * as yup from "yup";
import { requestMethod } from "../requestMethods";

// import { apiUrl } from "../App";

const registerSchema = yup.object().shape({
  username: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
});

const initialValuesRegister = {
  username: "",
  email: "",
  password: "",
};

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.unsplash.com/photo-1624258012762-6c0fc69cccf5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fHRzaGlydHxlbnwwfDB8MHx8&auto=format&fit=crop&w=600&q=60")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Wrapper = styled.div`
  width: 40%;
  padding: 20px;
  background-color: white;
  ${mobile({ width: "75%" })}
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
`;
const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;
const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
`;
const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0px;
`;
const Button = styled.button`
  width: 40%;
  font-size: 20px;
  font-weight: 500;
  padding: 15px 20px;
  background-color: #29a3a3;
  color: white;
  cursor: pointer;
  border-radius: 5px;
  border: 2px solid #29a3a3;

  &:hover {
    background-color: white;
    color: #29a3a3;
  }
  ${mobile({ width: "60%" })}
`;

const Register = () => {
  const navigate = useNavigate();

  const handleClick = async (values, onSubmitProps) => {
    // e.preventDefault();

    const response = await requestMethod.post("/auth/register", values, {
      headers: { "Content-Type": "application/json" },
    });

    if (response) {
      navigate("/login");
    }
  };

  const handleFormSubmit = async (values, onSubmitProps) => {
    await handleClick(values, onSubmitProps);
  };

  return (
    <Container>
      <Wrapper>
        <Title>CREATE AN ACCOUNT</Title>
        <Formik
          onSubmit={handleFormSubmit}
          initialValues={initialValuesRegister}
          validationSchema={registerSchema}
        >
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
            setFieldValue,
            resetForm,
          }) => (
            <Form onSubmit={handleSubmit}>
              <Input
                name="username"
                type="text"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.username}
                error={Boolean(touched.username) && Boolean(errors.username)}
                helperText={touched.username && errors.username}
                placeholder="Username"
              />

              <Input
                name="email"
                type="email"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
                error={Boolean(touched.email) && Boolean(errors.email)}
                helperText={touched.email && errors.email}
                placeholder="Email"
              />
              <Input
                name="password"
                type="password"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.password}
                error={Boolean(touched.password) && Boolean(errors.password)}
                helperText={touched.password && errors.password}
                placeholder="Password"
              />

              <Agreement>
                By creating an account, I consent to the processing of my
                personal data in accordance with the <b>PRIVACY POLICY.</b>
              </Agreement>
              <Button type="submit">REGISTER</Button>
            </Form>
          )}
        </Formik>
      </Wrapper>
    </Container>
  );
};

export default Register;
