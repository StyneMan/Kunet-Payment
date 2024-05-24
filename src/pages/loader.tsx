import { Box, Typography } from "@mui/material";
import React from "react";
import image from "../assets/images/money_bank.png";

const Loader = () => {

  return (
    <Box
      height={"90vh"}
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <img src={image} alt="" />
      <Typography gutterBottom fontSize={"1.2rem"} fontWeight={600}>
        Payment Made Easy
      </Typography>
      <Typography gutterBottom variant="body2" fontWeight={400}>
        Buy. Redeem. Split. Share
      </Typography>
    </Box>
  );
};

export default Loader;
