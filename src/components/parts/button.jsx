import { Button } from "@mui/material";
import React from "react";

export const Makebutton = ({ onCamera }) => {
  return (
    <Button onClick={onCamera} variant="contained" color="success">
      撮影する
    </Button>
  );
};

export default Makebutton;
