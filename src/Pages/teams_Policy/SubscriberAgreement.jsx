import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./PrivacyPolicy.css";
import {
  addPolicy,
  addSubscriberAgreement,
  getPolicy,
  getSubscriberAgreement,
} from "../../Components/service/admin";
import { loader } from "../../utils";
const SubscriberAgreemnt = () => {
  const [value, setValue] = useState("");
  const [message, setMessage] = useState("");

  const handleUpdate = async () => {
    // Handle the update logic here (e.g., API call)
    try {
      loader.start();
      let response = await addSubscriberAgreement({
        description: value,
      }).then((res) => {
        return res.data.data;
      });

      setMessage("Subscriber Agreement updated successfully!");
      setTimeout(() => {
        setMessage("");
      }, 4000);
    } catch (err) {
      console.log(err);
    }
    loader.stop();
  };

  const getInfo = async () => {
    try {
      loader.start();
      let response = await getSubscriberAgreement().then((res) => {
        return res.data.data;
      });

      setValue(response.description);
    } catch (err) {
      console.log(err);
    }
    loader.stop();
  };
  useEffect(() => {
    getInfo();
  }, []);
  return (
    <div className="privacy-policy-container">
      <h2 className="title">Update Subscriber Agreement</h2>
      <div className="editor-container">
        <ReactQuill
          theme="snow"
          value={value}
          onChange={setValue}
          className="editor"
        />
      </div>
      <div className="button-con">
        <button onClick={() => handleUpdate()} className="btn btn-primary">
          Update
        </button>
      </div>
      {message && <p className="success-message">{message}</p>}
    </div>
  );
};

export default SubscriberAgreemnt;
