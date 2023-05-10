import React from "react";
import Navbar from "../components/Navbar";
import Slider from "../components/Slider";
import CreateButton from "../components/CreateButton";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <div>
      <Navbar />
      <Slider />
      <CreateButton />
      <Newsletter />
      <Footer />
    </div>
  );
};

export default Home;
