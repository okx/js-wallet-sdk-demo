import { useState, useEffect } from "react";
import { observer } from "mobx-react-lite";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Alert,
  AlertTitle,
  Autocomplete,
  TextField,
  Divider,
} from "@mui/material";

import { coinTypeOptions } from "../constants/coinTypeOptions";
import { CardActionButton } from "../components/CardActionButton";
import { DemoDialog } from "../components/DemoDialog";
import { DemoWalletInfo } from "../components/DemoWalletInfo";
import { useStore } from "../stores";

// card per feature
const GeneratePrivateKeyCard = () => {
  // local UI state
  const [coinType, setCoinType] = useState();
  const [walletInfos, setWalletInfos] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [showDialog, setShowDialog] = useState(false);

  // mobx store that link up with sdk wallets
  const { walletStore } = useStore();
  const isInit = walletStore.isInitialized;

  // local UI state cleanup when sdk re-initialized
  useEffect(() => {
    setCoinType();
    setWalletInfos([]);
    setErrorMessage("");
    setShowDialog(false);
  }, [isInit]);

  // event handler
  const handleDialogClose = () => {
    setShowDialog(false);
  };

  // feature logic
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
        const privateKey = await wallet.getRandomPrivateKey();
        const address = await wallet.getNewAddress({ privateKey });
        const walletInfo = {
          coinType,
          privateKey,
          address: address.address,
        };
        if (address.publicKey) {
          Object.assign(walletInfo, {
            publicKey: address.publicKey,
          });
        }
        setWalletInfos([...walletInfos, walletInfo]);
      }
    } catch (err) {
      console.error(err);
      setErrorMessage(err.toString());
    }
  };

  // render logic
  return isInit ? (
    <>
      <Card variant="outlined" sx={{ minWidth: 275, borderRadius: 5 }}>
        <CardContent sx={{ pb: 1 }}>
          <Typography sx={{ fontSize: 26 }}>Generate Private Key</Typography>
        </CardContent>
        <Divider flexItem />
        <CardContent sx={{ pb: 0 }}>
          <Typography sx={{ fontSize: 20 }}>Coin Type</Typography>
        </CardContent>
        <CardActions sx={{ pl: 2, pr: 2, pb: 2 }}>
          <Autocomplete
            options={coinTypeOptions}
            sx={{ width: 288, p: 1 }}
            renderInput={(params) => (
              <TextField {...params} label="Coin Type" />
            )}
            onChange={(_, value) => setCoinType(value?.value)}
            isOptionEqualToValue={(option, value) =>
              option.value === value.value
            }
            key={!isInit}
            disabled={!isInit}
          />
          <CardActionButton
            buttonText="Generate Address"
            handleClick={generatePrivateKey}
            disabled={!isInit || !coinType}
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
      </Card>
      <DemoDialog
        title={"Already created"}
        content={
          "The Private Key is already created, please try other coin types!"
        }
        showDialog={showDialog}
        handleConfirm={handleDialogClose}
      />
    </>
  ) : null;
};

export default observer(GeneratePrivateKeyCard);
