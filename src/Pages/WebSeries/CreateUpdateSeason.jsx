import React, { useEffect, useState, useCallback } from "react";
import { Controller, useForm } from "react-hook-form";
import { Box } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import CustomDrawer from "../../Components/CustomDrawer/CustomDrawer";
import {
  addMovieChannel,
  addSeason,
  addWebSeries,
  getAllMovieChannel,
  getAllMovieChannelCategory,
  getSeasonsList,
  getWebSeriesList,
  updateMovieChannel,
  updateSeason,
} from "../../Components/service/admin";
import { loader, snackbar } from "../../utils";

const CreateUpdateSeason = ({ onSubmit, mode, formData }) => {
  const [drawer, setDrawer] = useState(false);
  const [allSeason, setAllSeason] = useState([]);
  const [allwebSeries, setAllWebSeries] = useState([]);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      seasonNumber: "",
      webSeries: null,
    },
  });

  // ✅ Fetch categories on mount
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
          const res = await getSeasonsList();
          setAllSeason(res?.data?.data || []);
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
      formDatas.append("seasonNumber", data.seasonNumber);
      formDatas.append("webSeries", data.webSeries);
      if (mode === "edit") {
        await updateSeason(formData._id, formDatas);
        snackbar.success("season updated successfully");
      } else {
        await addSeason(formDatas);
        snackbar.success("season created successfully");
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
      const { title, seasonNumber, webSeries } = formData;
      reset({
        title: title || "",
        seasonNumber:
          seasonNumber !== undefined && seasonNumber !== null
            ? String(seasonNumber)
            : "",
        webSeries: webSeries && webSeries._id ? webSeries._id : "",
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
          Add Season
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
            {/* Name Input */}
            <div>
              <label className="form-label mb-1">Title</label>
              <Controller
                name="title"
                control={control}
                rules={{
                  required: "Required",
                  validate: (value) =>
                    (typeof value === "string" && value.trim() !== "") ||
                    "Field cannot be empty",
                }}
                render={({ field }) => (
                  <input
                    {...field}
                    className={`form-control ${
                      errors.title ? "Validation" : ""
                    }`}
                    placeholder="Title"
                  />
                )}
              />
              {errors.title && (
                <p className="text-danger">{errors.title.message}</p>
              )}
            </div>

            {/* Season Number */}
            <div>
              <label className="form-label mb-1">Season No.</label>
              <Controller
                name="seasonNumber"
                control={control}
                rules={{
                  required: "Required",
                  validate: (value) =>
                    (typeof value === "string" && value.trim() !== "") ||
                    "Field cannot be empty",
                }}
                render={({ field }) => (
                  <input
                    {...field}
                    className={`form-control ${
                      errors.seasonNumber ? "Validation" : ""
                    }`}
                    placeholder="seasonNumber"
                  />
                )}
              />
              {errors.seasonNumber && (
                <p className="text-danger">{errors.seasonNumber.message}</p>
              )}
            </div>

            {/* webSeries */}
            <div className="mt-3">
              <label className="form-label mb-1">WebSeries</label>
              <Controller
                name="webSeries"
                control={control}
                rules={{ required: "webSeries is required" }}
                render={({ field }) => (
                  <select
                    {...field}
                    className={`form-select ${
                      errors.webSeries ? "Validation" : ""
                    }`}
                  >
                    <option value="">Select webSeries</option>
                    {allwebSeries.map((res) => (
                      <option value={res._id} key={res._id}>
                        {res.title}
                      </option>
                    ))}
                  </select>
                )}
              />
              {errors.channelCategory && (
                <p className="text-danger">{errors.webSeries.message}</p>
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
                {mode === "edit" ? "Update" : "Add"} Season
              </button>
            </div>
          </form>
        </Box>
      </CustomDrawer>
    </div>
  );
};

export default CreateUpdateSeason;
