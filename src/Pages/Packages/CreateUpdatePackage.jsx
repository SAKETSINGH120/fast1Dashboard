import React, { useEffect } from "react"
import { useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { Box } from "@mui/material"
import { PACKAGE_TYPES, STATUS_OPTIONS } from "../../utils/constant"
import { createPackage, getallChannel, updatePackage } from "../../Components/service/admin"

import { loader, snackbar } from "../../utils"
import EditIcon from '@mui/icons-material/Edit';
import CustomDrawer from "../../Components/CustomDrawer/CustomDrawer"
import { AutoComplete } from "../../Components/Inputs/AutoComplete"

export const CreateUpdatePackage = ({ onSubmit, mode, formData }) => {

    let [drawer, setDrawer] = useState(false)
    let [allChannels, setAllChannels] = useState([])
    const { control, handleSubmit, watch, reset, setValue, formState: { errors } } = useForm({
        defaultValues: {
            plackage_name: "",
            status: "",
            plackage_price: "",
            plackage_type: null,
            device_limit: "",
            selected_channels: [],
        }
    })

    useEffect(() => {
        if (drawer) {
            getAllChannel()
        }
    }, [drawer])

    async function getAllChannel() {
        try {
            let res = await getallChannel()
            console.log(res.data.data)
            setAllChannels(res?.data?.data || [])
        } catch (error) {
            console.log(error)
        }
    }

    async function formSubmit(data) {
        try {
            loader.start()
            let channelData = allChannels.filter(e => data.selected_channels.some(d => d == e._id)).map(e => ({ category_id: e.category._id, channel_id: e._id }))
            data.selected_channels = channelData

            if (mode === "edit") {
                let res = await updatePackage(formData._id, data)
                snackbar.success("Package updated successfully")
            }
            else {
                let res = await createPackage(data)
                snackbar.success("Package created successfully")
            }
            onSubmit()
            reset({
                plackage_name: "",
                status: "",
                plackage_price: "",
                plackage_type: null,
                device_limit: "",
                selected_channels: [],
            })
            setDrawer(false)
        } catch (error) {
            console.log(error)
        }
        finally {
            loader.stop()
        }
    }

    function editClick() {
        console.log(formData)

        let { plackage_name, status, plackage_price, plackage_type, device_limit, selected_channels } = formData

        reset({
            plackage_name,
            status,
            plackage_price,
            plackage_type,
            device_limit,
            selected_channels: selected_channels.map(e => e.channel_id),
        })
        setDrawer(true)
    }


    return (
        <div>
            {mode === "edit" ? <EditIcon className="pointer" onClick={editClick} /> :
                <button className="btn btn-primary btn-radius px-3" onClick={() => setDrawer(true)}>Add Package</button>
            }
            <CustomDrawer
                width={600}
                open={drawer}
                toggle={() => setDrawer(!drawer)}
                header={`${mode == "edit" ? "Edit" : "Add"} Package`}
            >
                <Box mt={3}>

                    <form onSubmit={handleSubmit(formSubmit)}>

                        <div>
                            <label className="form-label mb-1" htmlFor="name">
                                Package Name
                            </label>
                            <Controller
                                name="plackage_name"
                                control={control}
                                rules={{
                                    required: "Required",
                                    validate: (value) => value.trim() !== "" || "Field cannot be empty",
                                }}
                                defaultValue={null}
                                render={({ field: { value, onChange } }) => {
                                    return (<input
                                        value={value}
                                        onChange={onChange}
                                        className={`form-control ${errors.plackage_name ? "Validation" : ""}`}
                                        placeholder="Package Name"
                                    />)
                                }} />
                        </div>
                        <div className="mt-3">
                            <label className="form-label mb-1" htmlFor="name">
                                Status
                            </label>
                            <Controller
                                name="status"
                                control={control}
                                rules={{ required: true }}
                                defaultValue={null}
                                render={({ field: { value, onChange } }) => {
                                    return (
                                        <select
                                            className={`form-select ${errors.status ? "Validation" : ""}`}
                                            value={value}
                                            onChange={onChange}
                                        >
                                            <option value={""}>Select Status</option>
                                            {STATUS_OPTIONS.map((res) => {
                                                return (<option value={res.value} key={res.value}>{res.label}</option>)
                                            })}
                                        </select>
                                    )
                                }} />
                        </div>
                        <div className="mt-3">
                            <label className="form-label mb-1" htmlFor="name">
                                Package Type
                            </label>
                            <Controller
                                name="plackage_type"
                                control={control}
                                defaultValue={null}
                                rules={{ required: true }}
                                render={({ field: { value, onChange } }) => {
                                    return (
                                        <select
                                            className={`form-select ${errors.plackage_type ? "Validation" : ""}`}
                                            value={value}
                                            onChange={onChange}
                                        >
                                            <option value={""}>Select Package Type</option>
                                            {PACKAGE_TYPES.map((res) => {
                                                return (<option value={res.value} key={res.value}>{res.label}</option>)
                                            })}
                                        </select>
                                    )
                                }} />
                        </div>
                        <div className="mt-3">
                            <label className="form-label mb-1" htmlFor="name">
                                Package Price
                            </label>
                            <Controller
                                name="plackage_price"
                                control={control}
                                rules={{ required: true }}
                                defaultValue={null}
                                render={({ field: { value, onChange } }) => {
                                    return (<input
                                        value={value}
                                        type="number"
                                        onChange={onChange}
                                        className={`form-control ${errors.plackage_price ? "Validation" : ""}`}
                                        placeholder="Package Price"
                                    />)
                                }} />
                        </div>
                        <div className="mt-3">
                            <label className="form-label mb-1" htmlFor="name">
                                Device Limit
                            </label>
                            <Controller
                                name="device_limit"
                                control={control}
                                defaultValue={null}
                                rules={{ required: true }}
                                render={({ field: { value, onChange } }) => {
                                    return (<input
                                        value={value}
                                        type="number"
                                        className={`form-control ${errors.device_limit ? "Validation" : ""}`}
                                        onChange={onChange}
                                        placeholder="Device Limit"
                                    />)
                                }} />
                        </div>
                        <div className="mt-3">
                            <label className="form-label mb-1" htmlFor="name">
                                Channels
                            </label>
                            <Controller
                                name="selected_channels"
                                control={control}
                                rules={{ required: true }}
                                defaultValue={null}
                                render={({ field: { value, onChange } }) => {
                                    return (
                                        <AutoComplete
                                            label={"Select Channel"}
                                            multiple
                                            error={errors.selected_channels}
                                            className="bg-white"
                                            disableCloseOnSelect
                                            getOptionLabel={(option) => option?.name}
                                            renderOption={(props, option, { selected }) => {
                                                console.log(option)
                                                return (
                                                    <li {...props}>
                                                        <input type="checkbox"
                                                            className="me-6"
                                                            checked={value.includes(option._id)}

                                                            style={{ marginRight: 8 }}
                                                        />
                                                        {option?.name}
                                                    </li>
                                                )
                                            }}
                                            renderTags={(tagValue, getTagProps) => (
                                                <span className={`autocomplete-wrapper`}>
                                                    {tagValue.map((option) => option.name).join(' / ')}
                                                </span>
                                            )}
                                            options={allChannels}
                                            onChange={(e, val) => {
                                                console.log(val)
                                                onChange(val.map(e => e._id))
                                            }}
                                            value={allChannels.filter(e => value.includes(e._id))}
                                        />
                                    )
                                }} />
                        </div>
                        <div className="d-flex justify-content-end mt-3">
                            <button
                                className="cancelButton border-none outline-none"
                                type="button"
                                onClick={() => setDrawer(false)}
                            >
                                Cancel
                            </button>
                            <button
                                className="btn btn-primary m-1"
                                type="submit"
                            >
                                {mode == "edit" ? "Update" : "Add"} Package
                            </button>
                        </div>
                    </form>


                </Box>


            </CustomDrawer>

        </div>
    )
}