import React, { useState, useEffect } from "react";
import { useWeb3ModalAccount } from "@web3modal/ethers/react";
import axios from "axios";
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Tabs,
  Tab,
  Button,
} from "@mui/material";
import "./Content.css";
import { toast } from "react-toastify";

const dummyData = [
  {
    no: 1,
    value:
      "Event Duration: The Event Will Run For 15 Days, From May 9th At 2:00 AM UTC To May 24th at 2:00 AM UTC.",
  },
  {
    no: 2,
    value:
      "Airdrop Distribution: The Airdrop Will Be Based On The Trading Volume And Listings Of Zome NFTs.",
  },
  {
    no: 3,
    value:
      "Listing Rewards: Users Whose Listings Rank In The Top 10% By Volume (Number Of Listings Multiplied By The Amount) Will Share 5% Of The Total Airdrop.",
  },
  {
    no: 4,
    value:
      "Trading Rewards: Traders Will Share 95% Of The Total Airdrop, Distributed In Proportion To Their Trading Volumes.",
  },
  {
    no: 5,
    value:
      "Eligible Markets: The Event Is Exclusive To The Opensea And OKX NFT Markets.",
  },
];

const tabData = ["Code of HODL", "$HODL"];

const Content = () => {
  const { address, chainId, isConnected } = useWeb3ModalAccount();

  const [selectedTab, setSelectedTab] = useState(0);
  const [airdropData, setAirdropData] = useState(0);
  const [claiming, setClaiming] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const fetchAirdropData = async () => {
    try {
      const response = await axios.get(
        `http://65.108.2.116:9010/http://65.108.2.116:8000/api/airdrop/${address}`
      );
      setAirdropData(response.data.amount);
    } catch (error) {
      console.error("Error fetching airdrop data:", error);
    }
  };

  useEffect(() => {
    if (isConnected && address) {
      fetchAirdropData();
    }
  }, [isConnected, address]);

  const handleClaim = async () => {
    setClaiming(true);
    try {
      const response = await axios.post(
        `http://65.108.2.116:9010/http://65.108.2.116:8000/api/airdrop/${address}`
      );
      console.log(response);
      toast.success(response.data.message);
    } catch (error) {
      console.error("Error claiming airdrop:", error);
    } finally {
      setClaiming(false);
    }
  };

  const calculateTimeLeft = () => {
    const endDate = new Date(Date.UTC(2024, 4, 24, 2, 0, 0));
    const difference = +endDate - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    } else {
      timeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    return timeLeft;
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  const formatTimeLeft = (timeLeft) => {
    return `${String(timeLeft.days).padStart(2, "0")}D ${String(
      timeLeft.hours
    ).padStart(2, "0")}H ${String(timeLeft.minutes).padStart(2, "0")}M ${String(
      timeLeft.seconds
    ).padStart(2, "0")}S`;
  };

  return (
    <Container
      style={{
        marginTop: "93px",
        marginBottom: "70px",
        padding: "20px",
        boxSizing: "border-box",
        width: "805px",
        // left: "558px",
        gap: "0px",
        opacity: "0px",
      }}
    >
      <Grid container spacing={3} justifyContent="center">
        <Grid item xs={12} md={10}>
          <div className="card_resp">
            <Card
              sx={{
                // width: "600px",
                borderRadius: "10px",
                border: "0.8px solid #FFFFFF",
                backgroundColor: "rgba(255, 255, 255, 0)", // Fully transparent background
                borderImageSource:
                  "linear-gradient(0deg, #D0E0F3, #D0E0F3), radial-gradient(124.52% 124.52% at -3.99% 35.36%, #00D1FF 0%, rgba(0, 209, 255, 0) 69.33%), radial-gradient(73.57% 73.57% at 0% 67.49%, #E478FF 0%, rgba(86, 102, 239, 0) 69.33%), radial-gradient(88.4% 88.4% at 86.12% 6.46%, #72E98A 0%, rgba(114, 233, 138, 0) 56.56%), radial-gradient(108.75% 108.75% at 117.11% 81.18%, #B566E6 0%, rgba(181, 102, 230, 0) 77.6%), radial-gradient(58.56% 126.24% at 31.37% 0%, rgba(255, 255, 255, 0.46) 0%, rgba(255, 255, 255, 0) 77.6%), radial-gradient(42.61% 55.51% at 60.46% 100%, rgba(255, 255, 255, 0.21) 0%, rgba(255, 255, 255, 0) 100%)",
                boxShadow: "0px 0px 5px 0px #00FF93, 0px 4px 5px 0px #E478FF",
              }}
            >
              <Tabs
                value={selectedTab}
                onChange={handleTabChange}
                TabIndicatorProps={{
                  style: {
                    backgroundColor: "#FFFFFF",
                  },
                }}
              >
                {tabData?.map((tabItem, itemValue) => {
                  return (
                    <Tab
                      className="tab_value"
                      key={itemValue}
                      label={tabItem}
                    />
                  );
                })}
              </Tabs>
              {selectedTab === 0 && (
                <CardContent>
                  <Typography
                    gutterBottom
                    component="div"
                    style={{
                      fontFamily: "Kaushan Script",
                      color: "white",
                      fontSize: "30px",
                      textAlign: "center",
                    }}
                  >
                    You'll get
                  </Typography>
                  <Typography
                    gutterBottom
                    component="div"
                    style={{
                      fontFamily: "Kaushan Script",
                      color: "white",
                      fontSize: "30px",
                      textAlign: "center",
                    }}
                  >
                    {airdropData}
                  </Typography>
                  <Typography
                    // variant="body2"
                    color="text.secondary"
                    style={{
                      fontFamily: "Kaushan Script",
                      color: "white",
                      fontSize: "30px",
                      textAlign: "center",
                    }}
                  >
                    CODE of HODL
                  </Typography>
                  <div className="tab_in_main_card">
                    <Card
                      sx={{
                        // borderRadius: "5px",
                        backgroundColor: "rgba(255, 255, 255, 0)", // Fully transparent background
                        border: "0.8px solid #FFFFFF",
                        borderImageSource:
                          "linear-gradient(0deg, #D0E0F3, #D0E0F3), radial-gradient(124.52% 124.52% at -3.99% 35.36%, #00D1FF 0%, rgba(0, 209, 255, 0) 69.33%), radial-gradient(73.57% 73.57% at 0% 67.49%, #E478FF 0%, rgba(86, 102, 239, 0) 69.33%), radial-gradient(88.4% 88.4% at 86.12% 6.46%, #72E98A 0%, rgba(114, 233, 138, 0) 56.56%), radial-gradient(108.75% 108.75% at 117.11% 81.18%, #B566E6 0%, rgba(181, 102, 230, 0) 77.6%), radial-gradient(58.56% 126.24% at 31.37% 0%, rgba(255, 255, 255, 0.46) 0%, rgba(255, 255, 255, 0) 77.6%), radial-gradient(42.61% 55.51% at 60.46% 100%, rgba(255, 255, 255, 0.21) 0%, rgba(255, 255, 255, 0) 100%)",
                        boxShadow:
                          "0px 0px 5px 0px #00FF93, 0px 4px 5px 0px #E478FF",
                      }}
                    >
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        className="custom-card-content"
                      >
                        <div className="tab_in_card">
                          Users who participated in the zome public sale but did
                          not receive an NFT allocation will share all zome
                          sales revenue in proportion to the amount they
                          invested
                        </div>
                      </Typography>{" "}
                    </Card>
                  </div>
                </CardContent>
              )}
              {selectedTab === 1 && (
                <CardContent>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    style={{
                      fontFamily: "Kaushan Script",
                      color: "white",
                      fontSize: "30px",
                      textAlign: "center",
                    }}
                  >
                    {formatTimeLeft(timeLeft)}
                  </Typography>
                  <div className="tab_in_main_card_two">
                    <Card
                      sx={{
                        borderRadius: "10px",
                        backgroundColor: "rgba(255, 255, 255, 0)", // Fully transparent background
                        border: "0.8px solid #FFFFFF",
                        borderImageSource:
                          "linear-gradient(0deg, #D0E0F3, #D0E0F3), radial-gradient(124.52% 124.52% at -3.99% 35.36%, #00D1FF 0%, rgba(0, 209, 255, 0) 69.33%), radial-gradient(73.57% 73.57% at 0% 67.49%, #E478FF 0%, rgba(86, 102, 239, 0) 69.33%), radial-gradient(88.4% 88.4% at 86.12% 6.46%, #72E98A 0%, rgba(114, 233, 138, 0) 56.56%), radial-gradient(108.75% 108.75% at 117.11% 81.18%, #B566E6 0%, rgba(181, 102, 230, 0) 77.6%), radial-gradient(58.56% 126.24% at 31.37% 0%, rgba(255, 255, 255, 0.46) 0%, rgba(255, 255, 255, 0) 77.6%), radial-gradient(42.61% 55.51% at 60.46% 100%, rgba(255, 255, 255, 0.21) 0%, rgba(255, 255, 255, 0) 100%)",
                        boxShadow:
                          "0px 0px 5px 0px #00FF93, 0px 4px 5px 0px #E478FF",
                      }}
                    >
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        className="custom-card-content"
                        style={{
                          fontFamily: "Berkshire Swash",
                          fontWeight: "400px",
                          color: "white",
                          fontSize: "16px",
                          textAlign: "left",
                        }}
                      >
                        <ol
                          className="custom-ol"
                          style={{
                            listStyle: "none",
                            counterReset: "list-counter",
                            paddingLeft: 0,
                          }}
                        >
                          {dummyData?.map((data, index) => {
                            return (
                              <li
                                style={{
                                  // position: "relative",
                                  paddingLeft: "30px",
                                  color: "white",
                                }}
                              >
                                <span
                                  style={{
                                    // position: "absolute",
                                    left: 0,
                                    top: 0,
                                    backgroundColor: "black",
                                    color: "#00D1FF",
                                    width: "20px",
                                    height: "20px",
                                    borderRadius: "50%",
                                    textAlign: "center",
                                    lineHeight: "20px",
                                    fontWeight: "bold",
                                    border: "2px solid black",
                                  }}
                                >
                                  {data?.no}
                                </span>
                                {data?.value}
                              </li>
                            );
                          })}
                        </ol>
                      </Typography>{" "}
                    </Card>
                  </div>
                </CardContent>
              )}
            </Card>
          </div>
          <div className='claim_button'>
            <Button
              color="inherit"
              style={{
                fontFamily: "Kaushan Script",
                fontSize: "14px",
                fontWeight: 400,
                lineHeight: "29.02px",
                textAlign: "center",
                width: "126px",
                color: "white",
                height: "45px",
                background: "linear-gradient(to right, #479863, #234D95)",
                backgroundImage: "linear-gradient(to right, #479863, #234D95)",
                borderRadius: "20px",
                marginTop: "20px",

                backgroundColor: "rgba(255, 255, 255, 0)", // Fully transparent background
                border: "0.8px solid #FFFFFF",
                borderImageSource:
                  "linear-gradient(0deg, #D0E0F3, #D0E0F3), radial-gradient(124.52% 124.52% at -3.99% 35.36%, #00D1FF 0%, rgba(0, 209, 255, 0) 69.33%), radial-gradient(73.57% 73.57% at 0% 67.49%, #E478FF 0%, rgba(86, 102, 239, 0) 69.33%), radial-gradient(88.4% 88.4% at 86.12% 6.46%, #72E98A 0%, rgba(114, 233, 138, 0) 56.56%), radial-gradient(108.75% 108.75% at 117.11% 81.18%, #B566E6 0%, rgba(181, 102, 230, 0) 77.6%), radial-gradient(58.56% 126.24% at 31.37% 0%, rgba(255, 255, 255, 0.46) 0%, rgba(255, 255, 255, 0) 77.6%), radial-gradient(42.61% 55.51% at 60.46% 100%, rgba(255, 255, 255, 0.21) 0%, rgba(255, 255, 255, 0) 100%)",
                boxShadow: "0px 0px 2px 0px #00FF93, 0px 2px 2px 0px #E478FF",
              }}
              onClick={handleClaim}
              disabled={claiming}
            >
              {claiming ? "Claiming..." : "Claim"}
            </Button>
          </div>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Content;
