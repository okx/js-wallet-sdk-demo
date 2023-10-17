import { makeAutoObservable } from "mobx";

export default class AppStore {
  rootStore;
  openSnackBar = false;
  snackBarMessage = "";

  constructor(rootStore) {
    makeAutoObservable(this, { rootStore: false });
    this.rootStore = rootStore;
  }
}
