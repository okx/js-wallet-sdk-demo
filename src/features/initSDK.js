import { useState, useEffect } from "react";
import { observer } from "mobx-react-lite";

import {
  Card,
  CardContent,
  CardActions,
  Button,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";

import { useStore } from "../stores";

const InitSDKCard = () => {
  const [showDialog, setShowDialog] = useState(false);

  const { walletStore } = useStore();
  const isInit = walletStore.isInitialized;

  useEffect(() => {
    setShowDialog(false);
  }, [isInit]);

  const initSDK = () => {
    walletStore.initialize();
  };
  const dispose = () => {
    setShowDialog(true);
  };
  const confirmDialog = () => {
    walletStore.dispose();
    setShowDialog(false);
  };
  const closeDialog = () => {
    setShowDialog(false);
  };
  return (
    <>
      <Card variant="outlined" sx={{ minWidth: 275, borderRadius: 5 }}>
        <CardContent sx={{ pb: 1 }}>
          <Typography display="inline" sx={{ fontSize: 26 }}>
            OKX Wallet SDK
          </Typography>
          {isInit && (
            <Typography display="inline" sx={{ fontSize: 14, color: "blue" }}>
              {" (Initialized)"}
            </Typography>
          )}
        </CardContent>
        <CardActions sx={{ pl: 2, pr: 2, pb: 2 }}>
          {!isInit && (
            <Button
              size="small"
              variant="contained"
              sx={{ backgroundColor: "black", borderRadius: 2 }}
              onClick={initSDK}
            >
              Initialize
            </Button>
          )}
          {isInit && (
            <Button
              size="small"
              variant="contained"
              sx={{ backgroundColor: "black", borderRadius: 2 }}
              onClick={dispose}
            >
              Dispose
            </Button>
          )}
        </CardActions>
      </Card>
      <Dialog
        open={showDialog}
        onClose={closeDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Are you sure?</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            The Mnenomics and Private Keys generated will be lost!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog}>No</Button>
          <Button onClick={confirmDialog} autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default observer(InitSDKCard);
