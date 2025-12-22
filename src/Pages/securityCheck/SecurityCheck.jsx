import React, { useState, useEffect } from "react";
import {
  updateSecurityStatus,
  getSecurityStatus,
} from "../../Components/service/admin";
import { snackbar, loader } from "../../utils";
import Snackbar from "../../Components/Snackbar/Snackbar";
import { Modal } from "reactstrap";

const SecurityCheck = () => {
  const [selected, setSelected] = useState("Secondary");
  const [loading, setLoading] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  const fetchCurrentStatus = async () => {
    try {
      setInitialLoading(true);
      const response = await getSecurityStatus();
      console.log("response", response);
      if (response?.data?.data?.status) {
        setSelected(response.data?.data?.status);
      }
    } catch (error) {
      console.log(error);
      snackbar.error("Failed to fetch current security status");
    } finally {
      setInitialLoading(false);
    }
  };

  useEffect(() => {
    fetchCurrentStatus();
  }, []);

  const handleRadioChange = (e) => {
    setSelected(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowConfirm(true);
  };

  const handleConfirm = async () => {
    setLoading(true);
    try {
      await updateSecurityStatus({ status: selected });
      fetchCurrentStatus();
      snackbar.success("Security status updated successfully!");
    } catch (err) {
      snackbar.error("Failed to update security status!");
    }
    setLoading(false);
    setShowConfirm(false);
  };

  return (
    <>
      <div style={{ padding: "2rem" }}>
        <div style={{ maxWidth: "500px", margin: "0 auto" }}>
          <div
            style={{
              background: "#fff",
              borderRadius: "8px",
              padding: "2rem",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
              border: "1px solid #ddd",
            }}
          >
            <h3
              style={{
                textAlign: "center",
                marginBottom: "2rem",
                color: "#333",
              }}
            >
              Security Management
            </h3>

            <div style={{ marginBottom: "2rem" }}>
              <label
                style={{
                  display: "block",
                  marginBottom: "1rem",
                  fontWeight: "bold",
                  marginLeft: "1rem",
                }}
              >
                Select Security Level:
              </label>
              <div
                style={{
                  display: "flex",
                  gap: "2rem",
                  justifyContent: "center",
                }}
              >
                <label
                  style={{
                    display: "flex",
                    alignItems: "center",
                    cursor: "pointer",
                  }}
                >
                  <input
                    type="radio"
                    name="securityLevel"
                    value="Primary"
                    checked={selected === "Primary"}
                    onChange={handleRadioChange}
                    disabled={loading || initialLoading}
                    style={{ marginRight: "0.5rem" }}
                  />
                  <span>Primary</span>
                </label>
                <label
                  style={{
                    display: "flex",
                    alignItems: "center",
                    cursor: "pointer",
                  }}
                >
                  <input
                    type="radio"
                    name="securityLevel"
                    value="Secondary"
                    checked={selected === "Secondary"}
                    onChange={handleRadioChange}
                    disabled={loading || initialLoading}
                    style={{ marginRight: "0.5rem" }}
                  />
                  <span>Secondary</span>
                </label>
              </div>
              <div
                style={{
                  textAlign: "center",
                  marginTop: "1rem",
                  fontSize: "14px",
                  color: "#666",
                }}
              >
                {initialLoading ? (
                  "Loading current status..."
                ) : (
                  <>
                    Current selection: <strong>{selected}</strong>
                  </>
                )}
              </div>
            </div>

            <div style={{ textAlign: "center" }}>
              <button
                onClick={handleSubmit}
                disabled={loading || initialLoading}
                style={{
                  background: "#007bff",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  padding: "0.75rem 2rem",
                  fontSize: "16px",
                  fontWeight: "600",
                  cursor: loading || initialLoading ? "not-allowed" : "pointer",
                  opacity: loading || initialLoading ? 0.7 : 1,
                }}
              >
                {loading ? "Updating..." : "Update Security Status"}
              </button>
            </div>
          </div>
        </div>
      </div>

      <Modal isOpen={showConfirm} centered>
        <div style={{ padding: "1.5rem" }}>
          <h5 style={{ marginBottom: "1rem", color: "#333" }}>
            Confirm Update
          </h5>
          <p style={{ marginBottom: "1.5rem", color: "#666" }}>
            Are you sure you want to update security status to{" "}
            <strong>{selected}</strong>?
          </p>
          <div
            style={{
              display: "flex",
              gap: "0.5rem",
              justifyContent: "flex-end",
            }}
          >
            <button
              onClick={() => setShowConfirm(false)}
              style={{
                background: "#6c757d",
                color: "#fff",
                border: "none",
                borderRadius: "4px",
                padding: "0.5rem 1rem",
                cursor: "pointer",
              }}
            >
              Cancel
            </button>
            <button
              onClick={handleConfirm}
              disabled={loading}
              style={{
                background: "#007bff",
                color: "#fff",
                border: "none",
                borderRadius: "4px",
                padding: "0.5rem 1rem",
                cursor: loading ? "not-allowed" : "pointer",
                opacity: loading ? 0.7 : 1,
              }}
            >
              {loading ? "Updating..." : "Confirm"}
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default SecurityCheck;
