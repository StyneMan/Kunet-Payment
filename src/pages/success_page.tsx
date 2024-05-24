import {
  Avatar,
  Box,
  Card,
  Divider,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
// import { useState } from "react";
// import CustomDialog from "../components/dialog";
import logo from "../assets/images/success.png";
import bg from "../assets/images/giftcard_bg.png";

const SuccessPage = () => {
  const theme = useTheme();
  // const [openDialog, setOpenDialog] = useState(false);

  const isTablet = useMediaQuery(theme.breakpoints.only("sm"));
  const isPC = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <Box
      height={"100vh"}
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"center"}
      alignItems={"center"}
      sx={{ backgroundImage: "url(" + bg + ")", backgroundRepeat: 'revert', backgroundSize: 'contain' }}
    >
      <Box
        p={4}
        component={Card}
        bgcolor={"#ffffff89"}
        width={isPC ? "36vw" : isTablet ? "56vw" : "68vw"}
      >
        {/* <CustomDialog
          message={message}
          open={openDialog}
          setOpen={setOpenDialog}
          type={"error"}
        /> */}
        <Box
          display="flex"
          flexDirection={"column"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Avatar
            src={logo}
            variant="circular"
            sx={{ width: 72, height: 72 }}
          />
        </Box>

        <br />
        <Divider />
        <br />
        <Typography
          textAlign={"center"}
          mb={3}
          fontSize={21}
          px={isPC ? 4 : 2}
          fontWeight={'bold'}
          fontFamily={"sans-serif"}
        >
          {`Congratulations`}
        </Typography>
        <Typography
          textAlign={"center"}
          mb={3}
          fontSize={14}
          px={isPC ? 4 : 2}
          fontFamily={"fantasy"}
          gutterBottom
        >
          {`Redeemed Successfully`}
        </Typography>

        <Toolbar />

        <Toolbar />
        <br />
        <Box position={"relative"} top={0} bottom={0}>
          <Typography>With 🩷 from Kunet App</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default SuccessPage;
