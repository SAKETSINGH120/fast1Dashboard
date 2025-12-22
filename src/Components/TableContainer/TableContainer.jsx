import { Paper } from "@mui/material";
import React from "react";

export default function TableContainer({ children }) {
  return (
    <div style={{ position: "relative" }}>
      <div className="table-container border">
        {/* <Paper className='border'> */}
        {children}
        {/* </Paper> */}
      </div>
    </div>
  );
}
