import React, { useEffect, useState } from "react";
import {
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import TableContainer from "../TableContainer/TableContainer";
import { deleteChannel, getallChannel } from "../service/admin";
import {
  Backdrop,
  Box,
  CircularProgress,
  TablePagination,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import moment from "moment/moment";
import { CSVLink } from "react-csv";
import { loader,snackbar } from "../../utils";
import { FormComponent } from "../View/AddChannel";
import { AiTwotoneDelete } from "react-icons/ai";
import { Modal, ModalBody } from 'reactstrap';
import { GoInfo } from "react-icons/go";

const ChannelManagement = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [allData, setAllData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalData, setTotalData] = useState(0);
  const [csvData, setCsvData] = useState([]);
  const [addDrawer, setAddDrawer] = useState(false);
  const headers = [
    { label: "Sr.No", key: "srNo" },
    { label: "Name", key: "name" },
    { label: "Cost", key: "price" },
    { label: "Channel Number", key: "channel_no" },
    { label: "Definition", key: "definition" },
    { label: "Genre", key: "genre" },
    { label: "Language", key: "language" },
    { label: "Broadcaster", key: "select_broadcaster" },
    { label: "Age Restriction", key: "age_restriction" },
    { label: "Created On", key: "createdAt" },
  ];

  const [deleteModal, setDeleteModal] = useState(false)
  const [deleteId, setDeleteId] = useState('')

  const getAllChannels = async () => {
    try {
      loader.start();
      const res = await getallChannel();
      let channelList = res?.data?.data?.reverse();

      setAllData(channelList);
      paginate(channelList, 0);
      setTotalData(channelList.length);

      // Prepare CSV data (if needed)
      const csvD = channelList.map((item, index) => ({
        srNo: index + 1,
        name: item?.name,
        price: item?.cost,
        channel_no: item?.channel_no,
        definition: item?.definition,
        genre: item?.genre?.name,
        language: item?.language?.name,
        select_broadcaster: item?.select_broadcaster?.name,
        age_restriction: item?.age_restriction ? "Yes" : "No",
        createdAt: new Date(item?.createdAt).toLocaleDateString(),
      }));
      setCsvData(csvD);

    } catch (err) {
      console.error(err);
    }
    finally {
      loader.stop();
    }
  };


  const filterData = (searchTerm) => {
    const filteredData = allData.filter((channel) =>
      channel.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setTotalData(filteredData.length);
    paginate(filteredData, 0);
  };

  // Paginate data for display
  const paginate = (dataToPaginate, currentPage) => {
    const startIndex = currentPage * rowsPerPage;
    const paginatedData = dataToPaginate.slice(
      startIndex,
      startIndex + rowsPerPage
    );
    setData(paginatedData);
  };

  useEffect(() => {
    getAllChannels();
  }, [rowsPerPage]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    paginate(allData, newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const toggleAddDrawer = () => {
    setAddDrawer(!addDrawer);

  };


  async function deleteChannelData() {
    loader.start()
    try {
      let res = await deleteChannel(deleteId)
      setDeleteModal(false)
      setDeleteId('')
      setSuccess('Channel deleted successfully')
      await getAllChannels()
    } catch (err) {
      console.log(err)
      setError('Some Error occupide')
    } finally {
      loader.stop()
    }
  }

  function setError(message) {
    snackbar.error(message);
  }
  function setSuccess(message) {
    snackbar.success(message);
  }

  return (
    <>
      <Modal centered isOpen={deleteModal}>
        <ModalBody>
          <div className='py-4'>
            <div className='d-flex justify-content-center'>
              <GoInfo className='text-danger' size={40} />
            </div>
            <div className='text-center mt-3'>Are you sure want to delete this channel?</div>
          </div>
          <div className='d-flex justify-content-end gap-3'>
            <button className='btn btn-sm border' onClick={() => {
              setDeleteModal(false)
              setDeleteId('')
            }}>Cancel</button>
            <button className='btn btn-sm btn-primary' onClick={deleteChannelData}>Delete</button>
          </div>
        </ModalBody>
      </Modal>
      <Box>
        <h2 className="fw-600">All Live Channel</h2>
        <div className="row justify-content-between align-items-center mt-3">
          <div className="col-lg-5 col-md-6 col-sm-12 col-12 ">
            <div>
              <input
                type="search"
                placeholder="Search"
                className="form-control w-100"
                onChange={(e) => filterData(e.target.value)}
              />
            </div>
          </div>
          <div className="col-lg-6 col-md-6 col-sm-12 col-12 mt-md-0 mt-sm-3 mt-3 d-flex gap-3 align-items-center justify-content-md-end justify-content-start">
            <CSVLink
              data={csvData}
              headers={headers}
              filename={"broadcasters.csv"}
              className="btn border"
              style={{ backgroundColor: "#fff", color: "#000" }}
            >
              Export CSV
            </CSVLink>

            <button
              className="btn btn-primary btn-radius px-3"
              type="button"
              onClick={() => {

                setAddDrawer(true);
              }}
            >
              Create Channel
            </button>

          </div>

        </div>
      </Box>

      <div className="mt-4">
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell></TableCell>
                <TableCell>Channel ID</TableCell>

                <TableCell>Name</TableCell>
                <TableCell>Channel Number</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Quality</TableCell>
                <TableCell>Broadcaster</TableCell>
                <TableCell>Language</TableCell>
                <TableCell>Genre</TableCell>
                <TableCell>Cost</TableCell>
                <TableCell>Created on</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {data.length ? (
                data.map((channel) => (
                  <TableRow hover key={channel._id}>
                    <TableCell className='pointer'>
                      <img
                        className="channelLogo"
                        src={channel?.logo?.file_url}
                        style={{ maxWidth: "80px" }}
                        alt={channel?.name}
                        onClick={() => navigate(`view/${channel?._id}`)}
                      />
                    </TableCell>
                    <TableCell className='pointer' onClick={() => navigate(`view/${channel?._id}`)}>{channel.channelId}</TableCell>

                    <TableCell>{channel?.name}</TableCell>
                    <TableCell>{channel?.channel_no}</TableCell>
                    <TableCell>{channel?.fta ? "FTA" : "PTA"}</TableCell>
                    <TableCell>{channel?.definition}</TableCell>
                    <TableCell>{channel?.select_broadcaster?.name}</TableCell>
                    <TableCell>{channel?.language?.name}</TableCell>
                    <TableCell>{channel?.genre?.name}</TableCell>
                    <TableCell>{channel?.cost}</TableCell>
                    <TableCell className="text-nowrap">
                      {moment(channel.createdAt).format("DD-MM-YY")}
                    </TableCell>
                    <TableCell><AiTwotoneDelete size={20} className='text-primary pointer' onClick={() => {
                      setDeleteModal(true)
                      setDeleteId(channel?._id)
                    }} /></TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={11} style={{ textAlign: "center" }}>
                    No data found
                  </TableCell>
                </TableRow>
              )}
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

      <FormComponent
        open={addDrawer}
        // id={activeChannelID}
        toggle={toggleAddDrawer}
        refreshList={getAllChannels}
      />


    </>
  );
};

export default ChannelManagement;
