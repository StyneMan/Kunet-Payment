/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Avatar,
  Box,
  Button,
  Card,
  Divider,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import logo from "../assets/images/fine_guy.jpg";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import CustomDialog from "../components/dialog";
import { RootState } from "../store";
import OTPInput from "react-otp-input";
import { useLocation, useNavigate } from "react-router-dom";
import { setLoading } from "../store/reducers/loader";
import { useEffect } from "react";
import APIService from "../service";
import bg from "../assets/images/giftcard_bg.png";

const OTPPage = () => {
  let timer: any;
  let countdown: any = 120;
  const theme = useTheme();
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const { voucher } = location.state;
  const [message, setMessage] = useState("");
  const [otpCode, setOTPCode] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [timerOn, setTimerOn] = useState(true);
  const [time, setTime] = useState<number | null>(120); // seconds
  // const isMobile = useMediaQuery(theme.breakpoints.only("xs"));
  const isTablet = useMediaQuery(theme.breakpoints.only("sm"));
  const isPC = useMediaQuery(theme.breakpoints.up("md"));

  const { redeemData, voucherInfo, transactionId } = useSelector(
    (state: RootState) => state.redeem
  );
  const { isLoading } = useSelector((state: RootState) => state.loader);

  // const [time, setTime] = useState(120); // 120 seconds = 2 minutes
  // const [isActive, setIsActive] = useState(true);
  // const intervalRef = useRef<any>(null);

  useEffect(() => {
    // const time: number;
    // displayTime(time);
    countdown = time;
    // setTimerOn(true)

    if (timerOn) {
      timer = setInterval(() => {
        countdown--;
        // displayTime(countdown);
        setTime((prevTime) => prevTime - 1);
        if (countdown <= 0) {
          setTimerOn(false);
          setTime(null);
          clearInterval(timer);
        }
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [timerOn, time]);

  function displayTime(seconds: number) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    const display = `${minutes < 10 ? "0" : ""}${minutes}:${
      remainingSeconds < 10 ? "0" : ""
    }${remainingSeconds}`;
    return display;
  }

  const resendOTP = async () => {
    try {
      dispatch(setLoading(true));
      // setTimeout(() => {
      //   dispatch(setLoading(false));
      // }, 3000);
      const response = await APIService.generateOTP(voucher);
      console.log("RESPONSE GENERATE OTP HERE ", response.data);
      dispatch(setLoading(false));
      setTimerOn(true);
      setTime(120);
      // if (response.status >= 200 && response.status <= 299) {
      //   setMessage(response.data?.message);
      //   setType(response.data?.message.includes('does not exist') ? "info" : "error");
      //   if (response.data?.status === "error") {
      //     // Show dialog here
      //     setOpenDialog(true);
      //   }
      //   else {
      //     // Generate OTP Here
      //   }
      // }
    } catch (error) {
      console.log(error);
      dispatch(setLoading(false));
    }
  };

  const redeem = async (otp: string) => {
    try {
      dispatch(setLoading(true));
      const bank_code = localStorage.getItem("bank_code");
      const account_num = localStorage.getItem("account_number");

      const payload = {
        voucher_code: voucher,
        bank_account_number: redeemData?.account_number ?? account_num,
        bank_code: redeemData?.bank_code ?? bank_code,
        token: otp,
      };

      console.log("REDEEM PAYLOAD CHECK :: :: ", payload);

      // const response = await APIService.redeem(payload, transactionId);
      // console.log("RESPONSE REDEEM HERE ", response.data);
      setTimeout(() => {
        dispatch(setLoading(false));
      }, 3000);
      
      // if (response.status >= 200 && response.status <= 299) {
        // setMessage(response.data?.message);
        setMessage("Operation was successful")
        // setType(response.data?.message.includes('does not exist') ? "info" : "error");
        // if (response.data?.status === "error") {
          // Show dialog here
          // setOpenDialog(true);
        // } else if (response.data?.status === "success" && response.data?.message?.includes('redeemed')) {
          // Show Success Screen Here
          navigate('/pay/success')
        // }
      // }
    } catch (error) {
      console.log(error);
      dispatch(setLoading(false));
    }
  };

  // console.log("REDEEM INFO :: ", redeemData);
  // console.log("DATAAD :: ", voucherInfo);

  const obscurer = (email: string) => {
    const lhs = email?.split("@")[0];
    const rhs = email?.split("@")[1];
    const ext = rhs?.split(".")[1];

    const leftObscure = lhs?.substring(0, 2) + "xxx";
    const rightObscure = rhs?.substring(0, 1) + "xxx." + ext;

    return `${leftObscure}@${rightObscure}.${ext}`;
  };

  return (
    <Box
      height={"100vh"}
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"center"}
      alignItems={"center"}
      sx={{
        backgroundImage: "url(" + bg + ")",
        backgroundRepeat: "revert",
        backgroundSize: "contain",
      }}
    >
      <Box
        p={4}
        component={Card}
        bgcolor={"#ffffff89"}
        width={isPC ? "36vw" : isTablet ? "56vw" : "68vw"}
      >
        <CustomDialog
          message={message}
          open={openDialog}
          setOpen={setOpenDialog}
          type={"error"}
        />
        <Box
          display="flex"
          flexDirection={"column"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Avatar
            src={redeemData?.user_photo ?? logo}
            variant="circular"
            sx={{ width: 56, height: 56 }}
          />
        </Box>

        <br />
        <Divider />
        <br />
        <Typography
          textAlign={"center"}
          mb={3}
          fontSize={12}
          px={isPC ? 4 : 2}
          gutterBottom
        >
          {`An OTP has been sent to ${`${obscurer(voucherInfo?.data?.email)}`}`}
        </Typography>

        <Box
          display="flex"
          flexDirection={"column"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <OTPInput
            value={otpCode}
            onChange={(value) => {
              let otpValue = "";
              otpValue += value;
              setOTPCode(value);
              if (otpValue.length === 6) {
                return redeem(otpValue);
              }
            }}
            onPaste={(event) => {
              let otpValue = "";
              const data = event.clipboardData.getData("text");
              console.log(data);
              otpValue += data;
              setOTPCode(data);
              if (otpValue.length === 6) {
                return redeem(data);
              }
            }}
            inputType="number"
            shouldAutoFocus
            numInputs={6}
            inputStyle={{
              width: isPC ? 40 : isTablet ? 36 : 32,
              height: isPC ? 42 : isTablet ? 38 : 36,
              borderRadius: 4,
              fontSize: 16,
              border: `0.5px solid ${theme.palette.primary.main}`,
              color: theme.palette.primary.main,
              backgroundColor: "transparent",
            }}
            renderSeparator={
              <span
                style={{
                  color: theme.palette.primary.main,
                  fontFamily: "sans-serif",
                  fontWeight: 200,
                }}
              >
                -
              </span>
            }
            renderInput={(props) => <input disabled={isLoading} {...props} />}
          />
          <br />
          {time === null && !timerOn ? (
            <Button
              sx={{ textTransform: "capitalize" }}
              variant="contained"
              fullWidth
              onClick={resendOTP}
            >
              Resend Code
            </Button>
          ) : (
            <Typography fontSize={12} fontFamily={"fantasy"}>
              Didn't get the code? Resend in{" "}
              <span
                style={{
                  color: theme.palette.primary.main,
                  fontFamily: "sans-serif",
                  fontWeight: 600,
                }}
              >{`${displayTime(time)}`}</span>
            </Typography>
          )}
        </Box>

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

export default OTPPage;
