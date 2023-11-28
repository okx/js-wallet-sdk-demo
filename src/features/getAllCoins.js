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

import { CardActionButton } from "../components/CardActionButton";
import { useStore } from "../stores";
import DemoAutocompleteChain from "../components/DemoAutocompleteChain";

// card per feature
const GetAllCoinsCard = () => {
  // local UI state
  const [errorMessage, setErrorMessage] = useState("");

  // mobx store that link up with sdk wallets
  const { walletStore } = useStore();
  const { isInit, coinsAvailable } = walletStore;

  // local UI state cleanup when sdk re-initialized
  useEffect(() => {
    setErrorMessage("");
  }, [isInit]);

  // feature logic
  const queryGetAllCoins = async () => {
    try {
      setErrorMessage("");
      walletStore.fetchCoinsAvailable();
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
        key="get-all-coins-card"
      >
        <CardContent sx={{ pb: 1 }}>
          <Typography sx={{ fontSize: 26 }}>Coins Available</Typography>
        </CardContent>
        <Divider flexItem />
        <CardActions sx={{ pl: 2, pr: 2, pb: 2 }}>
          <DemoAutocompleteChain setChain={walletStore.setSelectedChain} />
          <CardActionButton
            buttonText="Query API"
            onClick={queryGetAllCoins}
            disabled={!isInit}
            testId="query-get-all-coins"
          />
        </CardActions>
        {errorMessage && (
          <Alert severity="error">
            <AlertTitle>Failure</AlertTitle>
            {errorMessage}
          </Alert>
        )}
        {coinsAvailable && coinsAvailable.length ? (
          <Alert severity="success">
            <AlertTitle>Coin List</AlertTitle>
            {coinsAvailable.map((coin, index) => {
              return (
                <div key={`coin-${coin.coinId}`}>
                  <div>
                    <strong>Coin Name: {coin.name}</strong>
                    <br />
                    <strong>Coin ID: {coin.coinId}</strong>
                  </div>
                  {index < coinsAvailable.length - 1 ? <br /> : null}
                </div>
              );
            })}
          </Alert>
        ) : null}
      </Card>
    </>
  ) : null;
};

export default observer(GetAllCoinsCard);
