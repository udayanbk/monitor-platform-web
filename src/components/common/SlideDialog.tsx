import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import { ReportData } from "./Interfaces";

interface DialogSlideInterface {
  openModal: boolean;
  setOpenModal: (x: boolean) => void;
  handleOKButton: (x: any) => void;
  headerText: string;
  descriptionText: string;
  tableData?: ReportData[];
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
  tableData,
}: DialogSlideInterface) {
  console.log("table data in slideDialog------------", tableData);
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
          {descriptionText && (
            <DialogContentText id="alert-dialog-slide-description">
              {descriptionText}
            </DialogContentText>
          )}

          {tableData && tableData.length > 0 && (
            <TableContainer sx={{ mt: 2 }}>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">
                      <strong>Date</strong>
                    </TableCell>
                    <TableCell align="center">
                      <strong>Mode</strong>
                    </TableCell>
                    <TableCell align="center">
                      <strong>Channel</strong>
                    </TableCell>
                    <TableCell align="center">
                      <strong>Status</strong>
                    </TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {tableData.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell align="center">{row.started_at ?? "-"}</TableCell>
                      <TableCell align="center">{row.trigger_type ?? "-"}</TableCell>
                      <TableCell align="center">{row.channel ?? "-"}</TableCell>
                      <TableCell align="center">{row.status ?? "-"}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </DialogContent>
        <DialogActions>
          {tableData && tableData.length > 0 ? (
            <Button onClick={handleClose} autoFocus>
              Close
            </Button>
          ) : (
            <>
              <Button onClick={handleClose}>Disagree</Button>

              <Button onClick={handleOKButton}>Agree</Button>
            </>
          )}
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
