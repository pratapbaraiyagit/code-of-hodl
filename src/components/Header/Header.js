import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import "./header.css";
import { styled } from "@mui/material/styles";

const StyledButton = styled(Button)(({ theme }) => ({
  fontFamily: "Kaushan Script",
  fontSize: "20px",
  color: "inherit",
  "&:hover": {
    color: "#00FF93",
  },
  "&:active": {
    color: "#00FF93",
  },
}));

const Header = () => {
  return (
    <AppBar
      position="fixed"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.73)", height: "80px" }}
    >
      <Toolbar>
        <img src="/logo.png" alt="logo" className="logo" />

        <div className="menu">
          <StyledButton color="inherit">Mini NFT</StyledButton>
          <StyledButton color="inherit">Airdrop</StyledButton>
          <StyledButton color="inherit">Slake</StyledButton>
        </div>

        <Button
          color="inherit"
          style={{
            fontFamily: "Kaushan Script",
            fontSize: "14px",
            fontWeight: 400,
            lineHeight: "29.02px",
            textAlign: "center",
            width: "126px",
            height: "45px",
            background: "linear-gradient(to right, #479863, #234D95)",
            border: "3px solid",
            backgroundImage: "linear-gradient(to right, #479863, #234D95)",
            borderRadius: "20px",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
            marginTop: "20px",
            marginRight: "120px",
          }}
        >
          Connect
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
