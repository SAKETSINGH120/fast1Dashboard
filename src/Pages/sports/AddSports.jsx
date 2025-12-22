import React, { useEffect } from "react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Box } from "@mui/material";
import {
  createSports,
  editSports,
  getAllSports,
} from "../../Components/service/admin";

import { loader, snackbar } from "../../utils";
import EditIcon from "@mui/icons-material/Edit";
import CustomDrawer from "../../Components/CustomDrawer/CustomDrawer";

export const AddSports = ({ onSubmit, mode, formData }) => {
  let [drawer, setDrawer] = useState(false);
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
      url: "",
      priority: "",
    },
  });

  async function formSubmit(data) {
    try {
      loader.start();

      const payload = {
        name: data.name,
        url: data.url,
        priority: Number(data.priority),
      };

      if (mode === "edit") {
        let res = await editSports(formData._id, payload);
        console.log("response", res);
        snackbar.success("Sports updated successfully");
      } else {
        let res = await createSports(payload);
        snackbar.success("Sports created successfully");
      }

      onSubmit();
      reset({
        name: "",
        url: "",
        priority: "",
      });
      setDrawer(false);
    } catch (error) {
      console.log(error);
      snackbar.error(
        error.response?.data?.errormessage || "something went wrong"
      );
    } finally {
      loader.stop();
    }
  }

  function editClick() {
    console.log(formData);

    let { name, url, priority } = formData;

    reset({
      name,
      url,
      priority,
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
          Add Sports
        </button>
      )}
      <CustomDrawer
        width={600}
        open={drawer}
        toggle={() => setDrawer(!drawer)}
        header={`${mode == "edit" ? "Edit" : "Add"} Sports`}
      >
        <Box mt={3}>
          <form onSubmit={handleSubmit(formSubmit)}>
            <div className="mt-3">
              <label className="form-label mb-1" htmlFor="name">
                Sports Name
              </label>
              <Controller
                name="name"
                control={control}
                rules={{
                  required: "Name is required",
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
                      placeholder="Sports Name"
                    />
                  );
                }}
              />
            </div>

            <div className="mt-3">
              <label className="form-label mb-1" htmlFor="url">
                Video URL
              </label>
              <Controller
                name="url"
                control={control}
                rules={{ required: "Video URL is required" }}
                defaultValue={null}
                render={({ field: { value, onChange } }) => {
                  return (
                    <input
                      value={value}
                      type="url"
                      onChange={onChange}
                      className={`form-control ${
                        errors.url ? "Validation" : ""
                      }`}
                      placeholder="Video URL"
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
                defaultValue={null}
                rules={{ required: "Priority is required" }}
                render={({ field: { value, onChange } }) => {
                  return (
                    <input
                      value={value}
                      type="number"
                      min={0}
                      className={`form-control ${
                        errors.priority ? "Validation" : ""
                      }`}
                      onChange={onChange}
                      placeholder="Priority"
                    />
                  );
                }}
              />
            </div>

            <div className="d-flex justify-content-end mt-3">
              <button
                className="cancelButton border-none outline-none"
                type="button"
                onClick={() => setDrawer(false)}
              >
                Cancel
              </button>
              <button className="btn btn-primary m-1" type="submit">
                {mode == "edit" ? "Update" : "Add"} Sports
              </button>
            </div>
          </form>
        </Box>
      </CustomDrawer>
    </div>
  );
};
