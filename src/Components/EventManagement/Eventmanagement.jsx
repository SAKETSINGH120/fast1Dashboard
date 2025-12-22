import React, { useEffect, useRef, useState } from "react";

import { FormGroup, Dialog, TablePagination } from "@mui/material";
import Button from "@mui/material/Button";
import { addDocument } from "../../Firebase/cloudFirestore/setData";

import { Box, Grid } from "@mui/material";
import { getCollectionData } from "../../Firebase/cloudFirestore/getData";
import { UploadImage } from "../../Firebase/cloudStorage/UploadImage";
import { deleteDocument } from "../../Firebase/cloudFirestore/deleteData";
import { Modal, ModalHeader, Spinner, Table } from "reactstrap";
import { Close, Delete, Edit, ViewAgenda } from "@mui/icons-material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { EventModal } from "./EventModal";
import Style from "./Eventmanagement.module.css";

export default function EventMangement() {
  const [modalviewmore, setModalviewmore] = useState(false);
  const [storeData, setStoreData] = useState({});
  const [activeIconTab, setActiveIconTab] = useState("1");
  const [open, setOpen] = useState(false);
  const [img1, setImg1] = useState("");
  const [loader, setLoader] = useState(false);

  const [deleteConfirmationModal, setDeleteConfirmationModal] = useState(false);
  // const [showFullText, setShowFullText] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [deletedEvent, setDeletedEvent] = useState(null);

  let [eventFormData, setEventFormData] = useState({
    // theme_of_event: "",
    Interestname: "",
    location: "",
    name_of_cafe: "",
    description: "",
    costs: "",
    downloadURL: "",
  });

  const [page, setPage] = useState(0);
  const [slice, setSlice] = useState([]);
  let [themeInterest, setThemeInterest] = useState([]);

  let [editFormData, setEditFormData] = useState({});

  const datingData = useRef({
    // theme_of_event: "",
    Interestname: "",
    location: "",
    name_of_cafe: "",
    description: "",
    costs: "",
    downloadURL: "",
  });

  const addEvent = async (e) => {
    e.preventDefault();
  // console.log(e)
    setOpen(false);
    setLoader(true)
    let downloadURL = await UploadImage(img1);
    await addDocument("Events", { ...eventFormData, downloadURL });
   
    getEvent();
    
    getThemedata();
    setLoader(false)
   
  };

  const [data, setData] = React.useState([]);
  const [themedata, setThemeData] = React.useState([]);
  console.log(themedata,"asasaadsasdasda")

  const getEvent = async () => {
    let data = await getCollectionData("Events");
    console.log(data);
    setData(data);
    paginate(data, page);
    
  };

  const getThemedata = async () => {
    let themedata = await getCollectionData("Themes");
    console.log(themedata);
    setThemeData(themedata);
    console.log(themedata);
  };

  useEffect(() => {
    getEvent();
    getThemedata();
  
  }, []);

  // console.log(data , "***************************************")

  function themeNameChange(e) {
    console.log(e.target.value);
    let dd = themedata.find((se) => se.Interestname == e.target.value);
    console.log(dd);
    if (dd) {
      console.log("+++++++++++++++++++");
      setThemeInterest(dd);
      setEventFormData({
        ...eventFormData,
        Interestname: e.target.value,
        // Interestname: "",
      });
    }
  }

  const toggleRowSelection = (index) => {
    const isSelected = selectedRows.includes(index);
    if (isSelected) {
      setSelectedRows(selectedRows.filter((i) => i !== index));
    } else {
      setSelectedRows([...selectedRows, index]);
    }
  };

  const deleteSelecteddata = async () => {
    for (const index of selectedRows) {
      const docId = data[index].id;
      await deleteDocument("Events", docId);
    }

    const updatedData = data.filter(
      (_, index) => !selectedRows.includes(index)
    );
    setData(updatedData);
    setSelectedRows([]);
    setDeleteConfirmationModal(false);
  };

  function paginate(eventData, cpage) {
  console.log(eventData)
  console.log(cpage)

    const startIndex = cpage * rowsPerPage;
    const slicedData = eventData.slice(startIndex, startIndex + rowsPerPage);
    setSlice(slicedData);

    // setData(slicedData);
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    console.log(newPage);
    paginate(data, newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));

    setPage(0);
  };

  const deleteSelectedRows1 = async () => {
    setDeleteConfirmationModal(true);
  };

  const deleteSelectedData = async () => {
    if (deletedEvent) {
      const docId = deletedEvent.id;
      await deleteDocument("Events", docId);
      setDeletedEvent(null);
      getEvent(); // Refresh the data after deletion
    }
    setDeleteConfirmationModal(false);
  };

  const cancelDelete = () => {
    setDeleteConfirmationModal(false);
  };
  let [deletedDocData, setDeletedDocData] = useState({});

  const deleteSelectedRows = async (res) => {
    setDeletedEvent(res);
    setDeleteConfirmationModal(true);
  };

  const toggleIconTab = (icontab) => {
    if (activeIconTab !== icontab) setActiveIconTab(icontab);
  };

  const viewmore = (res) => {
    console.log(res);
    if (res) {
      setStoreData(res);
    }
    setModalviewmore(!modalviewmore);
    setActiveIconTab("1");
  };
  function editClick(data) {
    console.log(data);
    datingData.current = data;
    setOpen(true);
  }

  return (
    <div>
      <div className="w-100 d-flex justify-content-end">
        <button
          className={Style.button_background1}
          onClick={() => setOpen(true)}
        >
          Add Event
        </button>
        {/* <EventModal allThemes={themedata}  formData={editFormData}/> */}
      </div>

      <Dialog
        open={open}
        maxWidth={"xs"}
        fullWidth
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="p-4">
          {loader ? <div><Spinner/></div> : <>
          <form onSubmit={addEvent}>
            <div className="row">
              <div className="col-md-12 d-flex flex-column gap-2">
                <div>
                  <label htmlFor="denomination">Interest of Event</label>
                  <select
                    defaultValue={datingData.current.Interestname}
                    className="form-select"
                    onChange={(e) => {
                      console.log(data);
                      themeNameChange(e);
                    }}
                    required
                    aria-label="Default select example"
                  >
                    <option selected>Select Intersts of Event</option>
                    {themedata.map((res) => {
                      return (
                        <option value={res.Interestname}>
                          {res.Interestname}
                        </option>
                      );
                    })}
                  </select>

                  {/* <select
                    value={datingData.current.theme_of_event}
                    // value={eventFormData.theme_of_event}
                    className="form-select"
                    onChange={(e) => {
                      themeNameChange(e);
                    }}
                    required
                    aria-label="Default select example"
                  >
                    <option disabled value="">
                      Select Theme of Event
                    </option>
                    {themedata.map((res) => (
                      <option key={res.Interestname} value={res.Interestname}>
                        {res.name_of_theme}
                      </option>
                    ))}
                  </select> */}
                </div>
{/* 
                <div>
                  <label htmlFor="denomination">Interest</label>

                  <select
                    value={eventFormData.Interestname}
                    className="form-select"
                    onChange={(e) => {
                      setEventFormData({
                        ...eventFormData,
                        Interestname: e.target.value,
                      });
                    }}
                    required
                    aria-label="Default select example"
                  >
                    <option value="">Select the Interest</option>
                    {themeInterest.map((res) => {
                      console.log(res)
                      return <option value={res.name}>{res.name}</option>;
                    })}
                  </select>
                </div> */}

                <div>
                  <label htmlFor="denomination">Location</label>
                  <input
                    type="text"
                    // size={40}
                    className="form-control"
                    // value={qrData.qr_purpose}
                    // onChange={inpChange}
                    value={eventFormData.location}
                    onChange={(e) => {
                      setEventFormData({
                        ...eventFormData,
                        location: e.target.value,
                      });
                    }}
                    name="qr_purpose"
                    required
                  />
                </div>
                <div>
                  <label className="">Name of Cafe </label>
                  <input
                    type="text"
                    className="form-control"
                    name="product_count"
                    value={eventFormData.name_of_cafe}
                    onChange={(e) => {
                      setEventFormData({
                        ...eventFormData,
                        name_of_cafe: e.target.value,
                      });
                    }}
                    required
                    // max={10}
                  />
                </div>

                <div>
                  <label className="">Costs </label>
                  <input
                    type="text"
                    className="form-control"
                    name="product_count"
                    value={eventFormData.costs}
                    onChange={(e) => {
                      setEventFormData({
                        ...eventFormData,
                        costs: e.target.value,
                      });
                    }}
                    required
                    // max={10}
                  />
                </div>

                <div>
                  <label className="">Description </label>
                  <textarea
                    // type="textarea"
                    className="form-control"
                    name="product_count"
                    value={eventFormData.description}
                    onChange={(e) => {
                      setEventFormData({
                        ...eventFormData,
                        description: e.target.value,
                      });
                    }}
                    required
                    // max={10}
                  />
                </div>

                <div>
                  <label className="">Images Upload </label>
                  <input
                    size="xl"
                    type="file"
                    onChange={(e) => setImg1(e.target.files[0])}
                    name="select_image"
                    required
                  />
                </div>
                <div className="create mt-4 h d-flex justify-content-end">
                  <Button
                    className=" mt-3 button-background0"
                    // variant="contained"
                    type="submit"
                  >
                    Save
                  </Button>
                  <Button
                    className={`${Style.button_background0} ms-4 mt-3`}
                    variant=""
                    type="button"
                    onClick={() => setOpen(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </div>
          </form>

          </>}
        
        </Box>
      </Dialog>

      <div class="container-fluid">
        <div class=" mt-2 d-flex ">
          <div>
            <h1 class="d-inline-block">Event Management</h1>
          </div>
        </div>
      </div>
      {/* <Box className="pb-3 d-flex justify-content-between mx-3">
        <Grid container>
          <Grid item md={6} xs={12}>
            <input
              className="w-75 form-control"
              type="search"
              placeholder="Search"
             
            />
          </Grid>
        </Grid>
      </Box> */}
      <Box sx={{ m: 2 }} className="border-1">
        <Table bordered hover responsive size="sm">
          <thead>
            <tr className="tableEventRow">
              {/* <td className="w-12"><b>S.No</b></td> */}

              {/* <th className="ThemeEvent1">Theme of event</th> */}
              <th className={Style.ThemeEvent1}>Interests</th>
              <th className={Style.ThemeEvent1}>Location</th>
              <th className={Style.ThemeEvent1}>Name of cafe</th>
              <th className={Style.ThemeEvent1}>Costs</th>
              <th className="ThemeEvent">Description</th>
              <th className={Style.ThemeEvent1}>Images upload</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {slice.map((res, index) => {
              // const truncatedText = showFullText
              //   ? res.description
              //   : `${res.description.slice(0, maxLength)}...`;
              return (
                <tr key={index}>
                  {/* <td>{res.theme_of_event}</td> */}
                  <td>{res.Interestname}</td>
                  <td className={`${Style.theme_event_location}`}>
                    {res.location}
                  </td>
                  <td>{res.name_of_cafe}</td>
                  <td className={`${Style.theme_event_cost}`}>{res.costs}</td>

                  <td className={`${Style.theme_event_custom}`}>
                    <LessMoreContent data={res.description} />
                  </td>
                  <td>
                    <img src={res.downloadURL} className={Style.image_size} />
                  </td>
                  <td>
                    <button
                      className={Style.Viewbutton}
                      onClick={() => {
                        let themeData = themedata.find(
                          (e) => e.name_of_theme == res.theme_of_event
                        );
                        if (themeData?.iconUrl) {
                          viewmore({ ...res, iconUrl: themeData?.iconUrl });
                        } else {
                          viewmore(res);
                        }
                      }}
                      disabled=""
                    >
                      <VisibilityIcon />
                    </button>
                  </td>
                  <td>
                    <button
                      className={Style.EditButton}
                      // onClick={() => editClick(res)}
                    >
                      {/* <Edit /> */}
                      {themedata.length !== 0 ? (
                        <EventModal
                          getAllData={getEvent}
                          data={res}
                          allThemes={themedata}
                          formData={editFormData}
                        />
                      ) : null}
                    </button>
                  </td>
                  <td>
                    <button
                      className={`${Style.DeleteButton}`}
                      onClick={() => deleteSelectedRows(res)}
                    >
                      <Delete />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Box>

      <Modal
        size="lg"
        isOpen={modalviewmore}
        toggle={() => viewmore()}
        className={`${Style.modal_main}`}
      >
        {/* ... (your existing modal code) */}
        <div className={`${Style.viewmodal}`}>
          <div
            className={`${Style.header_of_modal}`}
            style={{ background: `url('${storeData.downloadURL}')` }}
          >
            {console.log(`url(${storeData.downloadURL})`)}
            <div className={`${Style.header_data}`}>
              <div className={`${Style.header_text}`}>
                {storeData?.name_of_cafe}
              </div>
              <div
                className={`${Style.cross_button}`}
                onClick={() => viewmore()}
              >
                <Close />
              </div>
            </div>
          </div>

          <div className={`${Style.content_section_of_view_modal}`}>
            <div className={`ms-2 ${Style.name_and_theme_of_cafe}`}>
              <div className={`${Style.name_and_theme_of_cafe_1}`}>{storeData?.name_of_cafe}</div>
              <div className={`${Style.name_and_theme_of_cafe_2}`}>
                <LocationOnIcon />
                {storeData?.location}
              </div>
              <div className={`${Style.name_and_theme_of_cafe_3}`}>
                {/* <img
                  className={`${Style.image_size}`}
                  src={storeData?.iconUrl}
                /> */}
                {storeData?.Interestname}
              </div>
            </div>
{/* {console.log("asdasdasdasd")} */}
            <div className={`${Style.description_of_view}`}>
              <div className={`${Style.description_of_view_1}`}>Description</div>

              <div className={`${Style.description_of_view_2}`}>{storeData?.description}</div>
            </div>

            <div className={`${Style.cost_of_view}`}>
              <div className={`${Style.cost_of_view_1}`}>Cost</div>

              <div className={`${Style.cost_of_view_2}`}>USD {storeData?.costs}</div>
            </div>
          </div>
        </div>
      </Modal>

      <Modal isOpen={deleteConfirmationModal} toggle={cancelDelete}>
        {/* <ModalHeader toggle={cancelDelete}>Sure !!!</ModalHeader> */}


        <div className={`p-3 ${Style.modal_content_1}`}>
        
        <div>
          <div className={`${Style.delete_modal_text}`}>
            Are you sure you want to delete the selected Event ?
          </div>
          <div className={`${Style.delete_modal_text_1}`}>
            This will delete this Event permanently, you cannot undo this action
          </div>
        </div>

        <div className={`${Style.delete_buttons_section}`}>
          <div
           className={`${Style.cancel_button_of_delete_section}`}
           onClick={() => setDeleteConfirmationModal(false)}
          >
            Cancel
          </div>
          <div
           className={`${Style.delete_button_of_delete_section}`}
           onClick={deleteSelectedData}
          >
            Delete
          </div>
        </div>
      </div>


      </Modal>

      <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
        <TablePagination
          component="div"
          count={data.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Box>
    </div>
  );
}

function LessMoreContent({ data }) {
  const [showFullText, setShowFullText] = useState(false);
  const maxLength = 50;
  const toggleShowFullText = () => {
    setShowFullText(!showFullText);
  };
  const truncatedText = showFullText ? data : `${data.slice(0, maxLength)}...`;
  return (
    <span>
      {truncatedText}
      {data.length > maxLength && (
        <span
          style={{
            color: " rgb(248, 57, 88)",
            cursor: "pointer",
            fontSize: "12px",
          }}
          onClick={toggleShowFullText}
        >
          {showFullText ? " Less" : " More"}
        </span>
      )}
    </span>
  );
}
