import React, { useEffect, useState } from "react";
import TableContainer from "../../Components/TableContainer/TableContainer";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import { getCollectionData } from "../../Firebase/cloudFirestore/getData";
import { loader, snackbar } from "../../utils";
import { AiTwotoneDelete } from "react-icons/ai";
import { FaRegEdit } from "react-icons/fa";

import { Modal, ModalBody } from "reactstrap";
import { GoInfo } from "react-icons/go";
import {
  addBanner,
  deleteBannerImg,
  deleteDocs,
  getBannerData,
  updateBanner,
  uploadDocs,
} from "../../Components/service/admin";

export default function TVBanner() {
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
  const [isValid, setIsValid] = useState(true);
  const [docId, setDocId] = useState("");
  const [fileForDelete, setFileForDelete] = useState("");
  const [backgroundFile, setBackgroundFile] = useState(null);
  const [backgroundPreview, setBackgroundPreview] = useState("");
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("");

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
        // if (Math.abs(ratio - 16 / 9) < 0.01) {
        //   setIsValid(true);
        //   console.log("Image is valid.");
        // } else {
        //   setIsValid(false);
        //   snackbar.error("The image must have a 16:9 aspect ratio.");
        //   console.log("Image is not 16:9.");
        // }

        URL.revokeObjectURL(img.src);
      };
    }
  };

  const getEvent = async () => {
    loader.start();
    const res = await getBannerData();
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
      setError("Please select image");
      return;
    }
    loader.start();
    try {
      if (isValid && isValid !== null) {
        const fileData = new FormData();
        let fieldName = file?.type.startsWith("video") ? "video" : "banner";
        // fileData.append();
        fileData.append(fieldName, file);
        if (title) {
          fileData.append("title", title);
        }
        if (priority) {
          fileData.append("priority", priority);
        }
        if (backgroundFile) {
          fileData.append("backgroundImage", backgroundFile);
        }
        // let imgRes = await uploadDocs(fileData);
        // let imgData = imgRes?.data?.data[0];
        // let payload = {
        //   fileData: {
        //     fileName: imgData?.file_name,
        //     fileUrl: imgData?.file_url,
        //   },
        // };
        if (docId == "") {
          await addBanner(fileData);
          setSuccess("New banner added successfully");
        } else {
          await deleteDocs([fileForDelete]);
          await updateBanner(docId, fileData);
          setSuccess("Banner update successfully");
        }
        setDocId("");
        setFileForDelete("");
        setFile(null);
        setPreview("");
        setAddModal(false);
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
      let res = await deleteBannerImg(deleteId);
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

  return (
    <>
      <Modal centered isOpen={addModal}>
        <ModalBody>
          <div className="py-4">
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

            {/* Optional Background Image Upload */}
            <div className="mb-3">
              <label className="form-label fs-8 mb-1">
                Background Image (Optional)
              </label>
              <div className="banneruploadContainer rounded">
                {backgroundPreview !== "" ? (
                  <>
                    <div className="bannerUploadimg3 rounded">
                      <img
                        className="w-100 h-100"
                        src={backgroundPreview}
                        alt=""
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <div className="bannerUpload3 rounded">1920 x 1080</div>
                  </>
                )}

                <div className="d-flex justify-content-center mt-3">
                  <label
                    className="btn btn-sm btn-primary"
                    htmlFor="backgroundimg"
                  >
                    Select Background
                  </label>
                </div>
              </div>
              <input
                type="file"
                hidden
                id="backgroundimg"
                accept=".png,.jpg,.jpeg,.jifi"
                onChange={(e) => {
                  const file = e.target.files[0];

                  if (file) {
                    const validFormats = [
                      "image/png",
                      "image/jpg",
                      "image/jpeg",
                      "image/jifi",
                    ];
                    if (!validFormats.includes(file.type)) {
                      snackbar.error(
                        "The image must be in PNG, JPG, JPEG, or JIFI format."
                      );
                      return;
                    }

                    setBackgroundFile(file);
                    // You can optionally run validation for background image here too
                    const previewUrl = URL.createObjectURL(file);
                    setBackgroundPreview(previewUrl);
                  }
                }}
              />
            </div>

            <label className="form-label fs-5 mb-1">Select Banner</label>
            <div className="banneruploadContainer rounded">
              {preview !== "" ? (
                <>
                  <div className="bannerUploadimg3 rounded">
                    <img className="w-100 h-100" src={preview} alt="" />
                  </div>
                </>
              ) : (
                <>
                  <div className="bannerUpload3 rounded">1920 x 1080</div>
                </>
              )}

              <div className="d-flex justify-content-center mt-3">
                <label className="btn btn-sm btn-primary" htmlFor="bannerimg">
                  Select
                </label>
              </div>
            </div>
            <ul className="mt-3 f-14">
              <li>
                Please upload an image with dimensions of <b>1920px</b> width
                and <b>1080px</b> height.
              </li>
              <li>Image size should range between 10KB to 50MB.</li>
              <li>Accepted image formats: PNG, JPG, JPEG, JIFI.</li>
              <li>
                Ensure that your image has a high resolution for the best
                display on TV screens.
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
                      "The image must be in PNG, JPG, JPEG, or JIFI format."
                    );
                    return;
                  }

                  // If format is valid, proceed with other checks
                  setFile(file);
                  handleImageCheck(file);

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
                setPreview("");
                setDocId("");
                setFileForDelete("");
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
      <h2 className="fw-600">Banners</h2>
      <div className="d-flex justify-content-end">
        <button
          className="btn btn-primary btn-radius px-3"
          onClick={() => {
            if (data?.length < 3) {
              setAddModal(true);
            } else {
              setError("You can add only 3 banners.");
            }
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
                <TableCell>title</TableCell>
                <TableCell>Banners</TableCell>
                <TableCell>Background Image</TableCell>
                <TableCell>Priority</TableCell>
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
                    <TableCell>{res?.title}</TableCell>
                    <TableCell>
                      <img src={res?.fileData?.fileUrl} width="200px" alt="" />
                    </TableCell>
                    <TableCell>
                      <img src={res?.bgImage} width="200px" alt="" />
                    </TableCell>
                    <TableCell>{res?.priority}</TableCell>

                    <TableCell>
                      <AiTwotoneDelete
                        size={20}
                        className="text-primary pointer"
                        onClick={() => {
                          setDeleteModal(true);
                          setDeleteId(res?._id);
                        }}
                      />
                      <FaRegEdit
                        size={20}
                        className="text-primary pointer"
                        onClick={() => {
                          setDocId(res?._id);
                          setFileForDelete(res?.fileData?.fileName);
                          setAddModal(true);
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
