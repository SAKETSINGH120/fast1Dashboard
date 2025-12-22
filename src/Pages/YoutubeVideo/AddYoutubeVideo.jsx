// import React, { useEffect } from "react";
// import { useState } from "react";
// import { Controller, useForm } from "react-hook-form";
// import { Box } from "@mui/material";
// import { PACKAGE_TYPES, STATUS_OPTIONS } from "../../utils/constant";
// import {
//   createYoutubeVideo,
//   getAllYoutubeVideos,
//   updateYoutubeVideo,
// } from "../../Components/service/admin";

// import { loader, snackbar } from "../../utils";
// import EditIcon from "@mui/icons-material/Edit";
// import CustomDrawer from "../../Components/CustomDrawer/CustomDrawer";
// import { AutoComplete } from "../../Components/Inputs/AutoComplete";

// export const AddYoutubeVideo = ({ onSubmit, mode, formData }) => {
//   let [drawer, setDrawer] = useState(false);
//   let [allVideos, setAllVideos] = useState([]);

//   const {
//     control,
//     handleSubmit,
//     watch,
//     reset,
//     setValue,
//     formState: { errors },
//   } = useForm({
//     defaultValues: {
//       title: "",
//       link: "",
//       priority: "",
//       thumbnail: null,
//     },
//   });

//   useEffect(() => {
//     if (drawer) {
//       getAllVideos();
//     }
//   }, [drawer]);

//   async function getAllVideos() {
//     try {
//       let res = await getAllYoutubeVideos();
//       console.log(res.data.data);
//       setAllVideos(res?.data?.data || []);
//     } catch (error) {
//       console.log(error);
//     }
//   }

//   async function formSubmit(data) {
//     console.log(data, " this is the data");
//     try {
//       loader.start();

//       const formDatas = new FormData();
//       formDatas.append("title", data.title);
//       formDatas.append("link", data.link);
//       formDatas.append("priority", data.priority);
//       if (data.thumbnail) {
//         formDatas.append("thumbnail", data.thumbnail);
//       }
//       if (mode === "edit") {
//         let res = await updateYoutubeVideo(formData._id, formDatas);
//         console.log("response", res);
//         snackbar.success("Video updated successfully");
//       } else {
//         let res = await createYoutubeVideo(formDatas);
//         snackbar.success("Video created successfully");
//       }

//       onSubmit();
//       reset({
//         title: "",
//         link: "",
//         priority: "",
//       });
//       setDrawer(false);
//     } catch (error) {
//       console.log(error);
//     } finally {
//       loader.stop();
//     }
//   }

//   function editClick() {
//     console.log(formData);

//     let { title, link, priority, thumbnail } = formData;

//     reset({
//       title,
//       link,
//       priority,
//       thumbnail,
//     });
//     setDrawer(true);
//   }

//   return (
//     <div>
//       {mode === "edit" ? (
//         <EditIcon className="pointer" onClick={editClick} />
//       ) : (
//         <button
//           className="btn btn-primary btn-radius px-3"
//           onClick={() => setDrawer(true)}
//         >
//           Add Video
//         </button>
//       )}
//       <CustomDrawer
//         width={600}
//         open={drawer}
//         toggle={() => setDrawer(!drawer)}
//         header={`${mode == "edit" ? "Edit" : "Add"} Package`}
//       >
//         <Box mt={3}>
//           <form onSubmit={handleSubmit(formSubmit)}>
//             <div>
//               <label className="form-label mb-1" htmlFor="image">
//                 Thumbnail
//               </label>
//               <Controller
//                 name="thumbnail"
//                 control={control}
//                 rules={{ required: "thumbnail is required" }}
//                 render={({ field: { onChange } }) => (
//                   <input
//                     type="file"
//                     // accept="image/*"
//                     id="thumbnail"
//                     name="thumbnail"
//                     onChange={(e) => onChange(e.target.files[0])}
//                     className={`form-control ${
//                       errors.thumbnail ? "Validation" : ""
//                     }`}
//                   />
//                 )}
//               />
//               {errors.thumbnail && (
//                 <p className="text-danger">{errors.thumbnail.message}</p>
//               )}
//             </div>

