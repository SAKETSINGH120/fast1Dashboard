import React, { useEffect, useState } from "react";
import TableContainer from "../../../Components/TableContainer/TableContainer";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import { useNavigate } from "react-router";
// import {
//   loader,
//   searchDataWithMultipleKeys,
//   paginate,
//   snackbar,
// } from "../../../utils";
import { DeleteButton } from "../../../Components/Buttons/DeleteButton";
import { AddPodcastCategory } from "./AddPodcastCategory";
import {
  deletePodcastsCategory,
  getAllPodcastsCategory,
} from "../../../Components/service/admin";
import {
  loader,
  paginate,
  searchDataWithMultipleKeys,
  snackbar,
} from "../../../utils";

export default function PodcastCategory() {
  const [search, setSearch] = useState("");
  const [allData, setAllData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [page, setPage] = useState(0);
  const rowsPerPage = 10;

  const navigate = useNavigate();

  // Fetch all podcast categories
  async function getAllPodcastCategories() {
    try {
      loader.start();
      let res = await getAllPodcastsCategory();
      console.log(res, "podcast categories response");
      setAllData(res?.data?.data || []);
      setFilteredData(res?.data?.data || []);
    } catch (error) {
      console.log(error);
    } finally {
      loader.stop();
    }
  }

  useEffect(() => {
    getAllPodcastCategories();
  }, []);

  // Handle search
  useEffect(() => {
    const searchedData = searchDataWithMultipleKeys(["name"], allData, search);
    setFilteredData(searchedData);
    setPage(0);
  }, [search, allData]);

  // Delete handler
  async function deletePodcastCategory(data) {
    try {
      loader.start();
      await deletePodcastsCategory(data._id);
      snackbar.success("Podcast Category deleted successfully");
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
      <h2 className="fw-600">Podcast Category</h2>
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
          <AddPodcastCategory onSubmit={getAllPodcastCategories} />
        </div>
      </div>
      <div className="mt-4">
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Priority</TableCell>
                <TableCell>Status</TableCell>
                {/* <TableCell>Status</TableCell>
                <TableCell>Package Price</TableCell>
                <TableCell>Package Type</TableCell>
                <TableCell>Device Limit</TableCell> */}
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedData?.map((res, index) => (
                <TableRow hover key={res._id || index}>
                  <TableCell
                    className="pointer text-capitalize"
                    // onClick={() => navigate(`view/${res?._id}`)}
                  >
                    {res?.name}
                  </TableCell>
                  <TableCell
                    className="pointer text-capitalize"
                    // onClick={() => navigate(`view/${res?._id}`)}
                  >
                    {res?.priority || "NA"}
                  </TableCell>
                  <TableCell
                    className="pointer"
                    // onClick={() => navigate(`view/${res?._id}`)}
                  >
                    <span
                      className={`badge ${
                        res?.status === true
                          ? "bg-success"
                          : res?.status === false
                          ? "bg-danger"
                          : "bg-secondary"
                      }`}
                      style={{
                        padding: "6px 12px",
                        borderRadius: "20px",
                        fontSize: "12px",
                        fontWeight: "500",
                      }}
                    >
                      {res?.status === true
                        ? "Active"
                        : res?.status === false
                        ? "Inactive"
                        : "Unknown"}
                    </span>
                  </TableCell>
                  {/* <TableCell className="text-capitalize">
                    {res?.status}
                  </TableCell>
                  <TableCell className="text-capitalize">
                    {res?.plackage_price}
                  </TableCell>
                  <TableCell>{res?.plackage_type}</TableCell>
                  <TableCell>{res?.device_limit}</TableCell> */}
                  <TableCell>
                    <div className="d-flex gap-2">
                      <AddPodcastCategory
                        formData={res}
                        mode="edit"
                        onSubmit={getAllPodcastCategories}
                      />
                      <DeleteButton
                        confirmation
                        display={"Podcast Category"}
                        data={res}
                        onDelete={deletePodcastCategory}
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
            count={filteredData.length} // Total count of filtered data
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
