import { Box, Button, Dialog } from "@mui/material";
import { useEffect, useState } from "react";
import Style from "./Eventmanagement.module.css";
import React from "react";
import { Edit } from "@mui/icons-material";
import {
  UploadImage,
  deleteImage,
} from "../../Firebase/cloudStorage/UploadImage";
import { updateDocument } from "../../Firebase/cloudFirestore/updateData";

export const EventModal = ({ allThemes, formData, data, getAllData }) => {
  let [open, setOpen] = useState(false);
  let [newImg, setNewImg] = useState({});
  let [formValue, setFormValue] = useState({ ...formData });

  // let [themeInterest, setThemeInterest] = useState(
  //   allThemes.find((se) => se.name_of_theme == data.theme_of_event)
  //     .category_of_theme
  // );

  let [themeInterest, setThemeInterest] = useState(() => {
    const selectedTheme = allThemes.find(
      (se) => se.name_of_theme === data.theme_of_event
    );
    return selectedTheme ? selectedTheme.category_of_theme : [];
  });

  function themeNameChange(e) {
    let dd = allThemes.find((se) => se.Interestname == e.target.value);
    console.log(dd);
    setThemeInterest(dd.Interestname);
    setFormValue({
      ...formValue,
       Interestname: e.target.value,
      // Interestname: "",
    });
  }

  function themeNameChange(e) {
    let dd = allThemes.find((se) => se.Interestname == e.target.value);
    console.log(dd);
    setThemeInterest(dd);
    setFormValue({
      ...formValue,
      Interestname: e.target.value,
      // Retain the selected interests if they exist in the new theme's category
      // interests: formValue.interests.filter(interest =>
      //   dd.category_of_theme.some(themeInterest => themeInterest.name === interest)
      // ),
    });
  }
  useEffect(() => {}, []);

  async function addEvent(e) {
    e.preventDefault();
    console.log(formValue);
    // console.log(newImg);
    let url = formValue.downloadURL;

 

    try {
      if (newImg.name) {
        let oldImg = url;
        url = await UploadImage(newImg);
        deleteImage(oldImg);
        console.log(url);
      }
      let data = { ...formValue, downloadURL: url };
      await updateDocument("Events", data.id, data);
      getAllData();
      setNewImg({});
      setOpen(false);
    } catch (err) {
      console.log(err);
    }

    // setOpen(false);
  }

  function editClick() {
    console.log(data);
    setFormValue(data);
    setOpen(true);
  }

  function imgChange(file) {
    setNewImg(file);
    // setFormValue({ ...formValue, downloadURL: url });
  }
  return (
    <div>
      <Edit onClick={editClick} />
      <Dialog
        open={open}
        maxWidth={"xs"}
        fullWidth
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="p-4">
          <form onSubmit={addEvent}>
            <div className="row">
              <div className="col-md-12 d-flex flex-column gap-1">
                 <div>
                  <label htmlFor="denomination">Interest</label>
                  <select
                    value={formValue.Interestname}
                    className="form-select"
                    onChange={(e) => {
                      themeNameChange(e);
                    }}
                    aria-label="Default select example"
                  >
                    <option selected>Select Interest of Event</option>
                    {allThemes.map((res) => {
                      console.log(res)
                      return (
                        <option value={res.Interestname}>
                          {res.Interestname}
                        </option>
                      );
                    })}
                  </select>

                  {/* <input
                    type="text"
                    size={40}
                    className="form-control"
                    required
                    onChange={(e)=>{
                        datingData.current.theme_of_event=e.target.value
                    }}
                    value={qrData.qr_purpose}
                    onChange={inpChange}
                  /> */}
                </div> 

                {/* <div>
                  <label htmlFor="denomination">Interest</label>
                  <select
                    value={formValue.interests}
                    className="form-select"
                    required
                    onChange={(e) => {
                      setFormValue({ ...formValue, interests: e.target.value });
                    }}
                    aria-label="Default select example"
                  >
                    <option value={""}>Select the Interest</option>
                    {themeInterest.map((res) => {
                      console.log()
                      return <option value={res.name}>{res.name}</option>;
                    })}
                  </select>
                </div> */}
                <div>
                  <label htmlFor="denomination">Location</label>
                  <input
                    type="text"
                    // size={40}
                    className="form-control"
                    // value={qrData.qr_purpose}
                    // onChange={inpChange}
                    value={formValue.location}
                    onChange={(e) => {
                      setFormValue({ ...formValue, location: e.target.value });
                    }}
                    name="qr_purpose"
                    required
                  />
                </div>
                <div>
                  <label className="">Name of Cafe </label>
                  <input
                    type="text"
                    className="form-control"
                    name="product_count"
                    value={formValue.name_of_cafe}
                    onChange={(e) => {
                      setFormValue({
                        ...formValue,
                        name_of_cafe: e.target.value,
                      });
                    }}
                    required
                    // max={10}
                  />
                </div>

                <div>
                  <label className="">Costs </label>
                  <input
                    type="text"
                    className="form-control"
                    name="product_count"
                    value={formValue.costs}
                    onChange={(e) => {
                      setFormValue({ ...formValue, costs: e.target.value });
                    }}
                    required
                    // max={10}
                  />
                </div>

                <div>
                  <label className="">Description </label>
                  <textarea
                    // type="textarea"
                    className="form-control"
                    name="product_count"
                    value={formValue.description}
                    onChange={(e) => {
                      setFormValue({
                        ...formValue,
                        description: e.target.value,
                      });
                    }}
                    required
                    // max={10}
                  />
                </div>

                <div>
                  <label className="">Images Upload </label>
                  <input
                    size="xl"
                    type="file"
                    onChange={(e) => {
                      imgChange(e.target.files[0]);
                    }}
                    name="select_image"
                  />

                  <img
                    className={`w-100 mt-2`}
                    src={
                      newImg.name
                        ? URL.createObjectURL(newImg)
                        : formValue.downloadURL
                    }
                  />
                </div>
                <div className="create mt-4 h d-flex justify-content-end">
                  <Button
                    className=" mt-3 button-background0"
                    // variant="contained"
                    type="submit"
                  >
                    Save
                  </Button>
                  <Button
                    className={`${Style.button_background0} ms-4 mt-3`}
                    variant=""
                    type="button"
                    onClick={() => setOpen(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </div>
          </form>
        </Box>
      </Dialog>
    </div>
  );
};
