import { useState } from "react";
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
} from "@mui/material";

import { coinTypeOptions } from "../constants/coinTypeOptions";
import { useStore } from "../stores";

const GeneratePrivateKeyCard = () => {
  const [coinType, setCoinType] = useState();
  const [privateKeys, setPrivateKeys] = useState([]);
  const { walletStore } = useStore();

  const generatePrivateKey = async () => {
    console.log(coinType);
    if (!coinType) {
      setPrivateKeys(["", ...privateKeys]);
      return;
    }
    let wallet = walletStore.getWallet(coinType);
    if (wallet) {
      const privateKey = await wallet.getRandomPrivateKey();
      setPrivateKeys([privateKey, ...privateKeys]);
    }
  };
  return (
    <>
      <Card variant="outlined" sx={{ minWidth: 275, borderRadius: 5 }}>
        <CardContent sx={{ pb: 1 }}>
          <Typography sx={{ fontSize: 14 }}>Generate Private Key</Typography>
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
          />
          <Button
            size="small"
            variant="contained"
            sx={{ backgroundColor: "black", borderRadius: 2 }}
            onClick={generatePrivateKey}
          >
            Generate Address
          </Button>
        </CardActions>
        {privateKeys &&
          privateKeys.map((privateKey, index) => {
            return privateKey ? (
              <Alert severity="success" key={index}>
                <AlertTitle>Success</AlertTitle>
                {`You have generated private key successfully - check it out! - `}
                <strong>{`${privateKey}`}</strong>
              </Alert>
            ) : (
              <Alert severity="error" key={index}>
                <AlertTitle>Failure</AlertTitle>
                {`You have generated private key unsuccessfully - Please select a coin type beforehand!`}
              </Alert>
            );
          })}
      </Card>
    </>
  );
};

export default observer(GeneratePrivateKeyCard);
