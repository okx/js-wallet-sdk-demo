import { makeAutoObservable } from "mobx";

import { BtcWallet } from "@okxweb3/coin-bitcoin";
import { EthWallet } from "@okxweb3/coin-ethereum";
import { AptosWallet } from "@okxweb3/coin-aptos";
import { CosmosWallet } from "@okxweb3/coin-cosmos";
import { EosWallet, WaxWallet } from "@okxweb3/coin-eos";
import { SolWallet } from "@okxweb3/coin-solana";
import { StxWallet } from "@okxweb3/coin-stacks";
import { StarknetWallet } from "@okxweb3/coin-starknet";
import { SuiWallet } from "@okxweb3/coin-sui";
import { TrxWallet } from "@okxweb3/coin-tron";
import { ZkspaceWallet, ZksyncWallet } from "@okxweb3/coin-zkspace";

export default class WalletStore {
  rootStore;

  btcWallet;
  ethWallet;
  aptosWallet;
  cosmosWallet;
  eosWallet;
  waxWallet;
  solWallet;
  stxWallet;
  starknetWallet;
  suiWallet;
  trxWallet;
  zkSpaceWallet;
  zkSyncWallet;

  isInit = false;

  constructor(rootStore) {
    makeAutoObservable(this, { rootStore: false });
    this.rootStore = rootStore;
    // this.initialize();
  }

  initialize() {
    this.btcWallet = new BtcWallet();
    this.ethWallet = new EthWallet();
    this.aptosWallet = new AptosWallet();
    this.cosmosWallet = new CosmosWallet();
    this.eosWallet = new EosWallet();
    this.waxWallet = new WaxWallet();
    this.solWallet = new SolWallet();
    this.stxWallet = new StxWallet();
    this.starknetWallet = new StarknetWallet();
    this.suiWallet = new SuiWallet();
    this.trxWallet = new TrxWallet();
    this.zkSpaceWallet = new ZkspaceWallet();
    this.zkSyncWallet = new ZksyncWallet();
    this.isInit = true;
  }

  get isInitialized() {
    return this.isInit;
  }

  getWallet(coinType) {
    switch (coinType) {
      case "BTC": {
        return this.btcWallet;
      }
      case "ETH": {
        return this.ethWallet;
      }
      case "APTOS": {
        return this.aptosWallet;
      }
      case "COSMOS": {
        return this.cosmosWallet;
      }
      case "EOS": {
        return this.eosWallet;
      }
      case "WAX": {
        return this.waxWallet;
      }
      case "SOL": {
        return this.solWallet;
      }
      case "STX": {
        return this.stxWallet;
      }
      case "STARK": {
        return this.starknetWallet;
      }
      case "SUI": {
        return this.suiWallet;
      }
      case "TRX": {
        return this.trxWallet;
      }
      case "ZKSPACE": {
        return this.zkSpaceWallet;
      }
      case "ZKSYNC": {
        return this.zkSyncWallet;
      }
      default: {
        throw new Error("No such wallet");
      }
    }
  }

  dispose() {
    this.btcWallet = undefined;
    this.ethWallet = undefined;
    this.isInit = false;
  }
}
