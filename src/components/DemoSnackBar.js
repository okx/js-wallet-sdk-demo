import { Snackbar } from "@mui/material";

import { useStore } from "../stores";
import { observer } from "mobx-react-lite";

const DemoSnackBar = () => {
  const { appStore } = useStore();
  const open = appStore.openSnackBar;

  const setOpen = (open) => {
    appStore.openSnackBar = open;
  };
  return (
    <Snackbar
      open={open}
      autoHideDuration={1000}
      onClose={() => setOpen(false)}
      message={appStore.snackBarMessage}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
    />
  );
};

export default observer(DemoSnackBar);
