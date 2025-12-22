import React, { useEffect } from "react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Box } from "@mui/material";
import { PACKAGE_TYPES, STATUS_OPTIONS } from "../../utils/constant";
import {
  createLiveFreeChannel,
  createPackage,
  getallChannel,
  getAllChannelCategory,
  updateLiveFreeChannel,
  updatePackage,
  uploadFreeChannelUsingCsv,
} from "../../Components/service/admin";

import { loader, snackbar } from "../../utils";
import EditIcon from "@mui/icons-material/Edit";
import CustomDrawer from "../../Components/CustomDrawer/CustomDrawer";
import { AutoComplete } from "../../Components/Inputs/AutoComplete";

export const AddFreeLiveChannel = ({ onSubmit, mode, formData }) => {
  let [drawer, setDrawer] = useState(false);
  let [allChannels, setAllChannels] = useState([]);
  const [allChannelCategory, setAllChannelCategory] = useState([]);
  const [csvFile, setCsvFile] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
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
      channelUrl: "",
      channelCategory: null,
      channelNumber: "",
      priority: "",
      image: null,
      //   selected_channels: [],
    },
  });

  useEffect(() => {
    if (drawer) {
      getAllChannel();
    }
  }, [drawer]);

  async function getAllChannel() {
    try {
      let res = await getallChannel();
      console.log(res.data.data);
      setAllChannels(res?.data?.data || []);
    } catch (error) {
      console.log(error);
    }
  }

  async function formSubmit(data) {
    try {
      loader.start();

      const formDatas = new FormData();
      formDatas.append("name", data.name);
      formDatas.append("status", data.status);
      formDatas.append("channelUrl", data.channelUrl);
      formDatas.append("channelCategory", data.channelCategory);
      formDatas.append("priority", data.priority);
      formDatas.append("channelNumber", data.channelNumber);
      // Append image file (if an image is selected)
      if (data.image) {
        formDatas.append("image", data.image);
      }
      if (mode === "edit") {
        let res = await updateLiveFreeChannel(formData._id, formDatas);
        console.log("response", res);
        snackbar.success("LiveFreeChannel updated successfully");
      } else {
        let res = await createLiveFreeChannel(formDatas);
        snackbar.success("LiveFreeChannel created successfully");
      }

      //   let channelData = allChannels
      //     .filter((e) => data.selected_channels.some((d) => d == e._id))
      //     .map((e) => ({ category_id: e.category._id, channel_id: e._id }));
      //   data.selected_channels = channelData;

      onSubmit();
      reset({
        name: "",
        status: "",
        channelUrl: "",
        channelCategory: null,
        priority: "",
        image: null,
        channelNumber: "",
        // selected_channels: [],
      });
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
    console.log(formData);

    let {
      name,
      channelUrl,
      channelCategory,
      priority,
      image,
      channelNumber,
      //   selected_channels,
    } = formData;

    //  this is for set the id
    channelCategory = channelCategory?._id;

    reset({
      name,
      channelUrl,
      channelCategory,
      priority,
      image: null, // Don't set the file object, just show preview
      channelNumber,
      //   selected_channels: selected_channels.map((e) => e.channel_id),
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

  const handleUpload = async () => {
    try {
      if (!csvFile) {
        alert("please select file");
        return;
      } else {
        const csvFileData = new FormData();
        csvFileData.append("csvFile", csvFile);
        await uploadFreeChannelUsingCsv(csvFileData);

        snackbar.success("channel uploaded successfully");
      }
    } catch (error) {
      console.error("CSV Upload Error details:", error);
      console.error("CSV Upload Error response:", error.response);

      // Handle CSV upload error response
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
        snackbar.error(
          "Something went wrong while uploading file. Please try again."
        );
      }
    }
  };

  // function editClick() {
  //   console.log(formData);

  //   let {
  //     name,
  //     channelUrl,
  //     channelCategory,
  //     priority,
  //     image,
  //     // selected_channels,
  //   } = formData;

  //   // Ensure channelCategory is assigned its _id correctly
  //   channelCategory = channelCategory?._id;

  //   reset({
  //     name,
  //     channelUrl,
  //     channelCategory,
  //     priority,
  //     image,
  //     // selected_channels: selected_channels?.map((e) => e.channel_id), // Uncomment if needed
  //   });

  //   setDrawer(true);
  // }

  //  listing of channel Category

  // Fetch all packages
  async function getAllCategoryChannel() {
    try {
      loader.start();
      let res = await getAllChannelCategory();
      setAllChannelCategory(res?.data?.data || []);
    } catch (error) {
      console.log(error);
    } finally {
      loader.stop();
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
          Add Free Live Channel
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
              <label className="form-label mb-1" htmlFor="image">
                Free Live Channel Image
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

            {/* {errors.image && <p>{errors.image.message}</p>} */}

            <div>
              <label className="form-label mb-1" htmlFor="name">
                Free Live Channel Name
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
                      placeholder="free channel Name"
                    />
                  );
                }}
              />
            </div>
            {/* <div className="mt-3">
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
                      className={`form-select ${
                        errors.status ? "Validation" : ""
                      }`}
                      value={value}
                      onChange={onChange}
                    >
                      <option value={""}>Select Status</option>
                      {STATUS_OPTIONS.map((res) => {
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
            </div> */}
            <div className="mt-3">
              <label className="form-label mb-1" htmlFor="name">
                Channel Categroy Name
              </label>
              <Controller
                name="channelCategory"
                control={control}
                defaultValue={null}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => {
                  return (
                    <select
                      className={`form-select ${
                        errors.channelCategory ? "Validation" : ""
                      }`}
                      value={value}
                      onChange={onChange}
                    >
                      <option value={""}>Select Channel Category</option>
                      {allChannelCategory.map((res) => {
                        return (
                          <option value={res._id} key={res._id}>
                            {res.name}
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
                Channel Url
              </label>
              <Controller
                name="channelUrl"
                control={control}
                rules={{ required: true }}
                defaultValue={null}
                render={({ field: { value, onChange } }) => {
                  return (
                    <input
                      value={value}
                      type="text"
                      onChange={onChange}
                      className={`form-control ${
                        errors.channelUrl ? "Validation" : ""
                      }`}
                      placeholder="channel url"
                    />
                  );
                }}
              />
            </div>
            <div className="mt-3">
              <label className="form-label mb-1" htmlFor="name">
                Channel Number
              </label>
              <Controller
                name="channelNumber"
                control={control}
                rules={{ required: true }}
                defaultValue={null}
                render={({ field: { value, onChange } }) => {
                  return (
                    <input
                      value={value}
                      type="text"
                      // min={0}
                      onChange={onChange}
                      className={`form-control ${
                        errors.channelNumber ? "Validation" : ""
                      }`}
                      placeholder="channel Number"
                    />
                  );
                }}
              />
            </div>
            {/* <div className="mt-3">
              <label className="form-label mb-1" htmlFor="name">
                Image Url
              </label>
              <Controller
                name="image"
                control={control}
                rules={{ required: true }}
                defaultValue={null}
                render={({ field: { value, onChange } }) => {
                  return (
                    <input
                      value={value}
                      type="text"
                      onChange={onChange}
                      className={`form-control ${
                        errors.channelUrl ? "Validation" : ""
                      }`}
                      placeholder="image url"
                    />
                  );
                }}
              />
            </div> */}
            <div className="mt-3">
              <label className="form-label mb-1" htmlFor="name">
                Priority
              </label>
              <Controller
                name="priority"
                control={control}
                defaultValue={null}
                rules={{ required: true }}
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
                      placeholder="priority"
                    />
                  );
                }}
              />
            </div>
            {/* <div className="mt-3">
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
                {mode == "edit" ? "Update" : "Add"} Free Channel
              </button>
            </div>
          </form>

          {/* <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Upload CSV (optional)
            </label>
            <input
              type="file"
              accept=".csv"
              className="block w-full border rounded p-2 text-sm"
              onChange={(e) => setCsvFile(e.target.files[0])}
            />

            <button
              onClick={handleUpload}
              className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
              Upload
            </button>
          </div> */}
          {mode !== "edit" && (
            <div style={{ marginBottom: "16px" }}>
              <label
                style={{
                  display: "block",
                  fontSize: "14px",
                  fontWeight: "500",
                  marginBottom: "6px",
                }}
              >
                Upload CSV (optional)
              </label>
              <input
                type="file"
                accept=".csv"
                style={{
                  display: "block",
                  width: "100%",
                  padding: "8px",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                  marginBottom: "8px",
                }}
                onChange={(e) => setCsvFile(e.target.files[0])}
              />
              <button
                type="button"
                style={{
                  padding: "8px 16px",
                  border: "none",
                  backgroundColor: "#007bff",
                  color: "#fff",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
                onClick={handleUpload}
              >
                Upload
              </button>
            </div>
          )}
        </Box>
      </CustomDrawer>
    </div>
  );
};
