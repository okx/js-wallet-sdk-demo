import { Alert, AlertTitle, Divider } from "@mui/material";

const DemoWalletInfo = ({ walletInfo, index }) => {
  return (
    <>
      <Alert severity="success" key={`wallet-info-${index}`}>
        <AlertTitle>Success</AlertTitle>
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

export { DemoWalletInfo };
