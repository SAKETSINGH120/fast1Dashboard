import React, { useEffect } from "react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Box } from "@mui/material";
import {
  createHighLights,
  updateHighLights,
  getAllHighLights,
} from "../../Components/service/admin";

import { loader, snackbar } from "../../utils";
import EditIcon from "@mui/icons-material/Edit";
import CustomDrawer from "../../Components/CustomDrawer/CustomDrawer";

export const AddHighLights = ({ onSubmit, mode, formData }) => {
  let [drawer, setDrawer] = useState(false);
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
      url: "",
      status: true,
      thumbnail: null,
    },
  });

  // Handle image file selection
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(file);
      setValue("thumbnail", file);

      // Create preview
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

      // Create FormData for file upload
      const uploadData = new FormData();
      uploadData.append("url", data.url);
      uploadData.append("status", data.status);

      if (selectedImage) {
        uploadData.append("thumbnail", selectedImage);
      }

      if (mode === "edit") {
        let res = await updateHighLights(formData._id, uploadData);
        console.log("response", res);
        snackbar.success("HighLights updated successfully");
      } else {
        let res = await createHighLights(uploadData);
        console.log("response", res);
        snackbar.success("HighLights created successfully");
      }

      // Call the onSubmit callback to refresh the list
      console.log("Calling onSubmit callback to refresh list...");
      if (onSubmit) {
        await onSubmit();
      }

      reset({
        url: "",
        status: true,
        thumbnail: null,
      });
      setSelectedImage(null);
      setImagePreview("");
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

    let { url, status, thumbnail } = formData;

    reset({
      url,
      status: status !== undefined ? status : true,
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
          Add HighLights
        </button>
      )}
      <CustomDrawer
        width={600}
        open={drawer}
        toggle={() => setDrawer(!drawer)}
        header={`${mode == "edit" ? "Edit" : "Add"} HighLights`}
      >
        <Box mt={3}>
          <form onSubmit={handleSubmit(formSubmit)}>
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
              <label className="form-label mb-1" htmlFor="status">
                Status
              </label>
              <Controller
                name="status"
                control={control}
                rules={{ required: "Status is required" }}
                defaultValue={true}
                render={({ field: { value, onChange } }) => {
                  return (
                    <select
                      value={value}
                      onChange={onChange}
                      className={`form-control ${
                        errors.status ? "Validation" : ""
                      }`}
                    >
                      <option value={true}>Active</option>
                      <option value={false}>Inactive</option>
                    </select>
                  );
                }}
              />
            </div>

            <div className="mt-3">
              <label className="form-label mb-1" htmlFor="thumbnail">
                Image Upload (Optional)
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
                            src={imagePreview}
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
                {mode == "edit" ? "Update" : "Add"} HighLights
              </button>
            </div>
          </form>
        </Box>
      </CustomDrawer>
    </div>
  );
};
