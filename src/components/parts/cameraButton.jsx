import React from "react";
import SvgIcon from "@mui/material/SvgIcon";
import RadioButtonUncheckedTwoToneIcon from "@mui/icons-material/RadioButtonUncheckedTwoTone";
import Brightness1Icon from "@mui/icons-material/Brightness1";

export const MakeCamerabutton = ({ captureImage }) => {
  return (
    <SvgIcon
      onClick={captureImage}
      height="10em"
      width="10em"
      variant="contained"
      color="success"
    >
      <Brightness1Icon />
    </SvgIcon>
  );
};

export default MakeCamerabutton;
