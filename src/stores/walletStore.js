import { makeAutoObservable } from "mobx";

import { BtcWallet } from "@okxweb3/coin-bitcoin";
import { EthWallet } from "@okxweb3/coin-ethereum";

export default class WalletStore {
  rootStore;

  btcWallet;
  ethWallet;
  isInit = false;

  constructor(rootStore) {
    makeAutoObservable(this, { rootStore: false });
    this.rootStore = rootStore;
    // this.initialize();
  }

  initialize() {
    this.btcWallet = new BtcWallet();
    this.ethWallet = new EthWallet();
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
