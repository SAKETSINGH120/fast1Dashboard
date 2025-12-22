import React, { useEffect } from "react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Box, Dialog, Modal } from "@mui/material";
import { loader, snackbar } from "../../utils";
import EditIcon from "@mui/icons-material/Edit";
import CustomDrawer from "../../Components/CustomDrawer/CustomDrawer";
import { AutoComplete } from "../../Components/Inputs/AutoComplete";
import {
  addBroadcaster,
  addCategory,
  addGenre,
  updateBroadcaster,
  updateCategory,
  updateGenre,
} from "../../Components/service/admin";

export const CreateUpdateCategory = ({ onSubmit, mode, formData }) => {
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
      category: "",
    },
  });

  async function formSubmit(data) {
    try {
      loader.start();
      if (mode === "edit") {
        let res = await updateCategory(formData._id, data);
        snackbar.success("Category updated successfully");
      } else {
        let res = await addCategory(data);
        snackbar.success("Category created successfully");
      }
      onSubmit();
      reset();
      setDrawer(false);
    } catch (error) {
      if (error?.response?.data?.errormessage !== undefined) {
        snackbar.error(error?.response?.data?.errormessage);
      } else {
        snackbar.error("Some error occupide please check and try again");
      }
      console.log(error);
    } finally {
      loader.stop();
    }
  }

  function editClick() {
    let { name } = formData;
    console.log(name);
    reset({
      category: name,
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
          Add Category
        </button>
      )}
      <Dialog
        open={drawer}
        toggle={() => setDrawer(!drawer)}
        header={`${mode == "edit" ? "Edit" : "Add"} Category`}
      >
        <Box p={3} sx={{ width: "600px" }}>
          <h3>{mode === "edit" ? "Edit" : "Add"} Category</h3>
          <form onSubmit={handleSubmit(formSubmit)}>
            <div>
              <label className="form-label mb-1" htmlFor="name">
                Category Name
              </label>
              <Controller
                name="category"
                rules={{
                  required: "Required",
                  validate: (value) =>
                    value.trim() !== "" || "Field cannot be empty",
                }}
                control={control}
                defaultValue={null}
                render={({ field: { value, onChange } }) => {
                  return (
                    <input
                      value={value}
                      onChange={onChange}
                      className={`form-control ${
                        errors.category ? "Validation" : ""
                      }`}
                      placeholder="Category Name"
                    />
                  );
                }}
              />
            </div>

            <div className="d-flex justify-content-end mt-3">
              <button
                className="btn"
                type="button"
                onClick={() => {
                  reset();
                  setDrawer(false);
                }}
              >
                Cancel
              </button>
              <button className="btn btn-primary m-1" type="submit">
                {mode == "edit" ? "Update" : "Add"} Category
              </button>
            </div>
          </form>
        </Box>
      </Dialog>
    </div>
  );
};
