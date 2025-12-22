import React, { useEffect, useState } from "react";
import TableContainer from "../../Components/TableContainer/TableContainer";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import { useNavigate } from "react-router";
import {
  loader,
  searchDataWithMultipleKeys,
  paginate,
  snackbar,
} from "../../utils";
import {
  deleteHighLights,
  getAllHighLights,
} from "../../Components/service/admin";
import { DeleteButton } from "../../Components/Buttons/DeleteButton";
import { AddHighLights } from "./AddHighLights";

export default function HighLightsList() {
  const [search, setSearch] = useState("");
  const [allData, setAllData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [page, setPage] = useState(0);
  const rowsPerPage = 10;

  const navigate = useNavigate();

  // Function to extract YouTube video ID from URL
  const extractYouTubeVideoId = (url) => {
    if (!url) return null;

    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/v\/)([^&\n?#]+)/,
      /^([a-zA-Z0-9_-]{11})$/, // Direct video ID
    ];

    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match) {
        return match[1];
      }
    }
    return null;
  };

  // Function to get YouTube thumbnail URL
  const getYouTubeThumbnail = (url, quality = "maxresdefault") => {
    const videoId = extractYouTubeVideoId(url);
    if (!videoId) return null;

    // Use the format: https://img.youtube.com/vi/{VIDEO_ID}/maxresdefault.jpg
    return `https://img.youtube.com/vi/${videoId}/${quality}.jpg`;
  };

  // Fetch all HighLights
  async function getAllHighLightsData() {
    try {
      loader.start();
      let res = await getAllHighLights();
      setAllData(res?.data?.data || []);
      setFilteredData(res?.data?.data || []);
    } catch (error) {
      snackbar.error("Failed to refresh highlights list");
    } finally {
      loader.stop();
    }
  }

  useEffect(() => {
    getAllHighLightsData();
  }, []);

  // Handle search
  useEffect(() => {
    const searchedData = searchDataWithMultipleKeys(["url"], allData, search);
    setFilteredData(searchedData);
    setPage(0);
  }, [search, allData]);

  // Delete handler
  async function deleteHighLightsData(data) {
    try {
      loader.start();
      await deleteHighLights(data._id);
      snackbar.success("HighLights deleted successfully");
      setAllData((prevData) =>
        prevData.filter((item) => item._id !== data._id)
      );
      setFilteredData((prevData) =>
        prevData.filter((item) => item._id !== data._id)
      );
    } catch (error) {
      console.log(error);
    } finally {
      loader.stop();
    }
  }

  // Paginate the filtered data
  const paginatedData = paginate(filteredData, page, rowsPerPage);

  console.log("hellobro", paginatedData);

  return (
    <>
      <h2 className="fw-600">HighLights</h2>
      <div className="row mt-4">
        <div className="col-lg-5 col-md-6 col-sm-12 col-12">
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search"
            className="form-control"
          />
        </div>
        <div className="col w-100 d-flex justify-content-end">
          <AddHighLights onSubmit={getAllHighLightsData} />
        </div>
      </div>
      <div className="mt-4">
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Image</TableCell>
                <TableCell>Video URL</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Created At</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedData?.map((res, index) => (
                <TableRow hover key={index}>
                  {/* Thumbnail Column */}
                  <TableCell className="pointer">
                    {res?.thumbnail ? (
                      <img
                        src={res.thumbnail}
                        alt="Highlight thumbnail"
                        style={{
                          width: "120px",
                          height: "68px",
                          objectFit: "cover",
                          borderRadius: "8px",
                          border: "2px solid #dee2e6",
                          cursor: "pointer",
                          transition: "transform 0.2s, border-color 0.2s",
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.transform = "scale(1.05)";
                          e.target.style.borderColor = "#007bff";
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.transform = "scale(1)";
                          e.target.style.borderColor = "#dee2e6";
                        }}
                        onError={(e) => {
                          e.target.style.display = "none";
                          e.target.parentElement.innerHTML = `<span style="color: #666; font-style: italic;">N/A</span>`;
                        }}
                      />
                    ) : (
                      <span style={{ color: "#666", fontStyle: "italic" }}>
                        N/A
                      </span>
                    )}
                  </TableCell>
                  {/* Video URL Column */}
                  <TableCell className="pointer">
                    <a
                      href={res?.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        color: "#007bff",
                        textDecoration: "none",
                        fontSize: "12px",
                        wordBreak: "break-all",
                      }}
                    >
                      {res?.url ? res?.url.substring(0, 60) + "..." : "N/A"}
                    </a>
                  </TableCell>
                  <TableCell className="pointer">
                    <span
                      className={`badge ${
                        res?.status ? "bg-success" : "bg-danger"
                      }`}
                    >
                      {res?.status ? "Active" : "Inactive"}
                    </span>
                  </TableCell>
                  <TableCell className="pointer">
                    {res?.createdAt
                      ? new Date(res?.createdAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })
                      : "N/A"}
                  </TableCell>
                  <TableCell>
                    <div className="d-flex gap-2">
                      <AddHighLights
                        formData={res}
                        mode="edit"
                        onSubmit={getAllHighLightsData}
                      />
                      <DeleteButton
                        confirmation
                        display={"HighLights"}
                        data={res}
                        onDelete={deleteHighLightsData}
                      />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {/* Table Pagination */}
          <TablePagination
            component="div"
            count={Number(filteredData.length)} // Total count of filtered data
            page={page} // Current page value
            onPageChange={(event, newPage) => setPage(newPage)} // Handle page change
            rowsPerPage={rowsPerPage} // Number of rows per page
            rowsPerPageOptions={[rowsPerPage]} // Disable changing rows per page
          />
        </TableContainer>
      </div>
    </>
  );
}
