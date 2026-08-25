import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";

interface DialogSlideInterface {
  openModal: boolean;
  setOpenModal: (x: boolean) => void;
  handleOKButton: (x: any) => void;
  headerText: string;
  descriptionText: string;
}

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function SlideDialog({
  openModal,
  setOpenModal,
  handleOKButton,
  headerText,
  descriptionText,
}: DialogSlideInterface) {
  const handleClose = () => {
    setOpenModal(false);
  };

  return (
    <React.Fragment>
      <Dialog
        open={openModal}
        slots={{
          transition: Transition,
        }}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        role="alertdialog"
      >
        <DialogTitle>{headerText}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {descriptionText}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            Disagree
          </Button>
          <Button onClick={handleOKButton}>Agree</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
