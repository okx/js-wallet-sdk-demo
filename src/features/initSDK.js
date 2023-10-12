import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";

import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export default function InitSDKCard() {
  return (
    <Card variant="outlined" sx={{ minWidth: 275, borderRadius: 5 }}>
      <CardContent sx={{ pb: 1 }}>
        <Typography sx={{ fontSize: 14 }}>OKX Wallet SDK</Typography>
      </CardContent>
      <CardActions sx={{ pl: 2, pr: 2, pb: 2 }}>
        <Button
          size="small"
          variant="contained"
          sx={{ backgroundColor: "black", borderRadius: 2 }}
        >
          Initialize
        </Button>
      </CardActions>
    </Card>
  );
}
