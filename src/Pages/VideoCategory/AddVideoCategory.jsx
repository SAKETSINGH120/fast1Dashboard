import React, { useEffect } from "react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Box } from "@mui/material";
import { PACKAGE_TYPES, STATUS_OPTIONS } from "../../utils/constant";
import {
  addVideoCategory,
  createPackage,
  videoCategories,
  updateVideoCategory,
  updatePackage,
} from "../../Components/service/admin";

import { loader, snackbar } from "../../utils";
import EditIcon from "@mui/icons-material/Edit";
import CustomDrawer from "../../Components/CustomDrawer/CustomDrawer";
import { AutoComplete } from "../../Components/Inputs/AutoComplete";

export const AddVideoCategory = ({ onSubmit, mode, formData }) => {
  let [drawer, setDrawer] = useState(false);
  let [allCategory, setAllCategory] = useState([]);
  const {
    control,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      priority: "",
      status: true,
      //   plackage_price: "",
      //   plackage_type: null,
      //   device_limit: "",
      //   selected_channels: [],
    },
  });

  useEffect(() => {
    if (drawer) {
      getAllCategory();
    }
  }, [drawer]);

  async function getAllCategory() {
    try {
      let res = await videoCategories();
      console.log(res.data.data);
      setAllCategory(res?.data?.data || []);
    } catch (error) {
      console.error("Error fetching video categories:", error);
      snackbar.error("Failed to load video categories");
    }
  }

  async function formSubmit(data) {
    try {
      loader.start();

      const payload = {
        name: data.name,
        priority: Number(data.priority),
        status: Boolean(data.status),
      };

      //   let channelData = allChannels
      //     .filter((e) => data.selected_channels.some((d) => d == e._id))
      //     .map((e) => ({ category_id: e.category._id, channel_id: e._id }));
      //   data.selected_channels = channelData;
      if (mode === "edit") {
        let res = await updateVideoCategory(formData._id, payload);
        snackbar.success("Video Category updated successfully");
      } else {
        let res = await addVideoCategory(payload);
        snackbar.success("Video Category created successfully");
      }
      onSubmit();
      reset({
        name: "",
        priority: "",
        status: true,
        // plackage_price: "",
        // plackage_type: null,
        // device_limit: "",
        // selected_channels: [],
      });
      setDrawer(false);
    } catch (error) {
      console.error("Error submitting video category:", error);

      // Extract error message from API response
      let errorMessage = "Something went wrong";

      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.response?.data?.errormessage) {
        errorMessage = error.response.data.errormessage;
      } else if (error.response?.data?.error) {
        errorMessage = error.response.data.error;
      } else if (error.message) {
        errorMessage = error.message;
      }

      // Show specific error based on operation
      if (mode === "edit") {
        snackbar.error(`Failed to update video category: ${errorMessage}`);
      } else {
        snackbar.error(`Failed to create video category: ${errorMessage}`);
      }
    } finally {
      loader.stop();
    }
  }

  function editClick() {
    console.log(formData);

    let {
      name,
      priority,
      status,
      //   plackage_price,
      //   plackage_type,
      //   device_limit,
      //   selected_channels,
    } = formData;

    reset({
      name,
      priority,
      status: status !== undefined ? Boolean(status) : true,
      //   plackage_price,
      //   plackage_type,
      //   device_limit,
      //   selected_channels: selected_channels.map((e) => e.channel_id),
    });
    setDrawer(true);
  }

  return (
    <div>
      {mode === "edit" ? (
        <EditIcon className="pointer" onClick={editClick} />
      ) : (
        <button
          className="btn btn-primary btn-radius px-3"
          onClick={() => setDrawer(true)}
        >
          Video Category
        </button>
      )}
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
                Video Category Name
              </label>
              <Controller
                name="name"
                control={control}
                rules={{
                  required: "Required",
                  validate: (value) =>
                    value.trim() !== "" || "Field cannot be empty",
                }}
                defaultValue={null}
                render={({ field: { value, onChange } }) => {
                  return (
                    <input
                      value={value}
                      onChange={onChange}
                      className={`form-control ${
                        errors.name ? "Validation" : ""
                      }`}
                      placeholder="video category"
                    />
                  );
                }}
              />
            </div>

            <div className="mt-3">
              <label className="form-label mb-1" htmlFor="priority">
                Priority
              </label>
              <Controller
                name="priority"
                control={control}
                rules={{
                  required: "Priority is required",
                }}
                defaultValue={null}
                render={({ field: { value, onChange } }) => {
                  return (
                    <input
                      value={value}
                      type="number"
                      min={0}
                      onChange={onChange}
                      className={`form-control ${
                        errors.priority ? "Validation" : ""
                      }`}
                      placeholder="Priority"
                    />
                  );
                }}
              />
            </div>

            <div className="mt-3">
              <label className="form-label mb-1" htmlFor="status">
                Status
              </label>
              <Controller
                name="status"
                control={control}
                rules={{
                  validate: (value) =>
                    typeof value === "boolean" || "Status is required",
                }}
                defaultValue={null}
                render={({ field: { value, onChange } }) => {
                  return (
                    <select
                      className={`form-select ${
                        errors.status ? "Validation" : ""
                      }`}
                      value={value ? "true" : "false"}
                      onChange={(e) => onChange(e.target.value === "true")}
                    >
                      <option value="true">Active</option>
                      <option value="false">Inactive</option>
                    </select>
                  );
                }}
              />
              {errors.status && (
                <p className="text-danger">{errors.status.message}</p>
              )}
            </div>
            {/* <div className="mt-3">
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
                      className={`form-select ${
                        errors.plackage_type ? "Validation" : ""
                      }`}
                      value={value}
                      onChange={onChange}
                    >
                      <option value={""}>Select Package Type</option>
                      {PACKAGE_TYPES.map((res) => {
                        return (
                          <option value={res.value} key={res.value}>
                            {res.label}
                          </option>
                        );
                      })}
                    </select>
                  );
                }}
              />
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
                  return (
                    <input
                      value={value}
                      type="number"
                      onChange={onChange}
                      className={`form-control ${
                        errors.plackage_price ? "Validation" : ""
                      }`}
                      placeholder="Package Price"
                    />
                  );
                }}
              />
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
                  return (
                    <input
                      value={value}
                      type="number"
                      className={`form-control ${
                        errors.device_limit ? "Validation" : ""
                      }`}
                      onChange={onChange}
                      placeholder="Device Limit"
                    />
                  );
                }}
              />
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
                        console.log(option);
                        return (
                          <li {...props}>
                            <input
                              type="checkbox"
                              className="me-6"
                              checked={value.includes(option._id)}
                              style={{ marginRight: 8 }}
                            />
                            {option?.name}
                          </li>
                        );
                      }}
                      renderTags={(tagValue, getTagProps) => (
                        <span className={`autocomplete-wrapper`}>
                          {tagValue.map((option) => option.name).join(" / ")}
                        </span>
                      )}
                      options={allChannels}
                      onChange={(e, val) => {
                        console.log(val);
                        onChange(val.map((e) => e._id));
                      }}
                      value={allChannels.filter((e) => value.includes(e._id))}
                    />
                  );
                }}
              />
            </div> */}
            <div className="d-flex justify-content-end mt-3">
              <button
                className="cancelButton border-none outline-none"
                type="button"
                onClick={() => setDrawer(false)}
              >
                Cancel
              </button>
              <button className="btn btn-primary m-1" type="submit">
                {mode == "edit" ? "Update" : "Add"} Video Category
              </button>
            </div>
          </form>
        </Box>
      </CustomDrawer>
    </div>
  );
};
