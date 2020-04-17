import React from "react";
import { BounceLoader } from "react-spinners";

const Loading = () => {
  const centerStyle = {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)"
  };

  const textStyle = {
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center"
  };

  return (
    <div style={centerStyle}>
      <BounceLoader color="#00ece0" />
      <br />
      <br />
      <div style={textStyle}>Loading ...</div>
    </div>
  );
};

export default Loading;
