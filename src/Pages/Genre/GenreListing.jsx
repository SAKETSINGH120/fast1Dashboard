import React, { useEffect, useState } from 'react'
import TableContainer from '../../Components/TableContainer/TableContainer';
import { Table, TableBody, TableCell, TableHead, TablePagination, TableRow } from '@mui/material';
import { allGenre, deleteGenre } from '../../Components/service/admin';
import { CreateUpdateGenre } from './CreateUpdateGenre';
import { DeleteButton } from '../../Components/Buttons/DeleteButton';
import { loader, paginate, searchDataWithMultipleKeys, snackbar } from '../../utils';

export const GenreListing = () => {

    let [allGenreData, setAllGenreData] = useState([]);
    let [search, setSearch] = useState("")
    let [allData, setAllData] = useState([])
    let [filteredData, setFilteredData] = useState([]);
    let [page, setPage] = useState(1)
    let rowsPerPage = 10

    async function getAllGenre() {
        try {
            loader.start()
            let res = await allGenre()
            setAllData(res?.data?.data || [])
            setFilteredData(res?.data?.data || []);
        } catch (error) {
            console.log(error)
        }
        finally {
            loader.stop()
        }
    }

    useEffect(() => {
        getAllGenre()
    }, [])

    function onSubmit() {
        getAllGenre()
    }

    async function deleteGenre2(data) {
        try {
            loader.start()
            let res = await deleteGenre(data._id)
            snackbar.success("Genre deleted successfully")
            getAllGenre()
            setSearch("")
            setPage(0)
        } catch (error) {
            if (error?.response?.data?.errormessage !== undefined) {
                snackbar.error(error?.response?.data?.errormessage)
            } else {
                snackbar.error('Some error occupide please check and try again')
            }
            console.log(error)
        }
        finally {
            loader.stop()
        }
    }


    useEffect(() => {
        let paginatedData = paginate(filteredData, page - 1, rowsPerPage);
        setAllGenreData(paginatedData);
    }, [page, filteredData])

    // Search and reset pagination
    useEffect(() => {
        let searchedData = searchDataWithMultipleKeys(["name"], allData, search);
        setFilteredData(searchedData);
        setPage(1);  // Reset pagination to page 1 on search
    }, [search, allData])

    return (
        <>
            <h2 className="fw-600">Genre</h2>
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
                    <CreateUpdateGenre onSubmit={onSubmit} />
                </div>
            </div>
            <div className="mt-4">
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Genre Name</TableCell>
                                <TableCell>Action</TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {allGenreData?.map((res, index) => {
                                return (
                                    <TableRow hover key={index}>
                                        <TableCell>{res?.name}</TableCell>
                                        <TableCell>
                                            <div className='d-flex gap-2'>
                                                <CreateUpdateGenre formData={res} mode="edit" onSubmit={getAllGenre} />
                                                <DeleteButton confirmation display={"Genre"} data={res} onDelete={deleteGenre2} />
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
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
