import React, { useState } from "react";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import HomeIcon from "@mui/icons-material/Home";
import CollectionsBookmarkIcon from "@mui/icons-material/CollectionsBookmark";
import MiscellaneousServicesIcon from "@mui/icons-material/MiscellaneousServices";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";

export const SimpleBottomNavigation = () => {
  const [value, setValue] = React.useState(0);

  return (
    <Box sx={{ width: 500 }}>
      <BottomNavigation
        //showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction label="Home" icon={<HomeIcon />} />
        <BottomNavigationAction
          label="Album"
          icon={<CollectionsBookmarkIcon />}
        />
        <BottomNavigationAction label="Setting" icon={<ManageAccountsIcon />} />
      </BottomNavigation>
    </Box>
  );
};

export default SimpleBottomNavigation;
