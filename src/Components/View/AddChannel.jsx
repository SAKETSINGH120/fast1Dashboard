// Importing necessary dependencies

import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { MdOutlineFileUpload } from "react-icons/md";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import {
  addBroadcaster,
  addCategory,
  addChannel,
  addGenre,
  addLanguage,
  allGenre,
  allLanguage,
  channelCategories,
  getallChannel,
  getBroadcasters,
} from "../service/admin";
import "../View/channel.css";
import CustomDrawer from "../CustomDrawer/CustomDrawer";
import { loader, snackbar } from "../../utils";
import { Switch, Modal } from "@mui/material";


export const FormComponent = (props) => {
  const dispatch = useDispatch();
  const [modal, setModal] = useState(false);
  const toggleModal = () => {
    setModal(!modal);
    setNewCategoryName('')
  };
  const [showAddCategoryInput, setShowAddCategoryInput] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newBroadcaster, setNewBroadcaster] = useState("");
  const [newGenre, setNewGenre] = useState("");
  const [newLanguage, setNewLanguage] = useState("");
  const [lang, setLang] = useState([]);
  const [genre, setGenre] = useState([]);
  const [broadCast, setBroadCast] = useState([]);
  const [broadcasterModal, setBroadcasterModal] = useState(false);
  const [genreModal, setGenreModal] = useState(false);
  const [languageModal, setLanguageModal] = useState(false);
  const toggleBroadcaster = () => {
    setBroadcasterModal(!broadcasterModal);
    setNewBroadcaster('')
  };
  const [epgDoc, setEpgDoc] = useState({})

  function setError(message) {
    snackbar.error(message);
  }

  function setSuccess(message) {
    snackbar.success(message);
  }

  const [selectedFile, setSelectedFile] = useState(null);
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        // history.push("/channel");
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);




  const toggleGenre = () => {
    setGenreModal(!genreModal);
    setNewGenre('')
  };


  const toggleLanguage = () => {
    setLanguageModal(!languageModal);
    setNewLanguage("");
  };

  const [initialFormData, setInitialFormData] = useState({
    name: "",
    description: "",
    category: "",
    channel_no: "",
    fta: "",
    definition: "",
    select_broadcaster: "",
    logo: {
      filename: "",
      file_url: "",
    },
    age_restriction: false,
    channel_url: "",
    cost: 0,
    genre: "",
    language: "",
  });

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    channel_no: "",
    fta: "",
    definition: "",
    select_broadcaster: "",
    logo: {
      filename: "",
      file_url: "",
    },
    age_restriction: false,
    channel_url: "",
    cost: 0,
    genre: "",
    language: "",
    resource_id: "",
  });

  const id = props?.id;

  const { data } = props;

  useEffect(() => {
    //   setFormData({
    //     name: data.name || "",
    //     description: data.description || "",
    //     category: data.category || "",
    //     channel_no: data.channel_no || "",
    //     fta: data.fta || false,
    //     definition: data.definition || "",
    //     select_broadcaster: data.select_broadcaster || "",
    //     logo: {
    //       filename: data.logo?.file_name || "",
    //       file_url: data.logo?.file_url || "",
    //     },
    //     age_restriction: data.age_restriction || false,
    //     channel_url: data.channel_url || "",
    //     cost: data.cost || 0,
    //     genre: data.genre || "",
    //     language: data.language || "",
    //   });
  }, [data]);

  // const initialisation = async () => {
  //   try {
  //     const response = props?.data
  //     // console.log(response?.data?.data, "channelbyId-----");

  //     if (response) {
  //       setFormData({
  //         name: response.name,
  //         description: response.data.data.description || "",
  //         category: response.data.data.category || "",
  //         channel_no: response.data.data.channel_no || "",
  //         fta: response.data.data.fta || false,
  //         definition: response.data.data.definition || "",
  //         select_broadcaster: response.data.data.broadcaster || "",
  //         logo: {
  //           filename: response.data.data.logo?.file_name || "",
  //           file_url: response.data.data.logo?.file_url || "",
  //         },
  //         age_restriction: response.data.data.age_restriction || false,
  //         channel_url: response.data.data.channel_url || "",
  //         cost: response.data.data.cost || 0,
  //         genre: response.data.data.genre || "",
  //         language: response.data.data.language || "",
  //       });
  //       setInitialFormData({
  //         name: response.data.data.name || "",
  //         description: response.data.data.description || "",
  //         category: response.data.data.category || "",
  //         channel_no: response.data.data.channel_no || "",
  //         fta: response.data.data.fta || false,
  //         definition: response.data.data.definition || "",
  //         select_broadcaster: response.data.data.broadcaster || "",
  //         logo: {
  //           filename: response.data.data.logo?.file_name || "",
  //           file_url: response.data.data.logo?.file_url || "",
  //         },
  //         age_restriction: response.data.data.age_restriction || false,
  //         channel_url: response.data.data.channel_url || "",
  //         cost: response.data.data.cost || 0,
  //         genre: response.data.data.genre || "",
  //         language: response.data.data.language || "",
  //       });
  //     } else {
  //       console.error("No data found in response:", response.data);
  //     }
  //   } catch (error1) {
  //     console.error("Error fetching channel data:", error1);
  //     // Uncomment this line if you have a setError function to handle errors
  //     // setError(error1.message || 'Error fetching channel data');
  //   }
  //   try {
  //     const response = await channelCategories();
  //     if (response.data.error) {
  //       console.error("Error fetching categories:", response.data.errormessage);
  //       return;
  //     }
  //     setCategories(response.data.data);
  //   } catch (error2) {
  //     console.error("Error fetching categories:", error2);
  //     // Uncomment this line if you have a setError function to handle errors
  //     // setError(error2.message || 'Error fetching categories');
  //   }
  // };

  //   const history = useHistory();

  const userPayload = {
    user_id: "123",
    user_name: "123",
    user_role: "123",
  };

  // Refreshing Categories

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await channelCategories();
        if (response.data.error) {
          console.error(
            "Error fetching categories:",
            response.data.errormessage
          );
          return;
        }
        setCategories(response.data.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, [newCategoryName, showAddCategoryInput]);

  // Adding new category and triggering refresh

  const handleAddCategory = async () => {
    if (!newCategoryName) {
      setError("Invalid category name");
      let newCategoryName = document.getElementById("newCategoryName");
      newCategoryName.className = "form-control is-invalid";
      return;
    }

    try {

      loader.start();
      const response = await addCategory({
        category: newCategoryName,
      });

      if (response.data.error) {
        setError(
          `${response.data.errormessage || "An error occurred adding category"}`
        );
        return;
      }

      const newCategory = response.data.data;

      setFormData((prevFormData) => ({
        ...prevFormData,
        category: newCategory._id,
      }));

      setCategories((prevCategories) => [...prevCategories, newCategory]);

      setSuccess("category added successfully");

      setShowAddCategoryInput(false);
      toggleModal();
      setNewCategoryName("");
      loader.stop();
    } catch (error) {
      console.error("Error adding category:", error);
      setError(`${error.response.data.errormessage || "An error occurred adding category"}`);
    } finally {
      loader.stop();
    }
  };

  const handleAddBroadcaster = async () => {

    if (!newBroadcaster) {
      setError("Invalid Broadcaster name");
      let newBroadcaster = document.getElementById("newBroadcaster");
      newBroadcaster.className = "form-control is-invalid";
      return;
    }
    try {

      loader.start();
      const response = await addBroadcaster({
        name: newBroadcaster,
      });

      if (response.data.error) {
        setError(
          `${response.data.errormessage || "An error occurred adding Broadcaster"
          }`
        );
        return;
      }

      const newBroadcasterlocal = response.data.data;

      setFormData((prevFormData) => ({
        ...prevFormData,
        select_broadcaster: newBroadcasterlocal._id,
      }));

      setBroadCast((prevBroadcast) => [...prevBroadcast, newBroadcasterlocal]);

      setSuccess("Broadcaster added successfully");

      setShowAddCategoryInput(false);
      toggleBroadcaster();
      setNewBroadcaster("");
      loader.stop();
    } catch (error) {
      console.error("Error adding Broadcaster:", error);
      setError(`${error.response.data.errormessage || "An error occurred adding Broadcaster"}`);
    } finally {

      loader.stop();
    }
  };

  const handleAddGenre = async () => {
    if (!newGenre) {
      setError("Invalid Genre name");
      let newGenre = document.getElementById("newGenre");
      newGenre.className = "form-control is-invalid";
      return;
    }

    try {

      loader.start();
      const response = await addGenre({
        name: newGenre,
      });

      if (response.data.error) {
        setError(
          `${response.data.errormessage || "An error occurred adding Genre"}`
        );
        return;
      }

      const newGenrelocal = response.data.data;

      setFormData((prevFormData) => ({
        ...prevFormData,
        genre: newGenrelocal._id,
      }));

      setGenre((prevGenre) => [...prevGenre, newGenrelocal]);

      setSuccess("Genre added successfully");

      setShowAddCategoryInput(false);
      toggleGenre();
      loader.stop();
      setNewGenre("");
    } catch (error) {
      console.error("Error adding Genre:", error);
      setError(`${error.response.data.errormessage || "An error occurred adding Genre"}`);
    } finally {
      loader.stop();
    }
  };

  const handleAddLanguage = async () => {
    if (!newLanguage) {
      setError("Invalid Language name");
      let newLanguage = document.getElementById("newLanguage");
      newLanguage.className = "form-control is-invalid";
      return;
    }

    try {

      loader.start();
      const response = await addLanguage({
        name: newLanguage,
      });

      if (response.data.error) {
        setError(
          `${response.data.errormessage || "An error occurred adding Language"}`
        );
        return;
      }

      const newLanguagelocal = response.data.data;

      setFormData((prevFormData) => ({
        ...prevFormData,
        language: newLanguagelocal._id,
      }));

      setLang((prevLanguage) => [...prevLanguage, newLanguagelocal]);

      setSuccess("Language added successfully");

      setShowAddCategoryInput(false);

      loader.stop();
      setNewLanguage("");
      toggleLanguage();
    } catch (error) {
      console.error("Error adding Genre:", error);
      setError(`${error.response.data.errormessage || "An error occurred adding Language"}`);
    } finally {
      loader.stop();
    }
  };
  // Handling Input

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file != undefined) {
      setSelectedFile(file);
      setFormData((prevFormData) => ({
        ...prevFormData,
        logo: {
          ...prevFormData.logo,
          filename: file.name,
        },
      }));

      const fileInputLabel = document.getElementById("filelabelOP");
      if (fileInputLabel) {
        fileInputLabel.textContent = file.name;
      }
    } else {
      let logo = document.getElementById("logo");
      if (logo.className.includes("is-invalid")) {
        logo.className = "custom-file-input";
      }
      setFormData((prevFormData) => ({
        ...prevFormData,
        logo: {
          ...prevFormData.logo,
          filename: "",
        },
      }));
    }
  };

  function handleUploadFile(e) {
    let file = e.target.files[0]
    setEpgDoc(file)
  }
  // Validation logics for Channel name and Channel Number
  const validateChannelName = async () => {

    if (initialFormData.name === formData.name) {
      return false;
    } else {
      const response = await getallChannel();
      const channelNames = response.data.data.map((item) =>
        item.name.toLowerCase()
      );

      if (channelNames.includes(formData.name.toLowerCase())) {
        return true;
      } else {
        return false;
      }
    }

  };

  const validateChannelNumber = async () => {
    if (initialFormData.channel_no === formData.channel_no) {
      return false;
    } else {
      const response = await getallChannel();
      const channelNumbers = response.data.data.map((item) =>
        item.channel_no.toLowerCase()
      );
      if (channelNumbers.includes(formData.channel_no.toLowerCase())) {
        return true;
      } else {
        return false;
      }
    }
  };
  const handleSubmit = async () => {
    loader.start();
    if (formData.name === "") {
      setError("Invalid Channel Name");
      let name = document.getElementById("name");
      name.className = "form-control is-invalid";
      loader.stop();
      return;
    } else if (await validateChannelName()) {
      setError("Channel name already exists");
      let name = document.getElementById("name");
      name.className = "form-control is-invalid";
      loader.stop();
      return;
    } else if (formData.description === "") {
      setError("Invalid Channel Description");
      let description = document.getElementById("description");
      description.className = "form-control is-invalid";
      loader.stop();
      return;
    } else if (formData.category === "") {
      setError("Invalid Channel Category");
      let category = document.getElementById("category");
      category.className = "form-control is-invalid";
      loader.stop();
      return;
    } else if (formData.select_broadcaster === "") {
      setError("Invalid Channel Broadcaster");
      let category = document.getElementById("select_broadcaster");
      category.className = "form-control is-invalid";
      loader.stop();
      return;
    } else if (formData.genre === "") {
      setError("Invalid Channel Genre");
      let category = document.getElementById("genre");
      category.className = "form-control is-invalid";
      loader.stop();
      return;
    } else if (formData.language === "") {
      setError("Invalid Channel Language");
      let category = document.getElementById("language");
      category.className = "form-control is-invalid";
      loader.stop();
      return;
    } else if (formData.channel_url === "") {
      setError("Invalid Channel URL");
      let channel_url = document.getElementById("channel_url");
      channel_url.className = "form-control is-invalid";
      loader.stop();
      return;
    } else if (formData.channel_no === "") {
      setError("Invalid Channel Number");
      let channel_no = document.getElementById("channel_no");
      channel_no.className = "form-control is-invalid";
      loader.stop();
      return;
    } else if (formData.fta === "") {
      setError("Invalid Selection: Please select between fta/Pay");
      let fta = document.getElementById("fta");
      fta.className = "form-control is-invalid";
      loader.stop();
      return;
    } else if (formData.definition === "") {
      setError("Invalid Channel Video definition");
      let definition = document.getElementById("definition");
      definition.className = "form-control is-invalid";
      loader.stop();
      return;
    } else if (await validateChannelNumber()) {
      setError("Channel Number already exists");
      let channel_no = document.getElementById("channel_no");
      channel_no.className = "form-control is-invalid";
      loader.stop();
      return;
      // } else if (formData.cost === 0) {
      //   setError("Channel cost can't be 0");
      //   let cost = document.getElementById("cost");
      //   cost.className = "form-control is-invalid";
      //   return;
    } else {
      //   null;
    }
    loader.start();
    try {
      loader.start();
      let file_url = formData.logo.file_url;
      let file_name = formData.logo.filename;

      if (selectedFile) {
        const fileData = new FormData();
        fileData.append("upload", selectedFile);
        const uploadResponse = await axios.post(
          "https://ziggsmsbackend.onrender.com/upload/uploadDocuments",
          fileData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        file_url = uploadResponse.data.data[0].file_url;
        file_name = uploadResponse.data.data[0].file_name;
      } else {
        setError("Channel logo required");
        loader.stop();
        return
      }
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

      const channelData = {
        name: formData.name,
        description: formData.description,
        category: formData.category,
        channel_no: formData.channel_no,
        fta: formData.fta,
        definition: formData.definition,
        select_broadcaster: formData.select_broadcaster,
        logo: {
          file_name,
          file_url,
        },
        age_restriction: formData.age_restriction,
        channel_url: formData.channel_url,
        cost: formData.cost,
        genre: formData.genre,
        language: formData.language,
      };

      if (epgFile.file_name !== undefined) {
        channelData.epgXmlFile = epgFile
      }

      let response;

      response = await addChannel(channelData);
      setSuccess("Channel created successfully!");
      setEpgDoc({})
      props.toggle();
      props.refreshList();
      loader.stop();
      setSelectedFile(null)
      setFormData({
        name: "",
        description: "",
        category: "",
        channel_no: "",
        fta: "",
        definition: "",
        select_broadcaster: "",
        logo: {
          filename: "",
          file_url: "",
        },
        age_restriction: false,
        channel_url: "",
        cost: 0,
        genre: "",
        language: "",
        resource_id: "",
      })
    } catch (error) {
      console.error("Error:", error);
      setError(`${error}`);
      loader.stop();
    } finally {
      loader.stop();
    }
  };

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { id, value, type, checked } = e.target;
    let element = document.getElementById(id);
    if (id === "fta") {
      if (element.className.includes("is-invalid")) {
        element.className = "form-control pr-1";
      }
      setFormData((prevFormData) => ({
        ...prevFormData,
        [id]: value === "true",
      }));
    } else {
      if (element.className.includes("is-invalid")) {
        element.className = "form-control";
      }
      setFormData((prevFormData) => ({
        ...prevFormData,
        [id]: type === "checkbox" ? checked : value,
      }));
      if (id === "fta") {
      }
    }
  };

  useEffect(() => {
    const getLanguages = async () => {
      try {
        const response = await allLanguage();
        setLang(response?.data?.data);
        // console.log(response.data.data, "all languages-----");
      } catch (error) {
        console.log(error);
      }
    };

    getLanguages();
  }, []);

  useEffect(() => {
    const getGenre = async () => {
      try {
        const response = await allGenre();
        setGenre(response?.data?.data);
        // console.log(response.data.data, "all genre-----");
      } catch (error) {
        console.log(error);
      }
    };

    getGenre();
  }, []);

  useEffect(() => {
    const getBroadCast = async () => {
      try {
        const response = await getBroadcasters();
        setBroadCast(response?.data?.data);
      } catch (error) {
        console.log(broadCast);
      }
    };
    getBroadCast();
  }, []);

  return (
    <>
      <CustomDrawer
        open={props.open}
        toggle={props.toggle}
        header={"Add Channel"}
      >
        <div className="card_container user_section">
          <div className="w-100 mt-4">
            <form className="d-flex flex-column justify-content-between">
              <div className="row">
                <div className="col-md-12 mt-2">
                  <label className="form-label mb-1" htmlFor="name">
                    Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter channel name"
                    id="name"
                    value={formData.name}
                    onChange={handleInputChange}
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
                    placeholder="Enter description here"
                    value={formData.description}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="row ">
                <div className="form-group col-md-6 col-sm-12 col-12 mt-2">
                  <label className="form-label mb-1" htmlFor="category">
                    Category
                  </label>
                  <div className="d-flex">
                    <select
                      id="category"
                      className="form-control"
                      value={formData.category}
                      onChange={handleInputChange}
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
                    <FaPlus
                      style={{
                        color: "#202020",
                        transform: "scale(1.3)",
                        margin: "auto auto",
                        marginLeft: "10px",
                        marginRight: "10px",
                        cursor: "pointer",
                      }}
                      onClick={toggleModal}
                    />
                  </div>
                </div>


                <div className="col-md-6 col-sm-12 col-12 mt-2">
                  <label className="form-label mb-1" htmlFor="ChannelGenre">
                    Channel BroadCaster
                  </label>
                  <div className="d-flex">
                    <select
                      required
                      id="select_broadcaster"
                      className="form-control"
                      value={formData.select_broadcaster}
                      onChange={handleInputChange}
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
                    <FaPlus
                      style={{
                        color: "#202020",
                        transform: "scale(1.3)",
                        margin: "auto auto",
                        marginLeft: "10px",
                        marginRight: "10px",
                        cursor: "pointer",
                      }}
                      onClick={toggleBroadcaster}
                    />
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-6 mt-2">
                  <label className="form-label mb-1" htmlFor="ChannelGenre">
                    Channel Genre
                  </label>
                  <div className="d-flex">
                    <select
                      required
                      id="genre"
                      className="form-control"
                      value={formData.genre}
                      onChange={handleInputChange}
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
                    <FaPlus
                      style={{
                        color: "#202020",
                        transform: "scale(1.3)",
                        margin: "auto auto",
                        marginLeft: "10px",
                        marginRight: "10px",
                        cursor: "pointer",
                      }}
                      onClick={toggleGenre}
                    />
                  </div>
                </div>

                <div className="col-md-6 mt-2">
                  <label className="form-label mb-1" htmlFor="ChannelLanguage">
                    Channel Language
                  </label>
                  <div className="d-flex">
                    <select
                      required
                      id="language"
                      className="form-control"
                      name="language"
                      value={formData.language}
                      onChange={handleInputChange}
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
                    <FaPlus
                      style={{
                        color: "#202020",
                        transform: "scale(1.3)",
                        margin: "auto auto",
                        marginLeft: "10px",
                        marginRight: "10px",
                        cursor: "pointer",
                      }}
                      onClick={toggleLanguage}
                    />
                  </div>
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
                    onChange={handleInputChange}
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
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="row mt-2">
                <div
                  className={`${formData.fta === false ? "col-md-6" : "col-md-12"
                    }`}
                >
                  <label className="form-label mb-1" htmlFor="SelectOrFta">
                    Select Pay or FTA
                  </label>
                  <select
                    id="fta"
                    className="form-control pr-1"
                    value={formData.fta.toString()}
                    onChange={handleInputChange}
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
                      id="cost"
                      value={formData.cost}
                      name="cost"
                      onChange={handleInputChange}
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
                    className="form-control"
                    value={formData.definition}
                    onChange={handleInputChange}
                  >
                    <option disabled value="">
                      Select Definition
                    </option>
                    <option value="Standard definition">
                      Standard Definition
                    </option>
                    <option value="High definition">High definition</option>
                  </select>
                </div>
              </div>

              <div className="row mt-2">
                <div className="col-md-12">
                  <label className="form-label mb-1" htmlFor="logoUpload">
                    Upload Logo
                  </label>
                  <div className="custom-file">
                    <input
                      type="file"
                      className="custom-file-input"
                      id="logo"
                      accept="image/*"
                      name="upload"
                      onChange={handleFileChange}
                    />
                    <label className="custom-file-label" htmlFor="logoUpload">
                      {formData.logo.filename ? (
                        formData.logo.filename
                      ) : (
                        <>
                          {document.getElementById("filelabelOP") ? (
                            <MdOutlineFileUpload
                              style={{ marginRight: "10px" }}
                            />
                          ) : (
                            ""
                          )}
                          <span id="filelabelOP" className="f-14">
                            Upload a thumbnail
                          </span>
                        </>
                      )}
                    </label>
                  </div>
                </div>
              </div>
              <div className="row mt-2">
                <div className="col-md-12">
                  <label className="form-label mb-1" htmlFor="epgfileupload">
                    Upload EPG Guide
                  </label>
                  <div className="custom-file">
                    <input
                      type="file"
                      className="custom-file-input"
                      id="logo"
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
                    name="age_restriction"
                  />
                  <label className="" htmlFor="age_restriction">
                    Age Restriction
                  </label>
                </div>
              </div>
            </form>
          </div>
          <div className="d-flex justify-content-end mt-3">
            <button
              className="cancelButton border-none outline-none"
              type="button"
              onClick={() => {
                props.toggle();
              }}
            >
              Cancel
            </button>
            <button
              className="btn btn-primary m-1"
              type="button"
              onClick={handleSubmit}
            >
              Add Channel
            </button>
          </div>
        </div>

        <Modal
          open={modal}
          onClose={toggleModal}
          aria-labelledby="add-category-modal"
          aria-describedby="add-category-description"
        >
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "600px",
              backgroundColor: "white",
              padding: "16px",
              borderRadius: "8px", // Optional: for rounded corners
            }}
          >
            <h3 className="pb-2 pl-3">Add category</h3>
            <div className="d-flex p-3 align-items-center h5_delete">
              <input
                type="text"
                className="form-control"
                id="newCategoryName"
                placeholder="Enter category name"
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
              />
            </div>
            <div className="d-flex justify-content-end align-items-center pt-2 pl-1 pr-3">
              <div
                className="h7 pointer"
                style={{ marginRight: "17px" }}
                onClick={toggleModal}
              >
                Cancel
              </div>
              <button
                className="btn btn-primary d-flex align-items-center"
                type="button"
                onClick={handleAddCategory}
              >
                Add
              </button>
            </div>
          </div>
        </Modal>

        <Modal
          open={broadcasterModal}
          onClose={toggleBroadcaster}
          aria-labelledby="add-category-modal"
          aria-describedby="add-category-description"
        >
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "600px",
              backgroundColor: "white",
              padding: "16px",
              borderRadius: "8px", // Optional: for rounded corners
            }}
          >
            <h3 className="pb-2 pl-3">Add Broadcaster</h3>
            <div className="d-flex p-3 align-items-center h5_delete">
              <input
                type="text"
                className="form-control"
                id="newBrodcaster"
                placeholder="Enter Broadcaster name"
                value={newBroadcaster}
                onChange={(e) => setNewBroadcaster(e.target.value)}
              />
            </div>
            <div className="d-flex justify-content-end align-items-center pt-2 pl-1 pr-3">
              <div
                className="h7 pointer"
                style={{ marginRight: "17px" }}
                onClick={toggleBroadcaster}
              >
                Cancel
              </div>
              <button
                className="btn btn-primary d-flex align-items-center"
                type="button"
                onClick={handleAddBroadcaster}
              >
                Add
              </button>
            </div>
          </div>
        </Modal>

        <Modal
          open={genreModal}
          onClose={toggleGenre}
          aria-labelledby="add-category-modal"
          aria-describedby="add-category-description"
        >
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "600px",
              backgroundColor: "white",
              padding: "16px",
              borderRadius: "8px", // Optional: for rounded corners
            }}
          >
            <h3 className="pb-2 pl-3">Add Genre</h3>
            <div className="d-flex p-3 align-items-center h5_delete">
              <input
                type="text"
                className="form-control"
                id="newGenre"
                placeholder="Enter Genre name"
                value={newGenre}
                onChange={(e) => setNewGenre(e.target.value)}
              />
            </div>
            <div className="d-flex justify-content-end align-items-center pt-2 pl-1 pr-3">
              <div
                className="h7 pointer"
                style={{ marginRight: "17px" }}
                onClick={toggleGenre}
              >
                Cancel
              </div>
              <button
                className="btn btn-primary d-flex align-items-center"
                type="button"
                onClick={handleAddGenre}
              >
                Add
              </button>
            </div>
          </div>
        </Modal>

        <Modal
          open={languageModal}
          onClose={toggleLanguage}
          aria-labelledby="add-category-modal"
          aria-describedby="add-category-description"
        >
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "600px",
              backgroundColor: "white",
              padding: "16px",
              borderRadius: "8px", // Optional: for rounded corners
            }}
          >
            <h3 className="pb-2 pl-3">Add Language</h3>
            <div className="d-flex p-3 align-items-center h5_delete">
              <input
                type="text"
                className="form-control"
                id="newLanguage"
                placeholder="Enter Language name"
                value={newLanguage}
                onChange={(e) => setNewLanguage(e.target.value)}
              />
            </div>
            <div className="d-flex justify-content-end align-items-center pt-2 pl-1 pr-3">
              <div
                className="h7 pointer"
                style={{ marginRight: "17px" }}
                onClick={toggleLanguage}
              >
                Cancel
              </div>
              <button
                className="btn btn-primary d-flex align-items-center"
                type="button"
                onClick={handleAddLanguage}
              >
                Add
              </button>
            </div>
          </div>
        </Modal>
      </CustomDrawer>
    </>
  );
};
