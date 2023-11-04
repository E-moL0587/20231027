import { Button } from "@mui/material";
import React from "react";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";

export const Makebutton = ({ onCamera }) => {
  return (
    <Button
      onClick={onCamera}
      variant="contained"
      color="success"
      startIcon={<PhotoCameraIcon />}
    >
      撮影する
    </Button>
  );
};

export default Makebutton;
