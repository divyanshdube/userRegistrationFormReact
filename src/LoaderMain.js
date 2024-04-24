import React, { useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import "./App.css";
export default function LoadingMain(props) {
  const [open] = useState(props.showLoading);

  return (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={open}
    >
      <img
        src="/Loader.gif"
        style={{ width: "45px", height: "50px", background: "none" }}
        alt="loader"
      />
    </Backdrop>
  );
}
