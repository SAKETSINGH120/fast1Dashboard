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
    const searchedData = searchDataWithMultipleKeys(
      [
        "breakingNews",
        "info",
        "advt",
        "weatherAlert",
        "headlines",
        "upcomingProg",
        "flashAlert",
        "promo",
        "publicInterest",
      ],
      allData,
      search
    );
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
            placeholder="Search by content"
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
                <TableCell>Content</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedData.map((item, i) => (
                <TableRow key={i}>
                  <TableCell>
                    <div style={{ maxWidth: "800px" }}>
                      {item.breakingNews && (
                        <div className="mb-2">
                          <strong style={{ color: "#d32f2f" }}>
                            Breaking News:
                          </strong>
                          <p style={{ margin: "4px 0 0 0", fontSize: "14px" }}>
                            {item.breakingNews}
                          </p>
                        </div>
                      )}
                      {item.info && (
                        <div className="mb-2">
                          <strong style={{ color: "#1976d2" }}>Info:</strong>
                          <p style={{ margin: "4px 0 0 0", fontSize: "14px" }}>
                            {item.info}
                          </p>
                        </div>
                      )}
                      {item.advt && (
                        <div className="mb-2">
                          <strong style={{ color: "#ed6c02" }}>Advt:</strong>
                          <p style={{ margin: "4px 0 0 0", fontSize: "14px" }}>
                            {item.advt}
                          </p>
                        </div>
                      )}
                      {item.weatherAlert && (
                        <div className="mb-2">
                          <strong style={{ color: "#0288d1" }}>
                            Weather Alert:
                          </strong>
                          <p style={{ margin: "4px 0 0 0", fontSize: "14px" }}>
                            {item.weatherAlert}
                          </p>
                        </div>
                      )}
                      {item.headlines && (
                        <div className="mb-2">
                          <strong style={{ color: "#2e7d32" }}>
                            Headlines:
                          </strong>
                          <p style={{ margin: "4px 0 0 0", fontSize: "14px" }}>
                            {item.headlines}
                          </p>
                        </div>
                      )}
                      {item.upcomingProg && (
                        <div className="mb-2">
                          <strong style={{ color: "#9c27b0" }}>
                            Upcoming Program:
                          </strong>
                          <p style={{ margin: "4px 0 0 0", fontSize: "14px" }}>
                            {item.upcomingProg}
                          </p>
                        </div>
                      )}
                      {item.flashAlert && (
                        <div className="mb-2">
                          <strong style={{ color: "#d84315" }}>
                            Flash Alert:
                          </strong>
                          <p style={{ margin: "4px 0 0 0", fontSize: "14px" }}>
                            {item.flashAlert}
                          </p>
                        </div>
                      )}
                      {item.promo && (
                        <div className="mb-2">
                          <strong style={{ color: "#7b1fa2" }}>Promo:</strong>
                          <p style={{ margin: "4px 0 0 0", fontSize: "14px" }}>
                            {item.promo}
                          </p>
                        </div>
                      )}
                      {item.publicInterest && (
                        <div className="mb-2">
                          <strong style={{ color: "#388e3c" }}>
                            Public Interest:
                          </strong>
                          <p style={{ margin: "4px 0 0 0", fontSize: "14px" }}>
                            {item.publicInterest}
                          </p>
                        </div>
                      )}
                    </div>
                  </TableCell>
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
