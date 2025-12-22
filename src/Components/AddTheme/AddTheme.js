import React, { useEffect, useRef, useState } from 'react'
// import "./AddTheme.css"
import Style from './AddTheme.module.css'
import {
  Backdrop,
  CircularProgress,
  Dialog,
  Pagination,
  Popover,
  TablePagination,
  Typography,
} from '@mui/material'
import Button from '@mui/material/Button'

import { Box } from '@mui/material'
import { getCollectionData } from '../../Firebase/cloudFirestore/getData'
import {
  UploadImage,
  UploadImageForMultiple,
  UploadMultipleImages,
  UploadMultipleImagesE,
  deleteImage,
} from '../../Firebase/cloudStorage/UploadImage'
import { addDocument } from '../../Firebase/cloudFirestore/setData'
import { deleteDocument } from '../../Firebase/cloudFirestore/deleteData'
import { Modal, ModalHeader, Spinner, Table } from 'reactstrap'
import { CatchingPokemonSharp, Delete, Edit, ViewAgenda } from '@mui/icons-material'
import { updateDocument } from '../../Firebase/cloudFirestore/updateData'
import VisibilityIcon from '@mui/icons-material/Visibility'

export default function AddTheme() {
  const [open, setOpen] = useState(false)
  const [img2, setImg2] = useState()
  const [icon3, setIcon3] = useState('')
  // const [showInput, setShowInput] = useState(false);
  const [loader, setLoader] = useState(false)
  // const [images, setImages] = useState([]);
  const [allData, setAllData] = useState([])
  const [deleteConfirmationModal, setDeleteConfirmationModal] = useState(false)
  const [EditModal, setEditModal] = useState(false)
  // const [viewModal, setViewModal] = useState(false);
  const [viewModalall, setViewModalall] = useState(false)
  const [inputData, setInputData] = useState('')
  const [check, setCheck] = useState('')

  let [iconimg, setIconimg] = useState(null)
  let [allList, setAllList] = useState([])
  const [disable, setDisable] = useState(false)
  const [error, setError] = useState('')
  const [error1, setError1] = useState('')
  const [error2, setError2] = useState('')

  //  for Pagination
  const [data, setData] = React.useState([])
  const [rowsPerPage1, setRowsPerPage1] = useState(10)
  const [page1, setPage1] = useState(0)
  const [editData, setEditData] = useState({})
  const [editIcon, setEditIcon] = useState([])
  const [updateId, setUpdateId] = useState('')
  // const [themeData, setThemeData] = useState({
  //   name_of_theme: "",
  //   category_of_theme: [],
  //   iconUrl: "",
  // });
  const [editCategoryOfTheam, setEditCategoryOfTheam] = useState([])

  const AddElement = () => {
    // alert("okok")

    setCheck(true)
    setInputData('')

    setAllList([...allList, { name: icon3, imgUrl: '' }])
    console.log(allList)
    setIcon3('')
  }

  const EditElement = () => {
    // alert("okok")

    setCheck(true)
    setInputData('')

    setEditCategoryOfTheam([
      ...editCategoryOfTheam,
      { name: icon3, imgUrl: '', key: false, file: {} },
    ])
    console.log(allList)
    setIcon3('')
  }

  const ThemeData = useRef({
    // name_of_theme: "",
    // category_of_theme: [],
    Interests: '',
    imgUrl: ' ',
  })

  const [themeName, setThemeName] = useState('')
  const [themeNameError, setThemeNameError] = useState('')

  const handleThemeNameChange = (e) => {
    const newThemeName = e.target.value

    // Check if the theme name is empty
    if (!newThemeName.trim()) {
    } else {
      // Check if the theme name already exists
      const themeExists = data1.some((theme) => theme.Interestname === newThemeName)

      if (themeExists) {
        setThemeNameError('Theme with this name already exists')
        setDisable(true)
      } else {
        setThemeNameError('')
        setDisable(false)
      }
    }

    setThemeName(newThemeName)
    ThemeData.current.Interestname = newThemeName
  }

  const addEvent = async (e) => {
    e.preventDefault()

    if (disable == false) {
      // if (allList.length === 0) {
      //   setError(" Please Enter Interest");
      //   return;
      // }
      // if (allList.map(e => typeof e.imgUrl).indexOf("string") !== -1) {
      //   setError("Please select image.");
      //   return;
      // }

      if (iconimg?.name === undefined) {
        setError2('Please Select Images')
        return
      }
      setError2('')
      setError('')

      setLoader(true)

      let imgUrl = await UploadImage(iconimg)

      ThemeData.current.imgUrl = imgUrl
      // await UploadMultipleImages(allList).then(res => {
      //   let urlData = res
      //   console.log(urlData)
      //   let theams = urlData.map(res2 => {
      //     return { name: res2.split('%26%24%26')[1].replaceAll('%20', ' '), imgUrl: res2 }
      //   })
      //   console.log(theams)
      //   ThemeData.current.category_of_theme = theams

      // })

      console.log(ThemeData.current)
      // return
      await addDocument('Themes', ThemeData.current)

      getEvent()
      setOpen(false)
      resetThemeData()

      setLoader(false)

      // let downloadURL = await UploadImage(img2, icon);
      // await addDocument("Themes", { ...ThemeData.current, downloadURL });
    }
  }

  const [data1, setData1] = React.useState([])

  const getEvent = async () => {
    let data = await getCollectionData('Themes')

    setData1(data)
  }

  // console.log(data1, "cheyk6666666666666j")
  useEffect(() => {
    getEvent()
  }, [])

  // const handleDelete = (e) => {
  //   setAllList((prevList) => {
  //     const newList = [...prevList];
  //     newList.splice(e, 1);
  //     return newList;
  //   });
  // };

  useEffect(() => {
    // Reset ThemeData when component mounts
    resetThemeData()
  }, [])

  const resetThemeData = () => {
    ThemeData.current = {
      // name_of_theme: '',
      Interestname: '',
      imgUrl: ' ',
    }
    setIconimg('')
    setAllList([])
    setThemeName('')
    setThemeNameError('')
    setDisable(false)
  }

  // function imgUpload(file, index) {

  //   let arr = [...allList]
  //   arr[index] = { name: arr[index].name, imgUrl: file }
  //   setAllList(arr)
  //   // console.log(arr)
  // }

  // const toggleCheckRow = (index) => {
  //   const updatedSelectedRows = [...selectedRows];
  //   const selectedIndex = updatedSelectedRows.indexOf(index);

  //   if (selectedIndex === -1) {
  //     updatedSelectedRows.push(index);
  //   } else {
  //     updatedSelectedRows.splice(selectedIndex, 1);
  //   }

  //   setSelectedRows(updatedSelectedRows);
  // };

  const deleteSelectedData = async () => {
    // console.log()
    console.log(deletedDocData.id)

    await deleteImage(deletedDocData.imgUrl)

    await deleteDocument('Themes', deletedDocData.id)
    getEvent()

    setDeleteConfirmationModal(false)
  }

  const cancelDelete = () => {
    setDeleteConfirmationModal(false)
  }
  const Editmodalbutton = (data) => {
    console.log(data)
    setUpdateId(data.id)
    // let dd = data.category_of_theme.map(res => {
    //   return { ...res, key: false, file: {} }
    // })
    setEditData(data)
    // setEditCategoryOfTheam(dd)
    setEditModal(true)
  }
  // const Viewmodalbutton = (data) => {
  //   console.log(data)

  //   setImages(data)
  //   // return
  //   setViewModal(true)

  const Viewmodalbtnall = (datall) => {
    setAllData(datall)
    console.log(datall)
    // return
    setViewModalall(true)
  }

  let [deletedDocData, setDeletedDocData] = useState({})

  const deleteSelectedRows = async (res) => {
    setDeletedDocData(res)
    setDeleteConfirmationModal(true)
  }

  function paginate(eventData, cpage) {
    console.log(cpage)

    // setData(slicedData);
  }

  const handleChangePage1 = (event, newPage) => {
    setPage1(newPage)
    console.log(newPage)
    paginate(data, newPage)
  }
  const handleChangeRowsPerPage1 = (event) => {
    setRowsPerPage1(parseInt(event.target.value, 10))

    setPage1(0)
  }

  const addUpdate = async (e) => {
    e.preventDefault()
    // if (editCategoryOfTheam.length === 0 ) {
    //   setError(" Please Enter Interest");
    //   return;
    // }
    console.log(editCategoryOfTheam)

    let arrr = editCategoryOfTheam.filter(
      (res) => res.name.length !== 0 && res.file.name == undefined && res.imgUrl.length == 0,
    )
    console.log(arrr)

    if (arrr.length !== 0) {
      setError1('Please select image.')
      return
    }
    // return

    // if (editCategoryOfTheam.some(e => e?.file.name == undefined)) {

    //   return;
    // }

    setError1('')
    // console.log(editCategoryOfTheam)
    setEditModal(false)
    let imgUploadArr = editCategoryOfTheam.filter((res) => res.file.name !== undefined)
    let imgUploadArrWithNoChanges = editCategoryOfTheam.filter((res) => res.file.name == undefined)
    console.log(editIcon)
    let obj = { ...editData }

    if (editIcon.name !== undefined) {
      let img = await UploadImageForMultiple(editIcon, editIcon.name.split('.')[0])
      obj = { ...obj, imgUrl: img }
      // setEditData(obj)
      console.log(img)
      // console.log(editData)
    }
    // }else{

    // }

    let filterData = imgUploadArrWithNoChanges.map((res) => {
      return { name: res.name, imgUrl: res.imgUrl }
    })

    var theams = []
    if (imgUploadArr.length !== 0) {
      console.log(imgUploadArr)
      let uploadedImg = await UploadMultipleImagesE(imgUploadArr)
      console.log(uploadedImg)

      theams = uploadedImg.map((res2) => {
        console.log(res2)
        return { name: res2.split('%26%24%26')[1].replaceAll('%20', ' '), imgUrl: res2 }
      })

      let totaldata = [...filterData, ...theams]

      let updateData = {
        ...obj,
        category_of_theme: totaldata,
      }

      console.log(updateData)
      console.log(updateId)
      // return

      await updateDocument('Themes', updateId, updateData)

      getEvent()
    } else {
      let totaldata = [...filterData, ...theams]

      let updateData = {
        ...obj,
        category_of_theme: totaldata,
      }

      console.log(updateData)
      // console.log(updateId)
      // return

      await updateDocument('Themes', updateId, updateData)

      getEvent()
    }
  }
  return (
    <div>
      <div className="w-100 d-flex justify-content-end ">
        <button className={Style.button_background1} onClick={() => setOpen(true)}>
          Add Interest
        </button>
      </div>

      <Dialog
        open={open}
        maxWidth={'xs'}
        fullWidth
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="p-4">
          <form onSubmit={addEvent}>
            {/* {loader && (
        <div className="d-flex align-items-center justify-content-center w-100">
          <Spinner />
        </div>
      )} */}

            <Backdrop
              sx={{ color: 'pink', zIndex: (theme) => theme.zIndex.drawer + 1 }}
              open={loader}
            >
              <CircularProgress color="inherit" />
            </Backdrop>
            <div className="row">
              <div className="col-md-12">
                <div>
                  <label htmlFor="denomination"> Name of Interest</label>
                  <input
                    type="text"
                    size={40}
                    className={`form-control ${themeNameError ? 'is-invalid' : ''}`}
                    placeholder="Write the name of interest"
                    name="qr_purpose"
                    required
                    value={themeName}
                    onChange={handleThemeNameChange}
                  />
                  {themeNameError && <div className="invalid-feedback">{themeNameError}</div>}
                </div>
              </div>

              {/* <div className={`pt-2 ${Style.inputIcon}`}>
                  <label className=""> Name of Interest</label>
                  <input
                    type="text"
                    className="form-control"
                    name="product_count"
                    placeholder="Enter interests for theme"
                    // required
                    // value={qrData.product_count}
                    // onChange={inpChange}
                    value={icon3}
                    // required
                    // max={10}
                    onChange={(e) => {
                      if (e.target.value === " ") {
                        e.target.value = ''
                      } else {
                        ThemeData.current.Interestname = e.target.value;
                        setCheck(e.target.value);
                        setIcon3(e.target.value)
                      }
                    }}

                  />
                  </div> */}
              {/* {check.length !== 0 ? <span className={` ${Style.IconAdd} pointer`} onClick={AddElement}>Add</span> : ''} */}

              <div className={`pt-2 ${Style.inputIcon}`}>
                <label htmlFor="denomination">Upload Interest's Image</label>
                <input
                  required
                  type="text"
                  size={40}
                  className="form-control"
                  placeholder="upload interest's image"
                  // value={qrData.qr_purpose}
                  // onChange={inpChange}
                  value={iconimg?.name}
                  name="qr_purpose"
                  disabled
                  onChange={(e) => {
                    ThemeData.current.imgUrl = e.target.value
                  }}
                />
                {error2 && <div style={{ color: 'red', textAlign: 'end' }}>{error2}</div>}
                <div>
                  <label htmlFor="Urlicon">
                    <i class={`bi bi-box-arrow-up pointer ${Style.IconAdd}`}> </i>
                  </label>
                  <input
                    type="file"
                    onChange={(e) => setIconimg(e.target.files[0])}
                    hidden
                    id="Urlicon"
                  />
                </div>
              </div>

              {/* {allList?.map((res, index) => {
                  return (
                    <div key={index} className="d-flex justify-content-between pt-3 " >
                      <div className={Style.ImageArrow} ><i className="bi bi-x-lg" onClick={() => handleDelete()}></i> <span className={Style.headingback}>{res.name}</span>  </div>

                      <div>
                        <span>
                          {res?.imgUrl?.name}
                        </span>
                        <label htmlFor={`Addll${index}`}>
                          <span className={Style.imagehaeding}>Image</span> <i class={`bi bi-box-arrow-up pointer pointer ${Style.imagehaeding}`}>  </i>
                        </label>
                        <input type="file" onChange={(e) => imgUpload(e.target.files[0], index)} hidden id={`Addll${index}`} value={``} />
                      </div>

                    </div>

                  )
                })} */}

              {error && <div style={{ color: 'red', textAlign: 'end' }}>{error}</div>}

              {/* <div>
               <label className="">Background Image</label>
                <input
                  type="file"
                  className=""
                  name="select_image"
                  onChange={(e) => setImg2(e.target.files[0])}
                  required
                />
               </div> */}
              <div className="create mt-4 h d-flex justify-content-end">
                <Button
                  className={`mt-3 ${Style.button_background0}`}
                  type="submit"
                  disabled={loader}
                >
                  Save
                </Button>
                <Button
                  className="button-background0 ms-4 mt-3"
                  variant=""
                  type="button"
                  onClick={() => setOpen(false)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </form>
        </Box>
      </Dialog>

      <div class="container-fluid">
        <div class=" d-flex">
          <div>
            {' '}
            <h1 class="d-inline-block">Interest</h1>
          </div>

          <div></div>
        </div>
      </div>

      {/* <Box className="pb-3 d-flex justify-content-between mx-3">
        <Grid container>
          <Grid item md={6} xs={12}>
            <input
              className="w-75 form-control"
              type="search"
              placeholder="Search"
             
            />
          </Grid>
        </Grid>
      </Box> */}
      <Box sx={{ m: 2 }} className="border-1">
        <Table bordered hover responsive size="lg">
          <thead>
            <tr>
              {/* <th className="">
                Name of Theme
              </th> */}
              <th>Interests</th>
              <th className="">Interest's Image</th>

              {/* <th>
                Background Image
              </th> */}
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data1.map((res, index) => {
              // console.log(data1.res)
              return (
                <tr key={index}>
                  {/* <td className="">

                    {res.name_of_theme}
                  </td> */}
                  <td className={Style.InterestSize}>
                    <div className={` ${Style.Intrestname}`}>{res.Interestname}</div>
                    {/* <div className="d-flex flex-wrap">
                      {res?.category_of_theme?.map((res, index) => {
                        console.log(res)

                        return (
                        
                          // <img src={res.category_of_theme.name}  className="image-size" />
                        )
                      })}
                    </div> */}
                  </td>
                  <td>
                    <img src={res.imgUrl} className={Style.ImageIcon} />
                  </td>

                  {/* <td className={Style.InterestSize1}  >
                    <div className={`d-flex flex-wrap ${Style.InterestSize1}`}>
                      {res?.category_of_theme.slice(0, 4).map((res, Index) => (
                        <img
                          key={Index}
                          src={res.imgUrl}
                          className={`me-2 ${Style.ImgaeSize}`}
                          alt={`image-${index}-${Index}`}
                        />
                      ))}
                      {res?.category_of_theme.length > 4 && (
                        <div className={`me-2 ${Style.ImgaeSize}`}>
                          +{res.category_of_theme.length - 4}
                        </div>
                      )}
                    </div>
                  </td> */}
                  <td>
                    <button className={Style.EditButton} onClick={() => Viewmodalbtnall(res)}>
                      {' '}
                      <VisibilityIcon />
                    </button>
                  </td>
                  <td>
                    <button className={Style.EditButton} onClick={() => Editmodalbutton(res)}>
                      <Edit />
                    </button>
                  </td>
                  <td>
                    <button
                      className={`${Style.DeleteButton}`}
                      onClick={() => deleteSelectedRows(res)}
                    >
                      <Delete />
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </Table>
      </Box>
      {/* <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
        <TablePagination
          component="div"
          count={data1.length}
          page={page1}
          onPageChange={handleChangePage1}
          rowsPerPage={rowsPerPage1}
          onRowsPerPageChange={handleChangeRowsPerPage1}
        />
      </Box> */}

      <Modal isOpen={deleteConfirmationModal} toggle={cancelDelete}>
        {/* <ModalHeader toggle={cancelDelete}>Sure !!!</ModalHeader> */}

        <div className="p-4">
          <div className="">
            <div className={Style.ModalDlt1}>
              Are you sure you want to delete the selected Interest ?
            </div>
            <div className={Style.ModalDlt}>
              This will delete this Interest permanently, you cannot undo this action
            </div>
          </div>
          <div className={Style.Allbutton}>
            <div className={Style.CencelButton} onClick={cancelDelete}>
              Cancel
            </div>
            <div className={Style.DelteButton} onClick={deleteSelectedData}>
              Delete
            </div>
          </div>
        </div>
        {/* <div className="d-flex justify-content-center m-5 gap-5">
          <button className={Style.cencelButton} onClick={cancelDelete}>
            Cancel
          </button>
          <button className={Style.Conrimbutoon} onClick={deleteSelectedData}>
            Confirm
          </button>
        </div> */}
      </Modal>

      <Modal isOpen={EditModal} toggle={() => setEditModal(!EditModal)}>
        <Box className="p-4">
          <form onSubmit={addUpdate}>
            <div className="row">
              <div className="col-md-12">
                <div>
                  <label htmlFor="denomination"> Name of Interest</label>
                  <input
                    type="text"
                    size={40}
                    className={`form-control ${themeNameError ? 'is-invalid' : ''}`}
                    placeholder="Write the name of interest"
                    name="qr_purpose"
                    required
                    defaultValue={editData.Interestname}
                    onChange={(e) => setEditData({ ...editData, Interestname: e.target.value })}
                  />
                  {themeNameError && <div className="invalid-feedback">{themeNameError}</div>}
                </div>
              </div>

              <div className={`pt-2 ${Style.inputIcon}`}>
                <label htmlFor="denomination">Interest's Images</label>
                <input
                  type="text"
                  size={40}
                  className="form-control"
                  placeholder="upload Interest Image"
                  // value={qrData.qr_purpose}
                  // onChange={inpChange}
                  value={
                    editIcon.name !== undefined
                      ? editIcon.name
                      : editData?.imgUrl?.split('%26%24%26')[1]?.replaceAll('%20', ' ')
                  }
                  name="qr_purpose"
                  // required
                />
                <div>
                  <label htmlFor="Urlicon">
                    <i class={`bi bi-box-arrow-up pointer ${Style.IconAdd}`}> </i>
                  </label>
                  <input
                    type="file"
                    onChange={(e) => setEditIcon(e.target.files[0])}
                    hidden
                    id="Urlicon"
                  />
                </div>
              </div>

              {/* <div className={`pt-2 ${Style.inputIcon}`}>
                <label className="">Interest</label>
                <input
                  type="text"
                  className="form-control"
                  name="product_count"
                  placeholder="Enter interests for theme"

                  value={editIcon?.category_of_theme !== undefined ? editIcon?.category_of_theme : editData?.current?.imgUrl?.split('%26%24%26')[1]?.replaceAll('%20', ' ')}
                  onChange={(e) => {
                    if (e.target.value === " ") {
                      e.target.value = ''
                    } else {
                      setCheck(e.target.value);
                      setIcon3(e.target.value)
                    }
                  }}

                />
                {check.length !== 0 ? <span className={` ${Style.IconAdd} pointer`} onClick={EditElement}>Add</span> : ''}
              </div> */}

              {/* {editCategoryOfTheam?.map((res, index) => {
                return (
                  <>
                    {res.key == false ? <div key={index} className="d-flex justify-content-between pt-3 " >
                      <div className={` d-flex ${Style.ImageArrow}`} ><EditDropDown data={res} index={index} /><span className={Style.headingback1}>{res.name}</span>  </div>
                      <div>
                        <span>
                        {res?.name}
                      </span>
                        <label htmlFor={`Addll${index}`}>
                          <span className={Style.imagehaeding}>Image</span> <i class={`bi bi-box-arrow-up pointer pointer ${Style.imagehaeding}`}>  </i>
                        </label>
                        <input type="file" onChange={(e) => {
                          let arr = [...editCategoryOfTheam]
                          arr[index].file = e.target.files[0]
                          setEditCategoryOfTheam(arr)

                          imgUpload(e.target.files[0], index)
                        }} hidden id={`Addll${index}`} value={editCategoryOfTheam.imgUrl} />
                      </div>
                      {error && <div style={{ color: 'red' }}>{error}</div>}
                    </div> : <>
                      <div className={`pt-2 ${Style.inputIcon}`}>
                        <label className="">Interest</label>
                        <input
                          type="text"
                          className="form-control"
                          name="product_count"
                          placeholder="Enter interests for theme"

                          defaultValue={res.name}
                          onChange={(e) => {
                            if (e.target.value === " ") {
                              e.target.value = ''
                            } else {
                              let arr = [...editCategoryOfTheam]
                              arr[index].name = e.target.value
                              setEditCategoryOfTheam(arr)
                              setEditData({...editData,category_of_theme: [category_of_theme[index].name:e.target.value}])
                            }
                          }}

                        />
                        {<span className={` ${Style.IconAdd1} pointer`} onClick={() => {
                          let arr = [...editCategoryOfTheam]
                          arr[index].key = false
                          setEditCategoryOfTheam(arr)
                        }}>Save</span>}
                      </div>

                    </>}
                  </>

                )
              })} */}
              {/* 
              {error1 && <div style={{ color: 'red', textAlign: "end" }}>{error1}</div>} */}

              <div className="create mt-4 h d-flex justify-content-end">
                <Button
                  className={`mt-3 ${Style.button_background0}`}
                  variant="contained"
                  type="submit"
                >
                  Update
                </Button>
                <Button
                  className="button-background0 ms-4 mt-3"
                  variant=""
                  type="button"
                  onClick={() => setEditModal(!EditModal)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </form>
        </Box>
      </Modal>

      {/* <Modal isOpen={viewModal} toggle={() => {
        setViewModal(!viewModal)
        setImages([])
      }}>
        <ModalHeader>Background Images</ModalHeader>
        <div className={Style.ImgesModal}>
          {images?.map((res, index) => (
            <div key={index}>
              <div className={Style.parentIntrest}>


                <img

                  src={res.imgUrl}
                  className={`me-2 ${Style.ImgaeSize1}`}

                />
<span className={`text-center ${Style.NameIntrest}`}>{res.name}</span>
              </div>
            </div>
          ))}
        </div>
      </Modal> */}

      <Modal isOpen={viewModalall} toggle={Viewmodalbtnall} className="">
        {/* <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel"> */}

        {/* <div class="carousel-inner">

            {allData && allData?.category_of_theme?.map((res, index) => {
              return (

                <div className={`carousel-item ${index == 0 ? 'active' : ''}`}>
                  <img src={res?.imgUrl} class="d-block w-100" className={Style.Crousel} />
                </div>

              )
            })}
            

          </div> */}
        {/* <button className={`carousel-control-prev ${Style.Buttoncarusel}`} type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
          </button>
          <button className={`carousel-control-next ${Style.Buttoncarusel}`} type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
          </button> */}

        {/* </div> */}
        <div className={`d-flex justify-content-start ${Style.Backgroundimges}`}>
          <div className="pb-3">
            {' '}
            <span className={` ${Style.themeName1}`}>Interest's Images</span>
          </div>
        </div>
        <div className="pt-3 pb-3">
          {/* <div>  <span className={` ${Style.themeName1}`}>Interest's Images</span></div> */}
          <div className="mt-3">
            <img src={allData.imgUrl} class="d-block w-100" className={Style.Crousel} />
            {/* <img src={allData.iconUrl} className={Style.IconSize} /> */}
          </div>
        </div>

        <div className={`d-flex justify-content-end ${Style.Backgroundimges1}`}>
          <div className="pointer ">
            <i
              className="bi bi-x-lg fs-4 text-dark mt-4 "
              onClick={() => setViewModalall(false)}
            ></i>
          </div>
        </div>

        <div className="px-3 pb-3">
          <div className="pt-3">
            <span className={Style.themeName}>Name of Interest</span>
            <div className={`pt-2 ${Style.ThemeName}`}>{allData.Interestname}</div>
            {/* <div>{allData.iconUrl}</div> */}
          </div>

          {/* <span className={`pt-4 ${Style.themeName}`}>Interests</span>
          <div className="d-flex flex-wrap pt-2">

            {allData?.category_of_theme?.map((res, index) => (
              <div key={index} className={`me-2 mt-3 ${Style.IntrestTab}`} >
                {res?.name}
              </div>
            ))}
          </div> */}
        </div>
      </Modal>
    </div>
  )

  // function EditDropDown({ data, index }) {
  //   const [anchorEl, setAnchorEl] = useState(null)

  //   const handleClick = (event) => {
  //     setAnchorEl(event.currentTarget);
  //   };

  //   const handleClose = () => {
  //     setAnchorEl(null);
  //   };

  //   function deleteCategory(name) {
  //     let arr = [...editCategoryOfTheam]
  //     let newArr = arr.filter(res => res.name !== name)
  //     setEditCategoryOfTheam(newArr)
  //     // console.log(editData)
  //   }

  //   function EditCategory(index, idd) {
  //     let arr = [...editCategoryOfTheam]
  //     arr[index].key = true
  //     setEditCategoryOfTheam(arr)
  //   }

  //   const open = Boolean(anchorEl);
  //   const id = open ? 'simple-popover' : undefined;
  //   return (
  //     <>
  //       <div className={``}>
  //         <div className="pointer" aria-describedby={id} variant="contained" onClick={handleClick}>
  //           <i className="bi bi-three-dots-vertical me-2"></i>
  //         </div>
  //         <Popover
  //           id={id}
  //           open={open}
  //           anchorEl={anchorEl}
  //           onClose={handleClose}
  //           anchorOrigin={{
  //             vertical: 'bottom',
  //             horizontal: 'left',
  //           }}
  //         >
  //           <div className="">
  //             <div className="p-1 pointer" onClick={(e) => {
  //               setAnchorEl(false);
  //               EditCategory(index)
  //             }}><span className={Style.DltCustom}><Edit /> Edit</span></div>
  //             {/* <hr className="p-0"/> */}
  //             <div className="border-top p-1 pointer" onClick={(e) => {
  //               setAnchorEl(false);
  //               deleteCategory(data.name)
  //             }}><span className={Style.DltCustom}><i class="bi bi-x-lg"></i> Delete</span></div>
  //           </div>
  //         </Popover>
  //       </div>

  //     </>
  //   )
  // }
}
