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
  getExclusiveChannels,
  deleteExclusiveChannel,
} from "../../Components/service/admin";
import { DeleteButton } from "../../Components/Buttons/DeleteButton";
import { AddExclusiveChannel } from "./AddChannel";

export default function ExclusiveChannelList() {
  const [search, setSearch] = useState("");
  const [allData, setAllData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [page, setPage] = useState(0);
  const rowsPerPage = 10;

  const navigate = useNavigate();

  // Fetch all exclusive channels
  async function fetchExclusiveChannels() {
    try {
      loader.start();
      let res = await getExclusiveChannels();
      setAllData(res?.data?.data || []);
      setFilteredData(res?.data?.data || []);
    } catch (error) {
      console.log(error);
    } finally {
      loader.stop();
    }
  }

  useEffect(() => {
    fetchExclusiveChannels();
  }, []);

  // Handle search
  useEffect(() => {
    const searchedData = searchDataWithMultipleKeys(
      ["name"], // exclusive channel me "name" hai
      allData,
      search
    );
    setFilteredData(searchedData);
    setPage(0);
  }, [search, allData]);

  // Delete handler
  async function handleDelete(data) {
    try {
      loader.start();
      await deleteExclusiveChannel(data._id);
      snackbar.success("Exclusive Channel deleted successfully");
      setAllData((prev) => prev.filter((item) => item._id !== data._id));
      setFilteredData((prev) => prev.filter((item) => item._id !== data._id));
    } catch (error) {
      console.log(error);
    } finally {
      loader.stop();
    }
  }

  // Paginate
  const paginatedData = paginate(filteredData, page, rowsPerPage);

  return (
    <>
      <h2 className="fw-600">Exclusive Channels</h2>
      <div className="row mt-4">
        <div className="col-lg-5 col-md-6 col-sm-12 col-12">
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search Exclusive Channel"
            className="form-control"
          />
        </div>
        <div className="col w-100 d-flex justify-content-end">
          <AddExclusiveChannel onSubmit={fetchExclusiveChannels} />
        </div>
      </div>

      <div className="mt-4">
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Image</TableCell>
                <TableCell>Channel Name</TableCell>
                {/* <TableCell>Category</TableCell> */}
                <TableCell>Channel Number</TableCell>
                <TableCell>Priority</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedData?.map((res, index) => (
                <TableRow hover key={index}>
                  <TableCell>
                    <img
                      src={res?.image}
                      alt="image"
                      style={{ width: "100px", height: "100px" }}
                      onError={() => console.log("Image failed:", res?.image)}
                    />
                  </TableCell>
                  <TableCell>{res?.name}</TableCell>
                  {/* <TableCell>{res?.channelCategory?.name || "N/A"}</TableCell> */}
                  <TableCell>{res?.channelNumber || "N/A"}</TableCell>
                  <TableCell>{res?.priority}</TableCell>
                  <TableCell>
                    <div className="d-flex gap-2">
                      <AddExclusiveChannel
                        formData={res}
                        mode="edit"
                        onSubmit={fetchExclusiveChannels}
                      />
                      <DeleteButton
                        confirmation
                        display="Exclusive Channel"
                        data={res}
                        onDelete={handleDelete}
                      />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <TablePagination
            component="div"
            count={filteredData.length}
            page={page}
            onPageChange={(e, newPage) => setPage(newPage)}
            rowsPerPage={rowsPerPage}
            rowsPerPageOptions={[rowsPerPage]}
          />
        </TableContainer>
      </div>
    </>
  );
}
