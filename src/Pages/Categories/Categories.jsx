import React, { useEffect, useState } from 'react'
import TableContainer from '../../Components/TableContainer/TableContainer';
import { Table, TableBody, TableCell, TableHead, TableRow, TablePagination } from '@mui/material';

import { channelCategories, deleteCategory, updateCategorySequence } from '../../Components/service/admin';
import { DeleteButton } from '../../Components/Buttons/DeleteButton';
import { loader, paginate, searchDataWithMultipleKeys, snackbar } from '../../utils';
import { CreateUpdateCategory } from './CreateUpdateCategory';

import { DndContext, closestCenter } from '@dnd-kit/core';
import { arrayMove, SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { MdOutlineDragIndicator } from "react-icons/md";


function SortableRow({ id, children }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <TableRow ref={setNodeRef} style={style} {...attributes} hover>
      {children(listeners)} {/* Pass listeners to children */}
    </TableRow>
  );
}

export default function Categories() {

  let [allCategoriesData, setAllCategoriesData] = useState([]);
  let [allData, setAllData] = useState([])
  let [filteredData, setFilteredData] = useState([]);
  let [search, setSearch] = useState("")
  let [page, setPage] = useState(1);
  let rowsPerPage = 10; // Rows per page

  // Fetch categories data from API
  async function getAllCategories() {
    try {
      loader.start()
      await getCategoryData()
    } catch (error) {
      console.log(error)
    }
    finally {
      loader.stop()
    }
  }


  async function getCategoryData() {
    try {
      let res = await channelCategories()
      setAllCategoriesData(res?.data?.data || [])
      setAllData(res?.data?.data || [])
      setFilteredData(res?.data?.data || [])
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getAllCategories()
  }, [])

  function onSubmit() {
    getAllCategories()
  }

  // Delete handler for categories
  async function deleteCategoryHandler(data) {
    try {
      loader.start()
      await deleteCategory(data._id)
      snackbar.success("Category deleted successfully")
      getAllCategories()
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


  // useEffect(() => {
  //   let paginatedData = paginate(filteredData, page - 1, rowsPerPage);
  //   setAllCategoriesData(paginatedData);
  // }, [page, filteredData])


  useEffect(() => {
    let searchedData = searchDataWithMultipleKeys(["name"], allData, search);
    setAllCategoriesData(searchedData);
    // setPage(1);
  }, [search, allData])

  // Handle drag end and reorder the categories
  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      setFilteredData(async (items) => {
        const oldIndex = items.findIndex((item) => item._id === active.id);
        const newIndex = items.findIndex((item) => item._id === over.id);
        let fullArr = arrayMove(items, oldIndex, newIndex)
        setAllCategoriesData(fullArr)
        let idsArr = fullArr?.map(res => res?._id)
        await updateSequence(idsArr)
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }


  async function updateSequence(arr) {
    let payload = {
      idsArray: arr
    }
    try {
      let res = await updateCategorySequence(payload)
      await getCategoryData()
    } catch (err) {
      console.log(err)
    }
  }


  return (
    <>
      <h2 className="fw-600">Categories</h2>
      <div className='row mt-4'>
        <div className='col-lg-5 col-md-6 col-sm-12 col-12'>
          <input
            type='search'
            placeholder='Search'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className='form-control'
          />
        </div>
        <div className='col w-100 d-flex justify-content-end'>
          <CreateUpdateCategory onSubmit={onSubmit} />
        </div>
      </div>
      <div className="mt-4">
        <TableContainer>
          <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext
              items={allCategoriesData?.map((category) => category._id)}
              strategy={verticalListSortingStrategy}
            >
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell style={{ width: '5%' }}>&nbsp;</TableCell>
                    <TableCell>Category Name</TableCell>
                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {allCategoriesData?.map((res, index) => (
                    <SortableRow key={res._id} id={res._id}>
                      {(listeners) => ( // Pass listeners to the drag icon
                        <>
                          <TableCell style={{ cursor: 'move' }} {...listeners}>
                            <MdOutlineDragIndicator size={20} />
                          </TableCell>
                          <TableCell>{res?.name}</TableCell>
                          <TableCell>
                            <div className='d-flex gap-2'>
                              <CreateUpdateCategory formData={res} mode="edit" onSubmit={getAllCategories} />
                              <DeleteButton confirmation display={"Category"} data={res} onDelete={deleteCategoryHandler} />
                            </div>
                          </TableCell>
                        </>
                      )}
                    </SortableRow>
                  ))}
                </TableBody>

              </Table>
            </SortableContext>
          </DndContext>

          {/* <TablePagination
            component="div"
            count={filteredData.length}
            page={page - 1}
            onPageChange={(event, newPage) => setPage(newPage + 1)}
            rowsPerPage={rowsPerPage}
          /> */}
        </TableContainer>
      </div>
    </>
  )
}
