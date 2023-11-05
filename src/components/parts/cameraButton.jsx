import React from "react";
import SvgIcon from "@mui/material/SvgIcon";
import RadioButtonUncheckedTwoToneIcon from "@mui/icons-material/RadioButtonUncheckedTwoTone";
import Brightness1Icon from "@mui/icons-material/Brightness1";;

export const MakeCamerabutton = ({ captureImage }) => {
  return (
    <SvgIcon
      onClick={captureImage}
      variant="contained"
      color="success"
      sx={{width:"150px", height:"150px", padding:"110px", left:"42%"}}
    >
      <RadioButtonUncheckedTwoToneIcon />
    </SvgIcon>
  );
};

export default MakeCamerabutton;
