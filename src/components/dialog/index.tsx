/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContentText from "@mui/material/DialogContentText";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import { Error, InfoOutlined } from "@mui/icons-material";
import theme from "../../theme";
import { Box } from "@mui/material";

interface CustomDialogI {
  setOpen: any;
  message: string;
  type: string;
  open: boolean;
}

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function CustomDialog({
  message,
  open,
  setOpen,
  type,
}: CustomDialogI) {
  return (
    <React.Fragment>
      <Dialog
        maxWidth="lg"
        open={open}
        disablePortal={true}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => setOpen(false)}
        aria-describedby="alert-dialog-slide-description"
        sx={{borderRadius: 10, bgcolor: 'transparent'}}
      >
       <Box borderRadius={6} >
       <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "start",
            alignItems: "center",
            padding: 4,

          }}
        >
          {type === "error" ? (
            <Error color="primary" sx={{ width: 86, height: 86, mb: 2 }} />
          ) : (
            <InfoOutlined  color="primary"  sx={{ width: 86, height: 86, mb: 2 }} />
          )}
          <DialogContentText id="alert-dialog-slide-description" color={theme.palette.primary.main} >
            {message}
          </DialogContentText>
        </Box>
        <DialogActions  >
          <Button sx={{textTransform: 'capitalize'}} onClick={() => setOpen(false)}>Dismiss</Button>
        </DialogActions>
       </Box>
      </Dialog>
    </React.Fragment>
  );
}
