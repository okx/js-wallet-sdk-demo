import { observer } from "mobx-react-lite";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";

import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import { useStore } from "../stores";

const InitSDKCard = () => {
  const { walletStore } = useStore();
  const isInit = walletStore.isInitialized;
  const initSDK = () => {
    console.log("initSDK");
    walletStore.initialize();
  };
  const dispose = () => {
    console.log("dispose");
    walletStore.dispose();
  };
  return (
    <Card variant="outlined" sx={{ minWidth: 275, borderRadius: 5 }}>
      <CardContent sx={{ pb: 1 }}>
        <Typography sx={{ fontSize: 14 }}>OKX Wallet SDK</Typography>
        {isInit && (
          <Typography sx={{ fontSize: 14, color: "blue" }}>
            (Initialized)
          </Typography>
        )}
      </CardContent>
      <CardActions sx={{ pl: 2, pr: 2, pb: 2 }}>
        {!isInit && (
          <Button
            size="small"
            variant="contained"
            sx={{ backgroundColor: "black", borderRadius: 2 }}
            onClick={initSDK}
          >
            Initialize
          </Button>
        )}
        {isInit && (
          <Button
            size="small"
            variant="contained"
            sx={{ backgroundColor: "black", borderRadius: 2 }}
            onClick={dispose}
          >
            Dispose
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default observer(InitSDKCard);
