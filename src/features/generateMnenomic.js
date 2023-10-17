import { useState, useEffect } from "react";
import { observer } from "mobx-react-lite";

import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Alert,
  AlertTitle,
  Divider,
} from "@mui/material";
import { bip39 } from "@okxweb3/crypto-lib";

import { CardActionButton } from "../components/CardActionButton";
import { DemoAutocomplete } from "../components/DemoAutocomplete";
import { DemoDialog } from "../components/DemoDialog";
import { DemoWalletInfo } from "../components/DemoWalletInfo";
import { useStore } from "../stores";

// card per feature
const GenerateMnenomicCard = () => {
  // local UI state
  const [coinType, setCoinType] = useState();
  const [mnenomic, setMnenomic] = useState();
  const [walletInfos, setWalletInfos] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [showDialog, setShowDialog] = useState(false);

  // mobx store that link up with sdk wallets
  const { walletStore } = useStore();
  const isInit = walletStore.isInit;

  // local UI state cleanup when sdk re-initialized
  useEffect(() => {
    setCoinType();
    setMnenomic();
    setWalletInfos([]);
    setErrorMessage("");
    setShowDialog(false);
  }, [isInit]);

  // event handler
  const handleDialogClose = () => {
    setShowDialog(false);
  };

  // feature logic
  const generateMnenomic = async () => {
    try {
      const result = await bip39.generateMnemonic();
      setMnenomic(result);
    } catch (err) {
      console.error(err);
    }
  };
  const generatePrivateKey = async () => {
    if (!coinType) {
      setErrorMessage("Please select a coin type!");
      return;
    }
    if (
      walletInfos.findIndex((walletInfo) => walletInfo.coinType === coinType) >
      -1
    ) {
      setShowDialog(true);
      return;
    }
    try {
      setErrorMessage("");
      let wallet = walletStore.getWallet(coinType);
      if (wallet) {
        const derivedPath = await wallet.getDerivedPath({ index: 0 });
        const privateKey = await wallet.getDerivedPrivateKey({
          mnenomic,
          hdPath: derivedPath,
        });
        const address = await wallet.getNewAddress({ privateKey });
        const walletInfo = {
          coinType,
          derivedPath,
          privateKey,
          address: address.address,
        };
        if (address.publicKey) {
          Object.assign(walletInfo, {
            publicKey: address.publicKey,
          });
        }
        setWalletInfos([walletInfo, ...walletInfos]);
      }
    } catch (err) {
      console.error(err);
      setErrorMessage(err.toString());
    }
  };

  // render logic
  return isInit ? (
    <>
      <Card
        variant="outlined"
        sx={{ minWidth: 275, borderRadius: 5 }}
        key="generate-mnenomic-card"
      >
        <CardContent sx={{ pb: 1 }}>
          <Typography sx={{ fontSize: 26 }}>Generate Mnenomic</Typography>
        </CardContent>
        <Divider flexItem />
        <CardContent sx={{ pb: 0 }}>
          <Typography sx={{ fontSize: 20, pb: 1 }}>Mnenomic</Typography>
        </CardContent>
        <CardContent
          sx={{
            pt: 1,
            pb: 2,
            mx: 2,
            borderRadius: 2,
            backgroundColor: "#f7f7f7",
          }}
        >
          <Typography sx={{ minHeight: 24, fontSize: 20 }}>
            {mnenomic}
          </Typography>
        </CardContent>
        <CardActions sx={{ p: 2 }}>
          <CardActionButton
            buttonText="Generate Mnenomic"
            handleClick={generateMnenomic}
            disabled={!isInit || !!mnenomic}
            testId="generate-mnenomic"
          />
        </CardActions>
        {!!mnenomic && (
          <>
            <CardContent sx={{ pb: 0 }}>
              <Typography sx={{ fontSize: 20 }}>Coin Type</Typography>
            </CardContent>
            <CardActions sx={{ pl: 2, pr: 2, pb: 2 }}>
              <DemoAutocomplete setCoinType={setCoinType} />
              <CardActionButton
                buttonText="Derive Address"
                handleClick={generatePrivateKey}
                disabled={!isInit || !mnenomic || !coinType}
                testId="derive-address"
              />
            </CardActions>
            {errorMessage && (
              <Alert severity="error">
                <AlertTitle>Failure</AlertTitle>
                {errorMessage}
              </Alert>
            )}
            {walletInfos &&
              walletInfos.map((walletInfo, index) => {
                return walletInfo ? (
                  <DemoWalletInfo walletInfo={walletInfo} index={index} />
                ) : null;
              })}
          </>
        )}
      </Card>
      <DemoDialog
        title={"Already created"}
        content={
          "The Private Key is already created, please try other coin types!"
        }
        showDialog={showDialog}
        handleConfirm={handleDialogClose}
      ></DemoDialog>
    </>
  ) : null;
};

export default observer(GenerateMnenomicCard);
