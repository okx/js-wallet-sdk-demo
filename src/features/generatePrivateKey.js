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
import { DemoAutocompleteCoinType } from "../components/DemoAutocompleteCoinType";
import { DemoAutocompleteSegwit } from "../components/DemoAutocompleteSegwit";
import { DemoDialog } from "../components/DemoDialog";
import DemoWalletInfo from "../components/DemoWalletInfo";
import { useStore } from "../stores";

// card per feature
const GeneratePrivateKeyCard = () => {
  // local UI state
  const [coinType, setCoinType] = useState();
  const [network, setNetwork] = useState();
  const [segwitType, setSegwitType] = useState();
  const [walletInfos, setWalletInfos] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [showDialog, setShowDialog] = useState(false);

  // mobx store that link up with sdk wallets
  const { walletStore } = useStore();
  const isInit = walletStore.isInit;

  // local UI state cleanup when sdk re-initialized
  useEffect(() => {
    setCoinType();
    setNetwork();
    setSegwitType();
    setWalletInfos([]);
    setErrorMessage("");
    setShowDialog(false);
  }, [isInit]);

  // event handler
  const handleDialogClose = () => {
    setShowDialog(false);
  };

  // feature logic
  const generatePrivateKey = async () => {
    if (!coinType) {
      setErrorMessage("Please select a coin type!");
      return;
    }
    if (
      walletInfos.findIndex(
        (walletInfo) =>
          walletInfo.coinType === coinType &&
          walletInfo.segwitType === segwitType?.value
      ) > -1
    ) {
      setShowDialog(true);
      return;
    }
    try {
      setErrorMessage("");
      let wallet = walletStore.getWallet(coinType);
      if (wallet) {
        const privateKey = await wallet.getRandomPrivateKey();
        const params = { privateKey };
        if (network === "BTC" && segwitType?.value) {
          Object.assign(params, {
            addressType:
              segwitType?.value === "segwit_nested_49"
                ? "segwit_nested"
                : segwitType?.value,
          });
        }
        const address = await wallet.getNewAddress(params);
        const walletInfo = {
          coinType,
          segwitType: segwitType ? segwitType.value : undefined,
          privateKey,
          address: address.address,
        };
        if (address.publicKey) {
          Object.assign(walletInfo, {
            publicKey: address.publicKey,
          });
        }
        setWalletInfos([walletInfo, ...walletInfos]);
      }
    } catch (err) {
      console.error(err);
      setErrorMessage(err.toString());
    }
  };
  const deletePrivateKey = (index) => {
    setWalletInfos(walletInfos.toSpliced(index, 1));
  };

  // render logic
  return isInit ? (
    <>
      <Card
        variant="outlined"
        sx={{ minWidth: 275, borderRadius: 5 }}
        key="generate-private-key-card"
      >
        <CardContent sx={{ pb: 1 }}>
          <Typography sx={{ fontSize: 26 }}>Generate Private Key</Typography>
        </CardContent>
        <Divider flexItem />
        <CardContent sx={{ pb: 0 }}>
          <Typography sx={{ fontSize: 20 }}>Coin Type</Typography>
        </CardContent>
        <CardActions sx={{ pl: 2, pr: 2, pb: 2 }}>
          <DemoAutocompleteCoinType
            setCoinType={setCoinType}
            setNetwork={setNetwork}
            setSegwitType={setSegwitType}
          />
          {network && <DemoAutocompleteSegwit setSegwitType={setSegwitType} />}
          <CardActionButton
            buttonText="Generate Address"
            onClick={generatePrivateKey}
            disabled={!isInit || !coinType}
            testId="generate-address"
          />
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
              <DemoWalletInfo
                walletInfo={walletInfo}
                index={index}
                callback={deletePrivateKey}
              />
            ) : null;
          })}
      </Card>
      <DemoDialog
        title={"Already created"}
        content={
          "The Private Key is already created, please try other coin types!"
        }
        showDialog={showDialog}
        handleConfirm={handleDialogClose}
      />
    </>
  ) : null;
};

export default observer(GeneratePrivateKeyCard);
