import React from "react";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import HomeAuth from "./pages/HomeAuth";
import CreateListing from "./pages/CreateListing";
import Listing from "./pages/Listing";
import Cart from "./pages/Cart";
import Success from "./pages/Success";

import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";

// export const apiUrl = process.env.API_URL;

function App() {
  const isAuth = Boolean(useSelector((state) => state.user.token));
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />

        <Route path="/home" element={<HomeAuth />} />

        <Route path="/register" element={<Register />} />

        <Route
          path="/login"
          element={isAuth ? <Navigate to="/home" /> : <Login />}
        />

        <Route path="/createListing" element={<CreateListing />} />

        <Route path="/listing/:id" element={<Listing />} />

        <Route exact path="/cart" element={<Cart />} />

        <Route exact path="/success" element={<Success />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
