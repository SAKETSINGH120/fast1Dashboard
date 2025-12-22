import React, { useEffect, useState } from "react";
import TableContainer from "../../Components/TableContainer/TableContainer";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { loader, snackbar } from "../../utils";
import { AiTwotoneDelete } from "react-icons/ai";
import { Modal, ModalBody } from "reactstrap";
import { GoInfo } from "react-icons/go";
import {
  addAppBanner,
  deleteAppBanner,
  deleteBannerImg,
  deleteDocs,
  getAllSliderImages,
  updateAppBanner,
  uploadDocs,
} from "../../Components/service/admin";
import { baseUrl } from "../../Components/service/Api";
import { FaRegEdit } from "react-icons/fa";

export default function TVSlider() {
  const [searchInput, setSearchInput] = useState("");
  const [data, setData] = useState([]);
  const [allData, setAllData] = useState([]);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [addModal, setAddModal] = useState(false);

  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const [deleteImg, setDeleteImg] = useState("");
  const [isValid, setIsValid] = useState(true);
  const [priority, setPriority] = useState("");
  const [title, setTitle] = useState("");
  const [docId, setDocId] = useState("");
  const [fileForDelete, setFileForDelete] = useState("");

  // New states for video/channel options
  const [contentType, setContentType] = useState("none"); // "none", "video", "channel"
  const [videoFile, setVideoFile] = useState(null);
  const [videoPreview, setVideoPreview] = useState("");
  const [channelUrl, setChannelUrl] = useState("");

  const handleImageCheck = (event) => {
    const file = event;

    if (file) {
      const img = new Image();
      const validFormats = [
        "image/png",
        "image/jpg",
        "image/jpeg",
        "image/jifi",
      ];
      const fileSizeKB = file.size / 1024;

      // Check file size (10KB - 20MB)
      if (fileSizeKB < 10 || fileSizeKB > 20480) {
        setIsValid(false);
        snackbar.error("The image size must be between 10KB and 20MB.");
        return;
      }

      // Check file format
      if (!validFormats.includes(file.type)) {
        setIsValid(false);
        snackbar.error("The image must be in PNG, JPG, JPEG, or JIFI format.");
        return;
      }

      img.src = URL.createObjectURL(file);

      img.onload = () => {
        const width = img.width;
        const height = img.height;
        const ratio = width / height;

        // Check 16:9 aspect ratio
        //  if (Math.abs(ratio - 16 / 9) < 0.01) {
        //    setIsValid(true);
        //    console.log("Image is valid.");
        //  } else {
        //    setIsValid(false);
        //    snackbar.error("The image must have a 16:9 aspect ratio.");
        //    console.log("Image is not 16:9.");
        //  }

        URL.revokeObjectURL(img.src);
      };
    }
  };

  const getEvent = async () => {
    loader.start();
    const res = await getAllSliderImages();
    let data2 = res?.data?.data;
    // console.log(data)
    let newRes = data2?.map((res, index) => {
      return {
        ...res,
        sno: index + 1,
      };
    });
    console.log(newRes);

    // setAllData(newRes);
    setData(newRes);
    // setTotalData(newRes?.length || 0);
    // paginate(newRes, page);
    loader.stop();
  };

  function paginate(eventData, cpage) {
    const filteredData = eventData.filter(
      (res) =>
        res.Name &&
        typeof res.Name === "string" &&
        res.Name.toLowerCase().includes(searchInput.toLowerCase())
    );
    const startIndex = cpage * rowsPerPage;
    const slicedData = filteredData.slice(startIndex, startIndex + rowsPerPage);
    // setData(slicedData);
  }

  useEffect(() => {
    getEvent();
  }, [rowsPerPage]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    paginate(allData, newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  async function addData() {
    if (docId === "" && file?.name == undefined) {
      setError("Please select a banner image");
      return;
    }

    // Validation based on content type selection
    if (contentType === "video" && !videoFile && docId === "") {
      // Only require video file for new banners, not when editing existing ones
      setError("Please select a video file");
      return;
    }

    if (contentType === "channel" && !channelUrl.trim()) {
      setError("Please enter a channel URL");
      return;
    }

    // URL validation for channel
    if (contentType === "channel" && channelUrl.trim()) {
      try {
        new URL(channelUrl);
      } catch (e) {
        setError("Please enter a valid channel URL");
        return;
      }
    }
    loader.start();
    try {
      // if (isValid && isValid !== null) {
      const fileData = new FormData();
      // fileData.append("upload", file);
      // let imgRes = await uploadDocs(fileData);
      // let imgData = imgRes?.data?.data[0]

      console.log("file", file);

      let fieldName = file?.type.startsWith("video") ? "video" : "banner";

      let banner_for = "bigSlider";
      fileData.append(fieldName, file);
      fileData.append("banner_for", banner_for);
      if (priority) {
        fileData.append("priority", priority);
      }
      if (title) {
        fileData.append("title", title);
      }
      if (contentType === "video" && videoFile) {
        fileData.append("video", videoFile);
      }
      if (contentType === "channel" && channelUrl.trim()) {
        fileData.append("channelUrl", channelUrl);
      }
      // let payload = {
      //   // fileData: {
      //   //   fileName: imgData?.file_name,
      //   //   fileUrl: imgData?.file_url,
      //   // },
      //   fileData,
      //   banner_for: 'bigSlider',
      // }

      if (docId == "") {
        let res = await addAppBanner(fileData);
      } else {
        // await deleteDocs([fileForDelete]);
        await updateAppBanner(docId, fileData);
        setSuccess("Banner update successfully");
      }
      setDocId("");
      setFileForDelete("");
      setFile(null);
      setPreview("");
      setAddModal(false);
      setContentType("none");
      setVideoFile(null);
      setVideoPreview("");
      setChannelUrl("");
      setTitle("");
      setPriority("");
      setSuccess("New banner added successfully");
      await getEvent();
      // } else {
      //   snackbar.error("The image must have a 16:9 aspect ratio.");
      // }
    } catch (err) {
      console.log(err);
      setError("Some error occupide");
    } finally {
      loader.stop();
    }
  }

  async function deleteBanner() {
    loader.start();
    try {
      await deleteDocs([deleteImg]);
      let res = await deleteAppBanner(deleteId);
      setDeleteId("");
      setDeleteModal(false);
      setSuccess("Banner deleted successfully");
      await getEvent();
    } catch (err) {
      console.log(err);
      setError("Some error occupide");
    } finally {
      loader.stop();
    }
  }

  function setError(message) {
    snackbar.error(message);
  }

  function setSuccess(message) {
    snackbar.success(message);
  }
  console.log("data", data[0]);
  console.log("data", data[0]?.fileData?.fileUrl);

  return (
    <>
      <Modal centered isOpen={addModal} size="lg">
        <ModalBody>
          <div className="py-4">
            {/* Info Card */}
            <div className="alert alert-info mb-4">
              <h6 className="mb-2">📋 Banner Creation Guide</h6>
              <ul className="mb-0 small">
                <li>
                  <strong>Banner Image:</strong> Required - Main visual that
                  will be displayed
                </li>
                <li>
                  <strong>Video File:</strong> Optional - Upload video file to
                  link with banner
                </li>
                <li>
                  <strong>Channel URL:</strong> Optional - Add channel link to
                  banner (choose either video OR channel)
                </li>
              </ul>
            </div>
            <div className="mb-3">
              <label className="form-label fs-8 mb-1">Title (Optional)</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label className="form-label fs-8 mb-1">Priority</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter priority"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
              />
            </div>

            {/* Content Type Selection */}
            <div className="mb-3">
              <label className="form-label fs-8 mb-1">
                Additional Content (Optional)
              </label>
              <select
                className="form-control"
                value={contentType}
                onChange={(e) => {
                  setContentType(e.target.value);
                  // Clear previous selections when switching
                  setVideoFile(null);
                  setVideoPreview("");
                  setChannelUrl("");
                }}
              >
                <option value="none">No Additional Content</option>
                <option value="video">Upload Video File</option>
                <option value="channel">Add Channel URL</option>
              </select>
              <small className="text-muted">
                Choose what additional content to add to this banner
              </small>
            </div>

            {/* Video File Upload - Only show when video is selected */}
            {contentType === "video" && (
              <div className="mb-3">
                <label className="form-label fs-8 mb-1">
                  Video File Upload (Optional)
                </label>
                <div className="banneruploadContainer rounded">
                  {videoPreview !== "" ? (
                    <>
                      <div className="bannerUploadimg3 rounded">
                        <video
                          className="w-100 h-100"
                          src={videoPreview}
                          controls
                          style={{ objectFit: "cover" }}
                        />
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="bannerUpload3 rounded">
                        <div className="text-center">
                          <div className="mb-2">📹 Video Upload</div>
                          <div className="small text-muted">
                            Select video file
                          </div>
                        </div>
                      </div>
                    </>
                  )}

                  <div className="d-flex justify-content-center mt-3">
                    <label
                      className="btn btn-sm btn-success"
                      htmlFor="videofile"
                    >
                      Select Video
                    </label>
                  </div>
                </div>
                <input
                  type="file"
                  hidden
                  id="videofile"
                  accept="video/mp4,video/webm,video/ogg,video/avi,video/mov"
                  onChange={(e) => {
                    const file = e.target.files[0];

                    if (file) {
                      const validFormats = [
                        "video/mp4",
                        "video/webm",
                        "video/ogg",
                        "video/avi",
                        "video/mov",
                      ];

                      if (!validFormats.includes(file.type)) {
                        snackbar.error(
                          "Please select a valid video file (MP4, WEBM, OGG, AVI, MOV)."
                        );
                        return;
                      }

                      // Check file size (max 100MB for video)
                      const fileSizeMB = file.size / (1024 * 1024);
                      if (fileSizeMB > 100) {
                        snackbar.error(
                          "Video file size should not exceed 100MB."
                        );
                        return;
                      }

                      setVideoFile(file);
                      const previewUrl = URL.createObjectURL(file);
                      setVideoPreview(previewUrl);
                    }
                  }}
                />
                <ul className="mt-2 f-14">
                  <li>Supported formats: MP4, WEBM, OGG, AVI, MOV</li>
                  <li>Maximum file size: 100MB</li>
                  <li>Recommended resolution: 1920x1080 or higher</li>
                </ul>
              </div>
            )}

            {/* Channel URL Input - Only show when channel is selected */}
            {contentType === "channel" && (
              <div className="mb-3">
                <label className="form-label fs-8 mb-1">Channel URL</label>
                <input
                  type="url"
                  className="form-control"
                  placeholder="Enter channel URL"
                  value={channelUrl}
                  onChange={(e) => setChannelUrl(e.target.value)}
                />
                <small className="text-muted">
                  Enter the URL of the channel you want to link to this banner
                </small>
              </div>
            )}

            <label className="form-label fs-5 mb-1">
              Banner Image (Required)
            </label>
            <div className="banneruploadContainer rounded">
              {preview !== "" ? (
                <>
                  <div className="bannerUploadimg2 rounded">
                    {file && file.type.startsWith("video") ? (
                      <video
                        className="w-100 h-100"
                        src={preview}
                        controls
                        style={{ objectFit: "cover" }}
                      />
                    ) : (
                      <img className="w-100 h-100" src={preview} alt="" />
                    )}
                  </div>
                </>
              ) : (
                <>
                  <div className="bannerUpload2 rounded">
                    <div className="text-center">
                      <div className="mb-2">1920 x 700</div>
                      <div className="small text-muted">
                        Banner Image Required
                      </div>
                    </div>
                  </div>
                </>
              )}

              <div className="d-flex justify-content-center mt-3">
                <label className="btn btn-sm btn-primary" htmlFor="bannerimg">
                  Select Banner Image
                </label>
              </div>
            </div>
            <ul className="mt-3 f-14">
              <li>
                Please upload a banner image with dimensions of <b>1920px</b>{" "}
                width and <b>700px</b> height.
              </li>
              <li>Image size should range between 10KB to 50MB.</li>
              <li>Accepted image formats: PNG, JPG, JPEG, JIFI.</li>
              <li>
                Banner image is <b>required</b> - it will be displayed as the
                main visual.
              </li>
              <li>
                Video or Channel URL can be optionally linked to make the banner
                interactive.
              </li>
            </ul>

            <input
              type="file"
              hidden
              id="bannerimg"
              accept=".png,.jpg,.jpeg,.jifi"
              onChange={(e) => {
                const file = e.target.files[0];

                if (file) {
                  // Validate format
                  const validFormats = [
                    "image/png",
                    "image/jpg",
                    "image/jpeg",
                    "image/jifi",
                  ];
                  if (!validFormats.includes(file.type)) {
                    snackbar.error(
                      "The banner image must be in PNG, JPG, JPEG, or JIFI format."
                    );
                    return;
                  }

                  // If format is valid, proceed with other checks
                  setFile(file);
                  // handleImageCheck(file);

                  const previewUrl = URL.createObjectURL(file);
                  setPreview(previewUrl);
                }
              }}
            />
          </div>
          <div className="d-flex justify-content-end gap-3">
            <button
              className="btn btn-sm border"
              onClick={() => {
                setAddModal(false);
                setDocId("");
                setPreview("");
                setFileForDelete("");
                setContentType("none");
                setVideoFile(null);
                setVideoPreview("");
                setChannelUrl("");
                setTitle("");
                setPriority("");
              }}
            >
              Cancel
            </button>
            <button className="btn btn-sm btn-primary" onClick={addData}>
              Submit
            </button>
          </div>
        </ModalBody>
      </Modal>
      <Modal centered isOpen={deleteModal}>
        <ModalBody>
          <div className="py-4">
            <div className="d-flex justify-content-center">
              <GoInfo className="text-danger" size={40} />
            </div>
            <div className="text-center mt-3">
              Are you sure want to delete this slider image?
            </div>
          </div>
          <div className="d-flex justify-content-end gap-3">
            <button
              className="btn btn-sm border"
              onClick={() => {
                setDeleteModal(false);
                setDeleteId("");
              }}
            >
              Cancel
            </button>
            <button className="btn btn-sm btn-primary" onClick={deleteBanner}>
              Delete
            </button>
          </div>
        </ModalBody>
      </Modal>
      <h2 className="fw-600">TV Sliders Management</h2>

      {/* Statistics Cards */}
      <div className="row mb-4">
        <div className="col-md-3">
          <div className="card bg-primary text-white">
            <div className="card-body">
              <h6 className="card-title">Total Banners</h6>
              <h4 className="mb-0">{data?.length || 0}</h4>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card bg-success text-white">
            <div className="card-body">
              <h6 className="card-title">With Video Files</h6>
              <h4 className="mb-0">
                {data?.filter(
                  (item) =>
                    item.additionalData?.name === "video" ||
                    item.additionalData?.type === "video" ||
                    item.videoUrl ||
                    item.videoFile
                ).length || 0}
              </h4>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card bg-info text-white">
            <div className="card-body">
              <h6 className="card-title">With Channel Links</h6>
              <h4 className="mb-0">
                {data?.filter(
                  (item) =>
                    item.additionalData?.name === "channel" ||
                    item.additionalData?.type === "url" ||
                    item.channelUrl
                ).length || 0}
              </h4>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card bg-warning text-white">
            <div className="card-body">
              <h6 className="card-title">Simple Banners</h6>
              <h4 className="mb-0">
                {data?.filter(
                  (item) =>
                    !item.additionalData &&
                    !item.videoUrl &&
                    !item.channelUrl &&
                    !item.videoFile
                ).length || 0}
              </h4>
            </div>
          </div>
        </div>
      </div>

      <div className="d-flex justify-content-end">
        <button
          className="btn btn-primary btn-radius px-3"
          onClick={() => {
            setAddModal(true);
          }}
        >
          Add New Banner
        </button>
      </div>
      <div className="mt-4">
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>SNo.</TableCell>
                <TableCell>Title</TableCell>
                <TableCell>Banner Image</TableCell>
                <TableCell>Additional Content</TableCell>
                <TableCell>Priority</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {data?.map((res, index) => {
                return (
                  <TableRow hover key={index}>
                    <TableCell
                      className="pointer text-capitalize"
                      style={{ width: "8%" }}
                    >
                      {res?.sno}
                    </TableCell>
                    <TableCell style={{ width: "15%" }}>
                      {res?.title || "No Title"}
                    </TableCell>
                    <TableCell style={{ width: "20%" }}>
                      {res?.fileData?.fileType?.startsWith("video") ? (
                        <video
                          src={res?.fileData?.fileUrl}
                          width="200px"
                          height="120px"
                          controls
                          style={{ objectFit: "cover" }}
                        />
                      ) : (
                        <img
                          src={res?.fileData?.fileUrl}
                          width="200px"
                          height="120px"
                          alt="Banner"
                          style={{ objectFit: "cover" }}
                        />
                      )}
                    </TableCell>
                    <TableCell style={{ width: "25%" }}>
                      {(res?.additionalData?.name === "video" ||
                        res?.additionalData?.type === "video" ||
                        res?.videoUrl ||
                        res?.videoFile) && (
                        <div className="text-success">
                          <strong>🎥 Video</strong>
                          <br />
                          {/* Play video if URL is available */}
                          {(res?.additionalData?.url || res?.videoUrl) && (
                            <video
                              src={res?.additionalData?.url || res?.videoUrl}
                              width="200px"
                              height="120px"
                              controls
                              style={{
                                objectFit: "cover",
                                border: "1px solid #ddd",
                                borderRadius: "4px",
                                marginTop: "5px",
                              }}
                            />
                          )}
                          {/* Show video file indicator if no URL but video type detected */}
                          {!res?.additionalData?.url && !res?.videoUrl && (
                            <div className="small text-muted mt-1">
                              Video file uploaded
                            </div>
                          )}
                        </div>
                      )}
                      {(res?.additionalData?.name === "channel" ||
                        res?.additionalData?.type === "url" ||
                        res?.channelUrl) && (
                        <div className="text-info">
                          <strong>🔗 URL</strong>
                          <br />
                          <a
                            href={res?.additionalData?.url || res?.channelUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary text-decoration-none small"
                          >
                            {res?.additionalData?.url || res?.channelUrl}
                          </a>
                        </div>
                      )}
                      {!res?.additionalData &&
                        !res?.videoUrl &&
                        !res?.channelUrl &&
                        !res?.videoFile && (
                          <span className="text-muted">
                            No Additional Content
                          </span>
                        )}
                    </TableCell>
                    <TableCell style={{ width: "10%" }}>
                      {res?.priority || "N/A"}
                    </TableCell>
                    <TableCell>
                      <FaRegEdit
                        size={20}
                        className="text-primary pointer"
                        onClick={() => {
                          // Set IDs for update
                          setDocId(res?._id);
                          setFileForDelete(res?.fileData?.fileName);

                          // Prefill form fields
                          setTitle(res?.title || "");
                          setPriority(res?.priority || "");

                          // Set banner image preview
                          setPreview(res?.fileData?.fileUrl || "");

                          // Determine content type and set appropriate fields
                          if (
                            res?.additionalData?.name === "video" ||
                            res?.additionalData?.type === "video"
                          ) {
                            setContentType("video");
                            // Note: We can't prefill the video file, but we can show it exists
                            if (res?.additionalData?.url) {
                              setVideoPreview(res?.additionalData?.url);
                            }
                          } else if (
                            res?.additionalData?.name === "channel" ||
                            res?.additionalData?.type === "url"
                          ) {
                            setContentType("channel");
                            setChannelUrl(
                              res?.additionalData?.url || res?.channelUrl || ""
                            );
                          } else {
                            setContentType("none");
                          }

                          setAddModal(true);
                        }}
                      />
                      <AiTwotoneDelete
                        size={20}
                        className="text-primary pointer"
                        onClick={() => {
                          setDeleteModal(true);
                          setDeleteId(res?._id);
                          setDeleteImg(res?.fileData?.fileName);
                        }}
                      />
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>

          {/* <TablePagination
                        component="div"
                        count={totalData}
                        page={page}
                        onPageChange={handleChangePage}
                        rowsPerPage={rowsPerPage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    /> */}
        </TableContainer>
      </div>
    </>
  );
}
