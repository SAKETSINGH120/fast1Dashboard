import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import TableContainer from "../TableContainer/TableContainer";

import { Box, TablePagination } from "@mui/material";

import { useNavigate } from "react-router-dom";
import { loader } from "../../utils";
import { getAllSubscriber } from "../service/admin";

const UsersListing = () => {
  const [data, setData] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [allData, setAllData] = useState([]);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalData, setTotalData] = useState(0);
  const navigate = useNavigate();

  const getEvent = async () => {
    loader.start();
    const eventData = await getAllSubscriber().then((res) => {
      return res.data.data;
    });
    eventData.sort((a, b) => {
      const aDate = new Date(a?.createdAt); // Convert ISO string to Date object
      const bDate = new Date(b?.createdAt); // Convert ISO string to Date object
      return bDate - aDate; // Sort in descending order (most recent first)
    });

    setAllData(eventData);
    console.log(eventData);
    setData(eventData);
    setTotalData(eventData?.length || 0);
    paginate(eventData, page);
    loader.stop();
  };

  function filterData(e) {
    const value = e.trim();
    setSearchInput(value);
    let filteredData = allData;
    let total = allData.length;
    if (value) {
      const searchValue = value.toLowerCase();
      filteredData = allData.filter(
        (res) =>
          (typeof res.name === "string" &&
            res.name.toLowerCase().includes(searchValue)) ||
          (res.mobile_number &&
            res.mobile_number.toString().toLowerCase().includes(searchValue))
      );
      total = filteredData.length;
    }
    setTotalData(total);
    setPage(0);
    setData(filteredData.slice(0, rowsPerPage)); // Always show first page of filtered data
  }

  function paginate(eventData, cpage) {
    const filteredData = eventData.filter(
      (res) =>
        res.name &&
        typeof res.name === "string" &&
        res.name.toLowerCase().includes(searchInput.toLowerCase())
    );
    const startIndex = cpage * rowsPerPage;
    const slicedData = filteredData.slice(startIndex, startIndex + rowsPerPage);
    setData(slicedData);
  }

  useEffect(() => {
    getEvent();
  }, [rowsPerPage]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    paginate(allData, newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
      <Box>
        <h2 className="fw-600">User Management</h2>
        <div className={`row mt-4`}>
          <div className={`col-lg-5 col-md-6 col-sm-12 col-12`}>
            <input
              type="search"
              placeholder="Search by name or mobile no"
              className="form-control w-100"
              value={searchInput}
              onChange={(e) => filterData(e.target.value)}
            />
          </div>
        </div>
      </Box>

      <div className="mt-4">
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Created At</TableCell>
                <TableCell>Phone No.</TableCell>
                <TableCell>Address</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {data?.map((res, index) => {
                return (
                  <TableRow hover key={index}>
                    <TableCell
                      className="pointer text-capitalize"
                      onClick={() => navigate(`view/${res?.mobile_number}`)}
                    >
                      {res?.name}
                    </TableCell>

                    <TableCell className="text-capitalize">
                      {res?.email ? res?.email : "N/A"}
                    </TableCell>
                    <TableCell className="text-capitalize">
                      {
                        res?.createdAt &&
                          new Date(res.createdAt).toLocaleDateString() // Convert the ISO string to Date and format it
                      }
                    </TableCell>

                    <TableCell>{res?.mobile_number}</TableCell>
                    <TableCell>{res?.Address ? res?.Address : "n/a"}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>

          <TablePagination
            component="div"
            count={totalData}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableContainer>
      </div>
    </>
  );
};

export default UsersListing;
