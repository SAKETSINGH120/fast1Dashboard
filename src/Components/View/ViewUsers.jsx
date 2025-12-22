import React, { useEffect, useState } from "react";
import { IoArrowBack } from "react-icons/io5";
import { useNavigate, useParams } from "react-router-dom";
// import Loader from "../../../Compunents/Loader/Loader";
import style from "./style.module.css";
import { FaCamera } from "react-icons/fa";
import { Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";
import { IoIosArrowForward } from "react-icons/io";
import ProfileEdit from "./ProfileEdit";
import { deleteImage } from "../../Firebase/cloudStorage/UploadImage";
import { updateDocument } from "../../Firebase/cloudFirestore/updateData";
// import Snakbar from "../../../Compunents/Snackbar/Snakbar";
import { getDocumentData } from "../../Firebase/cloudFirestore/getData";
import SubscribersMangement from "./SubscribersMangement";
// import DocumentsEdit from "./DocumentsEdit";
import { useMediaQuery } from "@mui/material";
import { getSubscriberByNumber } from "../service/admin";

export default function ViewUsers() {
  let { id } = useParams();
  const navigate = useNavigate();
  const matches = useMediaQuery("(min-width:768px)");
  const [imgUrl, setImgUrl] = useState("");
  const [loader, setLoader] = useState(true);
  const [activeTab, toggleTab] = useState("0");
  const [userData, setUserData] = useState({});
  const [showData, setShowData] = useState({
    name: "",
    email: "",
  });

  async function getSubcriber() {
    try {
      let userdetails = await getSubscriberByNumber({ mobile_number: id }).then(
        (res) => {
          return res.data.data;
        }
      );
      setUserData(userdetails);
      return userdetails;
    } catch (error) {
      console.log(error);
    } finally {
    }
  }
  const [snackbar, showSnackbar] = useState({
    show: false,
    msg: "data added",
    type: "error",
  });

  async function changeProfileImg(e) {
    let file = e.target.files[0];
    setLoader(true);
    try {
      if (imgUrl !== "") {
        await deleteImage(imgUrl);
      }
      let res = "a";
      await updateDocument("users", id, { profileImage: res });
      showSnackbar({
        show: true,
        msg: "Profile image updated successfully",
        type: "success",
      });
    } catch (err) {
      console.log(err);
      showSnackbar({
        show: true,
        msg: "There are some problem please try again",
        type: "error",
      });
      return;
    } finally {
      await getSubcriber();
      setLoader(false);
    }
  }

  // async function getUserData() {
  //   setLoader(true);
  //   let response = {};
  //   try {
  //     let res = await getDocumentData("Users", id);
  //     console.log("this is response", res);
  //     setUserData(res);
  //     response = res;
  //     setImgUrl(res?.ProfilePicUrl);
  //     let pData = {
  //       name: res?.Name,
  //       email: res?.EmailId,
  //     };
  //     setShowData(pData);
  //   } catch (err) {
  //     console.log(err);
  //   } finally {
  //     setLoader(false);
  //   }
  //   return response;
  // }

  useEffect(() => {
    getSubcriber();
  }, []); // Empty array ensures this runs only once after the initial render

  return (
    <>
      {/* <Loader open={loader} /> */}
      {/* <Snakbar data={snackbar} setData={showSnackbar} /> */}
      <button
        className="btn ps-0 d-flex align-items-center"
        onClick={() => navigate("/userlisting")}
      >
        <IoArrowBack className="me-1" /> Back
      </button>
      <div className="mt-4">
        <div className="d-flex align-items-center">
          <div className="p-relative">
            <div className={`${style.profileContainer}`}>
              <img
                src={imgUrl == "" ? "/images/maleProfile.png" : imgUrl}
                className="w-100 h-100"
              />
            </div>
            {/* <label className={style.camera} htmlFor="profileChange">
              <FaCamera className="text-white f-13" />
            </label>
            <input
              type="file"
              hidden
              id="profileChange"
              onChange={changeProfileImg}
            /> */}
          </div>
          <div className="d-flex flex-column ms-md-4 ms-sm-3 ms-3">
            <div className="fs-md-3 fs-sm-4 fs-5 fw-bold pt-3 text-black text-capitalize">
              {showData?.name}
            </div>
            <div className="text-gray ms-1">{showData?.email}</div>
          </div>
        </div>
      </div>
      <div className={`mt-4 ${style.tabContainer}`}>
        <div className={`${style.left}`}>
          <Nav
            vertical={false}
            className={`${true ? "border-bottom flex flex-nowrap" : ""}`}
          >
            <NavItem>
              <NavLink
                className={`text-secondary fw-bold ${
                  activeTab == "0"
                    ? true
                      ? "activeTab2 text-black"
                      : "activeTab text-black"
                    : ""
                } ${true ? "px-2" : "rounded ps-4 mt-2 py-2"} pointer`}
                onClick={() => toggleTab("0")}
              >
                <div className="d-flex justify-content-between align-items-center">
                  <div>Profile</div>{" "}
                  {/* <IoIosArrowForward className="fw-600 d-md-block d-sm-none d-none" /> */}
                </div>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={`text-secondary fw-bold ${
                  activeTab == "1"
                    ? true
                      ? "activeTab2 text-black"
                      : "activeTab text-black"
                    : ""
                } ${true ? "px-2" : "rounded ps-4 mt-2 py-2"} pointer`}
                onClick={() => toggleTab("1")}
              >
                <div className="d-flex justify-content-between align-items-center">
                  <div>Subscription Management</div>{" "}
                  {/* <IoIosArrowForward className="fw-600 d-md-block d-sm-none d-none" /> */}
                </div>
              </NavLink>
            </NavItem>
          </Nav>
        </div>
        <div className={`${style.right}`}>
          <TabContent
            className="px-md-3 px-sm-2 px-1 pt-md-4 pt-sm-4 pt-3"
            activeTab={activeTab}
          >
            <TabPane tabId="0">
              <ProfileEdit
                setLoader={setLoader}
                getUserData={getSubcriber}
                activeTab={activeTab}
              />
            </TabPane>
            <TabPane tabId="1">
              <SubscribersMangement
                setLoader={setLoader}
                data={userData.subscription_management}
                userData={userData}
                activeTab={activeTab}
              />
            </TabPane>
          </TabContent>
        </div>
      </div>
    </>
  );
}
