import React, { useEffect, useState } from 'react';
import TableContainer from '../../Components/TableContainer/TableContainer';
import { Table, TableBody, TableCell, TableHead, TableRow, TablePagination } from '@mui/material';
import { allLanguage, deleteLanguage } from '../../Components/service/admin';
import { CreateUpdateLanguage } from './CreateUpdateLanguage';
import { DeleteButton } from '../../Components/Buttons/DeleteButton';
import { loader, searchDataWithMultipleKeys, paginate, snackbar } from '../../utils';

export default function Languages() {
    let [allLanguageData, setAllLanguageData] = useState([]);
    let [filteredData, setFilteredData] = useState([]);
    let [search, setSearch] = useState("");
    let [page, setPage] = useState(0);
    let rowsPerPage = 10;

    // Fetch languages data from API
    async function getAllLanguages() {
        try {
            loader.start();
            let res = await allLanguage();
            setAllLanguageData(res?.data?.data || []);
            setFilteredData(res?.data?.data || []);
        } catch (error) {
            console.log(error);
        } finally {
            loader.stop();
        }
    }

    useEffect(() => {
        getAllLanguages();
    }, []);

    // Handle search and reset pagination to page 0 when search changes
    useEffect(() => {
        const searchedData = searchDataWithMultipleKeys(["name"], allLanguageData, search);
        setFilteredData(searchedData);
        setPage(0);
    }, [search, allLanguageData]);

    // Delete handler for languages
    async function deleteLanguageHandler(data) {
        try {
            loader.start();
            await deleteLanguage(data._id);
            snackbar.success("Language deleted successfully")
            getAllLanguages();
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
    const paginatedData = paginate(filteredData, page, rowsPerPage);

    return (
        <>
            <h2 className="fw-600">Languages</h2>
            <div className='row mt-4'>
                <div className='col-lg-5 col-md-6 col-sm-12 col-12'>
                    <input
                        type='search'
                        placeholder='Search'
                        className='form-control'
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
                <div className='col w-100 d-flex justify-content-end'>
                    <CreateUpdateLanguage onSubmit={getAllLanguages} />
                </div>
            </div>
            <div className="mt-4">
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Language</TableCell>
                                <TableCell>Action</TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {paginatedData?.map((res, index) => (
                                <TableRow hover key={index}>
                                    <TableCell>{res?.name}</TableCell>
                                    <TableCell>
                                        <div className='d-flex gap-2'>
                                            <CreateUpdateLanguage formData={res} mode="edit" onSubmit={getAllLanguages} />
                                            <DeleteButton confirmation display={"Language"} data={res} onDelete={deleteLanguageHandler} />
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>

                    {/* Pagination Component */}
                    <TablePagination
                        component="div"
                        count={filteredData.length}
                        page={page}
                        onPageChange={(event, newPage) => setPage(newPage)}
                        rowsPerPage={rowsPerPage}
                        // rowsPerPageOptions={[rowsPerPage]}
                    />
                </TableContainer>
            </div>
        </>
    );
}
