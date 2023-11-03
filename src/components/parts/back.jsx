import React, { useState } from "react";
import SvgIcon from "@mui/material/SvgIcon";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";

export const Makebackbutton = ({ hl_Back }) => {
  return (
    <SvgIcon onClick={hl_Back} variant="contained" color="success">
      <ArrowCircleLeftIcon />
    </SvgIcon>
  );
};

export default Makebackbutton;
