import { makeAutoObservable, runInAction } from "mobx";

import {
  BtcWallet,
  TBtcWallet,
  UsdtWallet,
  LtcWallet,
  BchWallet,
  BsvWallet,
  DogeWallet,
} from "@okxweb3/coin-bitcoin";
import { EthWallet } from "@okxweb3/coin-ethereum";
import { AptosWallet } from "@okxweb3/coin-aptos";
import {
  AtomWallet,
  OsmoWallet,
  EvmosWallet,
  AxelarWallet,
  CronosWallet,
  IrisWallet,
  JunoWallet,
  KavaWallet,
  KujiraWallet,
  SecretWallet,
  StargazeWallet,
  TerraWallet,
  SeiWallet,
} from "@okxweb3/coin-cosmos";
import { EosWallet } from "@okxweb3/coin-eos";
import { SolWallet } from "@okxweb3/coin-solana";
import { StxWallet } from "@okxweb3/coin-stacks";
import { StarknetWallet } from "@okxweb3/coin-starknet";
import { SuiWallet } from "@okxweb3/coin-sui";
import { TrxWallet } from "@okxweb3/coin-tron";
import { ZkspaceWallet, ZksyncWallet } from "@okxweb3/coin-zkspace";

import {
  generateWalletId,
  getRequestPathWithSearchParams,
  getRequestUrl,
  headerParams,
} from "../utils/index";
import {
  API_CREATE_WALLET,
  API_GET_ALL_CHAINS,
  API_GET_ALL_COINS,
  API_GET_ASSETS,
  API_GET_SIGN_INFO,
  API_GET_TRANSACTIONS,
  API_GET_TRANSACTION_DETAIL,
  API_GET_UTXO,
  API_GET_UTXO_NFT,
  API_SEND_TRANSACTION_BATCH,
  METHOD_GET,
  METHOD_POST,
  TICK_NAME,
} from "../constants/index";

export default class WalletStore {
  rootStore;
  coinTypeMapping = [];
  isInit = false;

  chainsAvailable = [
    {
      name: "BTC",
      imageUrl: "https://static.coinall.ltd/cdn/wallet/logo/BTC.png",
      shortName: "btc",
      coinId: 1,
      chainId: 0,
    },
    {
      name: "Ethereum",
      imageUrl: "https://static.coinall.ltd/cdn/wallet/logo/ETH-20220328.png",
      shortName: "eth",
      coinId: 3,
      chainId: 1,
    },
  ];
  coinsAvailable = [];
  selectedChain = undefined;
  selectedCoin = undefined;

  walletInfos = [];
  walletId = undefined;

  constructor(rootStore) {
    makeAutoObservable(this, { rootStore: false });
    this.rootStore = rootStore;
  }

