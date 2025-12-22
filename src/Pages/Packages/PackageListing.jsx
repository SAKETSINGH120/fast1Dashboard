import React, { useEffect, useState } from 'react';
import TableContainer from '../../Components/TableContainer/TableContainer';
import { Table, TableBody, TableCell, TableHead, TablePagination, TableRow } from '@mui/material';
import { useNavigate } from 'react-router';
import { loader, searchDataWithMultipleKeys, paginate, snackbar } from '../../utils';
import { deletePlan, getAllPlans } from '../../Components/service/admin';
import { DeleteButton } from '../../Components/Buttons/DeleteButton';
import { CreateUpdatePackage } from './CreateUpdatePackage';

export default function PackageListing() {
  const [search, setSearch] = useState("");
  const [allData, setAllData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [page, setPage] = useState(0);
  const rowsPerPage = 10;

  const navigate = useNavigate();

  // Fetch all packages
  async function getAllPackages() {
    try {
      loader.start();
      let res = await getAllPlans();
      setAllData(res?.data?.data || []);
      setFilteredData(res?.data?.data || []);
    } catch (error) {
      console.log(error);
    } finally {
      loader.stop();
    }
  }

  useEffect(() => {
    getAllPackages();
  }, []);

  // Handle search
  useEffect(() => {
    const searchedData = searchDataWithMultipleKeys(["plackage_name"], allData, search);
    setFilteredData(searchedData);
    setPage(0);
  }, [search, allData]);

  // Delete handler
  async function deletePackage(data) {
    try {
      loader.start();
      await deletePlan(data._id);
      snackbar.success("Package deleted successfully")
      setAllData(prevData => prevData.filter(item => item._id !== data._id));
      setFilteredData(prevData => prevData.filter(item => item._id !== data._id));
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
      <h2 className="fw-600">Packages</h2>
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
          <CreateUpdatePackage onSubmit={getAllPackages} />
        </div>
      </div>
      <div className="mt-4">
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Package Name</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Package Price</TableCell>
                <TableCell>Package Type</TableCell>
                <TableCell>Device Limit</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedData?.map((res, index) => (
                <TableRow hover key={index}>
                  <TableCell
                    className="pointer text-capitalize"
                    // onClick={() => navigate(`view/${res?._id}`)}
                  >
                    {res?.plackage_name}
                  </TableCell>
                  <TableCell className="text-capitalize">
                    {res?.status}
                  </TableCell>
                  <TableCell className="text-capitalize">
                    {res?.plackage_price}
                  </TableCell>
                  <TableCell>{res?.plackage_type}</TableCell>
                  <TableCell>{res?.device_limit}</TableCell>
                  <TableCell>
                    <div className='d-flex gap-2'>
                      <CreateUpdatePackage formData={res} mode="edit" onSubmit={getAllPackages} />
                      <DeleteButton confirmation display={"Package"} data={res} onDelete={deletePackage} />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* Table Pagination */}
          <TablePagination
            component="div"
            count={filteredData.length}  // Total count of filtered data
            page={page}  // Current page value
            onPageChange={(event, newPage) => setPage(newPage)} // Handle page change
            rowsPerPage={rowsPerPage}  // Number of rows per page
            rowsPerPageOptions={[rowsPerPage]} // Disable changing rows per page
          />
        </TableContainer>
      </div>
    </>
  );
}
