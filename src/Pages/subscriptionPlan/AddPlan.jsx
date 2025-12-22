// import React, { useEffect, useState } from "react";
// import { useForm, Controller } from "react-hook-form";
// import { Box } from "@mui/material";
// import { addPlans, editPlan } from "../../Components/service/admin";
// import { loader, snackbar } from "../../utils";
// import EditIcon from "@mui/icons-material/Edit";
// import CustomDrawer from "../../Components/CustomDrawer/CustomDrawer";

// export const AddPlan = ({ onSubmit, mode, formData }) => {
//   const [drawer, setDrawer] = useState(false);

//   const {
//     control,
//     handleSubmit,
//     reset,
//     formState: { errors },
//   } = useForm({
//     defaultValues: {
//       name: "",
//       price: "",
//       gstPercent: "",
//       features: "",
//       month: "",
//     },
//   });

//   useEffect(() => {
//     if (mode === "edit" && formData) {
//       const { name, price, gstPercent, features, month } = formData;
//       reset({
//         name,
//         price,
//         gstPercent,
//         features: features ? features.join(", ") : "",
//         month,
//       });
//     }
//   }, [mode, formData, reset]);

//   const formSubmit = async (data) => {
//     try {
//       loader.start();

//       const payload = {
//         ...data,
//         features: data.features
//           ? data.features.split(",").map((f) => f.trim())
//           : [],
//       };

//       if (mode === "edit") {
//         await editPlan(formData._id, payload);
//         snackbar.success("Plan updated successfully");
//       } else {
//         await addPlans(payload);
//         snackbar.success("Plan created successfully");
//       }

//       onSubmit();
//       reset();
//       setDrawer(false);
//     } catch (error) {
//       console.log(error);
//     } finally {
//       loader.stop();
//     }
//   };

//   return (
//     <div>
//       {mode === "edit" ? (
//         <EditIcon className="pointer" onClick={() => setDrawer(true)} />
//       ) : (
//         <button
//           className="btn btn-primary btn-radius px-3"
//           onClick={() => setDrawer(true)}
//         >
//           Add Plan
//         </button>
//       )}

//       <CustomDrawer
//         width={600}
//         open={drawer}
//         toggle={() => setDrawer(!drawer)}
//         header={`${mode === "edit" ? "Edit" : "Add"} Plan`}
//       >
//         <Box mt={3}>
//           <form onSubmit={handleSubmit(formSubmit)}>
//             {/* Plan Name */}
//             <div className="mb-3">
//               <label className="form-label">Plan Name</label>
//               <Controller
//                 name="name"
//                 control={control}
//                 rules={{
//                   required: "Plan name is required",
//                   validate: (value) =>
//                     value.trim() !== "" || "Field cannot be empty",
//                 }}
//                 render={({ field: { value, onChange } }) => (
//                   <input
//                     value={value}
//                     onChange={onChange}
//                     className={`form-control ${
//                       errors.name ? "Validation" : ""
//                     }`}
//                     placeholder="Plan Name"
//                   />
//                 )}
//               />
//               {errors.name && (
//                 <small className="text-danger">{errors.name.message}</small>
//               )}
//             </div>

//             {/* Price */}
//             <div className="mb-3">
//               <label className="form-label">Price (₹)</label>
//               <Controller
//                 name="price"
//                 control={control}
//                 rules={{ required: "Price is required" }}
//                 render={({ field: { value, onChange } }) => (
//                   <input
//                     type="number"
//                     value={value}
//                     onChange={onChange}
//                     className={`form-control ${
//                       errors.price ? "Validation" : ""
//                     }`}
//                     placeholder="Price"
//                   />
//                 )}
//               />
//               {errors.price && (
//                 <small className="text-danger">{errors.price.message}</small>
//               )}
//             </div>

//             {/* GST Percent */}
//             <div className="mb-3">
//               <label className="form-label">GST (%)</label>
//               <Controller
//                 name="gstPercent"
//                 control={control}
//                 rules={{ required: "GST percent is required" }}
//                 render={({ field: { value, onChange } }) => (
//                   <input
//                     type="number"
//                     value={value}
//                     onChange={onChange}
//                     className={`form-control ${
//                       errors.gstPercent ? "Validation" : ""
//                     }`}
//                     placeholder="GST Percent"
//                   />
//                 )}
//               />
//               {errors.gstPercent && (
//                 <small className="text-danger">
//                   {errors.gstPercent.message}
//                 </small>
//               )}
//             </div>

//             {/* Features */}
//             <div className="mb-3">
//               <label className="form-label">Features (comma separated)</label>
//               <Controller
//                 name="features"
//                 control={control}
//                 render={({ field: { value, onChange } }) => (
//                   <textarea
//                     value={value}
//                     onChange={onChange}
//                     className="form-control"
//                     placeholder="Example: HD Streaming, 4 Devices, Ad-free"
//                     rows={3}
//                   />
//                 )}
//               />
//             </div>
//             {/* for valid days or months */}
//             <div className="mb-3">
//               <label className="form-label">months</label>
//               <Controller
//                 name="month"
//                 control={control}
//                 rules={{ required: "days is required" }}
//                 render={({ field: { value, onChange } }) => (
//                   <input
//                     type="number"
//                     value={value}
//                     onChange={onChange}
//                     className={`form-control ${
//                       errors.month ? "Validation" : ""
//                     }`}
//                     placeholder="months"
//                   />
//                 )}
//               />
//               {errors.month && (
//                 <small className="text-danger">
//                   {errors.month.message}
//                 </small>
//               )}
//             </div>

