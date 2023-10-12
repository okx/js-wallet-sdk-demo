import { useState } from "react";

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

import { ed25519_getRandomPrivateKey } from "@okxweb3/coin-base";

const options = [
  { label: "BTC - Bitcoin", value: "BTC" },
  { label: "ETH - Ethereum", value: "ETH" },
];

export default function GeneratePrivateKeyCard() {
  const [coinType, setCoinType] = useState();
  const [privateKey, setPrivateKey] = useState();

  const generatePrivateKey = () => {
    console.log(coinType);
    if (!coinType) {
      setPrivateKey("");
      return;
    }
    let privateKey;
    switch (coinType) {
      case "BTC": {
        privateKey = ed25519_getRandomPrivateKey(false, "hex");
        break;
      }
      case "ETH": {
        privateKey = ed25519_getRandomPrivateKey(false, "hex");
        break;
      }
      default: {
        break;
      }
    }
    setPrivateKey(privateKey);
  };
  return (
    <>
      <Card variant="outlined" sx={{ minWidth: 275, borderRadius: 5 }}>
        <CardContent sx={{ pb: 1 }}>
          <Typography sx={{ fontSize: 14 }}>Generate Private Key</Typography>
        </CardContent>
        <CardActions sx={{ pl: 2, pr: 2, pb: 2 }}>
          <Autocomplete
            options={options}
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
        {privateKey && (
          <Alert severity="success">
            <AlertTitle>Success</AlertTitle>$
            {`You have generated private key successfully - check it out! - `}
            <strong>{`${privateKey}`}</strong>
          </Alert>
        )}
        {!privateKey && privateKey === "" && (
          <Alert severity="error">
            <AlertTitle>Failure</AlertTitle>
            {`You have generated private key unsuccessfully - Please select a coin type beforehand!`}
          </Alert>
        )}
      </Card>
    </>
  );
}
