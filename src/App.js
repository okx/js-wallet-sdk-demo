import { lazy } from "react";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import DemoSnackBar from "./components/DemoSnackBar";

const InitSDKCard = lazy(() => import("./features/initSDK"));
// const GeneratePrivateKeyCard = lazy(() =>
//   import("./features/generatePrivateKey")
// );
const GenerateMnemonicCard = lazy(() => import("./features/generateMnemonic"));
const GetAllChainsCard = lazy(() => import("./features/getAllChains"));
// const GetAllCoinsCard = lazy(() => import("./features/getAllCoins"));
const CreateWalletCard = lazy(() => import("./features/createWallet"));
const GetBalanceCard = lazy(() => import("./features/getBalance"));
const GetTransactionsCard = lazy(() => import("./features/getTransactions"));
// const GetTransactionDetailCard = lazy(() =>
//   import("./features/getTransactionDetail")
// );
const DeployBRC20Card = lazy(() => import("./features/deployBRC20"));
const MintBRC20Card = lazy(() => import("./features/mintBRC20"));
const TransferBRC20Card = lazy(() => import("./features/transferBRC20"));

const defaultTheme = createTheme();
export default function Dashboard() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Typography variant="h4" sx={{ mb: 4 }}>
              OKX WaaS Demo
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <InitSDKCard />
              </Grid>
              <Grid item xs={12}>
                <GetAllChainsCard />
              </Grid>
              {/* <Grid item xs={12}>
                <GetAllCoinsCard />
              </Grid> */}
              {/* <Grid item xs={12}>
                <GeneratePrivateKeyCard />
              </Grid> */}
              <Grid item xs={12}>
                <GenerateMnemonicCard />
              </Grid>
              <Grid item xs={12}>
                <CreateWalletCard />
              </Grid>
              <Grid item xs={12}>
                <GetBalanceCard />
              </Grid>
              <Grid item xs={12}>
                <GetTransactionsCard />
              </Grid>
              {/* <Grid item xs={12}>
                <GetTransactionDetailCard />
              </Grid> */}
              <Grid item xs={12}>
                <DeployBRC20Card />
              </Grid>
              <Grid item xs={12}>
                <MintBRC20Card />
              </Grid>
              <Grid item xs={12}>
                <TransferBRC20Card />
              </Grid>
            </Grid>
            <DemoSnackBar />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
