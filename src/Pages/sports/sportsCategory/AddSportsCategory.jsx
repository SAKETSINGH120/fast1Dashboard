import React, { useEffect } from "react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Box } from "@mui/material";
import { PACKAGE_TYPES, STATUS_OPTIONS } from "../../../utils/constant";

import { loader, snackbar } from "../../../utils";
import EditIcon from "@mui/icons-material/Edit";
import CustomDrawer from "../../../Components/CustomDrawer/CustomDrawer";
import { AutoComplete } from "../../../Components/Inputs/AutoComplete";
import {
  createSportsCategory,
  editSportsCategory,
  getAllSportsCategory,
} from "../../../Components/service/admin";
import { baseUrl } from "../../../Components/service/Api";

export const AddSportsCategory = ({ onSubmit, mode, formData }) => {
  let [drawer, setDrawer] = useState(false);
  let [allCategory, setAllCategory] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
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
      thumbnail: null,
    },
  });

  useEffect(() => {
    if (drawer) {
      getAllCategory();
    }
  }, [drawer]);

  async function getAllCategory() {
    try {
      let res = await getAllSportsCategory();
      console.log(res.data.data);
      setAllCategory(res?.data?.data || []);
    } catch (error) {
      console.error("Error fetching sports categories:", error);
      snackbar.error("Failed to load sports categories");
    }
  }

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(file);
      setValue("thumbnail", file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  async function formSubmit(data) {
    try {
      loader.start();

      const uploadData = new FormData();
      uploadData.append("name", data.name);
      uploadData.append("priority", Number(data.priority));
      uploadData.append("status", Boolean(data.status));

      if (selectedImage) {
        uploadData.append("thumbnail", selectedImage);
      }

      if (mode === "edit") {
        let res = await editSportsCategory(formData._id, uploadData);
        snackbar.success("Sports Category updated successfully");
      } else {
        let res = await createSportsCategory(uploadData);
        snackbar.success("Sports Category created successfully");
      }
      onSubmit();
      reset({
        name: "",
        priority: "",
        status: true,
        thumbnail: null,
      });
      setSelectedImage(null);
      setImagePreview("");
      setDrawer(false);
    } catch (error) {
      console.error("Error submitting shorts category:", error);

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
        snackbar.error(`Failed to update sports category: ${errorMessage}`);
      } else {
        snackbar.error(`Failed to create sports category: ${errorMessage}`);
      }
    } finally {
      loader.stop();
    }
  }

  function editClick() {
    console.log(formData);

    let { name, priority, status, thumbnail } = formData;

    reset({
      name,
      priority,
      status: status !== undefined ? Boolean(status) : true,
      thumbnail: null,
    });
    setSelectedImage(null);
    setImagePreview(thumbnail || "");
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
          Add Sports Category
        </button>
      )}
      <CustomDrawer
        width={600}
        open={drawer}
        toggle={() => setDrawer(!drawer)}
        header={`${mode == "edit" ? "Edit" : "Add"} Sports Category`}
      >
        <Box mt={3}>
          <form onSubmit={handleSubmit(formSubmit)}>
            <div>
              <label className="form-label mb-1" htmlFor="name">
                Category Name
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
                      placeholder="sports category"
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

            <div className="mt-3">
              <label className="form-label mb-1" htmlFor="thumbnail">
                Thumbnail Upload (Optional)
              </label>
              <Controller
                name="thumbnail"
                control={control}
                defaultValue={null}
                render={({ field: { value, onChange } }) => {
                  return (
                    <div>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="form-control"
                      />
                      {imagePreview && (
                        <div className="mt-2">
                          <img
                            src={
                              imagePreview.startsWith("public/")
                                ? `${baseUrl}/${imagePreview}`
                                : imagePreview
                            }
                            alt="Preview"
                            style={{
                              width: "100px",
                              height: "60px",
                              objectFit: "cover",
                              borderRadius: "4px",
                              border: "1px solid #dee2e6",
                            }}
                          />
                        </div>
                      )}
                    </div>
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
                {mode == "edit" ? "Update" : "Add"} Sports Category
              </button>
            </div>
          </form>
        </Box>
      </CustomDrawer>
    </div>
  );
};
