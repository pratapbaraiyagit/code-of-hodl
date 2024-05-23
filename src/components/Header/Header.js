import React from "react";
import { useDisconnect, useWeb3Modal } from "@web3modal/ethers/react";
import { useWeb3ModalAccount } from "@web3modal/ethers/react";

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
  const { open } = useWeb3Modal();

  const { address, chainId, isConnected } = useWeb3ModalAccount();
  const { disconnect } = useDisconnect();

  console.log(address);

  const handleConectWallet = () => {
    if (isConnected) {
      disconnect();
    } else {
      open();
    }
  };

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
            height: "45px",
            background: "linear-gradient(to right, #479863, #234D95)",
            border: "3px solid",
            backgroundImage: "linear-gradient(to right, #479863, #234D95)",
            borderRadius: "20px",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
            marginTop: "20px",
            marginRight: "120px",
            padding: "0px 20px",
          }}
          onClick={() => handleConectWallet()}
        >
          {isConnected ? (
            <Typography variant="h6" style={{ fontFamily: "Kaushan Script" }}>
              {address.slice(0, 6)}...{address.slice(-4)}
            </Typography>
          ) : (
            <Typography variant="h6" style={{ fontFamily: "Kaushan Script" }}>
              Connect
            </Typography>
          )}
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
