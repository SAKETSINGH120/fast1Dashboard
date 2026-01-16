import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Box } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import CustomDrawer from "../../Components/CustomDrawer/CustomDrawer";
import { loader, snackbar } from "../../utils";
import { createHomeTitle, editHomeTitle } from "../../Components/service/admin";

export const AddHomeTitle = ({ onSubmit, mode, formData }) => {
  const [drawer, setDrawer] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      breakingNews: "",
      info: "",
      advt: "",
      weatherAlert: "",
      headlines: "",
      upcomingProg: "",
      flashAlert: "",
      promo: "",
      publicInterest: "",
    },
  });

  async function formSubmit(data) {
    try {
      loader.start();
      const body = {
        breakingNews: data.breakingNews,
        info: data.info,
        advt: data.advt,
        weatherAlert: data.weatherAlert,
        headlines: data.headlines,
        upcomingProg: data.upcomingProg,
        flashAlert: data.flashAlert,
        promo: data.promo,
        publicInterest: data.publicInterest,
      };

      if (mode === "edit") {
        await editHomeTitle(formData._id, body);
        snackbar.success("Home Title updated successfully");
      } else {
        await createHomeTitle(body);
        snackbar.success("Home Title created successfully");
      }

      onSubmit();
      reset({
        breakingNews: "",
        info: "",
        advt: "",
        weatherAlert: "",
        headlines: "",
        upcomingProg: "",
        flashAlert: "",
        promo: "",
        publicInterest: "",
      });
      setDrawer(false);
    } catch (err) {
      console.error(err);
    } finally {
      loader.stop();
    }
  }

  function editClick() {
    reset({
      breakingNews: formData.breakingNews || "",
      info: formData.info || "",
      advt: formData.advt || "",
      weatherAlert: formData.weatherAlert || "",
      headlines: formData.headlines || "",
      upcomingProg: formData.upcomingProg || "",
      flashAlert: formData.flashAlert || "",
      promo: formData.promo || "",
      publicInterest: formData.publicInterest || "",
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
          onClick={() => {
            setDrawer(true);
          }}
        >
          Add Home Title
        </button>
      )}

      <CustomDrawer
        width={500}
        open={drawer}
        toggle={() => setDrawer(!drawer)}
        header={`${mode === "edit" ? "Edit" : "Add"} Home Title`}
      >
        <Box mt={3} style={{ maxHeight: "80vh", overflowY: "auto" }}>
          <form onSubmit={handleSubmit(formSubmit)}>
            {/* Breaking News */}
            <div className="mb-3">
              <label className="form-label mb-1">Breaking News</label>
              <Controller
                name="breakingNews"
                control={control}
                render={({ field }) => (
                  <textarea
                    {...field}
                    className="form-control"
                    placeholder="Enter breaking news"
                    rows={2}
                  />
                )}
              />
            </div>

            {/* Info */}
            <div className="mb-3">
              <label className="form-label mb-1">Info</label>
              <Controller
                name="info"
                control={control}
                render={({ field }) => (
                  <textarea
                    {...field}
                    className="form-control"
                    placeholder="Enter info"
                    rows={2}
                  />
                )}
              />
            </div>

            {/* Advt */}
            <div className="mb-3">
              <label className="form-label mb-1">Advt</label>
              <Controller
                name="advt"
                control={control}
                render={({ field }) => (
                  <textarea
                    {...field}
                    className="form-control"
                    placeholder="Enter advertisement"
                    rows={2}
                  />
                )}
              />
            </div>

            {/* Weather Alert */}
            <div className="mb-3">
              <label className="form-label mb-1">Weather Alert</label>
              <Controller
                name="weatherAlert"
                control={control}
                render={({ field }) => (
                  <textarea
                    {...field}
                    className="form-control"
                    placeholder="Enter weather alert"
                    rows={2}
                  />
                )}
              />
            </div>

            {/* Headlines */}
            <div className="mb-3">
              <label className="form-label mb-1">Headlines</label>
              <Controller
                name="headlines"
                control={control}
                render={({ field }) => (
                  <textarea
                    {...field}
                    className="form-control"
                    placeholder="Enter headlines"
                    rows={2}
                  />
                )}
              />
            </div>

            {/* Upcoming Program */}
            <div className="mb-3">
              <label className="form-label mb-1">Upcoming Program</label>
              <Controller
                name="upcomingProg"
                control={control}
                render={({ field }) => (
                  <textarea
                    {...field}
                    className="form-control"
                    placeholder="Enter upcoming program"
                    rows={2}
                  />
                )}
              />
            </div>

            {/* Flash Alert */}
            <div className="mb-3">
              <label className="form-label mb-1">Flash Alert</label>
              <Controller
                name="flashAlert"
                control={control}
                render={({ field }) => (
                  <textarea
                    {...field}
                    className="form-control"
                    placeholder="Enter flash alert"
                    rows={2}
                  />
                )}
              />
            </div>

            {/* Promo */}
            <div className="mb-3">
              <label className="form-label mb-1">Promo</label>
              <Controller
                name="promo"
                control={control}
                render={({ field }) => (
                  <textarea
                    {...field}
                    className="form-control"
                    placeholder="Enter promo"
                    rows={2}
                  />
                )}
              />
            </div>

            {/* Public Interest */}
            <div className="mb-3">
              <label className="form-label mb-1">Public Interest</label>
              <Controller
                name="publicInterest"
                control={control}
                render={({ field }) => (
                  <textarea
                    {...field}
                    className="form-control"
                    placeholder="Enter public interest"
                    rows={2}
                  />
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
                {mode === "edit" ? "Update" : "Add"} Home Title
              </button>
            </div>
          </form>
        </Box>
      </CustomDrawer>
    </div>
  );
};
