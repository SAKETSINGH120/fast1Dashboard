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
  deleteLiveFreeChannel,
  deletePlan,
  getAllPlans,
  getFreeLiveChannels,
} from "../../Components/service/admin";
import { DeleteButton } from "../../Components/Buttons/DeleteButton";
import { AddFreeLiveChannel } from "./AddFreeLiveChannel";

export default function FreeLiveChannelList() {
  const [search, setSearch] = useState("");
  const [allData, setAllData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [page, setPage] = useState(0);
  const rowsPerPage = 10;

  const navigate = useNavigate();

  // Fetch all packages
  async function getAllFreeLiveChannel() {
    try {
      loader.start();
      let res = await getFreeLiveChannels();
      setAllData(res?.data?.data || []);
      setFilteredData(res?.data?.data || []);
    } catch (error) {
      console.log(error);
    } finally {
      loader.stop();
    }
  }

  useEffect(() => {
    getAllFreeLiveChannel();
  }, []);

  // Handle search
  useEffect(() => {
    const searchedData = searchDataWithMultipleKeys(
      ["name", "channelCategory.name"],
      allData,
      search
    );
    setFilteredData(searchedData);
    setPage(0);
  }, [search, allData]);

  // Delete handler
  async function deleteFreeLiveChannel(data) {
    try {
      loader.start();
      await deleteLiveFreeChannel(data._id);
      snackbar.success("Package deleted successfully");
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
      <h2 className="fw-600">Free Live Channels</h2>
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
          <AddFreeLiveChannel onSubmit={getAllFreeLiveChannel} />
        </div>
      </div>
      <div className="mt-4">
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Image</TableCell>
                <TableCell>Channel Name</TableCell>
                <TableCell> Category Name</TableCell>
                <TableCell>Channel Number</TableCell>
                <TableCell>Priority</TableCell>

                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedData?.map((res, index) => (
                <TableRow hover key={res._id || index}>
                  <TableCell>
                    <img
                      src={res?.image}
                      alt="image"
                      style={{
                        display: "block",
                        width: "100px",
                        height: "100px",
                      }}
                      onError={() =>
                        console.log("Image failed to load:", res?.image)
                      }
                    />
                  </TableCell>
                  <TableCell className="pointer text-capitalize">
                    {res?.name}
                  </TableCell>
                  <TableCell className="pointer text-capitalize">
                    {res?.channelCategory?.name}
                  </TableCell>
                  <TableCell className="pointer text-capitalize">
                    {res?.channelNumber ? res?.channelNumber : "N/A"}
                  </TableCell>
                  <TableCell className="pointer text-capitalize">
                    {res?.priority === 11 ? 11 : res?.priority}
                  </TableCell>

                  {/* <TableCell className="">{res?.channelUrl}</TableCell> */}

                  <TableCell>
                    <div className="d-flex gap-2">
                      <AddFreeLiveChannel
                        formData={res}
                        mode="edit"
                        onSubmit={getAllFreeLiveChannel}
                      />
                      <DeleteButton
                        confirmation
                        display={"Free Live Channel"}
                        data={res}
                        onDelete={deleteFreeLiveChannel}
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
