import { Grid, Alert, AlertTitle, Divider, IconButton } from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DeleteIcon from "@mui/icons-material/Delete";

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
const DemoWalletInfo = ({ walletInfo, index, callback }) => {
  const { appStore } = useStore();
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
