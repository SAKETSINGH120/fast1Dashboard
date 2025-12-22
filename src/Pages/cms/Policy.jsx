import React, { useEffect, useState } from "react";
import { CircularProgress, Box, Typography, Paper } from "@mui/material";
import { getPrivacyPolicy } from "../../Components/service/admin";

const Policy = () => {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getPrivacyPolicy()
      .then((res) => {
        // Adjust this depending on your API response structure
        const data = res.data?.data || res.data;
        setContent(data?.description || "");
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || "Failed to fetch privacy policy");
        setLoading(false);
      });
  }, []);

  return (
    <Box sx={{ maxWidth: 800, margin: "40px auto", padding: 2 }}>
      <Paper elevation={3} sx={{ padding: 4 }}>
        <Typography variant="h4" gutterBottom>
          Privacy Policy
        </Typography>
        {loading && (
          <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
            <CircularProgress />
          </Box>
        )}
        {error && (
          <Typography color="error" variant="body1">
            {error}
          </Typography>
        )}
        {!loading && !error && (
          <div
            style={{
              fontSize: "1rem",
              color: "rgba(0,0,0,0.87)",
              lineHeight: 1.6,
            }}
            dangerouslySetInnerHTML={{ __html: content }}
          />
        )}
      </Paper>
    </Box>
  );
};

export default Policy;
