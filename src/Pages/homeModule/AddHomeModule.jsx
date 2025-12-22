import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Box } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import CustomDrawer from "../../Components/CustomDrawer/CustomDrawer";
import { loader, snackbar } from "../../utils";
import {
  createHomeContent,
  editHomeContent,
} from "../../Components/service/admin";

export const AddHomeContent = ({ onSubmit, mode, formData }) => {
  const [drawer, setDrawer] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: { title: "", image: null, status: true },
  });

  async function formSubmit(data) {
    try {
      loader.start();
      const formDatas = new FormData();
      formDatas.append("title", data.title);
      formDatas.append("status", Boolean(data.status));
      if (data.image) formDatas.append("image", data.image);

      if (mode === "edit") {
        await editHomeContent(formData._id, formDatas);
        snackbar.success("Home content updated successfully");
      } else {
        await createHomeContent(formDatas);
        snackbar.success("Home content created successfully");
      }

      onSubmit();
      reset({ title: "", image: null, status: true });
      setImagePreview(null);
      setDrawer(false);
    } catch (err) {
      console.error(err);
    } finally {
      loader.stop();
    }
  }

  function editClick() {
    reset({
      title: formData.title,
      image: null,
      status: formData.status !== undefined ? Boolean(formData.status) : true,
    });
    setImagePreview(formData.image); // Show existing image
    setDrawer(true);
  }

  function handleImageChange(file, onChange) {
    onChange(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(mode === "edit" ? formData.image : null);
    }
  }

  return (
    <div>
      {mode === "edit" ? (
        <EditIcon className="pointer" onClick={editClick} />
      ) : (
        <button
          className="btn btn-primary btn-radius px-3"
          onClick={() => {
            setImagePreview(null);
            setDrawer(true);
          }}
        >
          Add Home Content
        </button>
      )}

      <CustomDrawer
        width={500}
        open={drawer}
        toggle={() => setDrawer(!drawer)}
        header={`${mode === "edit" ? "Edit" : "Add"} Home Content`}
      >
        <Box mt={3}>
          <form onSubmit={handleSubmit(formSubmit)}>
            {/* Title */}
            <div>
              <label className="form-label mb-1">Title</label>
              <Controller
                name="title"
                control={control}
                rules={{ required: "Title is required" }}
                render={({ field }) => (
                  <input
                    {...field}
                    className={`form-control ${
                      errors.title ? "Validation" : ""
                    }`}
                    placeholder="Enter title"
                    disabled
                  />
                )}
              />
              {errors.title && (
                <p className="text-danger">{errors.title.message}</p>
              )}
            </div>

            {/* Status */}
            <div className="mt-3">
              <label className="form-label mb-1">Status</label>
              <Controller
                name="status"
                control={control}
                rules={{
                  validate: (value) =>
                    typeof value === "boolean" || "Status is required",
                }}
                render={({ field: { value, onChange } }) => (
                  <select
                    value={value ? "true" : "false"}
                    onChange={(e) => onChange(e.target.value === "true")}
                    className={`form-control ${
                      errors.status ? "Validation" : ""
                    }`}
                  >
                    <option value="true">Active</option>
                    <option value="false">Inactive</option>
                  </select>
                )}
              />
              {errors.status && (
                <p className="text-danger">{errors.status.message}</p>
              )}
            </div>

            {/* Image */}
            <div className="mt-3">
              <label className="form-label mb-1">Image</label>
              <Controller
                name="image"
                control={control}
                render={({ field: { onChange } }) => (
                  <div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) =>
                        handleImageChange(e.target.files[0], onChange)
                      }
                      className="form-control"
                    />
                    {imagePreview && (
                      <div className="mt-3">
                        <img
                          src={imagePreview}
                          alt="Preview"
                          style={{
                            width: "200px",
                            height: "150px",
                            objectFit: "cover",
                            borderRadius: "8px",
                            border: "2px solid #dee2e6",
                          }}
                        />
                      </div>
                    )}
                  </div>
                )}
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
                {mode === "edit" ? "Update" : "Add"} Home Content
              </button>
            </div>
          </form>
        </Box>
      </CustomDrawer>
    </div>
  );
};
