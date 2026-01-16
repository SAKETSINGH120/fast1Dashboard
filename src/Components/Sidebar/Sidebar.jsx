import React, { useEffect, useState } from "react";
import style from "./style.module.css";
import {
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  useMediaQuery,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import MuiAppBar from "@mui/material/AppBar";
import { useNavigate } from "react-router-dom";
import { HiUsers, HiVideoCamera } from "react-icons/hi2";
import { HiMiniSignal } from "react-icons/hi2";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoIosArrowForward } from "react-icons/io";
import { LuUser } from "react-icons/lu";
import { FaUsers } from "react-icons/fa";
import { FaVideo } from "react-icons/fa6";
import { HiOutlineFilm } from "react-icons/hi2";
import { BiSolidCategory } from "react-icons/bi";
import { MdBroadcastOnHome } from "react-icons/md";
import { RiAdvertisementFill } from "react-icons/ri";
import { RiAdvertisementLine } from "react-icons/ri";
import { TbPackages } from "react-icons/tb";
import { MdSpaceDashboard } from "react-icons/md";
import { MdOutlineFormatListBulleted } from "react-icons/md";
import { MdPayments } from "react-icons/md";
import { FaUsersCog } from "react-icons/fa";

import { FiSettings } from "react-icons/fi";
// import User from '../User/User';
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import { IoIosBusiness } from "react-icons/io";
import { HiUserGroup } from "react-icons/hi2";
import { BsDatabase } from "react-icons/bs";
import { MdFeaturedPlayList } from "react-icons/md";
import { MdOutlineVideoLibrary } from "react-icons/md";
import { BiMoviePlay } from "react-icons/bi";
import { BsMusicNoteList } from "react-icons/bs";
import { MdPodcasts } from "react-icons/md";
import { MdHighlight } from "react-icons/md";
import { RiUserSharedFill } from "react-icons/ri";
import User from "../User/User";

const drawerWidth = 280;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "center",
}));

