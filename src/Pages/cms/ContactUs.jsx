import React, { useState } from "react";

const ContactUs = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    mobile: "",
    message: "",
    inquiryType: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can add form submission logic here
    alert("Thank you for your feedback!");
    setForm({ name: "", email: "", mobile: "", message: "", inquiryType: "" });
  };

  return (
    <div
      style={{
        maxWidth: 900,
        margin: "40px auto",
        padding: 24,
        background: "#fff",
        borderRadius: 8,
        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
      }}
    >
      <h1 style={{ textAlign: "center", color: "#1a237e", marginBottom: 24 }}>
        Contact Us
      </h1>
      <p style={{ fontSize: 18, lineHeight: 1.7, color: "#333" }}>
        Have a question, feedback, or business inquiry? We’d love to hear from
        you.
      </p>
      <div
        style={{ display: "flex", flexWrap: "wrap", gap: 32, marginBottom: 32 }}
      >
        <div style={{ flex: 1, minWidth: 260 }}>
          <h2 style={{ color: "#3949ab" }}>Head Office</h2>
          <div>
            Magnificent Infotech Pvt. Ltd.
            <br />
            1st Floor, Near PCSD School Market,
            <br />
            Gigal Devi, Hospital Road,
            <br />
            Hansi, Hissar, Haryana – 125033
          </div>
          <h2 style={{ color: "#3949ab", marginTop: 24 }}>Branch Office</h2>
          <div>
            G-137, Top Floor, Vikaspuri,
            <br />
            New Delhi – 110018
          </div>
          <div style={{ marginTop: 16 }}>
            <b>Phone:</b> 011-45108349
            <br />
            <b>Email:</b> <a href="mailto:info@fast1.app">info@fast1.app</a>
          </div>
        </div>
        <div style={{ flex: 1, minWidth: 260 }}>
          <h2 style={{ color: "#3949ab" }}>Support & Help</h2>
          <div>
            Experiencing issues with streaming or your account? We’re here to
            help.
          </div>
          <ul style={{ margin: "8px 0 0 16px" }}>
            <li>Live Chat: Available in-app and on our website</li>
            <li>
              Support Email: <a href="mailto:info@fast1.app">info@fast1.app</a>
            </li>
            <li>Support Hours: 9:00 AM – 9:00 PM IST, 7 days a week</li>
          </ul>
          <h2 style={{ color: "#3949ab", marginTop: 24 }}>
            Business & Media Inquiries
          </h2>
          <div>
            Interested in partnerships, advertising, or content licensing?
          </div>
          <div>
            Email: <a href="mailto:advt@fast1.app">advt@fast1.app</a>
          </div>
        </div>
      </div>
      <div style={{ marginBottom: 32 }}>
        <h2 style={{ color: "#3949ab" }}>Feedback & Suggestions</h2>
        <div>
          We value your input. Share your thoughts or suggestions to help us
          improve your streaming experience.
        </div>
      </div>
      <form onSubmit={handleSubmit} style={{ maxWidth: 600, margin: "0 auto" }}>
        <div style={{ marginBottom: 16 }}>
          <label>
            Full Name
            <br />
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              style={{
                width: "100%",
                padding: 8,
                fontSize: 16,
                borderRadius: 4,
                border: "1px solid #ccc",
              }}
            />
          </label>
        </div>
        <div style={{ marginBottom: 16 }}>
          <label>
            Email
            <br />
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              style={{
                width: "100%",
                padding: 8,
                fontSize: 16,
                borderRadius: 4,
                border: "1px solid #ccc",
              }}
            />
          </label>
        </div>
        <div style={{ marginBottom: 16 }}>
          <label>
            Mobile Number
            <br />
            <input
              type="text"
              name="mobile"
              value={form.mobile}
              onChange={handleChange}
              required
              style={{
                width: "100%",
                padding: 8,
                fontSize: 16,
                borderRadius: 4,
                border: "1px solid #ccc",
              }}
            />
          </label>
        </div>
        <div style={{ marginBottom: 16 }}>
          <label>
            Message
            <br />
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              required
              rows={4}
              style={{
                width: "100%",
                padding: 8,
                fontSize: 16,
                borderRadius: 4,
                border: "1px solid #ccc",
              }}
            />
          </label>
        </div>
        <div style={{ marginBottom: 16 }}>
          <label>
            Type of Inquiry (Please select one):
            <br />
            <select
              name="inquiryType"
              value={form.inquiryType}
              onChange={handleChange}
              required
              style={{
                width: "100%",
                padding: 8,
                fontSize: 16,
                borderRadius: 4,
                border: "1px solid #ccc",
              }}
            >
              <option value="">-- Select --</option>
              <option value="General Feedback">General Feedback</option>
              <option value="Technical Issue">Technical Issue</option>
              <option value="Business Inquiry">Business Inquiry</option>
              <option value="Content Partnership">Content Partnership</option>
              <option value="Report a Bug">Report a Bug</option>
            </select>
          </label>
        </div>
        <button
          type="submit"
          style={{
            background: "#3949ab",
            color: "#fff",
            padding: "10px 32px",
            fontSize: 18,
            border: "none",
            borderRadius: 4,
            cursor: "pointer",
          }}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default ContactUs;