  initialize() {
    // BTC network wallets, need to reference what wallets @okxweb3/coin-bitcoin provide, methods provided per different wallets are different too
    this.btcWallet = new BtcWallet();
    this.coinTypeMapping.push({
      network: "BTC",
      token: "BTC",
      label: "BTC",
      wallet: this.btcWallet,
    });
    this.bchWallet = new BchWallet();
    this.coinTypeMapping.push({
      network: "BTC",
      token: "BCH",
      label: "BCH",
      wallet: this.bchWallet,
    });
    this.bsvWallet = new BsvWallet();
    this.coinTypeMapping.push({
      network: "BTC",
      token: "BSV",
      label: "BSV",
      wallet: this.bsvWallet,
    });
    this.ltcWallet = new LtcWallet();
    this.coinTypeMapping.push({
      network: "BTC",
      token: "LTC",
      label: "LTC",
      wallet: this.ltcWallet,
    });
    this.dogeWallet = new DogeWallet();
    this.coinTypeMapping.push({
      network: "BTC",
      token: "DOGE",
      label: "Doge",
      wallet: this.dogeWallet,
    });
    this.tbtcWallet = new TBtcWallet();
    this.coinTypeMapping.push({
      network: "BTC",
      token: "TBTC",
      label: "TBTC",
      wallet: this.tbtcWallet,
    });
    this.usdtWallet = new UsdtWallet();
    this.coinTypeMapping.push({
      network: "BTC",
      token: "OMNI-USDT",
      label: "Omni USDT",
      wallet: this.usdtWallet,
    });

    // ETH network wallets, basically all methods provided per token are the same
    this.ethWallet = new EthWallet();
    this.coinTypeMapping.push({
      network: "ETH",
      token: "ETH",
      label: "ETH",
      wallet: this.ethWallet,
    });
    this.coinTypeMapping.push({
      network: "ETH",
      token: "A1",
      label: "Arbitrum One",
      wallet: this.ethWallet,
    });
    this.coinTypeMapping.push({
      network: "ETH",
      token: "NOVA",
      label: "Arbitrum Nova",
      wallet: this.ethWallet,
    });
    this.coinTypeMapping.push({
      network: "ETH",
      token: "AVAX",
      label: "Avalance C",
      wallet: this.ethWallet,
    });
    this.coinTypeMapping.push({
      network: "ETH",
      token: "BOBA",
      label: "Boba",
      wallet: this.ethWallet,
    });
    this.coinTypeMapping.push({
      network: "ETH",
      token: "BNB (ERC20)",
      label: "BNB Chain",
      wallet: this.ethWallet,
    });
    this.coinTypeMapping.push({
      network: "ETH",
      token: "CORE",
      label: "Core",
      wallet: this.ethWallet,
    });
    this.coinTypeMapping.push({
      network: "ETH",
      token: "CRO (ERC20)",
      label: "Cronos (EVM)",
      wallet: this.ethWallet,
    });
    this.coinTypeMapping.push({
      network: "ETH",
      token: "CELO",
      label: "Celo",
      wallet: this.ethWallet,
    });
    this.coinTypeMapping.push({
      network: "ETH",
      token: "CFX",
      label: "Conflux (EVM)",
      wallet: this.ethWallet,
    });
    this.coinTypeMapping.push({
      network: "ETH",
      token: "ACE",
      label: "Endurance",
      wallet: this.ethWallet,
    });
    this.coinTypeMapping.push({
      network: "ETH",
      token: "ETHW",
      label: "Ethereum PoW",
      wallet: this.ethWallet,
    });
    this.coinTypeMapping.push({
      network: "ETH",
      token: "ETHF",
      label: "Ethereum Fair",
      wallet: this.ethWallet,
    });
    this.coinTypeMapping.push({
      network: "ETH",
      token: "FIL (ERC20)",
      label: "Filecoin (EVM)",
      wallet: this.ethWallet,
    });
    this.coinTypeMapping.push({
      network: "ETH",
      token: "FTM",
      label: "Fantom",
      wallet: this.ethWallet,
    });
    this.coinTypeMapping.push({
      network: "ETH",
      token: "FLR",
      label: "Flare",
      wallet: this.ethWallet,
    });
    this.coinTypeMapping.push({
      network: "ETH",
      token: "GNO",
      label: "Gnosis",
      wallet: this.ethWallet,
    });
    this.coinTypeMapping.push({
      network: "ETH",
      token: "GETH",
      label: "Goerli",
      wallet: this.ethWallet,
    });
    this.coinTypeMapping.push({
      network: "ETH",
      token: "HAQQ",
      label: "HAQQ Network",
      wallet: this.ethWallet,
    });
    this.coinTypeMapping.push({
      network: "ETH",
      token: "KLAY",
      label: "Klaytn",
      wallet: this.ethWallet,
    });
    this.coinTypeMapping.push({
      network: "ETH",
      token: "KCS",
      label: "KCC",
      wallet: this.ethWallet,
    });
    this.coinTypeMapping.push({
      network: "ETH",
      token: "KAVA (ERC20)",
      label: "Kava (EVM)",
      wallet: this.ethWallet,
    });
    this.coinTypeMapping.push({
      network: "ETH",
      token: "TBA",
      label: "Linea",
      wallet: this.ethWallet,
    });
    this.coinTypeMapping.push({
      network: "ETH",
      token: "METIS",
      label: "Metis",
      wallet: this.ethWallet,
    });
    this.coinTypeMapping.push({
      network: "ETH",
      token: "GLMR",
      label: "Moonebeam",
      wallet: this.ethWallet,
    });
    this.coinTypeMapping.push({
      network: "ETH",
      token: "MOVR",
      label: "Moonriver",
      wallet: this.ethWallet,
    });
    this.coinTypeMapping.push({
      network: "ETH",
      token: "MNT",
      label: "Mantle",
      wallet: this.ethWallet,
    });
    this.coinTypeMapping.push({
      network: "ETH",
      token: "OMN",
      label: "Omega Network",
      wallet: this.ethWallet,
    });
    this.coinTypeMapping.push({
      network: "ETH",
      token: "OKT",
      label: "OKTC",
      wallet: this.ethWallet,
    });
    this.coinTypeMapping.push({
      network: "ETH",
      token: "OP",
      label: "Optimism",
      wallet: this.ethWallet,
    });
    this.coinTypeMapping.push({
      network: "ETH",
      token: "OPBNB",
      label: "opBNB",
      wallet: this.ethWallet,
    });
    this.coinTypeMapping.push({
      network: "ETH",
      token: "MATIC",
      label: "Polygon",
      wallet: this.ethWallet,
    });
    this.coinTypeMapping.push({
      network: "ETH",
      token: "MATIC (zkEVM)",
      label: "Polygon zkEVM",
      wallet: this.ethWallet,
    });
    this.coinTypeMapping.push({
      network: "ETH",
      token: "PULSE",
      label: "Pulse Chain",
      wallet: this.ethWallet,
    });
    this.coinTypeMapping.push({
      network: "ETH",
      token: "SEPOLIA",
      label: "Sepolia",
      wallet: this.ethWallet,
    });
    this.coinTypeMapping.push({
      network: "ETH",
      token: "ZKSYNC-ERA",
      label: "zkSync Era",
      wallet: this.ethWallet,
    });
    this.coinTypeMapping.push({
      network: "ETH",
      token: "ZETA",
      label: "Zeta Chain",
      wallet: this.ethWallet,
    });

    // COSMOS network wallets, need to reference what wallets @okxweb3/coin-cosmos provide, methods provided per different wallets are different too
    this.atomWallet = new AtomWallet();
    this.coinTypeMapping.push({
      network: "COSMOS",
      token: "ATOM",
      label: "Atom",
      wallet: this.atomWallet,
    });
    this.axelarWallet = new AxelarWallet();
    this.coinTypeMapping.push({
      network: "COSMOS",
      token: "AXL",
      label: "Axelar",
      wallet: this.axelarWallet,
    });
    this.cronosWallet = new CronosWallet();
    this.coinTypeMapping.push({
      network: "COSMOS",
      token: "CRO",
      label: "Cronos",
      wallet: this.cronosWallet,
    });
    this.osmoWallet = new OsmoWallet();
    this.coinTypeMapping.push({
      network: "COSMOS",
      token: "OSMO",
      label: "Osmosis",
      wallet: this.osmoWallet,
    });
    this.evmosWallet = new EvmosWallet();
    this.coinTypeMapping.push({
      network: "COSMOS",
      token: "EVMOS",
      label: "Evmos",
      wallet: this.evmosWallet,
    });
    this.irisWallet = new IrisWallet();
    this.coinTypeMapping.push({
      network: "COSMOS",
      token: "IRIS",
      label: "Iris",
      wallet: this.irisWallet,
    });
    this.junoWallet = new JunoWallet();
    this.coinTypeMapping.push({
      network: "COSMOS",
      token: "JUNO",
      label: "Juno",
      wallet: this.junoWallet,
    });
    this.kavaWallet = new KavaWallet();
    this.coinTypeMapping.push({
      network: "COSMOS",
      token: "KAVA",
      label: "Kava",
      wallet: this.kavaWallet,
    });
    this.kujiraWallet = new KujiraWallet();
    this.coinTypeMapping.push({
      network: "COSMOS",
      token: "KUJI",
      label: "Kujira",
      wallet: this.kujiraWallet,
    });
    this.secretWallet = new SecretWallet();
    this.coinTypeMapping.push({
      network: "COSMOS",
      token: "SCRT",
      label: "Secret",
      wallet: this.secretWallet,
    });
    this.seiWallet = new SeiWallet();
    this.coinTypeMapping.push({
      network: "COSMOS",
      token: "SEI",
      label: "Sei",
      wallet: this.seiWallet,
    });
    this.stargazeWallet = new StargazeWallet();
    this.coinTypeMapping.push({
      network: "COSMOS",
      token: "STARS",
      label: "Stargaze",
      wallet: this.stargazeWallet,
    });
    this.terraWallet = new TerraWallet();
    this.coinTypeMapping.push({
      network: "COSMOS",
      token: "LUNA",
      label: "Terra",
      wallet: this.terraWallet,
    });

    // wallets other than BTC, ETH & COSMOS networks
    this.aptosWallet = new AptosWallet();
    this.coinTypeMapping.push({
      network: "APTOS",
      token: "APTOS",
      label: "Aptos",
      wallet: this.aptosWallet,
    });

    this.eosWallet = new EosWallet();
    this.coinTypeMapping.push({
      network: "EOS",
      token: "EOS",
      label: "EOS",
      wallet: this.eosWallet,
    });

    this.solWallet = new SolWallet();
    this.coinTypeMapping.push({
      network: "SOL",
      token: "SOL",
      label: "Solana",
      wallet: this.solWallet,
    });

    this.stxWallet = new StxWallet();
    this.coinTypeMapping.push({
      network: "STX",
      token: "STX",
      label: "Stacks",
      wallet: this.stxWallet,
    });

    this.starknetWallet = new StarknetWallet();
    this.coinTypeMapping.push({
      network: "STARK",
      token: "STARK",
      label: "Starknet",
      wallet: this.starknetWallet,
    });

    this.suiWallet = new SuiWallet();
    this.coinTypeMapping.push({
      network: "SUI",
      token: "SUI",
      label: "SUI",
      wallet: this.suiWallet,
    });

    this.trxWallet = new TrxWallet();
    this.coinTypeMapping.push({
      network: "TRX",
      token: "TRON",
      label: "TRX",
      wallet: this.trxWallet,
    });

    this.zkSpaceWallet = new ZkspaceWallet();
    this.coinTypeMapping.push({
      network: "ZKSPACE",
      token: "ZKSPACE",
      label: "zkSpace",
      wallet: this.zkSpaceWallet,
    });

    this.zkSyncWallet = new ZksyncWallet();
    this.coinTypeMapping.push({
      network: "ZKSYNC",
      token: "ZKSYNC",
      label: "zkSync",
      wallet: this.zkSyncWallet,
    });

    this.isInit = true;
  }

