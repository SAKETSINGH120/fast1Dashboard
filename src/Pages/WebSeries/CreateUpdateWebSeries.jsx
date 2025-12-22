import React, { useEffect, useState, useCallback } from "react";
import { Controller, useForm } from "react-hook-form";
import { Box } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import CustomDrawer from "../../Components/CustomDrawer/CustomDrawer";
import {
  addMovieChannel,
  addWebSeries,
  getAllMovieChannel,
  getAllMovieChannelCategory,
  getWebSeriesList,
  updateMovieChannel,
  updateWebSeries,
} from "../../Components/service/admin";
import { loader, snackbar } from "../../utils";

const CreateUpdateWebSeries = ({ onSubmit, mode, formData }) => {
  const [drawer, setDrawer] = useState(false);
  const [allWebSeries, setAllWebSeries] = useState([]);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
      language: null,
      releaseYear: "",
      priority: "",
      thumbnail: null,
    },
  });

  //   // ✅ Fetch categories on mount
  //   useEffect(() => {
  //     (async () => {
  //       try {
  //         loader.start();
  //         const res = await getAllMovieChannelCategory();
  //         setAllMovieChannelCategory(res?.data?.data || []);
  //       } catch (error) {
  //         console.log(error);
  //       } finally {
  //         loader.stop();
  //       }
  //     })();
  //   }, []);

  // ✅ Fetch channels when drawer opens
  useEffect(() => {
    if (drawer) {
      (async () => {
        try {
          const res = await getWebSeriesList();
          setAllWebSeries(res?.data?.data || []);
        } catch (error) {
          console.log(error);
        }
      })();
    }
  }, [drawer]);

  const formSubmit = async (data) => {
    try {
      loader.start();
      const formDatas = new FormData();
      formDatas.append("title", data.title);
      formDatas.append("description", data.description);
      formDatas.append("language", data.language);
      formDatas.append("releaseYear", data.releaseYear);
      formDatas.append("priority", Number(data.priority));
      if (data.thumbnail) formDatas.append("thumbnail", data.thumbnail);

      if (mode === "edit") {
        await updateWebSeries(formData._id, formDatas);
        snackbar.success("WebSeries updated successfully");
      } else {
        await addWebSeries(formDatas);
        snackbar.success("WebSeries created successfully");
      }

      onSubmit();
      reset();
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
  };

  const editClick = () => {
    if (formData) {
      const { title, description, language, releaseYear, priority, thumbnail } =
        formData;
      console.log("formData", formData);
      reset({
        title,
        description,
        language,
        releaseYear,
        priority,
        thumbnail,
      });
      setDrawer(true);
    }
  };

  return (
    <div>
      {mode === "edit" ? (
        <EditIcon className="pointer" onClick={editClick} />
      ) : (
        <button
          className="btn btn-primary btn-radius px-3"
          onClick={() => setDrawer(true)}
        >
          Add WebSeries
        </button>
      )}

      <CustomDrawer
        width={600}
        open={drawer}
        toggle={() => setDrawer(!drawer)}
        header={`${mode === "edit" ? "Edit" : "Add"} Package`}
      >
        <Box mt={3}>
          <form onSubmit={handleSubmit(formSubmit)}>
            {/* Image Input */}
            <div>
              <label className="form-label mb-1">Thumbnail</label>
              <Controller
                name="thumbnail"
                control={control}
                rules={{ required: "thumbnail is required" }}
                render={({ field: { onChange } }) => (
                  <input
                    type="file"
                    onChange={(e) => onChange(e.target.files[0])}
                    className={`form-control ${
                      errors.thumbnail ? "Validation" : ""
                    }`}
                  />
                )}
              />
              {errors.thumbnail && (
                <p className="text-danger">{errors.thumbnail.message}</p>
              )}
            </div>

            {/* Title Input */}
            <div>
              <label className="form-label mb-1">Title</label>
              <Controller
                name="title"
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
                      errors.title ? "Validation" : ""
                    }`}
                    placeholder="title"
                  />
                )}
              />
              {errors.title && (
                <p className="text-danger">{errors.title.message}</p>
              )}
            </div>

            <div>
              <label className="form-label mb-1">Description</label>
              <Controller
                name="description"
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
                      errors.description ? "Validation" : ""
                    }`}
                    placeholder="Description"
                  />
                )}
              />
              {errors.description && (
                <p className="text-danger">{errors.description.message}</p>
              )}
            </div>

            <div>
              <label className="form-label mb-1">Language</label>
              <Controller
                name="language"
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
                      errors.language ? "Validation" : ""
                    }`}
                    placeholder="Language"
                  />
                )}
              />
              {errors.language && (
                <p className="text-danger">{errors.language.message}</p>
              )}
            </div>

            {/* Channel Category */}
            {/* <div className="mt-3">
              <label className="form-label mb-1">Channel Category Name</label>
              <Controller
                name="channelCategory"
                control={control}
                rules={{ required: "Channel Category is required" }}
                render={({ field }) => (
                  <select
                    {...field}
                    className={`form-select ${
                      errors.channelCategory ? "Validation" : ""
                    }`}
                  >
                    <option value="">Select Channel Category</option>
                    {allMovieChannelCategory.map((res) => (
                      <option value={res._id} key={res._id}>
                        {res.name}
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
              <label className="form-label mb-1">Release Year</label>
              <Controller
                name="releaseYear"
                control={control}
                rules={{ required: "Field cannot be empty" }}
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    className={`form-control ${
                      errors.releaseYear ? "Validation" : ""
                    }`}
                    placeholder="Release Year"
                  />
                )}
              />
              {errors.releaseYear && (
                <p className="text-danger">{errors.releaseYear.message}</p>
              )}
            </div>

            {/* Priority */}
            <div className="mt-3">
              <label className="form-label mb-1">Priority</label>
              <Controller
                name="priority"
                control={control}
                rules={{
                  required: "Priority is required",
                  validate: (value) => {
                    const num = Number(value);
                    return (
                      (!isNaN(num) && num > 0) ||
                      "Priority must be a positive number"
                    );
                  },
                }}
                render={({ field }) => (
                  <input
                    {...field}
                    type="number"
                    min="1"
                    className={`form-control ${
                      errors.priority ? "Validation" : ""
                    }`}
                    placeholder="Enter priority (e.g., 1, 2, 3...)"
                  />
                )}
              />
              {errors.priority && (
                <p className="text-danger">{errors.priority.message}</p>
              )}
            </div>

            <div className="d-flex justify-content-end mt-3">
              <button
                type="button"
                className="cancelButton border-none outline-none"
                onClick={() => setDrawer(false)}
              >
                Cancel
              </button>
              <button className="btn btn-primary m-1" type="submit">
                {mode === "edit" ? "Update" : "Add"} WebSeries
              </button>
            </div>
          </form>
        </Box>
      </CustomDrawer>
    </div>
  );
};

export default CreateUpdateWebSeries;
