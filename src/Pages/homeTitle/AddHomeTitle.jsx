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
    defaultValues: { title: "" },
  });

  async function formSubmit(data) {
    try {
      loader.start();
      const body = {
        title: data.title,
      };

      if (mode === "edit") {
        await editHomeTitle(formData._id, body);
        snackbar.success("Home Title updated successfully");
      } else {
        await createHomeTitle(body);
        snackbar.success("Home Title created successfully");
      }

      onSubmit();
      reset({ title: "" });
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
        width={400}
        open={drawer}
        toggle={() => setDrawer(!drawer)}
        header={`${mode === "edit" ? "Edit" : "Add"} Home Title`}
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
                  />
                )}
              />
              {errors.title && (
                <p className="text-danger">{errors.title.message}</p>
              )}
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
