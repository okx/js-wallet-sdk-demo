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
  Grid,
  IconButton,
} from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { bip39 } from "@okxweb3/crypto-lib";

import { CardActionButton } from "../components/CardActionButton";
import { DemoAutocompleteCoinType } from "../components/DemoAutocompleteCoinType";
import { DemoAutocompleteSegwit } from "../components/DemoAutocompleteSegwit";
import { DemoDialog } from "../components/DemoDialog";
import DemoWalletInfo from "../components/DemoWalletInfo";
import { useStore } from "../stores";

// card per feature
const GenerateMnenomicCard = () => {
  // local UI state
  const [coinType, setCoinType] = useState();
  const [network, setNetwork] = useState();
  const [segwitType, setSegwitType] = useState();
  const [mnenomic, setMnenomic] = useState();
  const [walletInfos, setWalletInfos] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [showDialog, setShowDialog] = useState(false);

  // mobx store that link up with sdk wallets
  const { walletStore, appStore } = useStore();
  const isInit = walletStore.isInit;

  // local UI state cleanup when sdk re-initialized
  useEffect(() => {
    setCoinType();
    setMnenomic();
    setWalletInfos([]);
    setErrorMessage("");
    setShowDialog(false);
  }, [isInit]);

  // event handler
  const handleDialogClose = () => {
    setShowDialog(false);
  };
  const contentCopy = (mnenomic, appStore) => {
    navigator.clipboard.writeText(mnenomic);
    appStore.snackBarMessage = "Copied to clipboard";
    appStore.openSnackBar = true;
  };

  // feature logic
  const generateMnenomic = async () => {
    try {
      const result = await bip39.generateMnemonic();
      setMnenomic(result);
    } catch (err) {
      console.error(err);
    }
  };
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
        const derivePathParams = { index: 0 };
        if (network === "BTC" && segwitType?.enumValue) {
          Object.assign(derivePathParams, {
            segwitType: segwitType?.enumValue,
          });
        }
        const derivedPath = await wallet.getDerivedPath(derivePathParams);
        const privateKey = await wallet.getDerivedPrivateKey({
          mnenomic,
          hdPath: derivedPath,
        });
        const newAddressParams = { privateKey };
        if (network === "BTC" && segwitType?.value) {
          Object.assign(newAddressParams, {
            addressType:
              segwitType?.value === "segwit_nested_49"
                ? "segwit_nested"
                : segwitType?.value,
          });
        }
        const address = await wallet.getNewAddress(newAddressParams);
        const walletInfo = {
          coinType,
          segwitType: segwitType ? segwitType.value : undefined,
          derivedPath,
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
        key="generate-mnenomic-card"
      >
        <CardContent sx={{ pb: 1 }}>
          <Typography sx={{ fontSize: 26 }}>Generate Mnenomic</Typography>
        </CardContent>
        <Divider flexItem />
        <CardContent sx={{ pb: 0 }}>
          <Typography sx={{ fontSize: 20, pb: 1 }}>Mnenomic</Typography>
        </CardContent>
        <CardContent
          sx={{
            py: 1,
            mx: 2,
            borderRadius: 2,
            backgroundColor: "#f7f7f7",
          }}
        >
          <Grid container spacing={2} alignItems="center">
            <Grid item xs>
              {mnenomic ? (
                <Typography
                  sx={{
                    minHeight: 24,
                    fontSize: 16,
                  }}
                >
                  {mnenomic}
                </Typography>
              ) : (
                <Typography
                  sx={{
                    minHeight: 24,
                    fontSize: 16,
                    color: "#929292",
                  }}
                >
                  {`Click "Generate Mnenomic" to randomly generate mnenomic`}
                </Typography>
              )}
            </Grid>
            <Grid item>
              {mnenomic ? (
                <IconButton onClick={() => contentCopy(mnenomic, appStore)}>
                  <ContentCopyIcon />
                </IconButton>
              ) : null}
            </Grid>
          </Grid>
        </CardContent>
        <CardActions sx={{ p: 2 }}>
          <CardActionButton
            buttonText="Generate Mnenomic"
            onClick={generateMnenomic}
            disabled={!isInit || !!mnenomic}
            testId="generate-mnenomic"
          />
        </CardActions>
        {!!mnenomic && (
          <>
            <CardContent sx={{ pb: 0 }}>
              <Typography sx={{ fontSize: 20 }}>Coin Type</Typography>
            </CardContent>
            <CardActions sx={{ pl: 2, pr: 2, pb: 2 }}>
              <DemoAutocompleteCoinType
                setCoinType={setCoinType}
                setNetwork={setNetwork}
                setSegwitType={setSegwitType}
              />
              {network && (
                <DemoAutocompleteSegwit setSegwitType={setSegwitType} />
              )}
              <CardActionButton
                buttonText="Derive Address"
                onClick={generatePrivateKey}
                disabled={!isInit || !mnenomic || !coinType}
                testId="derive-address"
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
          </>
        )}
      </Card>
      <DemoDialog
        title={"Already created"}
        content={
          "The Private Key is already created, please try other coin types!"
        }
        showDialog={showDialog}
        handleConfirm={handleDialogClose}
      ></DemoDialog>
    </>
  ) : null;
};

export default observer(GenerateMnenomicCard);
