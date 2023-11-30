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
const GetTransactionDetailCard = () => {
  // local UI state
  const [errorMessage, setErrorMessage] = useState("");
  const [txDetail, setTxDetail] = useState();

  // mobx store that link up with sdk wallets
  const { walletStore } = useStore();
  const { isInit, chainsAvailable, walletId } = walletStore;

  // local UI state cleanup when sdk re-initialized
  useEffect(() => {
    setErrorMessage("");
    setTxDetail();
  }, [isInit]);

  // feature logic
  const getTransactionDetail = async () => {
    try {
      setErrorMessage("");
      const data = await walletStore.getTransactionDetail(
        "483625958281195612",
        "0"
      );
      console.log(data);
      if (data[0]) {
        setTxDetail(data[0]);
      }
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
        key="get-transaction-detail-card"
      >
        <CardContent sx={{ pb: 1 }}>
          <Typography sx={{ fontSize: 26 }}>Get Transaction Detail</Typography>
        </CardContent>
        <Divider flexItem />
        <CardActions sx={{ pl: 2, pr: 2, pb: 2 }}>
          <CardActionButton
            buttonText="Get Transaction Detail"
            onClick={getTransactionDetail}
            disabled={!isInit || chainsAvailable?.length === 0 || !walletId}
            testId="get-transaction-detail"
          />
        </CardActions>
        {errorMessage && (
          <Alert severity="error">
            <AlertTitle>Failure</AlertTitle>
            {errorMessage}
          </Alert>
        )}
        {txDetail ? (
          <Alert severity="success">
            <AlertTitle>Success</AlertTitle>
            <strong>
              Transaction Detail: {txDetail.orderId} ({txDetail.txHash}) <br />{" "}
              [Chain ID: {txDetail.chainId}]: from {txDetail.fromAddr} to{" "}
              {txDetail.toAddr} at{" "}
              {new Date(parseInt(txDetail.txTime, 10)).toISOString()}
            </strong>
          </Alert>
        ) : null}
      </Card>
    </>
  ) : null;
};

export default observer(GetTransactionDetailCard);
