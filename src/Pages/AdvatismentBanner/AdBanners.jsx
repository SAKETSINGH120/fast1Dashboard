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
  getAppAdBanners,
  uploadDocs,
} from "../../Components/service/admin";

export default function AdBanners() {
  const [searchInput, setSearchInput] = useState("");
  const [data, setData] = useState([]);
  const [allData, setAllData] = useState([]);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [totalData, setTotalData] = useState(0);

  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [addModal, setAddModal] = useState(false);

  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const [isValid, setIsValid] = useState(null);
  const [isImg, setIsImg] = useState(true)


  const handleImageCheck = (event) => {
    const file = event;
    if (file) {
      const img = new Image();
      img.src = URL.createObjectURL(file);

      img.onload = () => {
        const width = img.width;
        const height = img.height;
        const ratio = width / height;

        // Check for 16:9 aspect ratio
        // if (Math.abs(ratio - 16 / 9) < 0.01) {
        //   setIsValid(true);
        //   console.log("Image is in 16:9 aspect ratio.");
        // } else {
        //   setIsValid(false);
        //   snackbar.error("The image must have a 16:9 aspect ratio.");
        //   console.log("Image is not in 16:9 aspect ratio.");
        // }
        setIsValid(true)

        // Clean up object URL
        URL.revokeObjectURL(img.src);
      };
    }
  };


  const handleVideoCheck = (event) => {
    const file = event;
    if (file) {
      const video = document.createElement('video');
      video.src = URL.createObjectURL(file);

      video.onloadedmetadata = () => {
        const width = video.videoWidth;
        const height = video.videoHeight;
        const ratio = width / height;

        // Check if video is in landscape mode (width > height)
        if (width > height) {
          console.log("Video is in landscape orientation.");

          // Further check for 16:9 aspect ratio
          // if (Math.abs(ratio - 16 / 9) < 0.01) {
          //   setIsValid(true);
          //   console.log("Video is in 16:9 aspect ratio.");
          // } else {
          //   setIsValid(false);
          //   snackbar.error("The video must have a 16:9 aspect ratio.");
          //   console.log("Video is not in 16:9 aspect ratio.");
          // }
          setIsValid(true)
        } else {
          setIsValid(false);
          snackbar.error("The video is not in landscape mode.");
          console.log("Video is not in landscape orientation.");
        }

        // Clean up object URL
        URL.revokeObjectURL(video.src);
      };
    }
  };



  const getEvent = async () => {
    loader.start();
    const res = await getAppAdBanners();
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
    if (file?.name == undefined) {
      setError("Please select image");
      return;
    }
    loader.start();
    try {
      if (isValid && isValid !== null) {
        const fileData = new FormData();
        fileData.append("upload", file);
        let imgRes = await uploadDocs(fileData);
        let imgData = imgRes?.data?.data[0];
        let payload = {
          fileData: {
            fileName: imgData?.file_name,
            fileUrl: imgData?.file_url,
          },
          banner_for: "advertisement"
        };
        await addAppBanner(payload);
        setFile(null);
        setPreview("");
        setAddModal(false);
        setSuccess("New banner added successfully");
        await getEvent();
      } else {
        snackbar.error("The image must have a 16:9 aspect ratio.");
      }
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

  const isImage = (url) => {
    return url.split('?')[0].match(/\.(jpeg|jpg|gif|png|svg|bmp|tiff|webp|heif|heic|raw|psd|ico|jp2|tga|exr|dng|xcf|pcx|mpo|pam|ppm|pgm|pbm|jxr|avif|jfif)$/i);
  };


  const isVideo = (url) => {
    return url.split('?')[0].match(/\.(mp4|mov|avi|wmv|mkv|flv|webm|hevc|h265|av1|3gp|mpg|ogv|ts|asf|divx|vob|m4v|f4v|mts|m2ts|rmvb|prores|xvid|dnxhd|mpeg-1|dash|hls|braw|r3d|imx|vp8|vp9)$/i);
  };


  const mediaRenderer = (url) => {
    if (isImage(url)) {
      return <img src={url} alt="media content" style={{ width: '200px', height: 'auto' }} />;
    }

    if (isVideo(url)) {
      return (
        <video controls style={{ width: '200px', height: 'auto' }}>
          <source src={url} type={`video/${url.split('.').pop()}`} />
          Your browser does not support the video tag.
        </video>
      );
    }

    return <p>Unsupported media format</p>;
  };
  const checkUrl = (url) => {
    if (isImg) {
      return <img src={url} alt="media content" style={{ width: '100%', height: 'auto' }} />;
    } else {
      return (
        <video controls style={{ width: '100%', height: 'auto' }}>
          <source src={url} type={`video/mp4`} />
          Your browser does not support the video tag.
        </video>
      );
    }
  };

  return (
    <>
      <Modal centered isOpen={addModal}>
        <ModalBody>
          <div className="py-4">
            <label className="form-label fs-5 mb-1">Select Banner</label>
            <div className="banneruploadContainer rounded">
              {preview !== "" ? (
                <>
                  <div className="bannerUploadimg3 rounded">
                    {/* <img className="w-100 h-100" src={preview} alt="" /> */}
                    {checkUrl(preview)}
                  </div>
                </>
              ) : (
                <>
                  <div className="bannerUpload3 rounded">1920 x 1080</div>
                </>
              )}

              <div className="d-flex justify-content-center mt-3 gap-2">
                <label className="btn btn-sm btn-primary" htmlFor="bannerimg">
                  Select Image
                </label>
                <label className="" htmlFor="">
                  or
                </label>
                <label className="btn btn-sm btn-primary" htmlFor="bannerVideo">
                  Select Video
                </label>
              </div>
            </div>
            <ul className="mt-3">
              <li>Please upload an image or video with dimensions of <b>1920px</b> width and <b>1080px</b> height.</li>
              <li>Image size should range between 10KB to 20MB.</li>
              <li>Accepted image formats: PNG, JPG, JPEG, JIFI.</li>
              <li>Video dimensions must be in landscape orientation.</li>
              <li>Video size should range between 1MB to 500MB.</li>
              <li>Accepted video formats: MP4, MKV, MOV.</li>
            </ul>

            <input
              type="file"
              hidden
              id="bannerVideo"
              accept=".mp4,.mkv,.mov" // Only accept MP4, MKV, and MOV formats
              onChange={(e) => {
                const file = e.target.files[0];

                if (file) {
                  const fileSizeMB = file.size / (1024 * 1024); // Convert bytes to MB

                  // Validate size (1MB - 500MB)
                  if (fileSizeMB < 1 || fileSizeMB > 500) {
                    snackbar.error("The video size must be between 1MB and 500MB.");
                    e.target.value = ''; // Reset input if invalid
                    return;
                  }

                  // Set file and run further checks
                  setIsImg(false);
                  setFile(file);

                  handleVideoCheck(file); // Perform further checks like landscape orientation if needed

                  const previewUrl = URL.createObjectURL(file);
                  setPreview(previewUrl);
                }

                // Clear input value after file selection
                e.target.value = '';
              }}
            />

            <input
              type="file"
              hidden
              id="bannerimg"
              accept=".png,.jpg,.jpeg,.jifi"
              onChange={(e) => {
                const file = e.target.files[0];

                if (file) {
                  const validFormats = ['image/png', 'image/jpg', 'image/jpeg', 'image/jifi'];
                  const fileSizeKB = file.size / 1024;

                  // Validate format
                  if (!validFormats.includes(file.type)) {
                    snackbar.error("The image must be in PNG, JPG, JPEG, or JIFI format.");
                    e.target.value = ''; // Reset input if invalid
                    return;
                  }

                  // Validate size (10KB - 20MB)
                  if (fileSizeKB < 10 || fileSizeKB > 20480) {
                    snackbar.error("The image size must be between 10KB and 20MB.");
                    e.target.value = ''; // Reset input if invalid
                    return;
                  }

                  // If both validations pass, set the file and perform further checks
                  setFile(file);
                  setIsImg(true);

                  handleImageCheck(file); // Perform aspect ratio check here

                  const previewUrl = URL.createObjectURL(file);
                  setPreview(previewUrl);
                }

                // Clear input value to allow re-upload of the same file if needed
                e.target.value = '';
              }}
            />

          </div>
          <div className="d-flex justify-content-end gap-3">
            <button
              className="btn btn-sm border"
              onClick={() => {
                setAddModal(false);
                setPreview("");
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
              Are you sure want to delete this banner image?
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
      <h2 className="fw-600">App Banners</h2>
      <div className="d-flex justify-content-end">
        <button
          className="btn btn-primary btn-radius px-3"
          onClick={() => {
            // if (data?.length < 3) {
            setAddModal(true);
            // } else {
            //   setError("You can add only 3 banners.");
            // }
          }}
        >
          Add Banner
        </button>
      </div>
      <div className="mt-4">
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>SNo.</TableCell>
                <TableCell>Banner</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {data?.map((res, index) => {
                return (
                  <TableRow hover key={index}>
                    <TableCell
                      className="pointer text-capitalize"
                      style={{ width: "25%" }}
                    >
                      {res?.sno}
                    </TableCell>
                    <TableCell>
                      {mediaRenderer(res?.fileData?.fileUrl)}
                      {/* <img src={res?.fileData?.fileUrl} width="200px" alt="" /> */}
                    </TableCell>
                    <TableCell>
                      <AiTwotoneDelete
                        size={20}
                        className="text-primary pointer"
                        onClick={() => {
                          setDeleteModal(true);
                          setDeleteId(res?._id);
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
