import { Dialog, Modal } from "@material-ui/core";
import React, { createContext, useState } from "react";

export const DialogContext = createContext({
  open: false,
  setOpen: (open) => {}
})

export const DialogProvider = ({ children }) => {
  const [open, setOpen] = useState<boolean>(false)
  return <DialogContext.Provider value={{ open, setOpen }}>
    {children}
    <Dialog
      open={open}
      onClose={setOpen}
    >
      Hey
    </Dialog>
  </DialogContext.Provider>
}