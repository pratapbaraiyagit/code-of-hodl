import React from "react";
import Header from "./components/Header/Header";
import Content from "./components/Content/Content";
import "./App.css";

const App = () => {
  return (
    <div
      className="App"
      style={{
        // textAlign: "center",
        // overflow: "hidden",
        height: "100vh",
        backgroundImage: "url(background-new.png)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        opacity: 0.9,
      }}
    >
      <Header />
      <Content />
    </div>
  );
};

export default App;
