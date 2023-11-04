import React from "react";
import SvgIcon from "@mui/material/SvgIcon";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";

export const Makebackbutton = ({ onBack }) => {
  return (
    <SvgIcon onClick={onBack} variant="contained" color="success">
      <ArrowCircleLeftIcon />
    </SvgIcon>
  );
};

export default Makebackbutton;
