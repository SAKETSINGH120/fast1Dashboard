import React, { useEffect, useState } from "react";
import {
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import TableContainer from "../TableContainer/TableContainer";

import Style from "./style.module.css";

import {
  Backdrop,
  Box,
  CircularProgress,
  FormGroup,
  TablePagination,
} from "@mui/material";

import {
  getCollectionData,
  getDocumentData,
} from "../../Firebase/cloudFirestore/getData";

import { updateDocument } from "../../Firebase/cloudFirestore/updateData";
import { useNavigate, useParams } from "react-router-dom";
import {
  getSubscriberByNumber,
  setSubscriptionManagement,
} from "../service/admin";

const SubscribersMangement = ({ data, userData }) => {
  const { id } = useParams();
  console.log(data, "data");
  const [subscriptionStates, setSubscriptionStates] = useState({
    home_automation_subscription: data?.home_automation_subscription || false,
    free_tv: data?.free_tv || false,
    ziggTv_subscription: data?.ziggTv_subscription || false,
    CCTV_aubscription: data?.CCTV_aubscription || false,
    broadband_subscription: data?.broadband_subscription || false,
  }); // Manage toggle states

  const navigate = useNavigate();

  const subscriptionItems = [
    {
      label: "Home Automation Subscription",
      key: "home_automation_subscription",
    },
    { label: "Free TV", key: "free_tv" },
    { label: "Zigg Tv Subscription", key: "ziggTv_subscription" },
    { label: "CCTV Subscription", key: "CCTV_aubscription" },
    { label: "Broadband Subscription", key: "broadband_subscription" },
  ];

  const handleSubscriptionChange = async (key, checked) => {
    setSubscriptionStates((prevState) => ({
      ...prevState,
      [key]: checked,
    }));
    let infoData = {
      ...subscriptionStates,
      [key]: checked,
    };
    try {
      await setSubscriptionManagement(userData._id, {
        subscription_management: infoData,
      });
      console.log(`Updated ${key} to ${checked}`, infoData);
    } catch (err) {
      console.error("Error updating subscription:", err);
    }
  };

  useEffect(() => {
    setSubscriptionStates({
      home_automation_subscription: data?.home_automation_subscription || false,
      free_tv: data?.free_tv || false,
      ziggTv_subscription: data?.ziggTv_subscription || false,
      CCTV_aubscription: data?.CCTV_aubscription || false,
      broadband_subscription: data?.broadband_subscription || false,
    });
  }, [data]);
  // const [userInfo, setUserInfo] = useState();
  // async function getSubcriber() {
  //   try {
  //     let userdetails = await getSubscriberByNumber({ mobile_number: id }).then(
  //       (res) => {
  //         return res.data.data;
  //       }
  //     );
  //     setUserInfo(userdetails);
  //   } catch (error) {
  //     console.log(error);
  //   } finally {
  //   }
  // }
  return (
    <>
      <div className="">
        <div className={`p-3`}>
          <FormGroup className="d-flex flex-row">
            <div
              className={`d-flex flex-column overflow-auto custom_scrollbar w-100`}
            >
              <div className="fs-5 fw-600 text-black">Subscription Details</div>

              <Box sx={{ m: 1 }} className="">
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Subscription Type</TableCell>
                      <TableCell>Subscription Status</TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {subscriptionItems.map((item) => (
                      <TableRow key={item.key}>
                        <TableCell className="text_cap">{item.label}</TableCell>
                        <TableCell>
                          <div className="form-check form-switch">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              role="switch"
                              checked={!!subscriptionStates[item.key]}
                              // checked={true}
                              onChange={(e) =>
                                handleSubscriptionChange(
                                  item.key,
                                  e.target.checked
                                )
                              }
                            />
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
            </div>
          </FormGroup>
        </div>
      </div>
    </>
  );
};

export default SubscribersMangement;
