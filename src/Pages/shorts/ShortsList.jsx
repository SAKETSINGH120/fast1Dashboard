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
  deleteShorts,
  getAllShorts,
  getAllShortsCategory,
} from "../../Components/service/admin";
import { DeleteButton } from "../../Components/Buttons/DeleteButton";
import { AddShorts } from "./AddShorts";

export default function ShortsList() {
  const [search, setSearch] = useState("");
  const [allData, setAllData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [page, setPage] = useState(0);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
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
      console.log("match", match);
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

  // Fetch all shorts with optional category filter
  async function getAllShortsData(categoryId = null) {
    try {
      loader.start();
      let res = await getAllShorts(categoryId);
      setAllData(res?.data?.data || []);
      setFilteredData(res?.data?.data || []);
    } catch (error) {
      console.log(error);
    } finally {
      loader.stop();
    }
  }

  // Fetch all categories
  async function fetchCategories() {
    try {
      const response = await getAllShortsCategory();
      setCategories(response?.data?.data || []);
    } catch (error) {
      console.error("Error fetching shorts categories:", error);
      snackbar.error("Failed to load shorts categories");
    }
  }

  useEffect(() => {
    getAllShortsData();
    fetchCategories();
  }, []);

  // Handle category filter change
  useEffect(() => {
    getAllShortsData(selectedCategory || null);
  }, [selectedCategory]);

  // Handle search
  useEffect(() => {
    const searchedData = searchDataWithMultipleKeys(["name"], allData, search);
    setFilteredData(searchedData);
    setPage(0);
  }, [search, allData]);

  // Delete handler
  async function deleteShortsData(data) {
    try {
      loader.start();
      await deleteShorts(data._id);
      snackbar.success("Shorts deleted successfully");
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

  return (
    <>
      <h2 className="fw-600">Shorts</h2>
      <div className="row mt-4">
        <div className="col-lg-4 col-md-5 col-sm-12 col-12">
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name"
            className="form-control"
          />
        </div>
        <div className="col-lg-3 col-md-4 col-sm-12 col-12">
          <select
            value={selectedCategory}
            onChange={(e) => {
              setSelectedCategory(e.target.value);
              setPage(0);
            }}
            className="form-select"
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div className="col w-100 d-flex justify-content-end">
          <AddShorts
            onSubmit={() => getAllShortsData(selectedCategory || null)}
          />
        </div>
      </div>
      <div className="mt-4">
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Video URL</TableCell>
                <TableCell>Priority</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedData?.map((res, index) => (
                <TableRow hover key={index}>
                  <TableCell className="pointer text-capitalize">
                    {res?.name}
                  </TableCell>
                  <TableCell className="pointer text-capitalize">
                    {res?.category?.name || "N/A"}
                  </TableCell>
                  <TableCell className="pointer">
                    {getYouTubeThumbnail(res?.url) ? (
                      <a
                        href={res?.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ textDecoration: "none" }}
                      >
                        <img
                          src={getYouTubeThumbnail(res?.url)}
                          alt={res?.name}
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
                            e.target.parentElement.innerHTML = `<span style="color: #007bff; text-decoration: underline;">${
                              res?.url
                                ? res?.url.substring(0, 50) + "..."
                                : "N/A"
                            }</span>`;
                          }}
                        />
                      </a>
                    ) : (
                      <a
                        href={res?.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-decoration-none"
                      >
                        {res?.url ? res?.url.substring(0, 50) + "..." : "N/A"}
                      </a>
                    )}
                  </TableCell>
                  <TableCell className="pointer text-capitalize">
                    {res?.priority || 0}
                  </TableCell>
                  <TableCell>
                    <div className="d-flex gap-2">
                      <AddShorts
                        formData={res}
                        mode="edit"
                        onSubmit={() =>
                          getAllShortsData(selectedCategory || null)
                        }
                      />
                      <DeleteButton
                        confirmation
                        display={"Shorts"}
                        data={res}
                        onDelete={deleteShortsData}
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
