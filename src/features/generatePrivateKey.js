import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";

import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import { ed25519_getRandomPrivateKey } from "@okxweb3/coin-base";

export default function GeneratePrivateKeyCard() {
  const generatePrivateKey = () => {
    return ed25519_getRandomPrivateKey(false, "hex");
  };
  return (
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
  );
}
