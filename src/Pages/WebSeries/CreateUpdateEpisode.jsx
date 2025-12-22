import React, { useEffect, useState, useCallback } from "react";
import { Controller, useForm } from "react-hook-form";
import { Box } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import CustomDrawer from "../../Components/CustomDrawer/CustomDrawer";
import {
  addEpisode,
  addMovieChannel,
  getAllMovieChannel,
  getAllMovieChannelCategory,
  getEpisodesList,
  getSeasonsList,
  getWebSeriesList,
  updateEpisode,
  updateMovieChannel,
} from "../../Components/service/admin";
import { loader, snackbar } from "../../utils";

const CreateUpdateEpisode = ({ onSubmit, mode, formData }) => {
  const [drawer, setDrawer] = useState(false);
  const [allEpisode, setAllEpisode] = useState([]);
  const [allWebSeries, setAllWebSeries] = useState([]);
  const [allSeason, setAllSeason] = useState([]);
  const [selectedWebSeries, setSelectedWebSeries] = useState(null);
  const [filteredSeasons, setFilteredSeasons] = useState([]);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      language: "",
      videoUrl: "",
      season: null,
      webSeries: null,
      description: "",
      image: null,
    },
  });

  // ✅ Fetch season on mount
  useEffect(() => {
    (async () => {
      try {
        loader.start();
        const res = await getSeasonsList();
        setAllSeason(res?.data?.data || []);
      } catch (error) {
        console.log(error);
      } finally {
        loader.stop();
      }
    })();
  }, []);

  // ✅ Fetch webSeries on mount
  useEffect(() => {
    (async () => {
      try {
        loader.start();
        const res = await getWebSeriesList();
        setAllWebSeries(res?.data?.data || []);
      } catch (error) {
        console.log(error);
      } finally {
        loader.stop();
      }
    })();
  }, []);

  // ✅ Fetch channels when drawer opens
  useEffect(() => {
    if (drawer) {
      (async () => {
        try {
          const res = await getEpisodesList();
          setAllEpisode(res?.data?.data || []);
        } catch (error) {
          console.log(error);
        }
      })();
    }
  }, [drawer]);

  // Update filteredSeasons when allSeason or selectedWebSeries changes
  useEffect(() => {
    if (selectedWebSeries) {
      setFilteredSeasons(
        allSeason.filter(
          (season) => season.webSeries?._id === selectedWebSeries
        )
      );
    } else {
      setFilteredSeasons([]);
    }
  }, [allSeason, selectedWebSeries]);

  const formSubmit = async (data) => {
    try {
      loader.start();
      const formDatas = new FormData();
      formDatas.append("title", data.title);
      formDatas.append("language", data.language);
      formDatas.append("videoUrl", data.videoUrl);
      formDatas.append("description", data.description);
      formDatas.append("seasonId", data.season);
      formDatas.append("webSeriesId", data.webSeries);
      if (data.image) formDatas.append("thumbnail", data.image);

      if (mode === "edit") {
        await updateEpisode(formData._id, formDatas);
        snackbar.success("Episode updated successfully");
      } else {
        await addEpisode(formDatas);
        snackbar.success("Episode created successfully");
      }

      onSubmit();
      reset();
      setDrawer(false);
    } catch (error) {
      console.log(error);
    } finally {
      loader.stop();
    }
  };

  const editClick = () => {
    if (formData) {
      const {
        title,
        language,
        videoUrl,
        season,
        webSeries,
        description,
        thumbnail,
      } = formData;

      reset({
        title,
        language,
        videoUrl,
        season: season?._id || null,
        webSeries: webSeries?._id || null,
        description,
        thumbnail,
      });
      setSelectedWebSeries(webSeries?._id || null);
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
          Add Episode
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
                name="image"
                control={control}
                rules={mode !== "edit" ? { required: "Image is required" } : {}}
                render={({ field: { onChange } }) => (
                  <input
                    type="file"
                    onChange={(e) => onChange(e.target.files[0])}
                    className={`form-control ${
                      errors.image ? "Validation" : ""
                    }`}
                  />
                )}
              />
              {errors.image && (
                <p className="text-danger">{errors.image.message}</p>
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
            </div>

            {/* description */}
            <div className="mt-3">
              <label className="form-label mb-1">Description</label>
              <Controller
                name="description"
                control={control}
                rules={{ required: "description is required" }}
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    className={`form-control ${
                      errors.priority ? "Validation" : ""
                    }`}
                    placeholder="Description"
                  />
                )}
              />
              {errors.description && (
                <p className="text-danger">{errors.description.message}</p>
              )}
            </div>

            {/* language */}
            <div className="mt-3">
              <label className="form-label mb-1">Language</label>
              <Controller
                name="language"
                control={control}
                rules={{ required: "language is required" }}
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    className={`form-control ${
                      errors.priority ? "Validation" : ""
                    }`}
                    placeholder="language"
                  />
                )}
              />
              {errors.language && (
                <p className="text-danger">{errors.language.message}</p>
              )}
            </div>

            {/* webSeries */}
            {mode !== "edit" && (
              <div className="mt-3">
                <label className="form-label mb-1">WebSeries</label>
                <Controller
                  name="webSeries"
                  control={control}
                  rules={{ required: "WebSeries is required" }}
                  render={({ field }) => (
                    <select
                      {...field}
                      className={`form-select ${
                        errors.webSeries ? "Validation" : ""
                      }`}
                      onChange={(e) => {
                        field.onChange(e);
                        setSelectedWebSeries(e.target.value);
                      }}
                    >
                      <option value="">Select WebSeries</option>
                      {allWebSeries.map((res) => (
                        <option value={res._id} key={res._id}>
                          {res?.title}
                        </option>
                      ))}
                    </select>
                  )}
                />
                {errors.webSeries && (
                  <p className="text-danger">{errors.webSeries.message}</p>
                )}
              </div>
            )}

            {/* season */}
            {mode !== "edit" && (
              <div className="mt-3">
                <label className="form-label mb-1">Season</label>
                <Controller
                  name="season"
                  control={control}
                  rules={{ required: "Season is required" }}
                  render={({ field }) => (
                    <select
                      {...field}
                      className={`form-select ${
                        errors.season ? "Validation" : ""
                      }`}
                      disabled={!selectedWebSeries}
                    >
                      <option value="">Select Season</option>
                      {filteredSeasons.map((res) => (
                        <option value={res._id} key={res._id}>
                          {res?.title}
                        </option>
                      ))}
                    </select>
                  )}
                />
                {errors.season && (
                  <p className="text-danger">{errors.season.message}</p>
                )}
              </div>
            )}
            {/* VIDEO URL */}
            <div className="mt-3">
              <label className="form-label mb-1">Video Url</label>
              <Controller
                name="videoUrl"
                control={control}
                rules={{ required: "video URL  is required" }}
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    className={`form-control ${
                      errors.videoUrl ? "Validation" : ""
                    }`}
                    placeholder="Video Url"
                  />
                )}
              />
              {errors.videoUrl && (
                <p className="text-danger">{errors.videoUrl.message}</p>
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
                {mode === "edit" ? "Update" : "Add"} Episode
              </button>
            </div>
          </form>
        </Box>
      </CustomDrawer>
    </div>
  );
};

export default CreateUpdateEpisode;
