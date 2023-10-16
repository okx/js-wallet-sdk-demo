import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";

const DemoDialog = ({
  title,
  content,
  closeButtonText = "No",
  confirmButtonText = "Yes",
  showDialog = false,
  handleClose,
  handleConfirm,
}) => {
  return (
    <Dialog
      open={showDialog}
      onClose={handleClose || handleConfirm}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {content}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        {handleClose && (
          <Button onClick={handleClose}>{closeButtonText}</Button>
        )}
        <Button onClick={handleConfirm} autoFocus>
          {confirmButtonText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export { DemoDialog };
