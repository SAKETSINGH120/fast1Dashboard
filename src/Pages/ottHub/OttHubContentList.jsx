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
  deleteOttContent,
  getAllOttContent,
} from "../../Components/service/admin";
import { DeleteButton } from "../../Components/Buttons/DeleteButton";
import { AddOttContent } from "./AddOttContent";

export default function OttContent() {
  const [search, setSearch] = useState("");
  const [allData, setAllData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [page, setPage] = useState(0);
  const rowsPerPage = 10;

  const navigate = useNavigate();

  // Fetch all packages
  async function getAllContent() {
    try {
      loader.start();
      let res = await getAllOttContent();
      setAllData(res?.data?.data || []);
      setFilteredData(res?.data?.data || []);
    } catch (error) {
      console.log(error);
    } finally {
      loader.stop();
    }
  }

  useEffect(() => {
    getAllContent();
  }, []);

  // Handle search
  useEffect(() => {
    const searchedData = searchDataWithMultipleKeys(["name"], allData, search);
    setFilteredData(searchedData);
    setPage(0);
  }, [search, allData]);

  // Delete handler
  async function deleteContent(data) {
    try {
      loader.start();
      await deleteOttContent(data._id);
      snackbar.success("OTT Content deleted successfully");
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
      <h2 className="fw-600">OTT Content</h2>
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
          <AddOttContent onSubmit={getAllContent} />
        </div>
      </div>
      <div className="mt-4">
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Thumbnail</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Package Name For TV</TableCell>
                <TableCell>Package Name For Mobile</TableCell>
                <TableCell>Priority</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedData?.map((res, index) => (
                <TableRow hover key={index}>
                  <TableCell>
                    <img
                      src={res?.thumbnail}
                      alt="thumbnail"
                      style={{
                        display: "block",
                        width: "100px",
                        height: "100px",
                      }}
                      onError={() =>
                        console.log("thumbnail failed to load:", res?.thumbnail)
                      }
                    />
                  </TableCell>
                  <TableCell className="pointer text-capitalize">
                    {res?.name}
                  </TableCell>

                  <TableCell className="pointer text-capitalize">
                    {res?.packageNameForTv}
                  </TableCell>

                  <TableCell className="pointer text-capitalize">
                    {res?.packageNameForMobile}
                  </TableCell>

                  <TableCell className="pointer text-capitalize">
                    {res?.priority}
                  </TableCell>

                  <TableCell>
                    <div className="d-flex gap-2">
                      <AddOttContent
                        formData={res}
                        mode="edit"
                        onSubmit={getAllContent}
                      />
                      <DeleteButton
                        confirmation
                        display={"Content"}
                        data={res}
                        onDelete={deleteContent}
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
