import React, { useEffect, useState } from "react";
import { IoArrowBack } from "react-icons/io5";
import { useNavigate, useParams } from "react-router-dom";
// import Loader from "../../../Compunents/Loader/Loader";
import style from "./style.module.css";
import { FaCamera } from "react-icons/fa";
import { Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";
import { IoIosArrowForward } from "react-icons/io";
import ChannelEdit from "./ChannelEdit";

// import DocumentsEdit from "./DocumentsEdit";
import { useMediaQuery } from "@mui/material";
import { deleteDocs, getChannelById, updateChannelById, uploadDocs } from "../service/admin";
import { loader, snackbar } from "../../utils";

export default function ViewChannelData() {
  let { id } = useParams();
  const navigate = useNavigate();
  const matches = useMediaQuery("(min-width:768px)");
  const [imgUrl, setImgUrl] = useState("");
  const [imgName, setImgName] = useState("");
  const [activeTab, toggleTab] = useState("0");
  const [showData, setShowData] = useState({
    name: "",
    email: "",
  });


  function setError(message) {
    snackbar.error(message);
  }
  function setSuccess(message) {
    snackbar.success(message);
  }

  async function changeProfileImg(e) {
    let file = e.target.files[0];
    const formData = new FormData();
    formData.append("upload", file);
    loader.start()
    try {
      if (imgUrl !== "") {
        await deleteDocs([imgName]);
      }
      let res = await uploadDocs(formData);
      await submitData(res.data.data[0]);
      setSuccess("Logo updated successfully")

    } catch (err) {
      console.log(err);
      setError("There are some problem please try again")
      return;
    } finally {
      loader.stop();
    }
  }

  const [formData, setFormData] = useState({});

  async function submitData(logo) {
    let payload = {
      ...formData,
      //  user_id: "123",
      //  user_name: "123",
      //  user_role: "123",
      logo: logo,
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
      await getAllChannels()
    } catch (err) {
      console.log(err);
      return;
    } finally {
      loader.stop()
    }
  }


  const getAllChannels = async () => {
    loader.start()
    try {
      const res = await getChannelById(id);
      setFormData(res.data.data[0]);
      setImgUrl(res?.data.data[0].logo?.file_url);
      setImgName(res?.data.data[0].logo?.file_name);
      return res.data.data[0];
    } catch (err) {
      console.error(err);
    } finally {
      loader.stop()
    }
  };

  return (
    <>
      <button
        className="btn ps-0 d-flex align-items-center"
        onClick={() => navigate("/channel")}
      >
        <IoArrowBack className="me-1" /> Back
      </button>
      <div className="mt-4">
        <div className="d-flex align-items-center">
          <div className="p-relative">
            <div className={`${style.profileContainer}`}>
              <img
                src={imgUrl == "" ? "/images/maleProfile.jpg" : imgUrl}
                className="w-100 h-100"
              />
            </div>
            <label className={style.camera} htmlFor="profileChange">
              <FaCamera className="text-white f-13" />
            </label>
            <input
              type="file"
              hidden
              id="profileChange"
              onChange={changeProfileImg}
            />
          </div>
          <div className="d-flex flex-column ms-md-4 ms-sm-3 ms-3">
            <div className="fs-md-3 fs-sm-4 fs-5 fw-bold pt-3 text-secondary text-capitalize">
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
                className={`text-secondary fw-bold ${activeTab == "0"
                  ? true
                    ? "activeTab2"
                    : "activeTab text-white "
                  : ""
                  } ${true ? "px-2" : "rounded ps-4 mt-2 py-2"} pointer`}
                onClick={() => toggleTab("0")}
              >
                <div className="d-flex justify-content-between align-items-center">
                  <div className='text-black'>Channel Details</div>{" "}
                </div>
              </NavLink>
            </NavItem>
            {/* <NavItem>
              <NavLink
                className={`text-secondary fw-bold ${
                  activeTab == "1"
                    ? !matches
                      ? "activeTab2"
                      : "activeTab text-white "
                    : ""
                } ${!matches ? "px-2" : "rounded ps-4 mt-2 py-2"} pointer`}
                onClick={() => toggleTab("1")}
              >
                <div className="d-flex justify-content-between align-items-center">
                  <div>Documents</div>{" "}
                  <IoIosArrowForward className="fw-600 d-md-block d-sm-none d-none" />
                </div>
              </NavLink>
            </NavItem> */}
            {/* <NavItem>
                            <NavLink
                                className={`text-secondary fw-bold ${activeTab == "2" ? !matches?'activeTab2':'activeTab text-white ' : ""} ${!matches?'px-2':'rounded ps-4 mt-2 py-2'} pointer`}
                                onClick={() => toggleTab("2")}>
                                <div className='d-flex justify-content-between align-items-center'><div>Package Details</div> <IoIosArrowForward className='fw-600 d-md-block d-sm-none d-none' /></div>
                            </NavLink>
                        </NavItem> */}
          </Nav>
        </div>
        <div className={`${style.right}`}>
          <TabContent
            className="px-md-3 px-sm-2 px-1 pt-md-4 pt-sm-4 pt-3"
            activeTab={activeTab}
          >
            <TabPane tabId="0">
              <ChannelEdit
                imgUrl={imgUrl}
                getUserData={getAllChannels}
                activeTab={activeTab}
              />
            </TabPane>
            {/* <TabPane tabId="1">
              <DocumentsEdit setLoader={setLoader} activeTab={activeTab} />
            </TabPane> */}
            {/* <TabPane tabId="2">
                        </TabPane> */}
          </TabContent>
        </div>
      </div>
    </>
  );
}