//             {/* {errors.image && <p>{errors.image.message}</p>} */}

//             <div>
//               <label className="form-label mb-1" htmlFor="title">
//                 Title
//               </label>
//               <Controller
//                 name="title"
//                 control={control}
//                 rules={{
//                   required: "Required",
//                   validate: (value) =>
//                     value.trim() !== "" || "Field cannot be empty",
//                 }}
//                 defaultValue={null}
//                 render={({ field: { value, onChange } }) => {
//                   return (
//                     <input
//                       value={value}
//                       onChange={onChange}
//                       className={`form-control ${
//                         errors.title ? "Validation" : ""
//                       }`}
//                       placeholder="title"
//                     />
//                   );
//                 }}
//               />
//             </div>
//             <div className="mt-3">
//               <label className="form-label mb-1" htmlFor="link">
//                 Video Url
//               </label>
//               <Controller
//                 name="link"
//                 control={control}
//                 rules={{ required: true }}
//                 defaultValue={null}
//                 render={({ field: { value, onChange } }) => {
//                   return (
//                     <input
//                       value={value}
//                       type="text"
//                       onChange={onChange}
//                       className={`form-control ${
//                         errors.link ? "Validation" : ""
//                       }`}
//                       placeholder="Video Url"
//                     />
//                   );
//                 }}
//               />
//             </div>
//             <div className="mt-3">
//               <label className="form-label mb-1" htmlFor="name">
//                 Priority
//               </label>
//               <Controller
//                 name="priority"
//                 control={control}
//                 defaultValue={null}
//                 rules={{ required: true }}
//                 render={({ field: { value, onChange } }) => {
//                   return (
//                     <input
//                       value={value}
//                       type="number"
//                       min={0}
//                       className={`form-control ${
//                         errors.priority ? "Validation" : ""
//                       }`}
//                       onChange={onChange}
//                       placeholder="priority"
//                     />
//                   );
//                 }}
//               />
//             </div>
//             <div className="d-flex justify-content-end mt-3">
//               <button
//                 className="cancelButton border-none outline-none"
//                 type="button"
//                 onClick={() => setDrawer(false)}
//               >
//                 Cancel
//               </button>
//               <button className="btn btn-primary m-1" type="submit">
//                 {mode == "edit" ? "Update" : "Add"} Video
//               </button>
//             </div>
//           </form>
//         </Box>
//       </CustomDrawer>
//     </div>
//   );
// };

import React, { useEffect } from "react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Box } from "@mui/material";
import {
  createYoutubeVideo,
  getAllYoutubeVideos,
  updateYoutubeVideo,
  videoCategories, // 👈 new service call
} from "../../Components/service/admin";

import { loader, snackbar } from "../../utils";
import EditIcon from "@mui/icons-material/Edit";
import CustomDrawer from "../../Components/CustomDrawer/CustomDrawer";

