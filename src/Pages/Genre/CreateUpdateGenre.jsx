
import React, { useEffect } from "react"
import { useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { Box, Dialog, Modal } from "@mui/material"
import { PACKAGE_TYPES, STATUS_OPTIONS } from "../../utils/constant"


import { loader, snackbar } from "../../utils"
import EditIcon from '@mui/icons-material/Edit';
import CustomDrawer from "../../Components/CustomDrawer/CustomDrawer"
import { AutoComplete } from "../../Components/Inputs/AutoComplete"
import { addGenre, updateGenre } from "../../Components/service/admin"

export const CreateUpdateGenre = ({ onSubmit, mode, formData }) => {

    let [drawer, setDrawer] = useState(false)
    let [allChannels, setAllChannels] = useState([])

    const { control, handleSubmit, watch, reset, setValue, formState: { errors } } = useForm({
        defaultValues: {
            name: ""

        }
    })

    async function formSubmit(data) {
        try {
            loader.start()
            if (mode === "edit") {
                let res = await updateGenre(formData._id, data)
                snackbar.success("Genre updated successfully")
            }
            else {
                let res = await addGenre(data)
                snackbar.success("Genre created successfully")
            }
            reset()
            onSubmit()
            setDrawer(false)
        } catch (error) {
            if (error?.response?.data?.errormessage !== undefined) {
                snackbar.error(error?.response?.data?.errormessage)
            } else {
                snackbar.error('Some error occupide please check and try again')
            }
            console.log(error)
        }
        finally {
            loader.stop()
        }
    }

    function editClick() {


        let { name } = formData

        reset({
            name
        })
        setDrawer(true)
    }


    return (
        <div>
            {mode === "edit" ? <EditIcon className="pointer" onClick={editClick} /> :
                <button className="btn btn-primary btn-radius px-3" onClick={() => setDrawer(true)}>Add Genre</button>
            }
            <Dialog
                open={drawer}
                toggle={() => setDrawer(!drawer)}
                header={`${mode == "edit" ? "Edit" : "Add"} Package`}
            >
                <Box p={3} sx={{ width: "600px" }}  >
                    <h3>{mode === "edit" ? "Edit" : "Add"} Genre</h3>
                    <form onSubmit={handleSubmit(formSubmit)}>
                        <div>
                            <label className="form-label mb-1" htmlFor="name">
                                Genre Name
                            </label>
                            <Controller
                                name="name"
                                rules={{
                                    required: "Required",
                                    validate: (value) => value.trim() !== "" || "Field cannot be empty",
                                }}
                                control={control}
                                defaultValue={null}
                                render={({ field: { value, onChange } }) => {
                                    return (<input
                                        value={value}
                                        onChange={onChange}
                                        className={`form-control ${errors.name ? "Validation" : ""}`}
                                        placeholder="Genre Name"
                                    />)
                                }} />
                        </div>

                        <div className="d-flex justify-content-end mt-3">
                            <button
                                className="btn"
                                type="button"
                                onClick={() => {
                                    setDrawer(false)
                                    reset()
                                }}
                            >
                                Cancel
                            </button>
                            <button
                                className="btn btn-primary m-1"
                                type="submit"
                            >
                                {mode == "edit" ? "Update" : "Add"} Genre
                            </button>
                        </div>
                    </form>


                </Box>


            </Dialog>

        </div>
    )
}