import React from "react";
import { Routes, Route, Navigate } from "react-router";
import { WrongPath } from "./WrongPath";
import { LoginPage } from "./Components/Login/LoginPage";
import { CheckAuth } from "./auth/CheckAuth";
import { LoginKeeper } from "./auth/LoginKeeper";
import UsersListing from "./Components/Users/UsersListing";
import SubscribersList from "./Components/Users/SubscribersList";
import Dashboard from "./Components/Dashboard/Dashboard";
import { Backdrop } from "@mui/material";
import { Triangle } from "react-loader-spinner";
import { useSelector } from "react-redux";
import AddTheme from "./Components/AddTheme/AddTheme";
import Eventmanagement from "./Components/EventManagement/Eventmanagement";
import DropdownWithEditDelete from "./Components/testing";
import HomeAutomation from "./Components/Users/HomeAutomation";
import Subscribers from "./Components/Users/Subscribers";
import ViewUsers from "./Components/View/ViewUsers";
import ChannelManagement from "./Components/ChannelManagement/ChannelManagement";
import ChannelView from "./Components/View/ChannelView";
import Banners from "./Pages/Banners/Banners";
// import Banners from "./Pages/AdvatismentBanner/Banners";
import PackageListing from "./Pages/Packages/PackageListing";
import { GenreListing } from "./Pages/Genre/GenreListing";
import Languages from "./Pages/Languages/Languages";
import Broadcaster from "./Pages/Broadcaster/Broadcaster";
import Categories from "./Pages/Categories/Categories";
import TVBanner from "./Pages/Banners/TVBanner";
import PrivacyPolicy from "./Pages/teams_Policy/PrivacyPolicy";
import TermsConditions from "./Pages/teams_Policy/TermsConditions";
import AdBanners from "./Pages/AdvatismentBanner/AdBanners";
import AdTVBanner from "./Pages/AdvatismentBanner/AdTVBanner";
import TVSlider from "./Pages/Banners/TVSlider";
import YoutubeVideos from "./Pages/YoutubeVideo/YoutubeVideos";
import AddYoutubeVideo from "./Pages/YoutubeVideo/AddYoutubeVideo";
import CreateUpdateWebSeries from "./Pages/WebSeries/CreateUpdateWebSeries";
import CreateUpdateSeason from "./Pages/WebSeries/CreateUpdateSeason";
import CreateUpdateEpisode from "./Pages/WebSeries/CreateUpdateEpisode";
import AllSeasons from "./Pages/WebSeries/AllSeasons";
import AllEpisodes from "./Pages/WebSeries/AllEpisode";
import AllWebSeries from "./Pages/WebSeries/AllWebSeries";
import FreeLiveChannelList from "./Pages/FreeLiveChannel/FreeLiveChannelList";
import ChannelCategory from "./Pages/ChannelCategory/ChannelCategory";
import Policy from "./Pages/cms/Policy";
import TermAndConditions from "./Pages/cms/TermAndConditions";
import AboutUs from "./Pages/cms/AboutUs";
import SubscriberAgreement from "./Pages/cms/SubscriberAgreement";
import ContactUs from "./Pages/cms/ContactUs";
import SubscribersMangement from "./Components/View/SubscribersMangement";
import SubscriberAgreemnt from "./Pages/teams_Policy/SubscriberAgreement";
import Aboutus from "./Pages/teams_Policy/AboutUs";
import Contactus from "./Pages/teams_Policy/ContactUs";
import PlanList from "./Pages/subscriptionPlan/PlanList";
import DeleteAccount from "./Pages/deleteAccount/deleteAccount";
import OttContent from "./Pages/ottHub/OttHubContentList";
import ExclusiveChannelList from "./Pages/exclusiveChannel/ExclusiveChannelList";
import HomeContentList from "./Pages/homeModule/HomeModuleList";
import VideoCategory from "./Pages/VideoCategory/VideoCategory";
import HomeTitleList from "./Pages/homeTitle/HometitleList";
import ShortsList from "./Pages/shorts/ShortsList";
import PodcastsList from "./Pages/podcast/PodcastList";
import TunesList from "./Pages/tunes/TunesList";
import DevotionalsList from "./Pages/devotional/DevotionalList";
import SportsList from "./Pages/sports/SportsList";
import ReferralList from "./Pages/referral/ReferralList";
import HighLightsList from "./Pages/highLights/HighLightsList";
import DevotionalCategory from "./Pages/devotional/devotionalCategory/DevotionalCategory";
import ShortsCategory from "./Pages/shorts/shortsCategory/ShortsCategory";
import PodcastCategory from "./Pages/podcast/podcastCategory/PostcastCategory";
import TunesCategory from "./Pages/tunes/tunesCategory/TunesCategory";
import SecurityCheck from "./Pages/securityCheck/SecurityCheck";

