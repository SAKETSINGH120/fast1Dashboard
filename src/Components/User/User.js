import React, { useState } from "react";
import { DropdownToggle, DropdownMenu, Dropdown, DropdownItem } from "reactstrap";
import { List } from "@mui/material";
import { Link } from "react-router-dom";
import { LuUser2 } from "react-icons/lu";
import { IoSettingsOutline } from "react-icons/io5";
// import { FaUsersCog } from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import { IoIosArrowDown } from "react-icons/io";
import UserAvatar from "./UserAvatar";
const User = () => {
  const [open, setOpen] = useState(false);
  // const [profile, setProfile] = useState();
 
  const toggle = () => setOpen(!open);

  // const handleSignout = () => {
  //   localStorage.removeItem("accessToken");
  // };
  // async function userData() {
  //   try {
  //     let response = await getUserById(userId());
  //     setProfile(response.data.data);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }
  // useEffect(() => {
  //   userData();
  // }, []);
  return (
    <Dropdown isOpen={open} className="user-dropdown" toggle={toggle}>
      <DropdownToggle
        tag="a"
        href="#toggle"
        className="d-flex"
        style={{ textDecoration: 'none' }}
        onClick={(ev) => {
          ev.preventDefault();
        }}
      >
        <div className="d-flex gap-3">
          <UserAvatar />
          <div className="d-none d-md-block">
            <div className="f-12 text-black">Admin <IoIosArrowDown /></div>
            <div className="f-11">admin</div>
          </div>
        </div>
      </DropdownToggle>
      <DropdownMenu end className="">
        <div className="p-3 px-4 bg-lighter d-none d-md-block">
          <div className="d-flex gap-3">
            <UserAvatar />
            <div className="d-flex flex-column">
              <span className="f-12 text-black">Admin</span>
              <span className="f-11 text-secondary">admin@gmail.com</span>
            </div>
          </div>
        </div>
        <DropdownItem divider className="d-none d-md-block"/>
        {/* <DropdownItem className="f-14 p-2 px-4 pt-3"><LuUser2 className={`text-secondary fs-6 me-2`} />View Profile</DropdownItem> */}
        <DropdownItem className="f-14 p-2 px-4 pb-3"><IoSettingsOutline className={`text-secondary fs-6 me-2`} />Settings</DropdownItem>
        
        <DropdownItem divider />
        <div className="pb-2 px-4">
          <List>
            <Link style={{textDecoration:'none'}} className="text-secondary d-flex gap-2 align-items-center f-14" onClick={()=>{
              // localStorage.getItem("isLoggedIn")
              localStorage.clear('isLoggedIn')
            }} to={`/login`} >
              <MdLogout className="fs-6"/>
              <span className="">Sign Out</span>
            </Link>
          </List>
        </div>
      </DropdownMenu>
    </Dropdown>
  );
};

export default User;
