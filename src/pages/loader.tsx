import { Box, Typography } from "@mui/material";
import image from "../assets/images/logo.svg";

const Loader = () => {
  return (
    <Box
      height={"90vh"}
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <img src={image} alt="" width={150} />
      <Typography
        gutterBottom
        fontFamily={"sans-serif"}
        fontSize={"1.2rem"}
        fontWeight={600}
      >
        Kunet App
      </Typography>
      <Typography
        fontFamily={"fantasy"}
        gutterBottom
        fontSize={12}
        fontWeight={400}
      >
        Music, Games, Apps, Movies, Books and more...
      </Typography>
    </Box>
  );
};

export default Loader;
