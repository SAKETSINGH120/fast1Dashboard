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

import { deleteEpisode, getEpisodesList } from "../../Components/service/admin";
import CreateUpdateEpisode from "./CreateUpdateEpisode";
import { DeleteButton } from "../../Components/Buttons/DeleteButton";

function AllEpisodes() {
  const [search, setSearch] = useState("");
  const [allData, setAllData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [page, setPage] = useState(0);
  const rowsPerPage = 10;
  

  console.log("allData", allData);

  const navigate = useNavigate();

  // Fetch all packages
  async function getAllEpisode() {
    try {
      loader.start();
      let res = await getEpisodesList();
      setAllData(res?.data?.data || []);
      setFilteredData(res?.data?.data || []);
    } catch (error) {
      console.log(error);
    } finally {
      loader.stop();
    }
  }

  useEffect(() => {
    getAllEpisode();
  }, []);

  // Handle search
  useEffect(() => {
    const searchedData = searchDataWithMultipleKeys(["title"], allData, search);
    setFilteredData(searchedData);
    setPage(0);
  }, [search, allData]);

  // Delete handler
  async function deleteChannel(data) {
    try {
      loader.start();
      await deleteEpisode(data._id);

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
      <h2 className="fw-600">Episodes</h2>
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
          <CreateUpdateEpisode onSubmit={getAllEpisode} />
        </div>
      </div>
      <div className="mt-4">
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Thumbnail</TableCell>
                <TableCell>Video</TableCell>
                <TableCell>Title</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>WebSeries</TableCell>
                <TableCell>Season</TableCell>
                <TableCell>Language</TableCell>
                <TableCell>Created</TableCell>

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
                  {/* <TableCell className="pointer text-capitalize">
                    {res?.videoUrl}
                  </TableCell> */}
                  <TableCell>
                    {res.videoUrl ? (
                      <a
                        href={
                          res.videoUrl.startsWith("http")
                            ? res.videoUrl
                            : `https://${res.videoUrl}`
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Watch
                      </a>
                    ) : (
                      "N/A"
                    )}
                  </TableCell>
                  <TableCell className="pointer text-capitalize">
                    {res?.title}
                  </TableCell>
                  <TableCell className="pointer text-capitalize">
                    {res?.description}
                  </TableCell>
                  <TableCell className="pointer text-capitalize">
                    {res?.webSeries?.title}
                  </TableCell>
                  <TableCell className="pointer text-capitalize">
                    {res?.season?.title}
                  </TableCell>
                  <TableCell className="pointer text-capitalize">
                    {res?.language}
                  </TableCell>
                  <TableCell className="pointer text-capitalize">
                    {new Date(res.createdAt).toLocaleDateString()}
                  </TableCell>

                  {/* <TableCell className="">{res?.channelUrl}</TableCell> */}

                  <TableCell>
                    <div className="d-flex gap-2">
                      <CreateUpdateEpisode
                        formData={res}
                        mode="edit"
                        onSubmit={getAllEpisode}
                      />
                      <DeleteButton
                        confirmation
                        display={"Episode"}
                        data={res}
                        onDelete={deleteChannel}
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

export default AllEpisodes;