  getWallet(coinType) {
    const data = this.coinTypeMapping.find((data) => data.label === coinType);
    return data.wallet;
  }

  fetchChainsAvailable = async () => {
    try {
      const date = new Date().toISOString();
      const url = getRequestUrl(API_GET_ALL_CHAINS);
      const response = await fetch(url, {
        headers: headerParams(date, METHOD_GET, API_GET_ALL_CHAINS),
      });
      const json = await response.json();
      if (json && json.data) {
        const data = json.data;
        runInAction(() => {
          this.chainsAvailable = data;
          console.log("chainsAvailable", this.chainsAvailable);
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  setSelectedChain = (chainId) => {
    this.selectedChain = this.chainsAvailable.find(
      (chain) => chain.chainId === chainId
    );
  };

  fetchCoinsAvailable = async () => {
    try {
      const date = new Date().toISOString();
      const url = getRequestUrl(API_GET_ALL_COINS, {
        type: 0,
      });
      const path = getRequestPathWithSearchParams(API_GET_ALL_COINS, {
        type: 0,
      });
      const response = await fetch(url, {
        headers: headerParams(date, METHOD_GET, path),
      });
      const json = await response.json();
      if (json && json.data) {
        const data = json.data;
        runInAction(() => {
          this.coinsAvailable = data;
          console.log("coinsAvailable", this.coinsAvailable);
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  setWalletInfos = (walletInfos) => {
    this.walletInfos = walletInfos;
  };

  createWallet = async () => {
    try {
      const walletId = generateWalletId();
      const date = new Date().toISOString();
      const url = getRequestUrl(API_CREATE_WALLET);
      const body = {
        walletId,
        addresses: this.walletInfos.map((walletInfo) => {
          console.log(walletInfo);
          return {
            chainId: walletInfo.chainId || 0,
            address: walletInfo.address,
          };
        }),
      };
      const response = await fetch(url, {
        method: METHOD_POST,
        headers: headerParams(
          date,
          METHOD_POST,
          API_CREATE_WALLET,
          JSON.stringify(body)
        ),
        body: JSON.stringify(body),
      });
      const json = await response.json();
      if (json && json.data) {
        const data = json.data;
        runInAction(() => {
          this.walletId = data[0].walletId;
          console.log("walletId", this.walletId);
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  getBalance = async () => {
    try {
      const walletId = this.walletId;
      const date = new Date().toISOString();
      const url = getRequestUrl(API_GET_ASSETS);
      const body = {
        walletId,
        chainIds: this.walletInfos.reduce((arr, walletInfo) => {
          if (!arr.includes(walletInfo.chainId)) {
            return arr;
          }
          return [...arr, walletInfo.chainId];
        }, []),
      };
      const response = await fetch(url, {
        method: METHOD_POST,
        headers: headerParams(
          date,
          METHOD_POST,
          API_GET_ASSETS,
          JSON.stringify(body)
        ),
        body: JSON.stringify(body),
      });
      const json = await response.json();
      if (json && json.data) {
        const data = json.data;
        return data;
      }
    } catch (err) {
      console.error(err);
    }
  };

  getTransactions = async () => {
    try {
      const walletId = this.walletId;
      const date = new Date().toISOString();
      const url = getRequestUrl(API_GET_TRANSACTIONS);
      const body = {
        walletId,
        limit: 10,
      };
      const response = await fetch(url, {
        method: METHOD_POST,
        headers: headerParams(
          date,
          METHOD_POST,
          API_GET_TRANSACTIONS,
          JSON.stringify(body)
        ),
        body: JSON.stringify(body),
      });
      const json = await response.json();
      if (json && json.data) {
        const data = json.data;
        return data;
      }
    } catch (err) {
      console.error(err);
    }
  };

  getTransactionDetail = async (orderId, chainId) => {
    try {
      const walletId = this.walletId;
      const date = new Date().toISOString();
      const url = getRequestUrl(API_GET_TRANSACTION_DETAIL);
      const body = {
        walletId,
        orderId,
        chainId,
      };
      const response = await fetch(url, {
        method: METHOD_POST,
        headers: headerParams(
          date,
          METHOD_POST,
          API_GET_TRANSACTION_DETAIL,
          JSON.stringify(body)
        ),
        body: JSON.stringify(body),
      });
      const json = await response.json();
      if (json && json.data) {
        const data = json.data;
        return data;
      }
    } catch (err) {
      console.error(err);
    }
  };

  getSignInfo = async (fromAddress, toAddress) => {
    try {
      const date = new Date().toISOString();
      const url = getRequestUrl(API_GET_SIGN_INFO);
      const body = {
        addrFrom: fromAddress,
        addrTo: toAddress,
        txAmount: 0,
        chainId: 0,
        extJson: {},
      };
      const response = await fetch(url, {
        method: METHOD_POST,
        headers: headerParams(
          date,
          METHOD_POST,
          API_GET_SIGN_INFO,
          JSON.stringify(body)
        ),
        body: JSON.stringify(body),
      });
      const json = await response.json();
      if (json && json.data) {
        const data = json.data;
        console.log(data);
        return data;
      }
    } catch (err) {
      console.error(err);
    }
  };

  getUTXO = async (
    fromAddress,
    inscriptionOutput,
    minOutput,
    normalCost,
    txAmount
  ) => {
    try {
      const date = new Date().toISOString();
      const url = getRequestUrl(API_GET_UTXO);
      const body = {
        chainId: 0,
        utxoRequests: [
          {
            address: fromAddress,
            coinAmount:
              inscriptionOutput * txAmount > minOutput
                ? inscriptionOutput * txAmount
                : minOutput,
            serviceCharge: normalCost * txAmount,
            utxoType: 11,
          },
        ],
      };
      const response = await fetch(url, {
        method: METHOD_POST,
        headers: headerParams(
          date,
          METHOD_POST,
          API_GET_UTXO,
          JSON.stringify(body)
        ),
        body: JSON.stringify(body),
      });
      const json = await response.json();
      if (json && json.data) {
        const data = json.data;
        console.log(data);
        return data;
      }
    } catch (err) {
      console.error(err);
    }
  };

  getUTXONFT = async (fromAddress) => {
    try {
      const date = new Date().toISOString();
      const url = getRequestUrl(API_GET_UTXO_NFT);
      const body = {
        chainId: 0,
        utxoRequests: [
          {
            address: fromAddress,
            tick: TICK_NAME,
            page: 1,
            pageSize: 10,
          },
        ],
      };
      const response = await fetch(url, {
        method: METHOD_POST,
        headers: headerParams(
          date,
          METHOD_POST,
          API_GET_UTXO_NFT,
          JSON.stringify(body)
        ),
        body: JSON.stringify(body),
      });
      const json = await response.json();
      if (json && json.data) {
        const data = json.data;
        console.log(data);
        return data;
      }
    } catch (err) {
      console.error(err);
    }
  };

  constructBRC20Tx = async (
    fromAddress,
    utxoList,
    normalFeeRate,
    inscriptionOutput,
    inscriptionBody
  ) => {
    try {
      const privateKey = this.walletInfos.find(
        (walletInfo) =>
          walletInfo.coinType === "BTC" && walletInfo.address === fromAddress
      ).privateKey;

      const commitTxPrevOutputList = [];
      utxoList.forEach((utxo) => {
        commitTxPrevOutputList.push({
          txId: utxo.txHash,
          vOut: utxo.vOut,
          amount: utxo.coinAmount,
          address: fromAddress,
          privateKey,
        });
      });

      const inscriptionDataList = [];
      inscriptionDataList.push({
        contentType: "text/plain;charset=utf-8",
        body: inscriptionBody,
        revealAddr: fromAddress,
      });

      const wallet = this.getWallet("BTC");
      const data = {
        type: 1,
        commitTxPrevOutputList,
        commitFeeRate: normalFeeRate,
        revealFeeRate: normalFeeRate,
        revealOutValue: inscriptionOutput,
        inscriptionDataList,
        changeAddress: fromAddress,
      };
      console.log(data);
      const txs = await wallet.signTransaction({ data });
      console.log(txs);
      return txs;
    } catch (err) {
      console.error(err);
    }
  };

  constructBTCTx = async (fromAddress, utxoList) => {
    try {
      const wallet = this.getWallet("BTC");
      const privateKey = this.walletInfos.find(
        (walletInfo) =>
          walletInfo.coinType === "BTC" && walletInfo.address === fromAddress
      ).privateKey;

      const inputs = utxoList.map((utxo) => {
        return {
          txId: utxo.txHash,
          vOut: utxo.vOut,
          // amount: utxo.coinAmount,
        };
      });
      const outputs = [
        {
          address: fromAddress,
          // amount: 0,
        },
      ];
      const txs = await wallet.signTransaction({
        privateKey,
        data: {
          inputs,
          outputs,
          address: fromAddress,
          feePerB: 2,
        },
      });
      console.log(txs);
      return txs;
    } catch (err) {
      console.error(err);
    }
  };

  sendTransactionBatch = async (
    fromAddress,
    toAddress,
    txs,
    txType,
    normalFeeRate
  ) => {
    try {
      const wallet = this.getWallet("BTC");
      const walletId = this.walletId;
      const date = new Date().toISOString();
      const url = getRequestUrl(API_SEND_TRANSACTION_BATCH);
      const body = {
        txList: [
          {
            signedTx: txs.commitTx,
            walletId,
            addrFrom: fromAddress,
            addrTo: toAddress,
            txHash: wallet.calcTxHash({
              data: txs.commitTx,
            }),
            txAmount: 0,
            chainId: 0,
            txType,
            serviceCharge: txs.commitTxFee,
            tokenAddress: `${fromAddress}-brc20-okex`,
            extJson: {
              broadcastType: 1,
              dependTx: [],
              feeRate: normalFeeRate,
              itemId: "commitTx",
            },
          },
          ...txs.revealTxList.map((revealTx, index) => {
            return {
              signedTx: revealTx,
              walletId,
              addrFrom: fromAddress,
              addrTo: toAddress,
              txHash: wallet.calcTxHash({
                data: revealTx,
              }),
              txAmount: 0,
              chainId: 0,
              txType,
              serviceCharge: txs.revealTxFees[index],
              tokenAddress: `${fromAddress}-brc20-okex`,
              extJson: {
                broadcastType: 1,
                dependTx: [
                  wallet.calcTxHash({
                    data: txs.commitTx,
                  }),
                ],
                feeRate: normalFeeRate,
                itemId: `revealTx${index}`,
              },
            };
          }),
        ],
      };
      const response = await fetch(url, {
        method: METHOD_POST,
        headers: headerParams(
          date,
          METHOD_POST,
          API_SEND_TRANSACTION_BATCH,
          JSON.stringify(body)
        ),
        body: JSON.stringify(body),
      });
      const json = await response.json();
      if (json && json.data) {
        const data = json.data;
        return data;
      }
    } catch (err) {
      console.error(err);
    }
  };

  sendTransaction = async (
    fromAddress,
    toAddress,
    tx,
    txType,
    normalFeeRate,
    normalCost
  ) => {
    try {
      const wallet = this.getWallet("BTC");
      const walletId = this.walletId;
      const date = new Date().toISOString();
      const url = getRequestUrl(API_SEND_TRANSACTION_BATCH);
      const body = {
        txList: [
          {
            signedTx: tx,
            walletId,
            addrFrom: fromAddress,
            addrTo: toAddress,
            txHash: wallet.calcTxHash({
              data: tx,
            }),
            txAmount: 0,
            chainId: 0,
            txType,
            serviceCharge: normalCost,
            tokenAddress: `${fromAddress}-brc20-okex`,
            extJson: {
              broadcastType: 1,
              dependTx: [],
              feeRate: normalFeeRate,
              itemId: "transferTx",
            },
          },
        ],
      };
      const response = await fetch(url, {
        method: METHOD_POST,
        headers: headerParams(
          date,
          METHOD_POST,
          API_SEND_TRANSACTION_BATCH,
          JSON.stringify(body)
        ),
        body: JSON.stringify(body),
      });
      const json = await response.json();
      if (json && json.data) {
        const data = json.data;
        return data;
      }
    } catch (err) {
      console.error(err);
    }
  };

  deployBRC20 = async (fromAddress) => {
    try {
      const signInfo = await this.getSignInfo(fromAddress, fromAddress);
      // txAmount for deploy BRC20 is 1 commit tx + 1 reveal tx
      const utxo = await this.getUTXO(
        fromAddress,
        signInfo[0].inscriptionOutput,
        signInfo[0].minOutput,
        signInfo[0].normalCost,
        1 + 1
      );
      const inscribedTxs = await this.constructBRC20Tx(
        fromAddress,
        utxo[0].utxoList,
        signInfo[0].normalFeeRate,
        signInfo[0].inscriptionOutput,
        `{"p":"brc-20","op":"deploy","tick":${TICK_NAME},"max":"21000000","lim":"1000"}`
      );
      const result = await this.sendTransactionBatch(
        fromAddress,
        fromAddress,
        inscribedTxs,
        "BRC20_DEPLOY",
        signInfo[0].normalFeeRate
      );
      console.log(result);
      return result;
    } catch (err) {
      console.error(err);
    }
  };

  mintBRC20 = async (fromAddress) => {
    try {
      const signInfo = await this.getSignInfo(fromAddress, fromAddress);
      // txAmount for deploy BRC20 is 1 commit tx + 1 reveal tx
      const utxo = await this.getUTXO(
        fromAddress,
        signInfo[0].inscriptionOutput,
        signInfo[0].minOutput,
        signInfo[0].normalCost,
        1 + 1
      );
      const inscribedTxs = await this.constructBRC20Tx(
        fromAddress,
        utxo[0].utxoList,
        signInfo[0].normalFeeRate,
        signInfo[0].inscriptionOutput,
        `{"p":"brc-20","op":"mint","tick":${TICK_NAME},"amt":"100"}`
      );
      const result = await this.sendTransactionBatch(
        fromAddress,
        fromAddress,
        inscribedTxs,
        "BRC20_MINT",
        signInfo[0].normalFeeRate
      );
      console.log(result);
      return result;
    } catch (err) {
      console.error(err);
    }
  };

  transferBRC20 = async (fromAddress, toAddress) => {
    try {
      const signInfo = await this.getSignInfo(fromAddress, fromAddress);
      // txAmount for deploy BRC20 is 1 commit tx + 1 reveal tx
      const utxo = await this.getUTXO(
        fromAddress,
        signInfo[0].inscriptionOutput,
        signInfo[0].minOutput,
        signInfo[0].normalCost,
        1 + 1
      );
      const inscribedTxs = await this.constructBRC20Tx(
        fromAddress,
        utxo[0].utxoList,
        signInfo[0].normalFeeRate,
        signInfo[0].inscriptionOutput,
        `{"p":"brc-20","op":"transfer","tick":${TICK_NAME},"amt":"100"}`
      );
      const result = await this.sendTransactionBatch(
        fromAddress,
        fromAddress,
        inscribedTxs,
        "BRC20_INSCRIBE",
        signInfo[0].normalFeeRate
      );
      console.log(result);

      const transferSignInfo = await this.getSignInfo(fromAddress, toAddress);
      const utxoNFT = await this.getUTXONFT(fromAddress);
      const tx = await this.constructBTCTx(fromAddress, utxoNFT[0].utxoList);
      const wallet = this.getWallet("BTC");
      const signedTx = await wallet.signTransaction(tx);
      const transferResult = await this.sendTransaction(
        fromAddress,
        toAddress,
        signedTx,
        "TRANSFER",
        transferSignInfo[0].normalFeeRate,
        transferSignInfo[0].normalCost
      );
      console.log(transferResult);
      return transferResult;
    } catch (err) {
      console.error(err);
    }
  };

  dispose() {
    this.coinTypeMapping = [];
    this.isInit = false;

    this.chainsAvailable = [];
    this.coinsAvailable = [];
    this.selectedChain = undefined;
    this.selectedCoin = undefined;

    this.walletInfos = [];
    this.walletId = undefined;
  }
}
