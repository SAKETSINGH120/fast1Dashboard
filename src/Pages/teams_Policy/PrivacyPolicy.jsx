import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./PrivacyPolicy.css";
import { addPolicy, getPolicy } from "../../Components/service/admin";
import { loader } from "../../utils";
const PrivacyPolicy = () => {
  const [value, setValue] = useState("");
  const [message, setMessage] = useState("");

  const handleUpdate = async () => {
    // Handle the update logic here (e.g., API call)
    try {
      loader.start();
      let response = await addPolicy({
        description: value,
      }).then((res) => {
        return res.data.data;
      });

      setMessage("Privacy and Policy updated successfully!");
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
      let response = await getPolicy().then((res) => {
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
      <h2 className="title">Update Privacy and Policy</h2>
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

export default PrivacyPolicy;
