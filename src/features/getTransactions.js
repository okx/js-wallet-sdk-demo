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

// card per feature
const GetTransactionsCard = () => {
  // local UI state
  const [errorMessage, setErrorMessage] = useState("");
  const [transactions, setTransactions] = useState();

  // mobx store that link up with sdk wallets
  const { walletStore } = useStore();
  const { isInit, chainsAvailable, walletId } = walletStore;

  // local UI state cleanup when sdk re-initialized
  useEffect(() => {
    setErrorMessage("");
    setTransactions();
  }, [isInit]);

  // feature logic
  const getTransactions = async () => {
    try {
      setErrorMessage("");
      const data = await walletStore.getTransactions();
      console.log(data);
      setTransactions(data);
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
        key="get-transactions-card"
      >
        <CardContent sx={{ pb: 1 }}>
          <Typography sx={{ fontSize: 26 }}>Get Transactions</Typography>
        </CardContent>
        <Divider flexItem />
        <CardActions sx={{ pl: 2, pr: 2, pb: 2 }}>
          <CardActionButton
            buttonText="Get Transactions"
            onClick={getTransactions}
            disabled={!isInit || chainsAvailable?.length === 0 || !walletId}
            testId="get-transactions"
          />
        </CardActions>
        {errorMessage && (
          <Alert severity="error">
            <AlertTitle>Failure</AlertTitle>
            {errorMessage}
          </Alert>
        )}
        {transactions ? (
          <Alert severity="success">
            <AlertTitle>Success</AlertTitle>
            <strong>
              Transactions:{" "}
              {transactions.map((tx) => {
                return (
                  <p key={tx.txHash}>
                    Transaction {tx.orderId} ({tx.txHash}) <br /> [Chain ID:{" "}
                    {tx.chainId}]: from {tx.fromAddr} to {tx.toAddr} at{" "}
                    {new Date(parseInt(tx.txTime, 10)).toISOString()}
                  </p>
                );
              })}
            </strong>
          </Alert>
        ) : null}
      </Card>
    </>
  ) : null;
};

export default observer(GetTransactionsCard);
