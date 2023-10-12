import { useState } from "react";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";

import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

import { ed25519_getRandomPrivateKey } from "@okxweb3/coin-base";

export default function GeneratePrivateKeyCard() {
  const [privateKey, setPrivateKey] = useState("");
  const generatePrivateKey = () => {
    const privateKey = ed25519_getRandomPrivateKey(false, "hex");
    setPrivateKey(privateKey);
  };
  return (
    <>
      <Card variant="outlined" sx={{ minWidth: 275, borderRadius: 5 }}>
        <CardContent sx={{ pb: 1 }}>
          <Typography sx={{ fontSize: 14 }}>Generate Private Key</Typography>
        </CardContent>
        <CardActions sx={{ pl: 2, pr: 2, pb: 2 }}>
          <Button
            size="small"
            variant="contained"
            sx={{ backgroundColor: "black", borderRadius: 2 }}
            onClick={generatePrivateKey}
          >
            Generate Address
          </Button>
        </CardActions>
      </Card>
      {privateKey && (
        <Alert severity="success">
          <AlertTitle>Success</AlertTitle>$
          {`You have generated private key successfully - check it out! - `}
          <strong>{`${privateKey}`}</strong>
        </Alert>
      )}
    </>
  );
}
