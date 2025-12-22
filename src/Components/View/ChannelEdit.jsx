import React, { useEffect, useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { MdOutlineFileUpload } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import "./channel.css";
import { useForm } from "react-hook-form";
import {
  allGenre,
  allLanguage,
  channelCategories,
  deleteChannel,
  getBroadcasters,
  updateChannelById,
} from "../service/admin";
import { loader, snackbar } from "../../utils";
import { Switch } from "@mui/material";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import axios from "axios";

export default function ChannelEdit({ imgUrl, getUserData, activeTab }) {
  let { id } = useParams();
  const { handleSubmit } = useForm();
  const [isEdit, setIsEdit] = useState(true);
  const [formData, setFormData] = useState({});
  const [formData2, setFormData2] = useState({});
  const [epgDoc, setEpgDoc] = useState({})
  const [openModal, setOpenModa] = useState(false)

  async function getUserDataInner() {
    loader.start();
    try {
      let res = await getUserData();
      setFormData(res);
      setFormData2(res);
    } catch (err) {
      console.log(err);
    } finally {
      loader.stop();
    }
  }

  useEffect(() => {
    if (activeTab == 0) {
      getUserDataInner();
      fetchCategories();
      getBroadCast();
    }
  }, [activeTab, imgUrl]);

  async function submitData(data) {
    let payload = {
      ...formData,
      // user_id: "123",
      // user_name: "123",
      // user_role: "123",
    };
    delete payload._id;
    delete payload.channelId;
    delete payload.resource_id;
    delete payload.enc_token;
    delete payload.expires;
    delete payload.channalToken;
    delete payload.createdAt;
    delete payload.updatedAt;
    delete payload.__v;
    delete payload.languageData;
    delete payload.genreData;

    loader.start();
    try {
      await updateChannelById(id, payload);
      setSuccess('Channel data updated successfully')
    } catch (err) {
      console.log(err);
      setError('There are some problem please try again')
      return;
    } finally {
      await getUserData();
      await getUserDataInner();
      loader.stop();
      setIsEdit(true);
    }
  }

  function handleInput(e) {
    let { value, name } = e.target;
    if (value === " ") {
      e.target.value = "";
    } else {
      setFormData((pre) => {
        return {
          ...pre,
          [name]: value,
        };
      });
    }
  }

  const navigate = useNavigate();
  const DeleteChannel = async () => {
    let payload = {
      // user_id: "123",
      // user_name: "123",
      // user_role: "123",
    };
    try {
      loader.start();
      await deleteChannel(id, payload);
      navigate("/channel");
      loader.stop();
    } catch (err) {
      console.log("error");
    }
  };

  const [categories, setCategories] = useState([]);
  const fetchCategories = async () => {
    try {
      const response = await channelCategories();
      if (response.data.error) {
        console.error("Error fetching categories:", response.data.errormessage);
        return;
      }
      setCategories(response.data.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const [broadCast, setBroadCast] = useState([]);
  const getBroadCast = async () => {
    try {
      const response = await getBroadcasters();
      setBroadCast(response?.data?.data);
    } catch (error) {
      console.log(broadCast);
    }
  };

  const [genre, setGenre] = useState([]);
  useEffect(() => {
    const getGenre = async () => {
      try {
        const response = await allGenre();
        setGenre(response?.data?.data);
      } catch (error) {
        console.log(error);
      }
    };

    getGenre();
  }, []);

  const [lang, setLang] = useState([]);

  useEffect(() => {
    const getLanguages = async () => {
      try {
        const response = await allLanguage();
        setLang(response?.data?.data);
      } catch (error) {
        console.log(error);
      }
    };

    getLanguages();
  }, []);

  function setError(message) {
    snackbar.error(message);
  }
  function setSuccess(message) {
    snackbar.success(message);
  }

  function toggle() {
    setOpenModa(false)
    setEpgDoc({})
  }

  async function uploadEPGGuide(e) {
    e.preventDefault()
    loader.start();
    let epgFile = {}

    if (epgDoc.name !== undefined) {
      const fileData2 = new FormData();
      fileData2.append("upload", epgDoc);
      const uploadResponse = await axios.post(
        "https://ziggsmsbackend.onrender.com/upload/uploadDocuments",
        fileData2,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      epgFile = uploadResponse.data.data[0]
    }
    let payload = {
      epgXmlFile:epgFile,
      ...formData
    }
    delete payload.programs
    delete payload._id;
    delete payload.channelId;
    delete payload.resource_id;
    delete payload.enc_token;
    delete payload.expires;
    delete payload.channalToken;
    delete payload.createdAt;
    delete payload.updatedAt;
    delete payload.__v;
    delete payload.languageData;
    delete payload.genreData;
    try {
      await updateChannelById(id, payload);
      setSuccess('EPG file uploaded successfully')
      setOpenModa(false);
      setEpgDoc({})
    } catch (err) {
      console.log(err);
      setError('There are some problem please try again')
      return;
    } finally {
      await getUserData();
      await getUserDataInner();
      loader.stop();
    }

  }

  function handleUploadFile(e) {
    let file = e.target.files[0]
    setEpgDoc(file)
  }

  return (
    <>
      <Modal isOpen={openModal} centered >
        <ModalHeader toggle={toggle}>
          EPG Guide
        </ModalHeader>
        <form onSubmit={uploadEPGGuide}>
          <ModalBody>
            <div className="py-3">
              <label className="form-label mb-1" htmlFor="epgfileupload">
                Upload EPG Guide
              </label>
              <div className="custom-file">
                <input
                  type="file"
                  className="custom-file-input"
                  id="logo"
                  required
                  accept="text/xml"
                  name="upload"
                  onChange={handleUploadFile}
                />
                <label className="custom-file-label" htmlFor="epgfileupload">
                  {epgDoc?.name ? (
                    epgDoc?.name
                  ) : (
                    <>
                      {document.getElementById("filelabelOP2") ? (
                        <MdOutlineFileUpload
                          style={{ marginRight: "10px" }}
                        />
                      ) : (
                        ""
                      )}
                      <span id="filelabelOP2" className="f-14">
                        Upload XML File
                      </span>
                    </>
                  )}
                </label>
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <div className="d-flex justify-content-end gap-3">
              <button className="btn border" type="button" onClick={toggle}>Cancel</button>
              <button className="btn btn-primary" type="submit">Submit</button>
            </div>
          </ModalFooter>
        </form>
      </Modal>
      <div className="">
        <div className="d-flex justify-content-between align-items-center">
          <div className="fs-5 fw-600 text-black">Channel Details</div>
          <div className="d-flex gap-2">
            <button className="btn btn-primary " onClick={() => setOpenModa(true)}>Upload EPG Guide</button>
            <button
              className="btn btn-primary d-flex align-items-center"
              onClick={() => {
                setIsEdit(!isEdit);
                setFormData(formData2);
              }}
            >
              {isEdit ? (
                <>
                  <FaRegEdit className="me-1" /> Edit
                </>
              ) : (
                "cancel"
              )}
            </button>
          </div>
        </div>

        <form className="w-100" onSubmit={handleSubmit(submitData)}>
          <div className="row mt-4">
            <div className="col-md-12 mt-2">
              <label className="form-label mb-1" htmlFor="name">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter channel name"
                id="name"
                required
                disabled={isEdit}
                name="name"
                value={formData.name}
                onChange={handleInput}
              />
            </div>

            <div className="col-md-12 mt-2">
              <label className="form-label mb-1" htmlFor="description">
                Description
              </label>
              <textarea
                rows={5}
                type="text"
                className="form-control"
                id="description"
                required
                disabled={isEdit}
                name="description"
                placeholder="Enter description here"
                value={formData.description}
                onChange={handleInput}
              />
            </div>
          </div>

          <div className="form-row mb-3 mt-0 d-flex categoryrow">
            <div className="form-group col-md-12">
              <label className="form-label mb-1" htmlFor="category">
                Category
              </label>
              <div className="d-flex">
                <select
                  id="category"
                  className="form-select"
                  value={formData.category}
                  onChange={handleInput}
                  required
                  disabled={isEdit}
                  name="category"
                >
                  <option disabled value="">
                    Select Category
                  </option>
                  {categories.map((category) => (
                    <option
                      style={{
                        padding: "10px auto",
                        borderBottom: "0.2px solid black",
                        WebkitAppearance: "none",
                      }}
                      key={category._id}
                      value={category._id}
                    >
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-12">
              <label className="form-label mb-1" htmlFor="ChannelGenre">
                Channel BroadCaster
              </label>
              <select
                required
                id="select_broadcaster"
                className="form-select"
                value={formData.select_broadcaster}
                onChange={handleInput}
                disabled={isEdit}
                name="select_broadcaster"
              >
                <option disabled value="">
                  Select BroadCaster
                </option>
                {broadCast?.map((item) => (
                  <option
                    style={{
                      padding: "10px auto",
                      borderBottom: "0.2px solid black",
                      WebkitAppearance: "none",
                    }}
                    key={item?._id}
                    value={item?._id}
                  >
                    {item?.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="row">
            <div className="col-md-6 mt-2">
              <label className="form-label mb-1" htmlFor="ChannelGenre">
                Channel Genre
              </label>
              <select
                required
                id="genre"
                className="form-select"
                value={formData.genre}
                onChange={handleInput}
                disabled={isEdit}
                name="genre"
              >
                <option disabled value="">
                  Select Genre
                </option>
                {genre?.map((item) => (
                  <option
                    style={{
                      padding: "10px auto",
                      borderBottom: "0.2px solid black",
                      WebkitAppearance: "none",
                    }}
                    key={item?._id}
                    value={item?._id}
                  >
                    {item?.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-md-6 mt-2">
              <label className="form-label mb-1" htmlFor="ChannelLanguage">
                Channel Language
              </label>
              <select
                required
                id="language"
                className="form-select"
                name="language"
                value={formData.language}
                onChange={handleInput}
                disabled={isEdit}
              >
                <option disabled value="">
                  Select Language
                </option>
                {lang?.map((item1) => (
                  <option
                    style={{
                      padding: "10px auto",
                      borderBottom: "0.2px solid black",
                      WebkitAppearance: "none",
                    }}
                    key={item1?._id}
                    value={item1?._id}
                  >
                    {item1?.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="row">
            <div className="col-md-6 mt-2">
              <label className="form-label mb-1" htmlFor="channel_url">
                Channel URL
              </label>
              <input
                type="text"
                className="form-control"
                id="channel_url"
                placeholder="Enter channel URL"
                value={formData.channel_url}
                onChange={handleInput}
                required
                disabled={isEdit}
                name="channel_url"
              />
            </div>
            <div className={`col-md-6 mt-2`}>
              <label className="form-label mb-1" htmlFor="channel_no">
                Channel No.
              </label>
              <input
                type="number"
                className="form-control"
                id="channel_no"
                placeholder="Enter channel number"
                value={formData.channel_no}
                onChange={handleInput}
                required
                disabled={isEdit}
                name="channel_no"
              />
            </div>
          </div>

          <div className="row mt-2">
            <div
              className={`${formData.fta === false ? "col-md-6" : "col-md-12"}`}
            >
              <label className="form-label mb-1" htmlFor="SelectOrFta">
                Select Pay or FTA
              </label>
              <select
                id="fta"
                className="form-select pr-1"
                value={formData?.fta?.toString()}
                onChange={handleInput}
                required
                disabled={isEdit}
                name="fta"
              >
                <option disabled value="">
                  Select Option
                </option>
                <option value="true">FTA</option>
                <option value="false">Pay</option>
              </select>
            </div>

            {formData.fta === false && (
              <div className="col-md-6">
                <label className="form-label mb-1" htmlFor="Cost">
                  Cost
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="Cost"
                  value={formData.cost}
                  onChange={handleInput}
                  required
                  disabled={isEdit}
                  name="cost"
                />
              </div>
            )}
          </div>

          <div className="row mt-2">
            <div className="col-md-12">
              <label className="form-label mb-1" htmlFor="definition">
                Definition
              </label>
              <select
                id="definition"
                className="form-select"
                value={formData.definition}
                onChange={handleInput}
                required
                disabled={isEdit}
                name="definition"
              >
                <option disabled value="">
                  Select Definition
                </option>
                <option value="Standard definition">Standard Definition</option>
                <option value="High definition">High definition</option>
              </select>
            </div>
          </div>

          <div className="form-row m-1 d-flex">
            <div className="form-group col-md-5 mt-2 d-flex justify-content-start align-items-center agerestrict">
              <Switch
                checked={formData.age_restriction}
                onChange={(e) => {
                  setFormData((pre) => {
                    return {
                      ...pre,
                      age_restriction: e.target.checked,
                    };
                  });
                }}
                type="checkbox"
                id="age_restriction"
                disabled={isEdit}
                name="age_restriction"
              />
              <label className="" htmlFor="age_restriction">
                Age Restriction
              </label>
            </div>
          </div>

          {isEdit ? (
            ""
          ) : (
            <div className="d-flex justify-content-end gap-3 mt-4">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          )}
        </form>
      </div>
    </>
  );
}
