/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Avatar,
  Box,
  Card,
  CircularProgress,
  Divider,
  TextField,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import logo from "../assets/images/fine_guy.jpg";
import { CancelRounded, InfoRounded } from "@mui/icons-material";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { setLoading } from "../store/reducers/loader";
// import APIService from "../service";
import { useEffect, useState } from "react";
import CustomDialog from "../components/dialog";
import { useLocation, useNavigate } from "react-router-dom";
import {
  // setRedeemData,
  setTransactionID,
  setVoucherInfo,
} from "../store/reducers/redeem";
// import { RootState } from "../store";
import bg from "../assets/images/giftcard_bg.png";
import iosBtnBg from "../assets/images/download-on-the-app-store-apple-logo-svgrepo-com.svg";
import googleBtnBg from "../assets/images/google-play-badge-logo-svgrepo-com.svg";

const PaymentPage = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const [type, setType] = useState("");
  const [isUsed, setUsed] = useState(false);
  const [isInvalid, setInvalid] = useState(false);
  const [fetched, setFetched] = useState(false);
  const [message, setMessage] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const matches = useMediaQuery(theme.breakpoints.up("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.only("sm"));
  const isPC = useMediaQuery(theme.breakpoints.up("md"));

  const location = useLocation();
  const navigate = useNavigate();
  const usedVoucher = "GJSHHUY6FGUS";
  const validVoucher = "KN1UH090AJKM";
  // const { redeemData: hej } = useSelector((state: RootState) => state.redeem);
  const redeemData: any = {
    hello: "world",
    user_photo:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHnMRpLGP7It6a6OTGN7Oxq7Hro3LSUwuIrA&s",
  };

  useEffect(() => {
    if (location) {
      console.log("CURRENT LOCATION ::: ", location.pathname);
      const transactionId = location.pathname.split("pay/")[1];
      console.log("TRANSACTION ID :: ", transactionId);
      dispatch(setTransactionID(transactionId));

      const init = async () => {
        // try {
        //   const response = await APIService.getPaymentInfo(transactionId);
        //   console.log("ReSPONE:: ", response.data);
        //   dispatch(setRedeemData(response.data));
        //   localStorage.setItem("account_number", response.data?.account_number);
        //   localStorage.setItem("bank_code", response.data?.bank_code);
        //   if (response.data?.status === "used") {
        //     setUsed(true);
        //   }
        //   setFetched(true);
        // } catch (error) {
        //   console.log("ERR: :: ", error);
        // }
        setTimeout(() => {
          setFetched(true);
        }, 3000);
      };
      init();
    }
  }, [dispatch, location]);

  const validationSchema = yup.object().shape({
    code: yup
      .string()
      .min(12, "Invalid code")
      .max(12, "Maximum is 12 characters")
      .required("Voucher code is required"),
  });

  const formik = useFormik({
    initialValues: {
      code: "",
    },
    validationSchema,
    onSubmit: (values) => {
      try {
        console.log(values);
        if (values.code === usedVoucher) {
          setUsed(true);
        } else {
          setUsed(false);
          console.log("VOUCHER ::: ", values);
        }
      } catch (error) {
        console.log(error);
      }
    },
  });

  const { errors, touched, values, setFieldValue } = formik;

  const generateOTP = async (code: string) => {
    try {
      dispatch(setLoading(true));

      setTimeout(() => {
        dispatch(setLoading(false));
        navigate("/otp/confirm", {
          state: { voucher: code },
        });
      }, 3000);
      // const response = await APIService.generateOTP(code);
      // console.log("RESPONSE GENERATE OTP HERE ", response.data);
      dispatch(setLoading(false));
      // if (response.status >= 200 && response.status <= 299) {
      //   setMessage(response.data?.message);
      //   setType(
      //     response.data?.message.includes("does not exist") ? "info" : "error"
      //   );
      //   if (response.data?.status === "error") {
      //     // Show dialog here
      //     setOpenDialog(true);
      //   } else {
      //     navigate("/otp/confirm", {
      //       state: { voucher: code },
      //     });
      //   }
      // }
    } catch (error) {
      console.log(error);
      dispatch(setLoading(false));
    }
  };

  const validate = async (code: string) => {
    try {
      dispatch(setLoading(true));
      // const response = await APIService.validate(code, redeemData?.amount);
      // console.log("RESPONSE VALIDATE HERE ", response.data);
      dispatch(setLoading(false));

      if (code === usedVoucher) {
        setUsed(true);
      } else if (code === validVoucher) {
        setUsed(false);
        setInvalid(false);
        dispatch(
          setVoucherInfo({
            response: { hello: "world", voucher_code: "GJSHHUY67FG3U" },
          })
        );
        setMessage("")
        setType("info")
        generateOTP(code);
      } else {
        setUsed(false);
        setInvalid(true);
      }

      // if (response.status >= 200 && response.status <= 299) {
      //   setMessage(response.data?.message);
      //   setType(
      //     response.data?.message.includes("does not exist") ? "info" : "error"
      //   );

      //   if (response.data?.status === "error") {
      //     // Show dialog here
      //     setOpenDialog(true);
      //   } else {
      //     dispatch(setVoucherInfo(response.data));
      //     generateOTP(code);
      //   }
      // }
    } catch (error) {
      console.log(error);
      dispatch(setLoading(false));
    }
  };

  return (
    <Box
      height="100vh"
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"center"}
      alignItems={"center"}
      position={"relative"}
      sx={{
        backgroundImage: "url(" + bg + ")",
        backgroundRepeat: "revert",
        backgroundSize: "contain",
      }}
    >
      <Box margin={"0px auto"}>
        {redeemData ? (
          <div>
            {isUsed || isInvalid ? (
              <Box
                p={4}
                component={Card}
                bgcolor={"#ffffff89"}
                width={isPC ? "36vw" : isTablet ? "56vw" : "68vw"}
              >
                <Box
                  display="flex"
                  flexDirection={"column"}
                  justifyContent={"center"}
                  alignItems={"center"}
                >
                  <CancelRounded
                    fontSize="large"
                    sx={{ width: 64, height: 64 }}
                    color="primary"
                  />
                </Box>
                <br />
                <Divider />
                <br />
                <Typography
                  textAlign={"center"}
                  mb={3}
                  fontSize={14}
                  px={matches ? 4 : 2}
                  gutterBottom
                  fontFamily={"fantasy"}
                >
                  {isUsed ? "This redeemption link has already been used." : "This voucher is invalid."}
                </Typography>
                <Toolbar />
                <Toolbar />
                <Box position={"relative"} top={0} bottom={0}>
                  <Typography>With 🩷 from Kunet App</Typography>
                </Box>
              </Box>
            ) : (
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
                  type={type}
                />
                <Box
                  display="flex"
                  flexDirection={"column"}
                  justifyContent={"center"}
                  alignItems={"center"}
                >
                  <Avatar
                    src={fetched ? redeemData?.user_photo : logo}
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
                  px={matches ? 4 : 2}
                  gutterBottom
                >
                  Enter your voucher code below
                </Typography>

                <TextField
                  size="small"
                  fullWidth
                  required
                  type="text"
                  value={values.code}
                  label="Voucher Code"
                  variant="outlined"
                  placeholder="JDU638CBB93HO0"
                  onPaste={(e: any) => {
                    setFieldValue("code", e.target?.value);
                    console.log("CURRENT VALUE ::: ", e.target?.value);
                    if (e.target?.value.length === 12) {
                      // dispatch(setLoading(true))
                      validate(e.target?.value);
                    } else {
                      dispatch(setLoading(false));
                    }
                  }}
                  focused
                  InputProps={{
                    sx: {
                      textTransform: "uppercase",
                    },
                  }}
                  inputProps={{ maxLength: 12 }}
                  name="code"
                  onChange={(e: any) => {
                    setFieldValue("code", e.target?.value);
                    console.log("CURRENT VALUE ::: ", e.target?.value);
                    if (e.target?.value.length === 12) {
                      // dispatch(setLoading(true))
                      validate(e.target?.value);
                    } else {
                      dispatch(setLoading(false));
                    }
                  }}
                  error={Boolean(touched.code && errors.code)}
                  helperText={errors.code}
                />
                <Box
                  p={1}
                  display="flex"
                  flexDirection={"row"}
                  justifyContent={"center"}
                  alignItems={"center"}
                  onClick={() => {
                    console.log("JUST CLICKED NOW >>> ");
                  }}
                >
                  <InfoRounded fontSize="small" color={"primary"} />
                  <Typography fontFamily={"fantasy"} fontSize={12} m={0.5}>
                    Only redeemable in Africa
                  </Typography>
                </Box>
                <Toolbar />
                <Toolbar />
                <br />
                <Box position={"relative"} top={0} bottom={0}>
                  <Typography>With 🩷 from Kunet App</Typography>
                </Box>
              </Box>
            )}
          </div>
        ) : (
          <Box
            p={1}
            height={"75vh"}
            width={isPC ? "36vw" : isTablet ? "56vw" : "68vw"}
            display="flex"
            flexDirection={"column"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <CircularProgress />
          </Box>
        )}
      </Box>
      {isPC && (
        <div>
          <Toolbar />
          <Toolbar />
          <br />
        </div>
      )}

      {isTablet && (
        <div>
          <Toolbar />
        </div>
      )}
      <Box
        position={"absolute"}
        bottom={0}
        width={"100%"}
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"end"}
        alignItems={"center"}
      >
        <Box
          flex={1}
          display={"flex"}
          component={Typography}
          flexDirection={"row"}
          justifyContent={"space-between"}
          alignItems={"end"}
          position={"relative"}
        >
          <Box>
            <img src={iosBtnBg} alt="" width={"80%"} />
          </Box>
          <Box p={1} />
          <Box>
            <img src={googleBtnBg} alt="" width={"80%"} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default PaymentPage;