export default function Sidebar({ children }) {
  const matches = useMediaQuery("(min-width:1199px)");
  const [open, setOpen] = useState(true);
  const [toggle1, setToggle1] = useState(false);
  const [toggle2, setToggle2] = useState(false);
  const [toggle3, setToggle3] = useState(false);
  const [toggle4, setToggle4] = useState(false);
  const [toggle5, setToggle5] = useState(false);
  const [toggle6, setToggle6] = useState(false);
  const [toggle7, setToggle7] = useState(false); // Media Hub toggle
  const [toggleShorts, setToggleShorts] = useState(false); // Shorts dropdown
  const [togglePodcasts, setTogglePodcasts] = useState(false); // Podcasts dropdown
  const [toggleTunes, setToggleTunes] = useState(false); // Tunes dropdown
  const [toggleDevotionals, setToggleDevotionals] = useState(false); // Devotionals dropdown
  const [toggleSports, setToggleSports] = useState(false); // Sports dropdown

  const navigate = useNavigate();
  let location = window.location.href;

  function activeRoute(res) {
    if (location.includes(res)) {
      return true;
    } else {
      return false;
    }
  }

  useEffect(() => {
    if (matches) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [matches]);

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <AppBar
          sx={{ background: "white" }}
          position="fixed"
          open={!matches ? false : open}
        >
          <Toolbar className="d-flex justify-content-between align-items-center">
            {open ? (
              <div></div>
            ) : (
              <div>
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  onClick={() => setOpen(!open)}
                  edge="start"
                  sx={{ mr: 2 }}
                >
                  <RxHamburgerMenu color="#526484" size={26} />
                </IconButton>
                <img src="/images/logo.png" alt="" width="40px" />
              </div>
            )}
            <div
              className="pointer text-black pe-md-4 pe-sm-2 pe-0 mt-1"
              style={{ marginTop: "-10px" }}
            >
              <User />
            </div>
          </Toolbar>
        </AppBar>

        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
              backgroundColor: "#101924",
              color: "#526484",
            },
          }}
          variant={!matches ? "temporary" : "persistent"}
          open={open}
          onClose={() => setOpen(!open)}
        >
          <DrawerHeader className="d-flex justify-content-start gap-3 ps-3">
            <IconButton
              aria-label="open drawer"
              onClick={() => setOpen(!open)}
              edge="start"
              sx={{ ml: 1.2 }}
            >
              <RxHamburgerMenu color="#526484" size={26} />
            </IconButton>
            <img src="/images/logo.png" alt="" width="70px" />
            <span style={{ color: "white" }}>Fast1</span>
          </DrawerHeader>
          <Divider sx={{ backgroundColor: "#526484", color: "#526484" }} />

          <List className="mt-3">
            <ListItem className="pb-0">
              <ListItemButton
                className={`${
                  activeRoute("dashboard") ? "activeTab" : ""
                } rounded`}
                onClick={() => navigate("/dashboard")}
              >
                <ListItemIcon>
                  <MdSpaceDashboard
                    size={20}
                    color={activeRoute("dashboard") ? "#3B76EF" : "#526484"}
                  />
                </ListItemIcon>
                <ListItemText primary={<div className="">Dashboard</div>} />
              </ListItemButton>
            </ListItem>

            <ListItem className="pb-0">
              <ListItemButton
                className={`${
                  activeRoute("userlisting") || activeRoute("subscriberslist")
                    ? "activeTab"
                    : ""
                } rounded`}
                // onClick={() => navigate("/userlisting")}
                onClick={() => setToggle1(!toggle1)}
              >
                <ListItemIcon>
                  <HiUsers
                    size={20}
                    color={
                      activeRoute("userlisting") ||
                      activeRoute("subscriberslist")
                        ? "#3B76EF"
                        : "#526484"
                    }
                  />
                </ListItemIcon>
                <ListItemText
                  primary={
                    <div className="w-100 d-flex justify-content-between align-items-center">
                      Users
                      {toggle1 ? (
                        <IoIosArrowUp className="ms-2" />
                      ) : (
                        <IoIosArrowForward className="ms-2" />
                      )}
                    </div>
                  }
                />
              </ListItemButton>
            </ListItem>
            <div
              className={`px-3 ps-5`}
              style={{
                height: toggle1 ? "100px" : "0px",
                overflow: "hidden",
                transition: "height 0.3s",
              }}
            >
              <List className="">
                <ListItemButton
                  className={` ${
                    activeRoute("userlisting") ? "activeTab" : ""
                  } rounded`}
                  onClick={() => navigate("/userlisting")}
                >
                  <ListItemIcon>
                    <LuUser
                      size={16}
                      color={activeRoute("userlisting") ? "#3B76EF" : "#526484"}
                    />
                  </ListItemIcon>
                  <ListItemText primary={<div className="f-15">Users</div>} />
                </ListItemButton>
                <ListItemButton
                  className={` ${
                    activeRoute("subscriberslist") ? "activeTab" : ""
                  } rounded`}
                  onClick={() => navigate("/subscriberslist")}
                >
                  <ListItemIcon>
                    <FaUsers
                      size={16}
                      color={
                        activeRoute("subscriberslist") ? "#3B76EF" : "#526484"
                      }
                    />
                  </ListItemIcon>
                  <ListItemText
                    primary={<div className="f-15">Subscribers</div>}
                  />
                </ListItemButton>
              </List>
            </div>

            <ListItem className="pb-0">
              <ListItemButton
                className={`${
                  activeRoute("homeModule") ? "activeTab" : ""
                } rounded`}
                onClick={() => navigate("/homeModule")}
              >
                <ListItemIcon>
                  <TbPackages
                    size={20}
                    color={activeRoute("homeModule") ? "#3B76EF" : "#526484"}
                  />
                </ListItemIcon>
                <ListItemText primary={<div className="">Home Module</div>} />
              </ListItemButton>
            </ListItem>

            {/* home Title */}

            <ListItem className="pb-0">
              <ListItemButton
                className={`${
                  activeRoute("homeTitle") ? "activeTab" : ""
                } rounded`}
                onClick={() => navigate("/homeTitle")}
              >
                <ListItemIcon>
                  <TbPackages
                    size={20}
                    color={activeRoute("homeTitle") ? "#3B76EF" : "#526484"}
                  />
                </ListItemIcon>
                <ListItemText primary={<div className="">Home Titles</div>} />
              </ListItemButton>
            </ListItem>
            {/* <ListItem className="pb-0">
              <ListItemButton
                className={`${activeRoute("media") ? "activeTab" : ""} rounded`}
                // onClick={() => navigate("/userlisting")}
                onClick={() => setToggle2(!toggle2)}
              >
                <ListItemIcon>
                  <FaVideo
                    size={20}
                    color={activeRoute("media") ? "#3B76EF" : "#526484"}
                  />
                </ListItemIcon>
                <ListItemText
                  primary={
                    <div className="w-100 d-flex justify-content-between align-items-center">
                      Media
                      {toggle2 ? (
                        <IoIosArrowUp className="ms-2" />
                      ) : (
                        <IoIosArrowForward className="ms-2" />
                      )}
                    </div>
                  }
                />
              </ListItemButton>
            </ListItem>
            <div
              className={`px-3 ps-5`}
              style={{
                height: toggle2 ? "190px" : "0px",
                overflow: "hidden",
                transition: "height 0.3s",
              }}
            >
              <List className="">
                <ListItemButton
                  className={` ${
                    activeRoute("genreListing") ? "activeTab" : ""
                  } rounded`}
                  onClick={() => navigate("/media/genreListing")}
                >
                  <ListItemIcon>
                    <HiOutlineFilm
                      size={16}
                      color={
                        activeRoute("genreListing") ? "#3B76EF" : "#526484"
                      }
                    />
                  </ListItemIcon>
                  <ListItemText primary={<div className="f-15">Genre</div>} />
                </ListItemButton>
                <ListItemButton
                  className={` ${
                    activeRoute("categories") ? "activeTab" : ""
                  } rounded`}
                  onClick={() => navigate("/media/categories")}
                >
                  <ListItemIcon>
                    <BiSolidCategory
                      size={16}
                      color={activeRoute("categories") ? "#3B76EF" : "#526484"}
                    />
                  </ListItemIcon>
                  <ListItemText
                    primary={<div className="f-15">Category</div>}
                  />
                </ListItemButton>
                <ListItemButton
                  className={` ${
                    activeRoute("broadcaster") ? "activeTab" : ""
                  } rounded`}
                  onClick={() => navigate("/media/broadcaster")}
                >
                  <ListItemIcon>
                    <MdBroadcastOnHome
                      size={16}
                      color={activeRoute("broadcaster") ? "#3B76EF" : "#526484"}
                    />
                  </ListItemIcon>
                  <ListItemText
                    primary={<div className="f-15">Broadcaster</div>}
                  />
                </ListItemButton>
                <ListItemButton
                  className={` ${
                    activeRoute("languages") ? "activeTab" : ""
                  } rounded`}
                  onClick={() => navigate("/media/languages")}
                >
                  <ListItemIcon>
                    <MdBroadcastOnHome
                      size={16}
                      color={activeRoute("languages") ? "#3B76EF" : "#526484"}
                    />
                  </ListItemIcon>
                  <ListItemText
                    primary={<div className="f-15">Languages</div>}
                  />
                </ListItemButton>
              </List>
            </div> */}

            {/* <ListItem className="pb-0">
              <ListItemButton
                className={`${
                  activeRoute("channel") ? "activeTab" : ""
                } rounded`}
                onClick={() => navigate("/channel")}
              >
                <ListItemIcon>
                  <HiMiniSignal
                    size={20}
                    color={activeRoute("channel") ? "#3B76EF" : "#526484"}
                  />
                </ListItemIcon>
                <ListItemText
                  primary={<div className="">Live Management</div>}
                />
              </ListItemButton>
            </ListItem> */}

            {/* <ListItem className="pb-0">
              <ListItemButton
                className={`${
                  activeRoute("packageListing") ? "activeTab" : ""
                } rounded`}
                onClick={() => navigate("/packageListing")}
              >
                <ListItemIcon>
                  <TbPackages
                    size={20}
                    color={
                      activeRoute("packageListing") ? "#3B76EF" : "#526484"
                    }
                  />
                </ListItemIcon>
                <ListItemText primary={<div className="">Packages</div>} />
              </ListItemButton>
            </ListItem> */}

            <ListItem className="pb-0">
              <ListItemButton
                className={`${
                  activeRoute("PrivacyPolicy") ? "activeTab" : ""
                } rounded`}
                onClick={() => navigate("/PrivacyPolicy")}
              >
                <ListItemIcon>
                  <TbPackages
                    size={20}
                    color={activeRoute("PrivacyPolicy") ? "#3B76EF" : "#526484"}
                  />
                </ListItemIcon>
                <ListItemText
                  primary={<div className="">Privacy and Policy</div>}
                />
              </ListItemButton>
            </ListItem>
            <ListItem className="pb-0">
              <ListItemButton
                className={`${
                  activeRoute("TermsConditions") ? "activeTab" : ""
                } rounded`}
                onClick={() => navigate("/TermsConditions")}
              >
                <ListItemIcon>
                  <TbPackages
                    size={20}
                    color={
                      activeRoute("TermsConditions") ? "#3B76EF" : "#526484"
                    }
                  />
                </ListItemIcon>
                <ListItemText
                  primary={<div className="">Terms and Conditions</div>}
                />
              </ListItemButton>
            </ListItem>

            <ListItem className="pb-0">
              <ListItemButton
                className={`${
                  activeRoute("ContactUs") ? "activeTab" : ""
                } rounded`}
                onClick={() => navigate("/Contact")}
              >
                <ListItemIcon>
                  <TbPackages
                    size={20}
                    color={activeRoute("ContactUs") ? "#3B76EF" : "#526484"}
                  />
                </ListItemIcon>
                <ListItemText primary={<div className="">Contact Us</div>} />
              </ListItemButton>
            </ListItem>

            <ListItem className="pb-0">
              <ListItemButton
                className={`${activeRoute("About") ? "activeTab" : ""} rounded`}
                onClick={() => navigate("/About")}
              >
                <ListItemIcon>
                  <TbPackages
                    size={20}
                    color={activeRoute("About") ? "#3B76EF" : "#526484"}
                  />
                </ListItemIcon>
                <ListItemText primary={<div className="">About Us</div>} />
              </ListItemButton>
            </ListItem>

            <ListItem className="pb-0">
              <ListItemButton
                className={`${
                  activeRoute("Subscriber") ? "activeTab" : ""
                } rounded`}
                onClick={() => navigate("/Subscriber")}
              >
                <ListItemIcon>
                  <TbPackages
                    size={20}
                    color={activeRoute("Subscriber") ? "#3B76EF" : "#526484"}
                  />
                </ListItemIcon>
                <ListItemText
                  primary={<div className="">Subscriber Agreement</div>}
                />
              </ListItemButton>
            </ListItem>

            <ListItem className="pb-0">
              <ListItemButton
                className={`${
                  activeRoute("banner") ? "activeTab" : ""
                } rounded`}
                onClick={() => setToggle3(!toggle3)}
              >
                <ListItemIcon>
                  <RiAdvertisementFill
                    size={20}
                    color={activeRoute("banner") ? "#3B76EF" : "#526484"}
                  />
                </ListItemIcon>
                <ListItemText
                  primary={
                    <div className="w-100 d-flex justify-content-between align-items-center">
                      Banners
                      {toggle3 ? (
                        <IoIosArrowUp className="ms-2" />
                      ) : (
                        <IoIosArrowForward className="ms-2" />
                      )}
                    </div>
                  }
                />
              </ListItemButton>
            </ListItem>
            <div
              className={`px-3 ps-5`}
              style={{
                height: toggle3 ? "50px" : "0px",
                overflow: "hidden",
                transition: "height 0.3s",
              }}
            >
              <List className="">
                {/* <ListItemButton
                  className={` ${
                    activeRoute("banners/TVBanners") ? "activeTab" : ""
                  } rounded`}
                  onClick={() => navigate("/banners/TVBanners")}
                >
                  <ListItemIcon>
                    <RiAdvertisementLine
                      size={16}
                      color={
                        activeRoute("banners/TVBanners") ? "#3B76EF" : "#526484"
                      }
                    />
                  </ListItemIcon>
                  <ListItemText
                    primary={<div className="f-15">TV Banners</div>}
                  />
                </ListItemButton> */}
                <ListItemButton
                  className={` ${
                    activeRoute("banners/TVSlider") ? "activeTab" : ""
                  } rounded`}
                  onClick={() => navigate("/banners/TVSlider")}
                >
                  <ListItemIcon>
                    <RiAdvertisementLine
                      size={16}
                      color={
                        activeRoute("banners/TVSlider") ? "#3B76EF" : "#526484"
                      }
                    />
                  </ListItemIcon>
                  <ListItemText
                    primary={<div className="f-15">TV Sliders</div>}
                  />
                </ListItemButton>

                {/* <ListItemButton
                  className={` ${
                    activeRoute("banners/AppBanners") ? "activeTab" : ""
                  } rounded`}
                  onClick={() => navigate("/banners/AppBanners")}
                >
                  <ListItemIcon>
                    <RiAdvertisementLine
                      size={16}
                      color={
                        activeRoute("banners/AppBanners")
                          ? "#3B76EF"
                          : "#526484"
                      }
                    />
                  </ListItemIcon>
                  <ListItemText
                    primary={<div className="f-15">App Banners</div>}
                  />
                </ListItemButton> */}
              </List>
            </div>

            {/* <ListItem className="pb-0">
              <ListItemButton
                className={`${
                  activeRoute("Advertisement") ? "activeTab" : ""
                } rounded`}
                onClick={() => setToggle4(!toggle4)}
              >
                <ListItemIcon>
                  <RiAdvertisementFill
                    size={20}
                    color={activeRoute("Advertisement") ? "#3B76EF" : "#526484"}
                  />
                </ListItemIcon>
                <ListItemText
                  primary={
                    <div className="w-100 d-flex justify-content-between align-items-center">
                      Advertisements
                      {toggle4 ? (
                        <IoIosArrowUp className="ms-2" />
                      ) : (
                        <IoIosArrowForward className="ms-2" />
                      )}
                    </div>
                  }
                />
              </ListItemButton>
            </ListItem>
            <div
              className={`px-3 ps-5`}
              style={{
                height: toggle4 ? "100px" : "0px",
                overflow: "hidden",
                transition: "height 0.3s",
              }}
            >
              <List className="">
                <ListItemButton
                  className={` ${
                    activeRoute("Advertisement/TVAdBanners") ? "activeTab" : ""
                  } rounded`}
                  onClick={() => navigate("/Advertisement/TVAdBanners")}
                >
                  <ListItemIcon>
                    <RiAdvertisementLine
                      size={16}
                      color={
                        activeRoute("Advertisement/TVAdBanners")
                          ? "#3B76EF"
                          : "#526484"
                      }
                    />
                  </ListItemIcon>
                  <ListItemText
                    primary={<div className="f-15">TV Banners</div>}
                  />
                </ListItemButton>

                <ListItemButton
                  className={` ${
                    activeRoute("Advertisement/AppAdBanners") ? "activeTab" : ""
                  } rounded`}
                  onClick={() => navigate("/Advertisement/AppAdBanners")}
                >
                  <ListItemIcon>
                    <RiAdvertisementLine
                      size={16}
                      color={
                        activeRoute("Advertisement/AppAdBanners")
                          ? "#3B76EF"
                          : "#526484"
                      }
                    />
                  </ListItemIcon>
                  <ListItemText
                    primary={<div className="f-15">App Banners</div>}
                  />
                </ListItemButton>
              </List>
            </div> */}
          </List>

          <ListItem className="pb-0">
            <ListItemButton
              className={`${
                activeRoute("chanelCategory") ? "activeTab" : ""
              } rounded`}
              onClick={() => navigate("/chanelCategory")}
            >
              <ListItemIcon>
                <TbPackages
                  size={20}
                  color={activeRoute("chanelCategory") ? "#3B76EF" : "#526484"}
                />
              </ListItemIcon>
              <ListItemText
                primary={<div className="">Channel Category</div>}
              />
            </ListItemButton>
          </ListItem>
          <ListItem className="pb-0">
            <ListItemButton
              className={`${
                activeRoute("freeLive") ? "activeTab" : ""
              } rounded`}
              onClick={() => navigate("/freeLive")}
            >
              <ListItemIcon>
                <TbPackages
                  size={20}
                  color={activeRoute("freeLive") ? "#3B76EF" : "#526484"}
                />
              </ListItemIcon>
              <ListItemText
                primary={<div className="">Free Live Channel</div>}
              />
            </ListItemButton>
          </ListItem>

          <ListItem className="pb-0">
            <ListItemButton
              className={`${
                activeRoute("exclusiveChannel") ? "activeTab" : ""
              } rounded`}
              onClick={() => navigate("/exclusiveChannel")}
            >
              <ListItemIcon>
                <TbPackages
                  size={20}
                  color={
                    activeRoute("exclusiveChannel") ? "#3B76EF" : "#526484"
                  }
                />
              </ListItemIcon>
              <ListItemText
                primary={<div className="">Exclusive Channel</div>}
              />
            </ListItemButton>
          </ListItem>
          {/* 
          <ListItem className="pb-0">
            <ListItemButton
              className={`${
                activeRoute("app-version") ? "activeTab" : ""
              } rounded`}
              onClick={() => navigate("/app-version")}
            >
              <ListItemIcon>
                <TbPackages
                  size={20}
                  color={activeRoute("app-version") ? "#3B76EF" : "#526484"}
                />
              </ListItemIcon>
              <ListItemText primary={<div className="">App Version</div>} />
            </ListItemButton>
          </ListItem> */}

          {/* new feature */}
          <ListItem className="pb-0">
            <ListItemButton
              className={`${
                activeRoute("youtubeVedioListing") ? "activeTab" : ""
              } rounded`}
              // onClick={() => navigate("/userlisting")}
              onClick={() => setToggle5(!toggle5)}
            >
              <ListItemIcon>
                <HiVideoCamera
                  size={20}
                  color={
                    activeRoute("youtubeVedioListing") ? "#3B76EF" : "#526484"
                  }
                />
              </ListItemIcon>
              <ListItemText
                primary={
                  <div className="w-100 d-flex justify-content-between align-items-center">
                    Youtube Video
                    {toggle5 ? (
                      <IoIosArrowUp className="ms-2" />
                    ) : (
                      <IoIosArrowForward className="ms-2" />
                    )}
                  </div>
                }
              />
            </ListItemButton>
          </ListItem>
          <div
            className={`px-3 ps-5`}
            style={{
              height: toggle5 ? "auto" : "0px", // changed from 50px to auto
              overflow: toggle5 ? "visible" : "hidden", // allow content to show
              transition: "height 0.3s",
            }}
          >
            <List className="">
              <ListItemButton
                className={` ${
                  activeRoute("youtubeVedioCategory") ? "activeTab" : ""
                } rounded`}
                onClick={() => navigate("/videoCategory")}
              >
                <ListItemIcon>
                  <HiVideoCamera
                    size={16}
                    color={
                      activeRoute("youtubeVedioListing") ? "#3B76EF" : "#526484"
                    }
                  />
                </ListItemIcon>
                <ListItemText
                  primary={<div className="f-15">Videos Category</div>}
                />
              </ListItemButton>
            </List>
            <List className="">
              <ListItemButton
                className={` ${
                  activeRoute("youtubeVedioListing") ? "activeTab" : ""
                } rounded`}
                onClick={() => navigate("/youtubeVedioListing")}
              >
                <ListItemIcon>
                  <HiVideoCamera
                    size={16}
                    color={
                      activeRoute("youtubeVedioListing") ? "#3B76EF" : "#526484"
                    }
                  />
                </ListItemIcon>
                <ListItemText primary={<div className="f-15">Videos</div>} />
              </ListItemButton>
            </List>
          </div>

          {/* WebSeries feature with dropdown */}
          <ListItem className="pb-0">
            <ListItemButton
              className={`${toggle6 ? "activeTab" : ""} rounded`}
              onClick={() => setToggle6(!toggle6)}
            >
              <ListItemIcon>
                <MdFeaturedPlayList
                  size={20}
                  color={toggle6 ? "#3B76EF" : "#526484"}
                />
              </ListItemIcon>
              <ListItemText
                primary={
                  <div className="w-100 d-flex justify-content-between align-items-center">
                    WebSeries
                    {toggle6 ? (
                      <IoIosArrowUp className="ms-2" />
                    ) : (
                      <IoIosArrowForward className="ms-2" />
                    )}
                  </div>
                }
              />
            </ListItemButton>
          </ListItem>
          <div
            className={`px-3 ps-5`}
            style={{
              height: toggle6 ? "auto" : "0px",
              overflow: toggle6 ? "visible" : "hidden",
              transition: "height 0.3s",
            }}
          >
            <List className="">
              <ListItemButton
                className={` ${
                  activeRoute("webseries") ? "activeTab" : ""
                } rounded`}
                onClick={() => navigate("/webseries")}
              >
                <ListItemIcon>
                  <MdFeaturedPlayList
                    size={16}
                    color={activeRoute("webseries") ? "#3B76EF" : "#526484"}
                  />
                </ListItemIcon>
                <ListItemText
                  primary={<div className="f-15">All WebSeries</div>}
                />
              </ListItemButton>
              <ListItemButton
                className={` ${
                  activeRoute("season") ? "activeTab" : ""
                } rounded`}
                onClick={() => navigate("/season")}
              >
                <ListItemIcon>
                  <MdFeaturedPlayList
                    size={16}
                    color={activeRoute("season") ? "#3B76EF" : "#526484"}
                  />
                </ListItemIcon>
                <ListItemText
                  primary={<div className="f-15">All Seasons</div>}
                />
              </ListItemButton>
              <ListItemButton
                className={` ${
                  activeRoute("episode") ? "activeTab" : ""
                } rounded`}
                onClick={() => navigate("/episode")}
              >
                <ListItemIcon>
                  <MdFeaturedPlayList
                    size={16}
                    color={activeRoute("episode") ? "#3B76EF" : "#526484"}
                  />
                </ListItemIcon>
                <ListItemText
                  primary={<div className="f-15">All Episodes</div>}
                />
              </ListItemButton>
            </List>
          </div>

          <ListItem className="pb-0">
            <ListItemButton
              className={`${
                activeRoute("subscriptionPlan") ? "activeTab" : ""
              } rounded`}
              onClick={() => navigate("/subscriptionPlan")}
            >
              <ListItemIcon>
                <TbPackages
                  size={20}
                  color={
                    activeRoute("subscriptionPlan") ? "#3B76EF" : "#526484"
                  }
                />
              </ListItemIcon>
              <ListItemText
                primary={<div className="">Subcription Plan</div>}
              />
            </ListItemButton>
          </ListItem>

          <ListItem className="pb-0">
            <ListItemButton
              className={`${activeRoute("ottHub") ? "activeTab" : ""} rounded`}
              onClick={() => navigate("/ottHub")}
            >
              <ListItemIcon>
                <TbPackages
                  size={20}
                  color={activeRoute("ottHub") ? "#3B76EF" : "#526484"}
                />
              </ListItemIcon>
              <ListItemText primary={<div className="">OTT Hub</div>} />
            </ListItemButton>
          </ListItem>

          {/* HighLights as standalone tab */}
          <ListItem className="pb-0">
            <ListItemButton
              className={`${
                activeRoute("highLights") ? "activeTab" : ""
              } rounded`}
              onClick={() => navigate("/highLights")}
            >
              <ListItemIcon>
                <MdHighlight
                  size={20}
                  color={activeRoute("highLights") ? "#3B76EF" : "#526484"}
                />
              </ListItemIcon>
              <ListItemText primary={<div className="">HighLights</div>} />
            </ListItemButton>
          </ListItem>

          {/* Media Hub with dropdown */}
          <ListItem className="pb-0">
            <ListItemButton
              className={`${toggle7 ? "activeTab" : ""} rounded`}
              onClick={() => setToggle7(!toggle7)}
            >
              <ListItemIcon>
                <MdOutlineVideoLibrary
                  size={20}
                  color={toggle7 ? "#3B76EF" : "#526484"}
                />
              </ListItemIcon>
              <ListItemText
                primary={
                  <div className="w-100 d-flex justify-content-between align-items-center">
                    Media Hub
                    {toggle7 ? (
                      <IoIosArrowUp className="ms-2" />
                    ) : (
                      <IoIosArrowForward className="ms-2" />
                    )}
                  </div>
                }
              />
            </ListItemButton>
          </ListItem>
          <div
            className={`px-3 ps-5`}
            style={{
              height: toggle7 ? "auto" : "0px",
              overflow: toggle7 ? "visible" : "hidden",
              transition: "height 0.3s",
            }}
          >
            <List className="">
              {/* Shorts with dropdown */}
              <ListItemButton
                className={`rounded`}
                onClick={() => setToggleShorts(!toggleShorts)}
              >
                <ListItemIcon>
                  <BiMoviePlay
                    size={16}
                    color={
                      toggleShorts || activeRoute("short")
                        ? "#3B76EF"
                        : "#526484"
                    }
                  />
                </ListItemIcon>
                <ListItemText
                  primary={
                    <div className="f-15 w-100 d-flex justify-content-between align-items-center">
                      Shorts
                      {toggleShorts ? (
                        <IoIosArrowUp className="ms-2" size={12} />
                      ) : (
                        <IoIosArrowForward className="ms-2" size={12} />
                      )}
                    </div>
                  }
                />
              </ListItemButton>
              {/* Shorts Subdropdown */}
              <div
                className={`px-1 ps-2`}
                style={{
                  height: toggleShorts ? "auto" : "0px",
                  overflow: toggleShorts ? "visible" : "hidden",
                  transition: "height 0.3s",
                  marginLeft: "6px",
                }}
              >
                <List className="">
                  <ListItemButton
                    className={` ${
                      activeRoute("shortCategory") ? "activeTab" : ""
                    } rounded`}
                    onClick={() => navigate("/shortCategory")}
                  >
                    <ListItemIcon>
                      <BiSolidCategory
                        size={14}
                        color={
                          activeRoute("shortCategory") ? "#3B76EF" : "#526484"
                        }
                      />
                    </ListItemIcon>
                    <ListItemText
                      primary={<div className="f-14">Shorts Category</div>}
                    />
                  </ListItemButton>
                  <ListItemButton
                    className={` ${
                      activeRoute("short") ? "activeTab" : ""
                    } rounded`}
                    onClick={() => navigate("/short")}
                  >
                    <ListItemIcon>
                      <BiMoviePlay
                        size={14}
                        color={activeRoute("short") ? "#3B76EF" : "#526484"}
                      />
                    </ListItemIcon>
                    <ListItemText
                      primary={<div className="f-14">Shorts List</div>}
                    />
                  </ListItemButton>
                </List>
              </div>
              {/* Podcasts with dropdown */}
              <ListItemButton
                className={`rounded`}
                onClick={() => setTogglePodcasts(!togglePodcasts)}
              >
                <ListItemIcon>
                  <MdPodcasts
                    size={16}
                    color={
                      togglePodcasts || activeRoute("podcast")
                        ? "#3B76EF"
                        : "#526484"
                    }
                  />
                </ListItemIcon>
                <ListItemText
                  primary={
                    <div className="f-15 w-100 d-flex justify-content-between align-items-center">
                      Podcasts
                      {togglePodcasts ? (
                        <IoIosArrowUp className="ms-2" size={12} />
                      ) : (
                        <IoIosArrowForward className="ms-2" size={12} />
                      )}
                    </div>
                  }
                />
              </ListItemButton>
              {/* Podcasts Subdropdown */}
              <div
                className={`px-1 ps-2`}
                style={{
                  height: togglePodcasts ? "auto" : "0px",
                  overflow: togglePodcasts ? "visible" : "hidden",
                  transition: "height 0.3s",
                  marginLeft: "6px",
                }}
              >
                <List className="">
                  <ListItemButton
                    className={` ${
                      activeRoute("podcastCategory") ? "activeTab" : ""
                    } rounded`}
                    onClick={() => navigate("/podcastCategory")}
                  >
                    <ListItemIcon>
                      <BiSolidCategory
                        size={14}
                        color={
                          activeRoute("podcastCategory") ? "#3B76EF" : "#526484"
                        }
                      />
                    </ListItemIcon>
                    <ListItemText
                      primary={<div className="f-14">Podcasts Category</div>}
                    />
                  </ListItemButton>
                  <ListItemButton
                    className={` ${
                      activeRoute("podcast") ? "activeTab" : ""
                    } rounded`}
                    onClick={() => navigate("/podcast")}
                  >
                    <ListItemIcon>
                      <MdPodcasts
                        size={14}
                        color={activeRoute("podcast") ? "#3B76EF" : "#526484"}
                      />
                    </ListItemIcon>
                    <ListItemText
                      primary={<div className="f-14">Podcasts List</div>}
                    />
                  </ListItemButton>
                </List>
              </div>
              {/* Tunes with dropdown */}
              <ListItemButton
                className={`rounded`}
                onClick={() => setToggleTunes(!toggleTunes)}
              >
                <ListItemIcon>
                  <BsMusicNoteList
                    size={16}
                    color={
                      toggleTunes || activeRoute("tune") ? "#3B76EF" : "#526484"
                    }
                  />
                </ListItemIcon>
                <ListItemText
                  primary={
                    <div className="f-15 w-100 d-flex justify-content-between align-items-center">
                      Tunes
                      {toggleTunes ? (
                        <IoIosArrowUp className="ms-2" size={12} />
                      ) : (
                        <IoIosArrowForward className="ms-2" size={12} />
                      )}
                    </div>
                  }
                />
              </ListItemButton>
              {/* Tunes Subdropdown */}
              <div
                className={`px-1 ps-2`}
                style={{
                  height: toggleTunes ? "auto" : "0px",
                  overflow: toggleTunes ? "visible" : "hidden",
                  transition: "height 0.3s",
                  marginLeft: "6px",
                }}
              >
                <List className="">
                  <ListItemButton
                    className={` ${
                      activeRoute("tuneCategory") ? "activeTab" : ""
                    } rounded`}
                    onClick={() => navigate("/tuneCategory")}
                  >
                    <ListItemIcon>
                      <BiSolidCategory
                        size={14}
                        color={
                          activeRoute("tuneCategory") ? "#3B76EF" : "#526484"
                        }
                      />
                    </ListItemIcon>
                    <ListItemText
                      primary={<div className="f-14">Tunes Category</div>}
                    />
                  </ListItemButton>
                  <ListItemButton
                    className={` ${
                      activeRoute("tune") ? "activeTab" : ""
                    } rounded`}
                    onClick={() => navigate("/tune")}
                  >
                    <ListItemIcon>
                      <BsMusicNoteList
                        size={14}
                        color={activeRoute("tune") ? "#3B76EF" : "#526484"}
                      />
                    </ListItemIcon>
                    <ListItemText
                      primary={<div className="f-14">Tunes List</div>}
                    />
                  </ListItemButton>
                </List>
              </div>
              {/* Devotionals with dropdown */}
              <ListItemButton
                className={`rounded`}
                onClick={() => setToggleDevotionals(!toggleDevotionals)}
              >
                <ListItemIcon>
                  <MdPodcasts
                    size={16}
                    color={
                      toggleDevotionals || activeRoute("devotionals")
                        ? "#3B76EF"
                        : "#526484"
                    }
                  />
                </ListItemIcon>
                <ListItemText
                  primary={
                    <div className="f-15 w-100 d-flex justify-content-between align-items-center">
                      Devotionals
                      {toggleDevotionals ? (
                        <IoIosArrowUp className="ms-2" size={12} />
                      ) : (
                        <IoIosArrowForward className="ms-2" size={12} />
                      )}
                    </div>
                  }
                />
              </ListItemButton>
              {/* Devotionals Subdropdown */}
              <div
                className={`px-1 ps-2`}
                style={{
                  height: toggleDevotionals ? "auto" : "0px",
                  overflow: toggleDevotionals ? "visible" : "hidden",
                  transition: "height 0.3s",
                  marginLeft: "6px",
                }}
              >
                <List className="">
                  <ListItemButton
                    className={` ${
                      activeRoute("devotionalsCategory") ? "activeTab" : ""
                    } rounded`}
                    onClick={() => navigate("/devotionalsCategory")}
                  >
                    <ListItemIcon>
                      <BiSolidCategory
                        size={14}
                        color={
                          activeRoute("devotionalsCategory")
                            ? "#3B76EF"
                            : "#526484"
                        }
                      />
                    </ListItemIcon>
                    <ListItemText
                      primary={<div className="f-14">Devotionals Category</div>}
                    />
                  </ListItemButton>
                  <ListItemButton
                    className={` ${
                      activeRoute("devotionals") ? "activeTab" : ""
                    } rounded`}
                    onClick={() => navigate("/devotionals")}
                  >
                    <ListItemIcon>
                      <MdPodcasts
                        size={14}
                        color={
                          activeRoute("devotionals") ? "#3B76EF" : "#526484"
                        }
                      />
                    </ListItemIcon>
                    <ListItemText
                      primary={<div className="f-14">Devotionals List</div>}
                    />
                  </ListItemButton>
                </List>
              </div>
              {/* Sports with dropdown */}
              <ListItemButton
                className={`rounded`}
                onClick={() => setToggleSports(!toggleSports)}
              >
                <ListItemIcon>
                  <BiMoviePlay
                    size={16}
                    color={
                      toggleSports || activeRoute("sports")
                        ? "#3B76EF"
                        : "#526484"
                    }
                  />
                </ListItemIcon>
                <ListItemText
                  primary={
                    <div className="f-15 w-100 d-flex justify-content-between align-items-center">
                      Sports
                      {toggleSports ? (
                        <IoIosArrowUp className="ms-2" size={12} />
                      ) : (
                        <IoIosArrowForward className="ms-2" size={12} />
                      )}
                    </div>
                  }
                />
              </ListItemButton>
              {/* Sports Subdropdown */}
              <div
                className={`px-1 ps-2`}
                style={{
                  height: toggleSports ? "auto" : "0px",
                  overflow: toggleSports ? "visible" : "hidden",
                  transition: "height 0.3s",
                  marginLeft: "6px",
                }}
              >
                <List className="">
                  <ListItemButton
                    className={` ${
                      activeRoute("sportsCategory") ? "activeTab" : ""
                    } rounded`}
                    onClick={() => navigate("/sportsCategory")}
                  >
                    <ListItemIcon>
                      <BiSolidCategory
                        size={14}
                        color={
                          activeRoute("sportsCategory") ? "#3B76EF" : "#526484"
                        }
                      />
                    </ListItemIcon>
                    <ListItemText
                      primary={<div className="f-14">Sports Category</div>}
                    />
                  </ListItemButton>
                  <ListItemButton
                    className={` ${
                      activeRoute("sports") ? "activeTab" : ""
                    } rounded`}
                    onClick={() => navigate("/sports")}
                  >
                    <ListItemIcon>
                      <BiMoviePlay
                        size={14}
                        color={activeRoute("sports") ? "#3B76EF" : "#526484"}
                      />
                    </ListItemIcon>
                    <ListItemText
                      primary={<div className="f-14">Sports List</div>}
                    />
                  </ListItemButton>
                </List>
              </div>
            </List>
          </div>

          {/* Referral Management */}
          {/* <ListItem className="pb-0">
            <ListItemButton
              className={`${
                activeRoute("referrals") ? "activeTab" : ""
              } rounded`}
              onClick={() => navigate("/referrals")}
            >
              <ListItemIcon>
                <RiUserSharedFill
                  size={20}
                  color={activeRoute("referrals") ? "#3B76EF" : "#526484"}
                />
              </ListItemIcon>
              <ListItemText primary={<div className="">Referrals</div>} />
            </ListItemButton>
          </ListItem> */}
          <ListItem className="pb-0">
            <ListItemButton
              className={`${
                activeRoute("securityCheck") ? "activeTab" : ""
              } rounded`}
              onClick={() => navigate("/securityCheck")}
            >
              <ListItemIcon>
                <HiUsers
                  size={20}
                  color={activeRoute("securityCheck") ? "#3B76EF" : "#526484"}
                />
              </ListItemIcon>
              <ListItemText
                primary={
                  <div className="w-100 d-flex justify-content-between align-items-center">
                    Security
                  </div>
                }
              />
            </ListItemButton>
          </ListItem>
        </Drawer>

        <Main open={!matches ? true : open}>
          <div className={style.mainContainer}>
            <div className={style.topbar}></div>
            <div className={`${style.content} p-md-4 p-sm-3 p-2`}>
              {children}
            </div>
          </div>
        </Main>
      </Box>
    </>
  );
}
