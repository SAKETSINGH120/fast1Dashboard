import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ConfirmModal } from "../ConfirmModal/ConfirmModal";
import {
  deleteSubscriber,
  deleteSubscriberById,
  deleteUser,
  getAllPlans,
  getPlans,
  updatePackageinSubcriber,
  addSubscription,
} from "../service/admin";
import { loader, snackbar } from "../../utils";
import moment from "moment";
export default function ProfileEdit({ setLoader, getUserData, activeTab }) {
  let { id } = useParams();
  const navigate = useNavigate();
  const [isEdit, setIsEdit] = useState(true);
  const [formData, setFormData] = useState({});
  const [allPlan, setAllPlan] = useState([]);
  const [selectedPackage, setSelectedPackage] = useState("");
  const [userInfo, setUserInfo] = useState();

  async function getAllPackages() {
    try {
      let res = await getPlans();
      setAllPlan(res?.data?.data || []);
    } catch (error) {
      console.log(error);
    } finally {
    }
  }

  async function assignPackage() {
    loader.start();
    try {
      if (selectedPackage && selectedPackage.trim().length !== 0) {
        let payload = {
          subscriberId: formData?.subscriber_id || formData?._id,
          planId: selectedPackage,
        };

        let res = await addSubscription(payload);
        snackbar.success("Plan assigned successfully");
        getUserDataInner();
      } else {
        snackbar.error("Please select a plan");
      }
    } catch (error) {
      console.log(error);
      snackbar.error("Failed to assign plan");
    } finally {
      loader.stop();
    }
  }

  const [data, setData] = useState({});

  async function getUserDataInner() {
    setLoader(true);
    try {
      let userdetails = await getUserData();
      setFormData(userdetails);
      setData(userdetails);
      setUserInfo(userdetails);
      let res = await getPlans();
      setAllPlan(res?.data?.data || []);
      if (
        userdetails?.package_details &&
        userdetails?.package_details?.package_id
      ) {
        setSelectedPackage(userdetails?.package_details?.package_id);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoader(false);
    }
  }
  useEffect(() => {
    if (activeTab == 0) {
      getAllPackages();
      getUserDataInner();
    }
  }, [activeTab]);

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

  const DeleteUser = async (e) => {
    try {
      setLoader(true);
      await deleteSubscriberById(formData?._id);
      snackbar.success(`${formData?.name} deleted successfully.`);
      navigate("/userlisting");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {/* <Snakbar data={snackbar} setData={showSnackbar} /> */}
      <div className="">
        <div className="d-flex justify-content-between align-items-center">
          <div className="fs-5 fw-600 text-black">Profile Details</div>{" "}
          <span>
            {" "}
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => assignPackage()}
            >
              Assign Package
            </button>
          </span>
          {/* <button
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
          </button> */}
        </div>
        <form
          className="w-100"
          // onSubmit={handleSubmit(submitData)}
        >
          <div className="row mt-4">
            <div className="col-md-6 col-sm-6 col-12 mt-3">
              <label className="form-label mb-1">Name</label>
              <input
                className="form-control"
                placeholder="Enter business owner name"
                required
                disabled={isEdit}
                name="owner_name"
                value={formData?.name || ""}
                onChange={handleInput}
              />
            </div>

            <div className="col-md-6 col-sm-6 col-12 mt-3">
              <label className="form-label mb-1">Phone Number</label>
              <input
                type="number"
                className="form-control"
                placeholder="Enter phone number"
                required
                disabled={isEdit}
                name="phoneNumber"
                value={formData?.mobile_number || ""}
                onChange={handleInput}
                onInput={(e) => (e.target.value = e.target.value.slice(0, 10))}
              />
            </div>
            <div className="col-md-6 col-sm-6 col-12 mt-3">
              <label className="form-label mb-1">Email Address</label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter email address"
                required
                disabled={isEdit}
                name="email"
                value={formData?.email || ""}
                onChange={handleInput}
              />
            </div>
            <div className="col-md-6 col-sm-6 col-12 mt-3">
              <label className="form-label mb-1">Created At</label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter email address"
                required
                disabled={isEdit}
                name="email"
                value={
                  formData?.createdAt
                    ? moment(formData.createdAt).format("DD-MM-YYYY hh:mm A")
                    : ""
                }
                onChange={handleInput}
              />
            </div>

            <div className="col-md-12 mt-3">
              <label className="form-label mb-1">Address</label>
              <textarea
                rows="4"
                className="form-control"
                placeholder="Enter full address"
                required
                disabled={isEdit}
                name="address"
                value={formData?.Address ? formData?.Address : "N/A"}
                onChange={handleInput}
              />
            </div>
            <div className="col-md-12 mt-3">
              <label className="form-label mb-1">Assign Package</label>
              <select
                className="form-control"
                // disabled={isEdit}
                value={selectedPackage}
                onChange={(e) => setSelectedPackage(e.target.value)}
              >
                <option value="">Select Package</option>
                {allPlan.map((pkg, index) => (
                  <option key={index} value={pkg._id}>
                    {pkg.name}
                  </option>
                ))}
              </select>
            </div>
            <ConfirmModal data={id} onsubmit={DeleteUser} display={"user"}>
              <div className="mt-4">
                <button type="button" className="btn btn-primary">
                  Delete User
                </button>
              </div>
            </ConfirmModal>

            {isEdit ? (
              ""
            ) : (
              <div className="d-flex justify-content-end gap-3 mt-4">
                <button className="btn btn-primary">Submit</button>
              </div>
            )}
          </div>
        </form>

        <div className="w-100">
          <div className="d-flex flex-column"></div>
        </div>
      </div>
    </>
  );
}
