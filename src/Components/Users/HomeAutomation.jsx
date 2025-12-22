import React, { useEffect, useState } from "react";
import Style from "./Uselisting.module.css";
import {
  Backdrop,
  Box,
  CircularProgress,
  FormGroup,
  TablePagination,
} from "@mui/material";
import classnames from "classnames";
import { Table } from "reactstrap";
import { db } from "../../Firebase/firebase";
import {
  getCollectionData,
  getDocumentData,
} from "../../Firebase/cloudFirestore/getData";
import { updateDocument } from "../../Firebase/cloudFirestore/updateData";
import { deleteDocument } from "../../Firebase/cloudFirestore/deleteData";
import { Button, Modal, ModalHeader, Spinner } from "reactstrap";
import { pink } from "@mui/material/colors";
import { Close, Delete } from "@mui/icons-material";
import ReactPaginate from "react-paginate";
import { RiDeleteBin5Line } from "react-icons/ri";
import DropdownWithEditDelete from "../testing";
import { ConfirmModal } from "../ConfirmModal/ConfirmModal";
import { MdDelete } from "react-icons/md";
// import DropdownWithEditDelete} from "../../Components/testing";

const HomeAutomation = () => {
  // const [activeTab, setActivetab] = useState("1");
  const [modalviewmore, setModalviewmore] = useState(false);
  const [modalviewmatches, setModalviewmatches] = useState(false);
  const [modalidproofview, setModalidproofview] = useState(false);
  const [currentImage, setCurrentImage] = useState(""); // New state for current image URL
  const [storeData, setStoreData] = useState([]);
  const [storeData1, setStoreData1] = useState([]);
  const [deleteConfirmationModal, setDeleteConfirmationModal] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [activeIconTab, setActiveIconTab] = useState("1");
  const [data, setData] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [loader, setLoader] = useState(false);
  const [selectAll, setSelectAll] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage] = useState(10); // Number of items per page
  const [allData, setAllData] = useState([]);
  const [allDatas, setAllDatas] = useState([]);
  const [paginationData, setPaginationData] = useState([]);
  const [imageLoading, setImageLoading] = useState(true);
  const [count, setCount] = useState(0);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [devicedata, setDevicedata] = useState();
  const [subscriptionStates, setSubscriptionStates] = useState({}); // Manage toggle states

  const subscriptionItems = [
    {
      label: "Home Automation Subscription",
      key: "homeAutomationSubscription",
    },
    { label: "Free TV", key: "freeTv" },
    { label: "IPTV Subscription", key: "iptvSubscription" },
    { label: "CCTV Subscription", key: "cctvSubscription" },
    { label: "Broadband Subscription", key: "broadbandSubscription" },
  ];

  const handleSubscriptionChange = async (key, checked, userId) => {
    setSubscriptionStates((prevState) => ({
      ...prevState,
      [key]: checked,
    }));

    try {
      const updatedData = { [key]: checked };
      await updateDocument("Users", userId, updatedData);
      console.log(`Updated ${key} to ${checked}`);
    } catch (err) {
      console.error("Error updating subscription:", err);
    }
  };

  const toggleIconTab = (icontab) => {
    if (activeIconTab !== icontab) setActiveIconTab(icontab);
  };

  const updateDeviceIdInFirebase = async (newDeviceIds, id) => {
    console.log(id);
    const userId = "uniqueUserId"; // This should be dynamically set based on your application logic
    await updateDocument("Users", id, { deviceid: newDeviceIds });
  };

  const deletedevicedata = async (data) => {
    let doc = data.allData;
    let res = data.res;
    const id = doc.id;
    // let h=res.deviceList;
    setLoader(true);

    console.log(res);
    console.log(doc);

    let data2 = doc.deviceList.filter((e) => e.deviceId !== res.deviceId);

    try {
      await updateDocument("Users", id, { deviceList: data2 });
      console.log("deltexd d");
      setLoader(false);
    } catch (err) {
      console.log(err);
      setLoader(false);
    }
  };

  // const viewmore = (res) => {
  //   if (res) {
  //     setStoreData([res]);
  //     console.log(res, "viewmoreviewmoreviewmore");
  //   }
  //   setModalviewmore(!modalviewmore);
  //   setActiveIconTab("1");
  // };

  const viewmore = async (res) => {
    if (res) {
      // await getEvent()
      setStoreData([res]);
      setSubscriptionStates(
        subscriptionItems.reduce((acc, item) => {
          acc[item.key] = res[item.key] || false; // Ensure the default is false if undefined
          return acc;
        }, {})
      );
    }
    setModalviewmore(!modalviewmore);
    setActiveIconTab("1");
  };

  const viewmatches = async (res) => {
    // Reset storeData1 to an empty array initially
    setStoreData1([]);

    if (res && res.matches && res.matches.length > 0) {
      // Fetch details of each user based on their ID
      const matchDetails = await Promise.all(
        res.matches.map(async (matchId) => {
          const matchDetails = await getDocumentData("users", matchId);
          return matchDetails;
        })
      );

      // Set the detailed match information in the state
      setStoreData1({ user: res, matches: matchDetails });
    } else {
      setStoreData1({ user: res });
    }

    // Toggle the modal visibility
    setModalviewmatches(!modalviewmatches);
  };

  const idproofview = (url) => {
    setCurrentImage(url); // Set the current image URL
    setModalidproofview(!modalidproofview);
  };

  // const getEvent = async () => {
  //   let eventData = await getCollectionData("Users");
  //   {
  //     console.log(eventData, "eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee");
  //   }
  //   // Sort the eventData based on the created_at property in descending order

  //   eventData.sort((a, b) => b?.created_at.toMillis() - a?.created_at.toMillis());
  //   let event_data = eventData.map((e) => {
  //     e.selected = false;
  //     return e;
  //   });

  //   setAllData(event_data);
  //   setAllDatas(event_data);

  //   paginate(event_data, page);
  // };

  const getEvent = async () => {
    const eventData = await getCollectionData("Users");
    eventData.sort(
      (a, b) => b?.created_at.toMillis() - a?.created_at.toMillis()
    );
    const event_data = eventData.map((e) => {
      e.selected = false;
      return e;
    });
    setAllData(event_data);
    setStoreData(event_data);

    console.log(event_data);
    console.log(subscriptionItems);

    setSubscriptionStates(subscriptionItems.map((e) => ({ [e.key]: false })));
    console.log(subscriptionStates);
    console.log(subscriptionItems.map((e) => ({ [e.key]: false })));

    // setSubscriptionStates(
    //   event_data.reduce((acc, curr) => {
    //     subscriptionItems.forEach((item) => {
    //       acc[item.key] = curr[item.key];
    //     });
    //     return acc;
    //   }, {})
    // );

    paginate(event_data, page);
  };

  function filterData(e) {
    const filteredData = allData.filter((res) =>
      res.Name.toLowerCase().startsWith(e.toLowerCase())
    );
    if (e.length !== 0) {
      setData(filteredData);
    } else {
      paginate(allDatas, page);
    }
  }

  function paginate(eventData, cpage) {
    console.log(cpage);
    const filteredData = eventData.filter(
      (res) =>
        res.Name &&
        typeof res.Name === "string" &&
        res.Name.toLowerCase().includes(searchInput.toLowerCase())
    );

    const startIndex = cpage * rowsPerPage;
    const slicedData = filteredData.slice(startIndex, startIndex + rowsPerPage);
    setData(slicedData);
  }

  useEffect(() => {
    getEvent();
  }, [rowsPerPage]); // Include currentPage as a dependency

  const toggleSelectAll = () => {
    setSelectAll(!selectAll);
    setSelectedRows(selectAll ? [] : data.map((res, index) => index));
  };

  const toggleRowSelection = (index, checked) => {
    const selectedIndex = selectedRows.indexOf(index);
    data[index].selected = checked;
    let changeData = allData.map((e) => {
      if (e.id === data[index].id) {
        e.selected = checked;
      }
      return e;
    });
    setAllData(changeData);

    let newSelectedRows = [];

    if (selectedIndex === -1) {
      newSelectedRows = [...selectedRows, index];
    } else {
      newSelectedRows = [
        ...selectedRows.slice(0, selectedIndex),
        ...selectedRows.slice(selectedIndex + 1),
      ];
    }

    setSelectedRows(newSelectedRows);
    setSelectAll(newSelectedRows.length === data.length);
  };

  const deleteSelectedRows = async () => {
    if (selectedRows.length > 0) {
      setDeleteConfirmationModal(true);
    } else {
      // Add any other logic or feedback message here when no checkboxes are selected
      window.alert("No rows selected for deletion");
    }
  };

  const confirmDelete = async () => {
    const deletedRows = [];
    setLoader(true);
    for (const obj of allData) {
      if (obj.selected) {
        const documentId = obj.id;
        await deleteDocument("Users", documentId);

        // Remove the deleted user's ID from matches of other users
        for (const otherUser of allData) {
          if (otherUser.id !== documentId && otherUser.matches) {
            // Remove the ID from matches array
            otherUser.matches = otherUser.matches.filter(
              (matchId) => matchId !== documentId
            );

            // Update the matches in Firestore
            await updateMatchesInFirestore(otherUser.id, otherUser.matches);
          }
        }
      }
    }

    setSelectAll(false);
    setSelectedRows([]);
    setDeleteConfirmationModal(false);
    getEvent();
    setLoader(false);
  };

  const updateMatchesInFirestore = async (userId, matches) => {
    // Update the matches field in Firestore
    await updateDocument("users", userId, { matches: matches });
  };

  const cancelDelete = () => {
    setDeleteConfirmationModal(false);
  };

  const handlePageChange = ({ selected }) => {
    setCount(count + 1);
    setCurrentPage(selected);
    console.log(selected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    console.log(newPage);
    paginate(allData, newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));

    setPage(0);
  };
  function deleteData(data) {
    console.log(data);
  }
  return (
    <>
      <Box>
        {/* <button onClick={deletedevicedata}>okok</button> */}
        <div className={`d-flex ${Style.heading_section}`}>
          <h2>Home Automation Management</h2>
          <div className={`d-flex gap-4`}>
            <div className="">
              <input
                type="search"
                placeholder="Search"
                className={`px-3 ${Style.searchbar}`}
                // value={searchInput}
                onChange={(e) => filterData(e.target.value)}
              />
            </div>
            <div>
              <button
                type="button"
                class="btn btn-outline-light"
                className={`${Style.delete_button} ${Style.no_style} 
                  `}
                onClick={deleteSelectedRows}
              >
                <MdDelete style={{ color: "black" }} />
              </button>
            </div>
          </div>
        </div>
      </Box>

      <Box sx={{ m: 2 }} className={`${Style.border_1}`}>
        <Table responsive bordered size="lg" className="mb-0">
          <thead style={{ borderBottom: "1px solid lightgray" }}>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Created At</th>
              <th>Phone No.</th>
              {/* <th>Device Id</th> */}
              <th>Address</th>
              <th>Details</th>
              {/* <th>Matches</th> */}
            </tr>
          </thead>

          <tbody>
            {data?.map((res, index) => (
              <tr key={index}>
                <th className="d-flex gap-2">
                  <div className="form-check">
                    <input
                      style={{
                        border: "none",
                        boxShadow: "inset 1px 1px 8px #e1e1e1",
                      }}
                      className="form-check-input"
                      type="checkbox"
                      checked={res?.selected}
                      onChange={(e) =>
                        toggleRowSelection(index, e.target.checked)
                      }
                    />
                    <label
                      className="form-check-label"
                      htmlFor={`checkbox-${index}`}
                    ></label>
                  </div>
                  {res?.Name}
                </th>

                <td>{res?.EmailId}</td>
                <td>
                  {res?.created_at &&
                    res.created_at.toDate().toLocaleDateString()}
                </td>
                <td>{res?.PhoneNo}</td>

                {/* <td>
                  <DropdownWithEditDelete
                    initialNames={res?.deviceid}
                    docId={res?.id}
                    onNamesChange={updateDeviceIdInFirebase}
                  />
                </td> */}

                <td>{res.Address ? res?.Address : "null"}</td>

                <td>
                  {
                    <button
                      onClick={() => {
                        viewmore(res);
                      }}
                      // className={`${Style.view_more} ${Style.no_style}`}
                      className="btn btn-outline-dark"
                    >
                      view
                    </button>
                  }
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Box>

      <Modal
        size="xl"
        isOpen={modalviewmore}
        toggle={() => viewmore()}
        className={`${Style.modal_main} px-3`}
      >
        {/* ... (your existing modal code) */}

        <div className={`p-3`}>
          <div className={`${Style.header_of_modal} `}>
            <div className={`${Style.header_data}`}>
              <div></div>
              <div
                className={`${Style.cross_button}`}
                onClick={() => {
                  viewmore();
                  getEvent();
                }}
              >
                <Close />
              </div>
            </div>
          </div>

          <FormGroup className="d-flex flex-row">
            {/* <div
              className={`d-flex flex-column overflow-auto custom_scrollbar w-50 ${Style.userlisting}`}
            >
              <div className={`${Style.header_text}`}>Subscription Details</div>

              <Box sx={{ m: 1 }} className={`${Style.border - 1}`}>
                <Table hover responsive size="lg">
                  <thead style={{ borderBottom: "1px solid lightgray" }}>
                    <tr>
                      <th>Subscription Type</th>
                      <th>Subscription Status</th>
                    </tr>
                  </thead>

                  <tbody>
                    {subscriptionItems.map((item) => (
                      <tr key={item.key}>
                        <th className="text_cap">{item.label}</th>
                        <td>
                          <div className="form-check form-switch">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              role="switch"
                              checked={subscriptionStates?.[item.key]} // Use the state for toggling
                              onChange={(e) =>
                                handleSubscriptionChange(
                                  item.key,
                                  e.target.checked,
                                  storeData[0]?.id
                                )
                              }
                            />
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Box>
            </div> */}

            <div
              className={`d-flex flex-column overflow-auto custom_scrollbar w-100 ${Style.userlisting}`}
            >
              <div className={`${Style.header_text}`}>Device Details</div>
              <Box sx={{ m: 1 }} className={`${Style.border - 1}`}>
                <Table hover responsive size="lg">
                  <thead style={{ borderBottom: "1px solid lightgray" }}>
                    <tr>
                      <th>Switch Name</th>
                      <th>Device Type</th>
                      <th>Device Id</th>
                      <th>Room Name</th>
                      <th></th>
                    </tr>
                  </thead>

                  <tbody>
                    {storeData[0] && storeData[0].deviceList.length > 0 ? (
                      storeData[0].deviceList.map(
                        (res, index) =>
                          res.switches &&
                          res.switches.map((resa, innerIndex) => (
                            <tr key={innerIndex}>
                              <th className="text_cap">{resa.switchName}</th>
                              <td>
                                {resa.switchType ? resa.switchType : "null"}
                              </td>
                              <td>{res.deviceId}</td>
                              <td>{res.roomName}</td>
                              <td>
                                <ConfirmModal
                                  data={{ allData: storeData[0], res: res }}
                                  onsubmit={deletedevicedata}
                                  display={"user"}
                                >
                                  <button
                                    type="button"
                                    className={`btn btn-outline-light ${Style.delete_button} ${Style.no_style}`}
                                  >
                                    <RiDeleteBin5Line
                                      style={{ color: "black" }}
                                    />
                                  </button>
                                </ConfirmModal>
                              </td>
                            </tr>
                          ))
                      )
                    ) : (
                      <tr>
                        <td colSpan="5" className="text-center h-100">
                          <h1>No data found</h1>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </Table>
              </Box>
            </div>
          </FormGroup>
        </div>
      </Modal>

      <Modal
        className={``}
        isOpen={deleteConfirmationModal}
        toggle={cancelDelete}
      >
        <Backdrop
          sx={{ color: "pink", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loader}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
        <div className={`p-3 ${Style.modal_content_1}`}>
          <div>
            <div className={`${Style.delete_modal_text}`}>
              Are you sure you want to delete the selected User ?
            </div>
            <div className={`${Style.delete_modal_text_1}`}>
              This will delete this User permanently, you cannot undo this
              action
            </div>
          </div>

          <div className={`${Style.delete_buttons_section}`}>
            <div
              // className={`${Style.cancel_button_of_delete_section}`}
              className="btn btn-outline-dark"
              onClick={cancelDelete}
            >
              Cancel
            </div>
            <div
              // className={`${Style.delete_button_of_delete_section}`}
              className="btn btn-outline-dark"
              onClick={confirmDelete}
            >
              Delete
            </div>
          </div>
        </div>
      </Modal>

      <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
        <TablePagination
          component="div"
          count={allData.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Box>
    </>
  );
};

export default HomeAutomation;
