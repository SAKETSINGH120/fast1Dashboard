import React, { useState, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { Box } from "@mui/material";
import {
  createExclusiveChannel,
  updateExclusiveChannel,
  getAllChannelCategory,
} from "../../Components/service/admin";
import { loader, snackbar } from "../../utils";
import EditIcon from "@mui/icons-material/Edit";
import CustomDrawer from "../../Components/CustomDrawer/CustomDrawer";

export const AddExclusiveChannel = ({ onSubmit, mode, formData }) => {
  let [drawer, setDrawer] = useState(false);
  const [allChannelCategory, setAllChannelCategory] = useState([]);
  const [imagePreview, setImagePreview] = useState(null);
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      channelUrl: "",
      channelCategory: null,
      channelNumber: "",
      priority: "",
      image: null,
    },
  });

  async function formSubmit(data) {
    try {
      loader.start();
      const formDatas = new FormData();
      formDatas.append("name", data.name);
      formDatas.append("channelUrl", data.channelUrl);
      formDatas.append("channelCategory", "6895f9502fd5acee849c0f61");
      formDatas.append("priority", data.priority);
      formDatas.append("channelNumber", data.channelNumber);
      formDatas.append("isXclusive", true);
      if (data.image) formDatas.append("image", data.image);

      if (mode === "edit") {
        await updateExclusiveChannel(formData._id, formDatas);
        snackbar.success("Exclusive Channel updated successfully");
      } else {
        await createExclusiveChannel(formDatas);
        snackbar.success("Exclusive Channel created successfully");
      }

      onSubmit();
      reset();
      setImagePreview(null);
      setDrawer(false);
    } catch (error) {
      console.log("Error details:", error);
      console.log("Error response:", error.response);

      // Handle API error response
      if (error.response?.data?.errormessage) {
        snackbar.error(error.response.data.errormessage);
      } else if (error.response?.data?.message) {
        snackbar.error(error.response.data.message);
      } else if (
        error.response?.data?.error &&
        typeof error.response.data.error === "string"
      ) {
        snackbar.error(error.response.data.error);
      } else if (error.message) {
        snackbar.error(error.message);
      } else {
        snackbar.error("Something went wrong. Please try again.");
      }
    } finally {
      loader.stop();
    }
  }

  function editClick() {
    let { name, channelUrl, channelCategory, priority, image, channelNumber } =
      formData;
    channelCategory = channelCategory?._id;

    reset({
      name,
      channelUrl,
      channelCategory,
      priority,
      image: null, // Don't set the file object, just show preview
      channelNumber,
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

  async function getAllCategoryChannel() {
    try {
      let res = await getAllChannelCategory();
      setAllChannelCategory(res?.data?.data || []);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getAllCategoryChannel();
  }, []);

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
          Add Exclusive Channel
        </button>
      )}
      <CustomDrawer
        width={600}
        open={drawer}
        toggle={() => setDrawer(!drawer)}
        header={`${mode == "edit" ? "Edit" : "Add"} Exclusive Channel`}
      >
        <Box mt={3}>
          <form onSubmit={handleSubmit(formSubmit)}>
            {/* Image */}
            <div>
              <label className="form-label mb-1" htmlFor="image">
                Exclusive Channel Image
              </label>
              <Controller
                name="image"
                control={control}
                rules={{
                  required: mode === "edit" ? false : "Image is required",
                }}
                render={({ field: { onChange } }) => (
                  <div>
                    <input
                      type="file"
                      accept="image/*"
                      id="image"
                      name="image"
                      onChange={(e) =>
                        handleImageChange(e.target.files[0], onChange)
                      }
                      className={`form-control ${
                        errors.image ? "Validation" : ""
                      }`}
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
              {errors.image && (
                <p className="text-danger">{errors.image.message}</p>
              )}
            </div>

            {/* Name */}
            <div className="mt-3">
              <label className="form-label mb-1" htmlFor="name">
                Exclusive Channel Name
              </label>
              <Controller
                name="name"
                control={control}
                rules={{
                  required: "Required",
                  validate: (value) =>
                    value.trim() !== "" || "Field cannot be empty",
                }}
                render={({ field }) => (
                  <input
                    {...field}
                    className={`form-control ${
                      errors.name ? "Validation" : ""
                    }`}
                    placeholder="Enter Exclusive Channel Name"
                  />
                )}
              />
              {errors.name && (
                <p className="text-danger">{errors.name.message}</p>
              )}
            </div>

            {/* Category */}
            {/* <div className="mt-3">
              <label className="form-label mb-1">Channel Category</label>
              <Controller
                name="channelCategory"
                control={control}
                rules={{ required: "Category is required" }}
                render={({ field }) => (
                  <select
                    {...field}
                    className={`form-select ${
                      errors.channelCategory ? "Validation" : ""
                    }`}
                  >
                    <option value="">Select Category</option>
                    {allChannelCategory.map((cat) => (
                      <option value={cat._id} key={cat._id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                )}
              />
              {errors.channelCategory && (
                <p className="text-danger">{errors.channelCategory.message}</p>
              )}
            </div> */}

            {/* Channel URL */}
            <div className="mt-3">
              <label className="form-label mb-1">Channel URL</label>
              <Controller
                name="channelUrl"
                control={control}
                rules={{ required: "URL is required" }}
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    className={`form-control ${
                      errors.channelUrl ? "Validation" : ""
                    }`}
                    placeholder="Enter channel URL"
                  />
                )}
              />
              {errors.channelUrl && (
                <p className="text-danger">{errors.channelUrl.message}</p>
              )}
            </div>

            {/* Channel Number */}
            <div className="mt-3">
              <label className="form-label mb-1">Channel Number</label>
              <Controller
                name="channelNumber"
                control={control}
                rules={{ required: "Number is required" }}
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    className={`form-control ${
                      errors.channelNumber ? "Validation" : ""
                    }`}
                    placeholder="Enter channel number"
                  />
                )}
              />
              {errors.channelNumber && (
                <p className="text-danger">{errors.channelNumber.message}</p>
              )}
            </div>

            {/* Priority */}
            <div className="mt-3">
              <label className="form-label mb-1">Priority</label>
              <Controller
                name="priority"
                control={control}
                rules={{ required: "Priority is required" }}
                render={({ field }) => (
                  <input
                    {...field}
                    type="number"
                    min={0}
                    className={`form-control ${
                      errors.priority ? "Validation" : ""
                    }`}
                    placeholder="Enter priority"
                  />
                )}
              />
              {errors.priority && (
                <p className="text-danger">{errors.priority.message}</p>
              )}
            </div>

            {/* Submit & Cancel */}
            <div className="d-flex justify-content-end mt-3">
              <button
                type="button"
                className="cancelButton border-none outline-none"
                onClick={() => setDrawer(false)}
              >
                Cancel
              </button>
              <button className="btn btn-primary m-1" type="submit">
                {mode === "edit" ? "Update" : "Add"} Exclusive Channel
              </button>
            </div>
          </form>
        </Box>
      </CustomDrawer>
    </div>
  );
};
