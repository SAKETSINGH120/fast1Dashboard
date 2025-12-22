import React, { useEffect } from "react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Box } from "@mui/material";
import { PACKAGE_TYPES, STATUS_OPTIONS } from "../../utils/constant";
import {
  createOttContent,
  getAllOttContent,
  updateOttContent,
} from "../../Components/service/admin";

import { loader, snackbar } from "../../utils";
import EditIcon from "@mui/icons-material/Edit";
import CustomDrawer from "../../Components/CustomDrawer/CustomDrawer";
import { AutoComplete } from "../../Components/Inputs/AutoComplete";

export const AddOttContent = ({ onSubmit, mode, formData }) => {
  let [drawer, setDrawer] = useState(false);
  let [allContent, setAllContent] = useState([]);

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
      packageNameForTv: "",
      packageNameForMobile: "",
      priority: "",
      thumbnail: null,
    },
  });

  useEffect(() => {
    if (drawer) {
      getAllContent();
    }
  }, [drawer]);

  async function getAllContent() {
    try {
      let res = await getAllOttContent();
      console.log(res.data.data);
      setAllContent(res?.data?.data || []);
    } catch (error) {
      console.log(error);
    }
  }

  async function formSubmit(data) {
    console.log(data, " this is the data");
    try {
      loader.start();
      const formDatas = new FormData();
      formDatas.append("name", data.name);
      formDatas.append("packageNameForTv", data.packageNameForTv);
      formDatas.append("packageNameForMobile", data.packageNameForMobile);
      formDatas.append("priority", data.priority);
      if (data.thumbnail) {
        formDatas.append("thumbnail", data.thumbnail);
      }
      if (mode === "edit") {
        let res = await updateOttContent(formData._id, formDatas);
        console.log("response", res);
        snackbar.success("Content updated successfully");
      } else {
        let res = await createOttContent(formDatas);
        snackbar.success("Content created successfully");
      }

      onSubmit();
      reset({
        name: "",
        packageNameForTv: "",
        packageNameForMobile: "",
        priority: "",
      });
      setDrawer(false);
    } catch (error) {
      console.log(error);
      snackbar.error(
        error?.response?.data?.errormessage ||
          error?.message ||
          "An error occurred"
      );
    } finally {
      loader.stop();
    }
  }

  function editClick() {
    console.log(formData);

    let { name, packageNameForTv, packageNameForMobile, priority, thumbnail } =
      formData;

    reset({
      name,
      packageNameForTv,
      packageNameForMobile,
      priority,
      thumbnail,
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
          onClick={() => setDrawer(true)}
        >
          Add OTT Content
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
                Thumbnail
              </label>
              <Controller
                name="thumbnail"
                control={control}
                rules={{ required: "thumbnail is required" }}
                render={({ field: { onChange } }) => (
                  <input
                    type="file"
                    // accept="image/*"
                    id="thumbnail"
                    name="thumbnail"
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

            {/* {errors.image && <p>{errors.image.message}</p>} */}

            <div>
              <label className="form-label mb-1" htmlFor="name">
                Name
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
                        errors.title ? "Validation" : ""
                      }`}
                      placeholder="name"
                    />
                  );
                }}
              />
            </div>

            <div>
              <label className="form-label mb-1" htmlFor="packageNameForTv">
                Package Name For TV
              </label>
              <Controller
                name="packageNameForTv"
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
                        errors.packageNameForTv ? "Validation" : ""
                      }`}
                      placeholder="Package Name For TV"
                    />
                  );
                }}
              />
            </div>

            <div className="mt-3">
              <label className="form-label mb-1" htmlFor="packageNameForMobile">
                Package Name For Mobile
              </label>
              <Controller
                name="packageNameForMobile"
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
                        errors.packageNameForMobile ? "Validation" : ""
                      }`}
                      placeholder="Package Name For Mobile"
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
            <div className="d-flex justify-content-end mt-3">
              <button
                className="cancelButton border-none outline-none"
                type="button"
                onClick={() => setDrawer(false)}
              >
                Cancel
              </button>
              <button className="btn btn-primary m-1" type="submit">
                {mode == "edit" ? "Update" : "Add"}OTT Content
              </button>
            </div>
          </form>
        </Box>
      </CustomDrawer>
    </div>
  );
};
