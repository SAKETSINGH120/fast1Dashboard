import { Backdrop, CircularProgress } from "@mui/material";
import React, { useState } from "react";
import { Modal } from "reactstrap";
import Style from "../../Components/Users/Uselisting.module.css";

export const ConfirmModal = ({ data, children, onsubmit,display }) => {
  let [open, setOpen] = useState(false);

  return (
    <>
      <div onClick={() => setOpen(true)}>{children}</div>

      <Modal className={``} centered isOpen={open}>
        <div className={`p-4 ${Style.modal_content_1}`}>
          <div>
            <div className={`${Style.delete_modal_text}`}>
              Are you sure you want to delete the {display} ?
            </div>
            <div className={`${Style.delete_modal_text_1}`}>
              This will delete this {display} permanently, you cannot undo this
              action
            </div>
          </div>

          <div className={`${Style.delete_buttons_section}`}>
            <div
              className={`${Style.cancel_button_of_delete_section}`}
              onClick={() => setOpen(false)}
            >
              Cancel
            </div>
            <div
              className={`${Style.delete_button_of_delete_section}`}
              onClick={() => {
                onsubmit(data);
                setOpen(false);
              }}
            >
              Delete
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};