export const AddYoutubeVideo = ({ onSubmit, mode, formData }) => {
  let [drawer, setDrawer] = useState(false);
  let [allVideos, setAllVideos] = useState([]);
  let [categories, setCategories] = useState([]); // 👈 category list state

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      link: "",
      priority: "",
      thumbnail: null,
      videoCategory: "", // 👈 added
    },
  });

  useEffect(() => {
    if (drawer) {
      getAllVideos();
      getCategories(); //
    }
  }, [drawer]);

  async function getAllVideos() {
    try {
      let res = await getAllYoutubeVideos();
      setAllVideos(res?.data?.data || []);
    } catch (error) {
      console.log(error);
    }
  }

  async function getCategories() {
    try {
      let res = await videoCategories();
      setCategories(res?.data?.data || []);
    } catch (error) {
      console.log(error);
    }
  }

  async function formSubmit(data) {
    try {
      loader.start();

      const formDatas = new FormData();
      formDatas.append("title", data.title);
      formDatas.append("link", data.link);
      formDatas.append("priority", data.priority);
      formDatas.append("videoCategory", data.videoCategory);
      if (data.thumbnail) {
        formDatas.append("thumbnail", data.thumbnail);
      }

      if (mode === "edit") {
        await updateYoutubeVideo(formData._id, formDatas);
        snackbar.success("Video updated successfully");
      } else {
        await createYoutubeVideo(formDatas);
        snackbar.success("Video created successfully");
      }

      onSubmit();
      reset({
        title: "",
        link: "",
        priority: "",
        videoCategory: "",
        thumbnail: null,
      });
      setDrawer(false);
    } catch (error) {
      console.log(error);
      snackbar.error(
        error?.response?.data?.errormessage || error?.message || "API Error"
      );
    } finally {
      loader.stop();
    }
  }

  function editClick() {
    let { title, link, priority, thumbnail, videoCategory } = formData;
    reset({
      title,
      link,
      priority,
      thumbnail,
      videoCategory: videoCategory?._id || "",
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
          Add Video
        </button>
      )}
      <CustomDrawer
        width={600}
        open={drawer}
        toggle={() => setDrawer(!drawer)}
        header={`${mode == "edit" ? "Edit" : "Add"} Video`}
      >
        <Box mt={3}>
          <form onSubmit={handleSubmit(formSubmit)}>
            {/* Thumbnail */}
            {/* <div>
              <label className="form-label mb-1" htmlFor="thumbnail">
                Thumbnail
              </label>
              <Controller
                name="thumbnail"
                control={control}
                rules={{ required: "Thumbnail is required" }}
                render={({ field: { onChange } }) => (
                  <input
                    type="file"
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
            </div> */}

            {/* Title */}
            <div>
              <label className="form-label mb-1" htmlFor="title">
                Title
              </label>
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

            {/* Video URL */}
            <div className="mt-3">
              <label className="form-label mb-1" htmlFor="link">
                Video Url
              </label>
              <Controller
                name="link"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    className={`form-control ${
                      errors.link ? "Validation" : ""
                    }`}
                    placeholder="Video Url"
                  />
                )}
              />
            </div>

            {/* Priority */}
            <div className="mt-3">
              <label className="form-label mb-1" htmlFor="priority">
                Priority
              </label>
              <Controller
                name="priority"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <input
                    {...field}
                    type="number"
                    min={0}
                    className={`form-control ${
                      errors.priority ? "Validation" : ""
                    }`}
                    placeholder="priority"
                  />
                )}
              />
            </div>

            {/* Video Category Dropdown */}
            <div className="mt-3">
              <label className="form-label mb-1" htmlFor="videoCategory">
                Video Category
              </label>
              <Controller
                name="videoCategory"
                control={control}
                rules={{ required: "Category is required" }}
                render={({ field }) => (
                  <select
                    {...field}
                    className={`form-control ${
                      errors.videoCategory ? "Validation" : ""
                    }`}
                  >
                    <option value="">Select Category</option>
                    {categories.map((cat) => (
                      <option key={cat._id} value={cat._id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                )}
              />
              {errors.videoCategory && (
                <p className="text-danger">{errors.videoCategory.message}</p>
              )}
            </div>

            {/* Actions */}
            <div className="d-flex justify-content-end mt-3">
              <button
                className="cancelButton border-none outline-none"
                type="button"
                onClick={() => setDrawer(false)}
              >
                Cancel
              </button>
              <button className="btn btn-primary m-1" type="submit">
                {mode == "edit" ? "Update" : "Add"} Video
              </button>
            </div>
          </form>
        </Box>
      </CustomDrawer>
    </div>
  );
};
