import React from "react";
import SvgIcon from "@mui/material/SvgIcon";
import RadioButtonUncheckedTwoToneIcon from "@mui/icons-material/RadioButtonUncheckedTwoTone";

export const MakeCamerabutton = ({ captureImage }) => {
  return (
    <SvgIcon onClick={captureImage} variant="contained" color="success">
      <RadioButtonUncheckedTwoToneIcon />
    </SvgIcon>
  );
};

export default MakeCamerabutton;
