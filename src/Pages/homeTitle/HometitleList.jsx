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
  getAllHomeTitle,
  deleteHomeTitle,
} from "../../Components/service/admin";
import { DeleteButton } from "../../Components/Buttons/DeleteButton";
import { AddHomeTitle } from "./AddHomeTitle";

export default function HomeTitleList() {
  const [search, setSearch] = useState("");
  const [allData, setAllData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [page, setPage] = useState(0);
  const rowsPerPage = 10;

  // fetch all
  async function getAll() {
    try {
      loader.start();
      let res = await getAllHomeTitle();
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
      await deleteHomeTitle(item._id);
      snackbar.success("Home Title deleted successfully");
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
      <h2 className="fw-600">Home Titles</h2>
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
          <AddHomeTitle onSubmit={getAll} />
        </div> */}
      </div>

      <div className="mt-4">
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedData.map((item, i) => (
                <TableRow key={i}>
                  <TableCell>{item.title}</TableCell>
                  <TableCell>
                    <div className="d-flex gap-2">
                      <AddHomeTitle
                        formData={item}
                        mode="edit"
                        onSubmit={getAll}
                      />
                      {/* <DeleteButton
                        confirmation
                        display="Home Title"
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
