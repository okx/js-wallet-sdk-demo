import { makeAutoObservable } from "mobx";

import { BtcWallet, TBtcWallet } from "@okxweb3/coin-bitcoin";
import { EthWallet } from "@okxweb3/coin-ethereum";
import { AptosWallet } from "@okxweb3/coin-aptos";
import { AtomWallet } from "@okxweb3/coin-cosmos";
import { EosWallet } from "@okxweb3/coin-eos";
import { SolWallet } from "@okxweb3/coin-solana";
import { StxWallet } from "@okxweb3/coin-stacks";
import { StarknetWallet } from "@okxweb3/coin-starknet";
import { SuiWallet } from "@okxweb3/coin-sui";
import { TrxWallet } from "@okxweb3/coin-tron";
import { ZkspaceWallet, ZksyncWallet } from "@okxweb3/coin-zkspace";

export default class WalletStore {
  rootStore;
  isInit = false;

  constructor(rootStore) {
    makeAutoObservable(this, { rootStore: false });
    this.rootStore = rootStore;
    // this.initialize();
  }

  initialize() {
    this.btcWallet = new BtcWallet();
    this.tbtcWallet = new TBtcWallet();
    this.ethWallet = new EthWallet();
    this.goerliWallet = new EthWallet();
    this.oktcWallet = new EthWallet();
    this.aptosWallet = new AptosWallet();
    this.atomWallet = new AtomWallet();
    this.eosWallet = new EosWallet();
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
      case "TBTC": {
        return this.tbtcWallet;
      }
      case "ETH": {
        return this.ethWallet;
      }
      case "GOERLI": {
        return this.goerliWallet;
      }
      case "OKTC": {
        return this.oktcWallet;
      }
      case "APTOS": {
        return this.aptosWallet;
      }
      case "ATOM": {
        return this.atomWallet;
      }
      case "EOS": {
        return this.eosWallet;
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
