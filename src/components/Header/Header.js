import React from "react";
import { useDisconnect, useWeb3Modal } from "@web3modal/ethers/react";
import { useWeb3ModalAccount } from "@web3modal/ethers/react";

import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import "./Header.css";
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
            marginTop: "20px",
            marginRight: "120px",
            padding: "0px 20px",
            background: "linear-gradient(to right, #479863, #234D95)",
            backgroundImage: "linear-gradient(to right, #479863, #234D95)",
            borderRadius: "20px",
            backgroundColor: "rgba(255, 255, 255, 0)", // Fully transparent background
            border: "0.8px solid #FFFFFF",
            borderImageSource:
              "linear-gradient(0deg, #D0E0F3, #D0E0F3), radial-gradient(124.52% 124.52% at -3.99% 35.36%, #00D1FF 0%, rgba(0, 209, 255, 0) 69.33%), radial-gradient(73.57% 73.57% at 0% 67.49%, #E478FF 0%, rgba(86, 102, 239, 0) 69.33%), radial-gradient(88.4% 88.4% at 86.12% 6.46%, #72E98A 0%, rgba(114, 233, 138, 0) 56.56%), radial-gradient(108.75% 108.75% at 117.11% 81.18%, #B566E6 0%, rgba(181, 102, 230, 0) 77.6%), radial-gradient(58.56% 126.24% at 31.37% 0%, rgba(255, 255, 255, 0.46) 0%, rgba(255, 255, 255, 0) 77.6%), radial-gradient(42.61% 55.51% at 60.46% 100%, rgba(255, 255, 255, 0.21) 0%, rgba(255, 255, 255, 0) 100%)",
            boxShadow: "0px 0px 2px 0px #00FF93, 0px 2px 2px 0px #E478FF",
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
