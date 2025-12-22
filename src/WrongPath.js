import { Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

export const WrongPath = () => {
    return (
        <>
            <div className="not-found-container">
                <div className="not-found">
                    <h1>404</h1>
                    <p>Page Not Found</p>
                </div>
            </div>
        </>
    )
}