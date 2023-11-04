import React, { useState } from "react";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import HomeIcon from "@mui/icons-material/Home";
import CollectionsBookmarkIcon from "@mui/icons-material/CollectionsBookmark";
import MiscellaneousServicesIcon from "@mui/icons-material/MiscellaneousServices";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import ShareTwoToneIcon from "@mui/icons-material/ShareTwoTone";

export const SimpleBottomNavigation = ({ onBack, onAlbum, onShare }) => {
  const [value, setValue] = React.useState(0);

  return (
    <Box sx={{ width: "100%" }}>
      <BottomNavigation
        showLabels
        //value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction
          onClick={onBack}
          label="Home"
          icon={<HomeIcon />}
        />
        <BottomNavigationAction
          onClick={onAlbum}
          label="Album"
          icon={<CollectionsBookmarkIcon />}
        />
        <BottomNavigationAction
          onClick={onShare}
          label="Share"
          icon={<ShareTwoToneIcon />}
        />
        <BottomNavigationAction
          label="Setting"
          icon={<MiscellaneousServicesIcon />}
        />
      </BottomNavigation>
    </Box>
  );
};

export default SimpleBottomNavigation;
