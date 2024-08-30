import "./App.css";
import Navbar from "./components/Navbar";
import Routing from "./components/Routing";
import Footer from "./components/Footer";
import React from "react";

function App() {
  return (
    <React.Fragment>
      <Navbar />
      <Routing />
      <Footer />
    </React.Fragment>
  );
}

export default App;
