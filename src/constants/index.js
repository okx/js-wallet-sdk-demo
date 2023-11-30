export const METHOD_GET = "GET";
export const METHOD_POST = "POST";

export const HOST_DEV = "https://beta.okex.org";
export const HOST_PROD = "https://www.okx.com";

export const API_GET_ALL_CHAINS = "/api/v5/waas/blockchain/get-all-chains";
export const API_GET_ALL_COINS = "/api/v5/waas/asset/get-all-coins";

export const API_CREATE_WALLET = "/api/v5/waas/wallet/create-wallet";

export const API_GET_ASSETS = "/api/v5/waas/asset/get-assets";

export const API_GET_TRANSACTIONS = "/api/v5/waas/transaction/get-transactions";
export const API_GET_TRANSACTION_DETAIL =
  "/api/v5/waas/transaction/get-transaction-detail";

export const API_GET_SIGN_INFO = "/api/v5/waas/transaction/get-sign-info";
export const API_GET_UTXO = "/api/v5/waas/transaction/get-utxo";
export const API_GET_UTXO_NFT = "/api/v5/waas/transaction/get-utxo-nft";

export const API_SEND_TRANSACTION = "/api/v5/waas/transaction/send-transaction";
export const API_SEND_TRANSACTION_BATCH =
  "/api/v5/waas/transaction/send-transaction-batch";

export const BRC20_DEPLOY_PARAMS = {
  p: "brc-20",
  op: "deploy",
  tick: "ordi",
};
export const BRC20_MINT_PARAMS = {
  p: "brc-20",
  op: "mint",
  tick: "ordi",
};
export const BRC20_TRANSFER_PARAMS = {
  p: "brc-20",
  op: "transfer",
  tick: "ordi",
};

export const TICK_NAME = "okex";