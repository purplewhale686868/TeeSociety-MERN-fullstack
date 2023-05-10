import React from "react";
import styled from "styled-components";
import { mobile } from "../responsive";
// import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "../redux/userSlice";
import { Formik } from "formik";
import * as yup from "yup";
import { requestMethod } from "../requestMethods";

const loginSchema = yup.object().shape({
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
});

const initialValuesLogin = {
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
  width: 25%;
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
  margin: 10px 0;
  padding: 10px;
`;

const Button = styled.button`
  width: 50%;
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
const Link = styled.a`
  margin: 5px 0px;
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
`;
const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClick = async (values, onSubmitProps) => {
    const response = await requestMethod.post("/auth/login", values, {
      headers: { "Content-Type": "application/json" },
    });
    console.log(response);

    if (response) {
      dispatch(
        setLogin({
          user: response.data.user,
          token: response.data.token,
        })
      );
      navigate("/home");
    }
  };

  const handleFormSubmit = async (values, onSubmitProps) => {
    await handleClick(values, onSubmitProps);
  };
  return (
    <Container>
      <Wrapper>
        <Title>SIGN IN</Title>
        <Formik
          onSubmit={handleFormSubmit}
          initialValues={initialValuesLogin}
          validationSchema={loginSchema}
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
                name="email"
                type="email"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
                error={Boolean(touched.email) && Boolean(errors.email)}
                helperText={touched.email && errors.email}
                // onChange={(e) => setEmail(e.target.value)}
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
                // onChange={(e) => setaPassword(e.target.value)}
                placeholder="Password"
              />

              <Button
                type="submit"
                // onClick={handleClick}
              >
                LOG IN
              </Button>
              <Link>DON'T REMEMBER THE PASSWORD?</Link>
              <Link onClick={() => navigate("/register")}>
                DON'T HAVE AN ACCOUNT. REGISTER HERE.
              </Link>
            </Form>
          )}
        </Formik>
      </Wrapper>
    </Container>
  );
};

export default Login;