export const Router = () => {
  let loader = useSelector((e) => e.loader);
  return (
    <>
      <Backdrop sx={{ color: "#fff", zIndex: 99999999999 }} open={loader}>
        <Triangle
          height="80"
          width="80"
          color="black"
          ariaLabel="triangle-loading"
          visible={loader}
        />
      </Backdrop>
      <Routes>
        <Route path="/policy" element={<Policy />} />
        <Route path="/termAndConditons" element={<TermAndConditions />} />
        <Route path="/aboutUs" element={<AboutUs />} />
        <Route path="/subscriberAgreement" element={<SubscriberAgreement />} />
        <Route path="/contactUs" element={<ContactUs />} />
        <Route path="/deleteAccount" element={<DeleteAccount />} />

        <Route element={<LoginKeeper />}>
          <Route path="/login" element={<LoginPage />} />
        </Route>
        <Route element={<CheckAuth />}>
          {/* <Route exact path="/qrcode" element={<Qrcode />} /> */}
          <Route exact path="/dashboard" element={<Dashboard />} />
          <Route exact path="/subscribers" element={<Subscribers />} />
          <Route exact path="/subscriberslist" element={<SubscribersList />} />
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route exact path="/userlisting" element={<UsersListing />} />
          <Route exact path="/channel" element={<ChannelManagement />} />
          <Route exact path="/addTheme" element={<AddTheme />} />
          <Route exact path="/eventmanagement" element={<Eventmanagement />} />
          <Route exact path="/testing" element={<DropdownWithEditDelete />} />
          <Route exact path="/homeautomation" element={<HomeAutomation />} />
          <Route path="/userlisting/view/:id" element={<ViewUsers />} />
          <Route path="/channel/view/:id" element={<ChannelView />} />
          <Route path="/banners/TVBanners" element={<TVBanner />} />
          <Route path="/banners/AppBanners" element={<Banners />} />
          <Route path="/banners/TVSlider" element={<TVSlider />} />
          <Route path="/Advertisement/TVAdBanners" element={<AdTVBanner />} />
          <Route path="/Advertisement/AppAdBanners" element={<AdBanners />} />
          <Route path="/packageListing" element={<PackageListing />} />
          <Route path="/media/genreListing" element={<GenreListing />} />
          <Route path="/media/languages" element={<Languages />} />
          <Route path="/media/broadcaster" element={<Broadcaster />} />
          <Route path="/media/categories" element={<Categories />} />
          <Route path="/PrivacyPolicy" element={<PrivacyPolicy />} />
          <Route path="/TermsConditions" element={<TermsConditions />} />
          <Route path="/Subscriber" element={<SubscriberAgreemnt />} />
          <Route path="/About" element={<Aboutus />} />
          <Route path="/Contact" element={<Contactus />} />
          <Route path="/chanelCategory" element={<ChannelCategory />} />
          {/*   this  route is for free live channel */}
          {<Route path="/freeLive" element={<FreeLiveChannelList />} />}
          {/* {Route path="/add"} */}
          {/* {<Route path="/app-version" element={<AppVersionList />} />} */}
          {/* <Route exact path="/testing" element={<div>Test Route</div>} /> */}{" "}
          <Route path="/youtubeVedioListing" element={<YoutubeVideos />} />
          {/* <Route path="/addyoutubeVideo" element={<AddYoutubeVideo />} /> */}
          {/* webSeries */}
          <Route path="/season" element={<AllSeasons />} />
          <Route path="/episode" element={<AllEpisodes />} />
          <Route path="/webseries" element={<AllWebSeries />} />
          {/* subscription plan */}
          <Route path="/subscriptionPlan" element={<PlanList />} />
          {/* <Route exact path="/testing" element={<div>Test Route</div>} /> */}
          {/* OTT */}
          <Route path="/ottHub" element={<OttContent />} />
          {/* exclusive channel */}
          {
            <Route
              path="/exclusiveChannel"
              element={<ExclusiveChannelList />}
            />
          }
          {/* Home Module */}
          {<Route path="/homeModule" element={<HomeContentList />} />}
          {<Route path="/videoCategory" element={<VideoCategory />} />}
          {/* home Titles */}
          {<Route path="/homeTitle" element={<HomeTitleList />} />}
          {/* Shorts */}
          {<Route path="/short" element={<ShortsList />} />}
          {/* Shorts Category */}
          {<Route path="/shortCategory" element={<ShortsCategory />} />}
          {/* Podcast */}
          {<Route path="/podcast" element={<PodcastsList />} />}
          {/* podcast Category */}
          {<Route path="/podcastCategory" element={<PodcastCategory />} />}
          {/* Tunes */}
          {<Route path="/tune" element={<TunesList />} />}
          {/* tune Category */}
          {<Route path="/tuneCategory" element={<TunesCategory />} />}
          {/* Devotionals*/}
          {<Route path="/devotionals" element={<DevotionalsList />} />}
          {/* Devotionals Category */}
          {
            <Route
              path="/devotionalsCategory"
              element={<DevotionalCategory />}
            />
          }
          {/* Sports */}
          {<Route path="/sports" element={<SportsList />} />}
          {/* Referral */}
          <Route path="/referrals" element={<ReferralList />} />
          {/* HighLights */}
          {<Route path="/highLights" element={<HighLightsList />} />}
          {/* Security Check */}
          <Route path="/securityCheck" element={<SecurityCheck />} />
        </Route>
        <Route path="*" element={<WrongPath />} />
      </Routes>
    </>
  );
};
