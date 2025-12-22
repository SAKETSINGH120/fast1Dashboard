import React, { useEffect, useState } from 'react'
import TableContainer from '../../Components/TableContainer/TableContainer';
import { Table, TableBody, TableCell, TableHead, TableRow, TablePagination } from '@mui/material';
import { deleteBroadcaster, getBroadcasters } from '../../Components/service/admin';
import { DeleteButton } from '../../Components/Buttons/DeleteButton';
import { loader, paginate, searchDataWithMultipleKeys, snackbar } from '../../utils';
import { CreateUpdateBroadcaster } from './CreateUpdateBroadcaster';

export default function Broadcaster() {
  let [allBrodcasterData, setAllBrodcasterData] = useState([]);
  let [allData, setAllData] = useState([]);
  let [filteredData, setFilteredData] = useState([]);
  let [search, setSearch] = useState("");
  let [page, setPage] = useState(1);
  let rowsPerPage = 10;

  // Fetch broadcasters data from API
  async function getAllBroadcasters() {
    try {
      loader.start();
      let res = await getBroadcasters();
      setAllBrodcasterData(res?.data?.data || []);
      setAllData(res?.data?.data || []);
      setFilteredData(res?.data?.data || []);
    } catch (error) {
      console.log(error);
    } finally {
      loader.stop();
    }
  }

  useEffect(() => {
    getAllBroadcasters();
  }, []);

  function onSubmit() {
    getAllBroadcasters();
  }

  // Delete handler for broadcasters
  async function deleteBroadcastHandler(data) {
    try {
      loader.start();
      await deleteBroadcaster(data._id);
      snackbar.success("Broadcaster deleted successfully")
      getAllBroadcasters();
      setSearch("")
      setPage(0)
    } catch (error) {
      if (error?.response?.data?.errormessage !== undefined) {
        snackbar.error(error?.response?.data?.errormessage)
    } else {
        snackbar.error('Some error occupide please check and try again')
    }
      console.log(error);
    } finally {
      loader.stop();
    }
  }

  // Paginate the filtered data
  useEffect(() => {
    let paginatedData = paginate(filteredData, page - 1, rowsPerPage);
    setAllBrodcasterData(paginatedData);
  }, [page, filteredData]);

  // Handle search and reset pagination to page 1 when search changes
  useEffect(() => {
    let searchedData = searchDataWithMultipleKeys(["name"], allData, search);
    setFilteredData(searchedData);
    setPage(1);
  }, [search, allData]);

  return (
    <>
      <h2 className="fw-600">Broadcaster</h2>
      <div className='row mt-4'>
        <div className='col-lg-5 col-md-6 col-sm-12 col-12'>
          <input
            type='search'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder='Search'
            className='form-control'
          />
        </div>
        <div className='col w-100 d-flex justify-content-end'>
          <CreateUpdateBroadcaster onSubmit={onSubmit} />
        </div>
      </div>
      <div className="mt-4">
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Broadcaster Name</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {allBrodcasterData?.map((res, index) => (
                <TableRow hover key={index}>
                  <TableCell>{res?.name}</TableCell>
                  <TableCell>
                    <div className='d-flex gap-2'>
                      <CreateUpdateBroadcaster formData={res} mode="edit" onSubmit={getAllBroadcasters} />
                      <DeleteButton confirmation display={"Broadcaster"} data={res} onDelete={deleteBroadcastHandler} />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <TablePagination
            component="div"
            count={filteredData.length}
            page={page - 1}
            onPageChange={(event, newPage) => setPage(newPage + 1)}
            rowsPerPage={rowsPerPage}
          />
        </TableContainer>
      </div>
    </>
  )
}
