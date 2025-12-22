
import React from "react";


import { Autocomplete, CircularProgress, TextField } from "@mui/material";


export const AutoComplete = (props) => {
    return (
        <>

            <Autocomplete
                id="competency-select"
                className="bg-white w-100"
                {...props}
                sx={{
                    '.MuiAutocomplete-inputRoot': {
                        minHeight: '30px',
                        alignItems: 'flex-start',

                    },
                    '.MuiAutocomplete-tag': {
                        lineHeight: '37px',

                    },
                    ...props.sx
                }}

                renderInput={(params) => (
                    <TextField
                        error={props.error}
                        {...params}
                        InputProps={{
                            ...params.InputProps,
                            sx: {
                                height: "38px",
                                padding: '0 10px',
                            },
                        }}
                        inputProps={{
                            ...params.inputProps,
                            endAdornment: (
                                <>
                                    {props.loader ? <CircularProgress color="inherit" size={20} /> : null}
                                    {params.InputProps.endAdornment}
                                </>
                            ),
                            sx: {
                                height: '100%',
                                padding: '0 !important',
                                display: 'flex',
                                alignItems: 'center',

                            },
                        }}
                        InputLabelProps={{
                            sx: {
                                position: 'absolute',
                                top: '-8px',
                                left: '0px',
                                '&.MuiInputLabel-shrink': {
                                    top: '-10px',
                                    left: '15px',
                                    fontSize: '0.75rem',
                                    transform: 'translate(0, 0)',
                                },
                            },
                        }}

                        label={props.label}
                    />
                )}


            />

        </>
    )
}




