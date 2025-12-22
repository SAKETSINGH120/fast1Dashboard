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
import { DeleteButton } from "../../Components/Buttons/DeleteButton";
import { deleteSeason, getSeasonsList } from "../../Components/service/admin";
import CreateUpdateSeason from "./CreateUpdateSeason";

function AllSeason() {
  const [search, setSearch] = useState("");
  const [allData, setAllData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [page, setPage] = useState(0);
  const rowsPerPage = 10;
  

  console.log("allData", allData);

  const navigate = useNavigate();

  // Fetch all packages
  async function getallSeasons() {
    try {
      loader.start();
      let res = await getSeasonsList();
      setAllData(res?.data?.data || []);
      setFilteredData(res?.data?.data || []);
    } catch (error) {
      console.log(error);
    } finally {
      loader.stop();
    }
  }

  useEffect(() => {
    getallSeasons();
  }, []);

  // Handle search
  useEffect(() => {
    const searchedData = searchDataWithMultipleKeys(["title"], allData, search);
    setFilteredData(searchedData);
    setPage(0);
  }, [search, allData]);

  // Delete handler
  async function deleteSeasons(data) {
    try {
      loader.start();
      await deleteSeason(data._id);

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

  return (
    <>
      <h2 className="fw-600">All Season</h2>
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
          <CreateUpdateSeason onSubmit={getallSeasons} />
        </div>
      </div>
      <div className="mt-4">
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell>Season No.</TableCell>
                <TableCell> WebSeries</TableCell>
                {/* <TableCell>Priority</TableCell> */}
                {/* <TableCell>Channel Url</TableCell> */}

                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedData?.map((res, index) => (
                <TableRow hover key={index}>
                  <TableCell className="pointer text-capitalize">
                    {res?.title}
                  </TableCell>
                  <TableCell className="pointer text-capitalize">
                    {res?.seasonNumber}
                  </TableCell>
                  <TableCell className="pointer text-capitalize">
                    {res?.webSeries?.title}
                  </TableCell>

                  {/* <TableCell className="">{res?.channelUrl}</TableCell> */}

                  <TableCell>
                    <div className="d-flex gap-2">
                      <CreateUpdateSeason
                        formData={res}
                        mode="edit"
                        onSubmit={getallSeasons}
                      />
                      <DeleteButton
                        confirmation
                        display={"Movie Channel"}
                        data={res}
                        onDelete={deleteSeasons}
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

export default AllSeason;