//             <div className="d-flex justify-content-end mt-3">
//               <button
//                 type="button"
//                 className="cancelButton border-none outline-none"
//                 onClick={() => setDrawer(false)}
//               >
//                 Cancel
//               </button>
//               <button className="btn btn-primary m-1" type="submit">
//                 {mode === "edit" ? "Update" : "Add"} Plan
//               </button>
//             </div>
//           </form>
//         </Box>
//       </CustomDrawer>
//     </div>
//   );
// };

import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Box } from "@mui/material";
import {
  addPlans,
  editPlan,
  getAllHomeContent,
  getWatchoPlans,
} from "../../Components/service/admin";
import { loader, snackbar } from "../../utils";
import EditIcon from "@mui/icons-material/Edit";
import CustomDrawer from "../../Components/CustomDrawer/CustomDrawer";
import Checkbox from "@mui/material/Checkbox";
import ListItemText from "@mui/material/ListItemText";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

export const AddPlan = ({ onSubmit, mode, formData }) => {
  const [drawer, setDrawer] = useState(false);
  const [featureOptions, setFeatureOptions] = useState([]);
  const [watchoPlans, setWatchoPlans] = useState([]);

  const {
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      price: "",
      gstPercent: "",
      features: [],
      month: "",
      watchoPlanId: "",
    },
  });

  const watchFeatures = watch("features");
  const hasWatchoSelected =
    watchFeatures &&
    Array.isArray(watchFeatures) &&
    watchFeatures.some(
      (feature) =>
        feature &&
        typeof feature === "string" &&
        feature.toLowerCase().includes("watcho")
    );

  const hasIptvSelected =
    watchFeatures &&
    Array.isArray(watchFeatures) &&
    watchFeatures.some(
      (feature) =>
        feature &&
        typeof feature === "string" &&
        feature.toLowerCase().includes("iptv")
    );

  console.log("watcho", watchoPlans);
  console.log("hasIptvSelected", hasIptvSelected);
  useEffect(() => {
    if (mode === "edit" && formData) {
      const { name, price, gstPercent, features, month, watchoPlanId } =
        formData;
      reset({
        name,
        price,
        gstPercent,
        features: features || [],
        month,
        watchoPlanId: watchoPlanId || "",
      });
    }
  }, [mode, formData, reset]);

  useEffect(() => {
    if (drawer) {
      getAllHomeContent().then((res) => {
        let arr = Array.isArray(res.data)
          ? res.data
          : Array.isArray(res.data?.data)
          ? res.data.data
          : [];

        setFeatureOptions(arr);
      });

      // Fetch Watcho plans
      fetchWatchoPlans();
    }
  }, [drawer]);

  const fetchWatchoPlans = async () => {
    try {
      const response = await getWatchoPlans();
      console.log("plan", response);
      setWatchoPlans(response.data?.data);
    } catch (error) {
      console.error("Error fetching Watcho plans:", error);
      // Fallback to dummy data if API fails
      const dummyWatchoPlans = [
        { id: 1, name: "Watcho Basic", duration: "30 days", price: 99 },
        { id: 2, name: "Watcho Premium", duration: "90 days", price: 249 },
        { id: 3, name: "Watcho Pro", duration: "365 days", price: 999 },
      ];

      // setWatchoPlans(dummyWatchoPlans);
    }
  };

  console.log("watchPlan", watchoPlans);

  const formSubmit = async (data) => {
    try {
      loader.start();

      const payload = {
        ...data,
        features: data.features,
        watchoPlanId:
          Array.isArray(data.features) &&
          data.features.some(
            (feature) =>
              feature &&
              typeof feature === "string" &&
              feature.toLowerCase().includes("watcho")
          )
            ? data.watchoPlanId
            : null,
        isIptvPlan:
          Array.isArray(data.features) &&
          data.features.some(
            (feature) =>
              feature &&
              typeof feature === "string" &&
              feature.toLowerCase().includes("iptv")
          ),
      };

      if (mode === "edit") {
        await editPlan(formData._id, payload);
        snackbar.success("Plan updated successfully");
      } else {
        await addPlans(payload);
        snackbar.success("Plan created successfully");
      }

      onSubmit();
      reset();
      setDrawer(false);
    } catch (error) {
      console.log(error);
      snackbar.error("Something went wrong");
    } finally {
      loader.stop();
    }
  };

  return (
    <div>
      {mode === "edit" ? (
        <EditIcon className="pointer" onClick={() => setDrawer(true)} />
      ) : (
        <button
          className="btn btn-primary btn-radius px-3"
          onClick={() => setDrawer(true)}
        >
          Add Plan
        </button>
      )}

      <CustomDrawer
        width={600}
        open={drawer}
        toggle={() => setDrawer(!drawer)}
        header={`${mode === "edit" ? "Edit" : "Add"} Plan`}
      >
        <Box mt={3}>
          <form onSubmit={handleSubmit(formSubmit)}>
            {/* Plan Name */}
            <div className="mb-3">
              <label className="form-label">Plan Name</label>
              <Controller
                name="name"
                control={control}
                rules={{
                  required: "Plan name is required",
                  validate: (value) =>
                    value.trim() !== "" || "Field cannot be empty",
                }}
                render={({ field: { value, onChange } }) => (
                  <input
                    value={value}
                    onChange={onChange}
                    className={`form-control ${
                      errors.name ? "Validation" : ""
                    }`}
                    placeholder="Plan Name"
                  />
                )}
              />
              {errors.name && (
                <small className="text-danger">{errors.name.message}</small>
              )}
            </div>
            {/* Price */}
            <div className="mb-3">
              <label className="form-label">Price (₹)</label>
              <Controller
                name="price"
                control={control}
                rules={{ required: "Price is required" }}
                render={({ field: { value, onChange } }) => (
                  <input
                    type="number"
                    value={value}
                    onChange={onChange}
                    className={`form-control ${
                      errors.price ? "Validation" : ""
                    }`}
                    placeholder="Price"
                  />
                )}
              />
              {errors.price && (
                <small className="text-danger">{errors.price.message}</small>
              )}
            </div>
            {/* GST Percent */}
            <div className="mb-3">
              <label className="form-label">GST (%)</label>
              <Controller
                name="gstPercent"
                control={control}
                rules={{ required: "GST percent is required" }}
                render={({ field: { value, onChange } }) => (
                  <input
                    type="number"
                    value={value}
                    onChange={onChange}
                    className={`form-control ${
                      errors.gstPercent ? "Validation" : ""
                    }`}
                    placeholder="GST Percent"
                  />
                )}
              />
              {errors.gstPercent && (
                <small className="text-danger">
                  {errors.gstPercent.message}
                </small>
              )}
            </div>
            {/* Features */}
            <div className="mb-3">
              <label className="form-label">Features</label>
              <Controller
                name="features"
                control={control}
                render={({ field: { value = [], onChange } }) => (
                  <Select
                    multiple
                    displayEmpty
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    renderValue={(selected) =>
                      selected.length === 0 ? (
                        <span style={{ color: "#aaa" }}>Select features</span>
                      ) : (
                        selected.join(", ")
                      )
                    }
                    className="form-control"
                    MenuProps={{
                      PaperProps: {
                        style: {
                          maxHeight: 200,
                          overflow: "auto",
                        },
                      },
                    }}
                  >
                    <MenuItem disabled value="">
                      <em>Select features</em>
                    </MenuItem>
                    {featureOptions.map((option, idx) => (
                      <MenuItem key={idx} value={option.title}>
                        <Checkbox checked={value.includes(option.title)} />
                        <ListItemText primary={option.title} />
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
            </div>

            {/* Watcho Plan Selection - Show only when Watcho is selected */}
            {hasWatchoSelected && (
              <div className="mb-3">
                <label className="form-label">Select Watcho Plan</label>
                <Controller
                  name="watchoPlanId"
                  control={control}
                  rules={{
                    required: hasWatchoSelected
                      ? "Please select a Watcho plan"
                      : false,
                  }}
                  render={({ field: { value, onChange } }) => (
                    <Select
                      value={value}
                      onChange={onChange}
                      displayEmpty
                      className="form-control"
                      style={{ width: "100%" }}
                      MenuProps={{
                        PaperProps: {
                          style: {
                            maxHeight: 200,
                            overflow: "auto",
                          },
                        },
                      }}
                    >
                      <MenuItem value="">
                        <em>Select Watcho Plan</em>
                      </MenuItem>
                      {watchoPlans &&
                        watchoPlans.length > 0 &&
                        watchoPlans.map((plan) => (
                          <MenuItem
                            key={plan.SubscriptionPlanID || plan._id}
                            value={plan.SubscriptionPlanID || plan._id}
                          >
                            {plan.name}
                          </MenuItem>
                        ))}
                    </Select>
                  )}
                />
                {errors.watchoPlanId && (
                  <small className="text-danger">
                    {errors.watchoPlanId.message}
                  </small>
                )}
              </div>
            )}

            {/* Valid months */}
            <div className="mb-3">
              <label className="form-label">months</label>
              <Controller
                name="month"
                control={control}
                rules={{ required: "months is required" }}
                render={({ field: { value, onChange } }) => (
                  <input
                    type="number"
                    value={value}
                    onChange={onChange}
                    className={`form-control ${
                      errors.month ? "Validation" : ""
                    }`}
                    placeholder="months"
                  />
                )}
              />
              {errors.month && (
                <small className="text-danger">{errors.month.message}</small>
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
                {mode === "edit" ? "Update" : "Add"} Plan
              </button>
            </div>
          </form>
        </Box>
      </CustomDrawer>
    </div>
  );
};
