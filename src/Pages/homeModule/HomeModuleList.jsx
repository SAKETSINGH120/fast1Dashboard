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
import {
  loader,
  searchDataWithMultipleKeys,
  paginate,
  snackbar,
} from "../../utils";
import {
  getAllHomeContent,
  deleteHomeContent,
} from "../../Components/service/admin";
import { DeleteButton } from "../../Components/Buttons/DeleteButton";
import { AddHomeContent } from "./AddHomeModule";

export default function HomeContentList() {
  const [search, setSearch] = useState("");
  const [allData, setAllData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [page, setPage] = useState(0);
  const rowsPerPage = 10;

  console.log("allData", allData);

  // fetch all
  async function getAll() {
    try {
      loader.start();
      let res = await getAllHomeContent();
      setAllData(res?.data?.data || []);
      setFilteredData(res?.data?.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      loader.stop();
    }
  }

  useEffect(() => {
    getAll();
  }, []);

  // search
  useEffect(() => {
    const searchedData = searchDataWithMultipleKeys(["title"], allData, search);
    setFilteredData(searchedData);
    setPage(0);
  }, [search, allData]);

  // delete handler
  async function handleDelete(item) {
    try {
      loader.start();
      await deleteHomeContent(item._id);
      snackbar.success("Home Content deleted successfully");
      setAllData((prev) => prev.filter((x) => x._id !== item._id));
      setFilteredData((prev) => prev.filter((x) => x._id !== item._id));
    } catch (err) {
      console.error(err);
    } finally {
      loader.stop();
    }
  }

  const paginatedData = paginate(filteredData, page, rowsPerPage);

  return (
    <>
      <h2 className="fw-600">Home Content</h2>
      <div className="row mt-4">
        <div className="col-lg-5 col-md-6 col-sm-12">
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by title"
            className="form-control"
          />
        </div>
        {/* <div className="col d-flex justify-content-end">
          <AddHomeContent onSubmit={getAll} />
        </div> */}
      </div>

      <div className="mt-4">
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Image</TableCell>
                <TableCell>Title</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedData.map((item, i) => (
                <TableRow key={i}>
                  <TableCell>
                    <img
                      src={item.image}
                      alt={item.title}
                      style={{
                        width: "100px",
                        height: "80px",
                        objectFit: "cover",
                      }}
                    />
                  </TableCell>
                  <TableCell>{item.title}</TableCell>
                  <TableCell>
                    <span
                      className={`badge px-3 py-2 rounded-pill ${
                        item.status === "active" || item.status === true
                          ? "bg-success text-white"
                          : "bg-danger text-white"
                      }`}
                      style={{
                        fontSize: "12px",
                        fontWeight: "500",
                        textTransform: "capitalize",
                        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                      }}
                    >
                      {item.status === "active" || item.status === true
                        ? "Active"
                        : "Inactive"}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="d-flex gap-2">
                      <AddHomeContent
                        formData={item}
                        mode="edit"
                        onSubmit={getAll}
                      />
                      {/* <DeleteButton
                        confirmation
                        display="Home Content"
                        data={item}
                        onDelete={handleDelete}
                      /> */}
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
