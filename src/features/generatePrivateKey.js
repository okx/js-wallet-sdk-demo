import { useState, useEffect } from "react";
import { observer } from "mobx-react-lite";

import {
  Card,
  CardContent,
  CardActions,
  Button,
  Typography,
  Alert,
  AlertTitle,
  Autocomplete,
  TextField,
  Divider,
} from "@mui/material";

import { coinTypeOptions } from "../constants/coinTypeOptions";
import { useStore } from "../stores";

const GeneratePrivateKeyCard = () => {
  const [coinType, setCoinType] = useState();
  const [walletInfos, setWalletInfos] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const { walletStore } = useStore();
  const isInit = walletStore.isInitialized;

  useEffect(() => {
    setCoinType();
    setWalletInfos([]);
    setErrorMessage("");
  }, [isInit]);

  const generatePrivateKey = async () => {
    if (!coinType) {
      setErrorMessage("Please select a coin type!");
      return;
    }
    try {
      setErrorMessage("");
      let wallet = walletStore.getWallet(coinType);
      if (wallet) {
        const privateKey = await wallet.getRandomPrivateKey();
        const address = await wallet.getNewAddress({ privateKey });
        const walletInfo = {
          network: coinType,
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
          <Button
            size="small"
            variant="contained"
            sx={{ backgroundColor: "black", borderRadius: 2 }}
            onClick={generatePrivateKey}
            disabled={!isInit || !coinType}
          >
            Generate Address
          </Button>
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
              <>
                <Alert severity="success" key={index}>
                  <AlertTitle>Success</AlertTitle>
                  <strong>{`Chain: ${walletInfo.network}`}</strong>
                  <br />
                  <strong>{`Private Key: ${walletInfo.privateKey}`}</strong>
                  <br />
                  <strong>{`Address: ${walletInfo.address}`}</strong>
                  <br />
                  <strong>{`Public Key: ${walletInfo.publicKey}`}</strong>
                </Alert>
                <Divider flexItem key="divider" />
              </>
            ) : null;
          })}
      </Card>
    </>
  ) : null;
};

export default observer(GeneratePrivateKeyCard);
