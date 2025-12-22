import React, { useEffect } from "react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Box } from "@mui/material";
import {
  createShorts,
  editShorts,
  getAllShorts,
  getAllShortsCategory,
} from "../../Components/service/admin";

import { loader, snackbar } from "../../utils";
import EditIcon from "@mui/icons-material/Edit";
import CustomDrawer from "../../Components/CustomDrawer/CustomDrawer";

export const AddShorts = ({ onSubmit, mode, formData }) => {
  let [drawer, setDrawer] = useState(false);
  let [categories, setCategories] = useState([]);
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
      category: "",
    },
  });

  useEffect(() => {
    if (drawer) {
      fetchCategories();
    }
  }, [drawer]);

  async function fetchCategories() {
    try {
      const response = await getAllShortsCategory();
      setCategories(response?.data?.data || []);
    } catch (error) {
      console.error("Error fetching shorts categories:", error);
      snackbar.error("Failed to load shorts categories");
    }
  }

  async function formSubmit(data) {
    try {
      loader.start();

      const payload = {
        name: data.name,
        url: data.url,
        priority: Number(data.priority),
        shortsCategory: data.category,
      };

      if (mode === "edit") {
        let res = await editShorts(formData._id, payload);
        console.log("response", res);
        snackbar.success("Shorts updated successfully");
      } else {
        let res = await createShorts(payload);
        snackbar.success("Shorts created successfully");
      }

      onSubmit();
      reset({
        name: "",
        url: "",
        priority: "",
        category: "",
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

    let { name, url, priority, category } = formData;

    reset({
      name,
      url,
      priority,
      category: category?._id || category || "",
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
          Add Shorts
        </button>
      )}
      <CustomDrawer
        width={600}
        open={drawer}
        toggle={() => setDrawer(!drawer)}
        header={`${mode == "edit" ? "Edit" : "Add"} Shorts`}
      >
        <Box mt={3}>
          <form onSubmit={handleSubmit(formSubmit)}>
            <div className="mt-3">
              <label className="form-label mb-1" htmlFor="name">
                Shorts Name
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
                      placeholder="Shorts Name"
                    />
                  );
                }}
              />
            </div>

            <div className="mt-3">
              <label className="form-label mb-1" htmlFor="category">
                Shorts Category
              </label>
              <Controller
                name="category"
                control={control}
                rules={{ required: "Category is required" }}
                defaultValue={null}
                render={({ field: { value, onChange } }) => {
                  return (
                    <select
                      value={value}
                      onChange={onChange}
                      className={`form-select ${
                        errors.category ? "Validation" : ""
                      }`}
                    >
                      <option value="">Select Shorts Category</option>
                      {categories.map((category) => (
                        <option key={category._id} value={category._id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  );
                }}
              />
              {errors.category && (
                <p className="text-danger">{errors.category.message}</p>
              )}
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
                {mode == "edit" ? "Update" : "Add"} Shorts
              </button>
            </div>
          </form>
        </Box>
      </CustomDrawer>
    </div>
  );
};
