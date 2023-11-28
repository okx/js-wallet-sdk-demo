import { Grid, Alert, AlertTitle, Divider, IconButton } from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DeleteIcon from "@mui/icons-material/Delete";
import ValidateIcon from "@mui/icons-material/Verified";

import "./DemoWalletInfo.css";
import { useStore } from "../stores";
import { observer } from "mobx-react-lite";

const contentCopy = (walletInfo, appStore) => {
  navigator.clipboard.writeText(JSON.stringify(walletInfo));
  appStore.snackBarMessage = "Copied to clipboard";
  appStore.openSnackBar = true;
};
const deleteWalletInfo = (callback, appStore) => {
  appStore.snackBarMessage = "Address deleted";
  appStore.openSnackBar = true;
  callback();
};
const validateAddress = (walletInfo, appStore, walletStore) => {
  let wallet = walletStore.getWallet(walletInfo.coinType);
  if (wallet) {
    const isValid = wallet.validAddress({ address: walletInfo.address });
    if (isValid) {
      appStore.snackBarMessage = "Address is valid";
      appStore.openSnackBar = true;
    } else {
      appStore.snackBarMessage = "Address is invalid";
      appStore.openSnackBar = true;
    }
  } else {
    appStore.snackBarMessage = "No such wallet";
    appStore.openSnackBar = true;
  }
};

const DemoWalletInfo = ({ walletInfo, index, callback }) => {
  const { appStore, walletStore } = useStore();
  return (
    <>
      <Alert
        severity="success"
        key={`wallet-info-${index}`}
        data-testid={`wallet-info-${index}`}
      >
        <Grid container spacing={2}>
          <Grid item xs>
            <AlertTitle>Success</AlertTitle>
          </Grid>
          <Grid item>
            <IconButton
              onClick={() => validateAddress(walletInfo, appStore, walletStore)}
            >
              <ValidateIcon fontSize="small" />
            </IconButton>
            <IconButton onClick={() => contentCopy(walletInfo, appStore)}>
              <ContentCopyIcon fontSize="small" />
            </IconButton>
            <IconButton onClick={() => deleteWalletInfo(callback, appStore)}>
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Grid>
        </Grid>
        {walletInfo.coinType && (
          <strong>{`Chain: ${walletInfo.coinType}`}</strong>
        )}
        {walletInfo.segwitType && (
          <>
            <br />
            <strong>{`Segwit Type: ${walletInfo.segwitType}`}</strong>
          </>
        )}
        {walletInfo.derivedPath && (
          <>
            <br />
            <strong>{`Derivation Path: ${walletInfo.derivedPath}`}</strong>
          </>
        )}
        {walletInfo.privateKey && (
          <>
            <br />
            <strong>{`Private Key: ${walletInfo.privateKey}`}</strong>
          </>
        )}
        {walletInfo.address && (
          <>
            <br />
            <strong>{`Address: ${walletInfo.address}`}</strong>{" "}
          </>
        )}
        {walletInfo.publicKey && (
          <>
            <br />
            <strong>{`Public Key: ${walletInfo.publicKey}`}</strong>
          </>
        )}
      </Alert>
      <Divider flexItem key="divider" />
    </>
  );
};

export default observer(DemoWalletInfo);
