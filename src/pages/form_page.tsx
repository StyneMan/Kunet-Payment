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
import { InfoRounded } from "@mui/icons-material";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../store/reducers/loader";
import APIService from "../service";
import { useEffect, useState } from "react";
import CustomDialog from "../components/dialog";
import { useLocation, useNavigate } from "react-router-dom";
import { setRedeemData, setTransactionID, setVoucherInfo } from "../store/reducers/redeem";
import { RootState } from "../store";
import bg from "../assets/images/giftcard_bg.png";

const PaymentPage = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const [type, setType] = useState("");
  // const [data, setType] = useState("");
  const [fetched, setFetched] = useState(false);
  const [message, setMessage] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const matches = useMediaQuery(theme.breakpoints.up("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.only("sm"));
  const isPC = useMediaQuery(theme.breakpoints.up("md"));

  const location = useLocation();
  const navigate = useNavigate();
  const { redeemData } = useSelector((state: RootState) => state.redeem);

  useEffect(() => {
    if (location) {
      console.log("CURRENT LOCATION ::: ", location.pathname);
      const transactionId = location.pathname.split("pay/")[1];
      console.log("TRANSACTION ID :: ", transactionId);
      dispatch(setTransactionID(transactionId));

      const init = async () => {
        try {
          const response = await APIService.getPaymentInfo(transactionId);
          console.log("ReSPONE:: ", response.data);
          dispatch(setRedeemData(response.data));
          localStorage.setItem('account_number', response.data?.account_number)
          localStorage.setItem('bank_code', response.data?.bank_code)
          setFetched(true);
        } catch (error) {
          console.log("ERR: :: ", error);
        }
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
      } catch (error) {
        console.log(error);
      }
    },
  });

  const { errors, touched, values, setFieldValue } = formik;

  const generateOTP = async (code: string) => {
    try {
      dispatch(setLoading(true));
      // setTimeout(() => {
      //   dispatch(setLoading(false));
      // }, 3000);
      const response = await APIService.generateOTP(code);
      console.log("RESPONSE GENERATE OTP HERE ", response.data);
      dispatch(setLoading(false));
      if (response.status >= 200 && response.status <= 299) {
        setMessage(response.data?.message);
        setType(response.data?.message.includes('does not exist') ? "info" : "error");
        if (response.data?.status === "error") {
          // Show dialog here
          setOpenDialog(true);
        }
        else {
          navigate("/otp/confirm", {
            state: { voucher: code },
          });
        }
      }
    } catch (error) {
      console.log(error);
      dispatch(setLoading(false));
    }
  };

  const validate = async (code: string) => {
    try {
      dispatch(setLoading(true));
      const response = await APIService.validate(code, redeemData?.amount);
      console.log("RESPONSE VALIDATE HERE ", response.data);
      dispatch(setLoading(false));

      if (response.status >= 200 && response.status <= 299) {
        setMessage(response.data?.message);
        setType(
          response.data?.message.includes("does not exist") ? "info" : "error"
        );

        if (response.data?.status === "error") {
          // Show dialog here
          setOpenDialog(true);
        } else {
          dispatch(setVoucherInfo(response.data))
          generateOTP(code);
        }
      }
    } catch (error) {
      console.log(error);
      dispatch(setLoading(false));
    }
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
      {redeemData ? (
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
  );
};

export default PaymentPage;
