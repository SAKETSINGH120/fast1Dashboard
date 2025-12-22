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
  deleteWebSeries,
  getWebSeriesList,
} from "../../Components/service/admin";
import { DeleteButton } from "../../Components/Buttons/DeleteButton";
import CreateupdateWebSeries from "./CreateUpdateWebSeries";

function AllWebSeries() {
  const [search, setSearch] = useState("");
  const [allData, setAllData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [page, setPage] = useState(0);
  const rowsPerPage = 10;

  console.log("allData", allData);

  const navigate = useNavigate();

  // Fetch all packages
  async function getAllWebSeries() {
    try {
      loader.start();
      let res = await getWebSeriesList();
      console.log("hello");
      setAllData(res?.data?.data || []);
      setFilteredData(res?.data?.data || []);
    } catch (error) {
      console.log(error);
    } finally {
      loader.stop();
    }
  }

  useEffect(() => {
    getAllWebSeries();
  }, []);

  // Handle search
  useEffect(() => {
    const searchedData = searchDataWithMultipleKeys(
      ["title", "description"],
      allData,
      search
    );
    setFilteredData(searchedData);
    setPage(0);
  }, [search, allData]);

  // Delete handler
  async function deleteSeries(data) {
    try {
      loader.start();
      await deleteWebSeries(data._id);

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
      <h2 className="fw-600">All WebSeries</h2>
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
          <CreateupdateWebSeries onSubmit={getAllWebSeries} />
        </div>
      </div>
      <div className="mt-4">
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Thumbnail</TableCell>
                <TableCell>Title</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Language</TableCell>
                <TableCell>Release Year</TableCell>
                <TableCell>Priority</TableCell>
                {/* <TableCell>Channel Url</TableCell> */}

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
                        console.log("Image failed to load:", res?.image)
                      }
                    />
                  </TableCell>
                  <TableCell className="pointer text-capitalize">
                    {res?.title}
                  </TableCell>
                  <TableCell className="pointer text-capitalize">
                    {res?.description}
                  </TableCell>
                  <TableCell className="pointer text-capitalize">
                    {res?.language}
                  </TableCell>
                  <TableCell className="pointer text-capitalize">
                    {res?.releaseYear}
                  </TableCell>
                  <TableCell className="pointer text-capitalize">
                    {res?.priority || "N/A"}
                  </TableCell>

                  {/* <TableCell className="">{res?.channelUrl}</TableCell> */}

                  <TableCell>
                    <div className="d-flex gap-2">
                      <CreateupdateWebSeries
                        formData={res}
                        mode="edit"
                        onSubmit={getAllWebSeries}
                      />
                      <DeleteButton
                        confirmation
                        display={"webSeries"}
                        data={res}
                        onDelete={deleteSeries}
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

export default AllWebSeries;
