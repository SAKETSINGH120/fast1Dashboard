import React from "react";
import { IoMdClose } from "react-icons/io";
import { Drawer } from "@mui/material";
import "react-modern-drawer/dist/index.css";

export default function CustomDrawer({
  children,
  open,
  toggle,
  header,
  bigger,
  width,
}) {
  // Custom width for the Drawer
  const drawerWidth = bigger ? "70%" : "70%";

  return (
    <>
      <Drawer
        open={open}
        onClose={toggle}
        anchor="right" // This ensures the drawer appears on the right
        PaperProps={{
          sx: {
            width: width || drawerWidth, // Custom width for the drawer
            padding: "16px", // Add padding if necessary
            zIndex: 1200, // Moved zIndex here
          },
        }}
      >
        <div className="d-flex justify-content-between align-items-center">
          <div className="f-22 fw-600">{header}</div>
          <IoMdClose className="fs-18 pointer" onClick={toggle} />
        </div>
        <div className="w-100">{children}</div>
      </Drawer>
    </>
  );
}
