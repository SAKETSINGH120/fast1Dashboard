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
  deleteChannelCategory_api,
  deletePlan,
  getAllChannelCategory,
  getAllPlans,
} from "../../Components/service/admin";
import { DeleteButton } from "../../Components/Buttons/DeleteButton";
import { AddChannelCategory } from "./AddChannelCategory";

export default function ChannelCategory() {
  const [search, setSearch] = useState("");
  const [allData, setAllData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [page, setPage] = useState(0);
  const rowsPerPage = 10;

  console.log(
    allData,
    filteredData,
    " this si the response of the all data ad the filtered data"
  );

  const navigate = useNavigate();

  // Fetch all packages
  async function getAllCategoryChannel() {
    try {
      loader.start();
      let res = await getAllChannelCategory();
      console.log(res, "thsi is the response of the api");
      setAllData(res?.data?.data || []);
      setFilteredData(res?.data?.data || []);
    } catch (error) {
      console.log(error);
    } finally {
      loader.stop();
    }
  }

  useEffect(() => {
    getAllCategoryChannel();
  }, []);

  // Handle search
  useEffect(() => {
    const searchedData = searchDataWithMultipleKeys(["name"], allData, search);
    setFilteredData(searchedData);
    setPage(0);
  }, [search, allData]);

  // Delete handler
  async function deleteChannelCategory(data) {
    try {
      loader.start();
      await deleteChannelCategory_api(data._id);
      snackbar.success("channel Category deleted successfully");
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
      <h2 className="fw-600">Channel Category</h2>
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
          <AddChannelCategory onSubmit={getAllCategoryChannel} />
        </div>
      </div>
      <div className="mt-4">
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Priority</TableCell>
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
                    {res?.priority}
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
                      <AddChannelCategory
                        formData={res}
                        mode="edit"
                        onSubmit={getAllCategoryChannel}
                      />
                      <DeleteButton
                        confirmation
                        display={"Channel Category"}
                        data={res}
                        onDelete={deleteChannelCategory}
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
