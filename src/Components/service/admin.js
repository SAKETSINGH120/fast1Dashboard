import axios from "axios";

import { API, baseUrl } from "./Api";

let token = "YWRtaW46UGl5dXNoQDEyMw==";

export const addPlan = async (payload) => {
  return await axios.post(`${baseUrl}${API.plan.addPlan}`, payload);
};

export const getPlanByCreator = async (id) => {
  return await axios.get(`${baseUrl}${API.plan.getPlanByCreator}${id}`);
};

export const getAllPlans = async () => {
  return await axios.get(`${baseUrl}${API.plan.getAllPlans}`);
};

export const getallChannel = async () => {
  return await axios.get(`${baseUrl}${API.plan.getAllChannel}`);
};

export const updateChannelById = async (id, payload) => {
  return await axios.put(
    `${baseUrl}${API.plan.updateChannelById}${id}`,
    payload
  );
};

export const channelCategories = async () => {
  return await axios.get(`${baseUrl}${API.plan.getchannelCategory}`);
};
export const deleteCategory = async (id) => {
  return await axios.delete(`${baseUrl}${API.plan.deleteCategory}${id}`);
};
export const updateCategory = async (id, body) => {
  return await axios.put(`${baseUrl}${API.plan.updateCategory}${id}`, body);
};

export const addCategory = async (payload) => {
  return await axios.post(`${baseUrl}${API.plan.addCategory}`, payload);
};

export const addChannel = async (payload) => {
  return await axios.post(`${baseUrl}${API.plan.addChannel}`, payload);
};

export const channelByFilter = async (payload) => {
  return await axios.post(`${baseUrl}${API.plan.channelByFilter}`, payload);
};

export const deletePlan = async (id) => {
  return await axios.post(`${baseUrl}${API.plan.deletePlan}${id}`);
};
export const getPlanById = async (id) => {
  return await axios.get(`${baseUrl}${API.plan.getPlanById}${id}`);
};

export const bulkInsertPlan = async (payload) => {
  return await axios.post(`${baseUrl}${API.plan.bulkInsertPlan}`, payload);
};

export const getChannelById = async (id) => {
  return await axios.get(`${baseUrl}${API.plan.getChannelById}${id}`);
};

export const fatchallChannel = async () => {
  return await axios.get(`${baseUrl}${API.plan.getAllChannelByCategory}`);
};

export const updatePackage = async (id, payload) => {
  return await axios.put(`${baseUrl}${API.plan.updatePlan}/${id}`, payload);
};

//           User           //

export const addUser = async (payload) => {
  return await axios.post(`${baseUrl}${API.user.addUser}`, payload);
};

export const getAlluser = async (payload) => {
  return await axios.post(`${baseUrl}${API.user.getAllUser}`, payload);
};

export const deleteUser = async (id) => {
  return await axios.delete(`${baseUrl}${API.user.deleteUser}${id}`);
};

export const getUserById = async (id) => {
  return await axios.get(`${baseUrl}${API.user.getUserById}${id}`);
};

export const updateUser = async (id, payload) => {
  return await axios.put(`${baseUrl}${API.user.updateUser}${id}`, payload);
};

export const updateMemberStatus = async (id) => {
  return await axios.put(`${baseUrl}${API.user.updateMemberStatus}${id}`);
};

export const planStatusChanges = async (id) => {
  return await axios.put(`${baseUrl}${API.plan.statusChanges}${id}`);
};

export const uploadFile = async (payload) => {
  return await axios.post(`${baseUrl}${API.user.uploadFile}`, payload);
};

// export const getFilterUser = async (payload) => {
//   return await axios.post(`${baseUrl}${API.user.getFilterUser}`,payload);
// };

// subscriber management

export const uploadDocs = async (payload) => {
  return await axios.post(`${baseUrl}${API.document.upload}`, payload);
};

export const deleteDocs = async (payload) => {
  return await axios.post(`${baseUrl}${API.document.deleteDocs}`, payload);
};

export const addSubscriber = async (payload) => {
  return await axios.post(
    `${baseUrl}${API.subscriberManagement.addSubscriber}`,
    payload
  );
};

export const getAllSubscriber = async () => {
  return await axios.get(
    `${baseUrl}${API.subscriberManagement.getAllSubscriber}`
  );
};

export const getSubscriberById = async (id) => {
  return await axios.get(
    `${baseUrl}${API.subscriberManagement.getSubscriberById}${id}`
  );
};

export const deleteSubscriber = async (id, payload) => {
  return await axios.post(
    `${baseUrl}${API.subscriberManagement.deleteSubscriber}${id}`,
    payload
  );
};

export const deleteChannel = async (id, payload) => {
  return await axios.post(`${baseUrl}${API.plan.deleteChannel}${id}`);
};

// update security status
export const updateSecurityStatus = async (payload) => {
  return await axios.patch(
    `${baseUrl}${API.subscriberManagement.updateSecurityStatus}`,
    payload
  );
};

export const getSecurityStatus = async () => {
  return await axios.get(
    `${baseUrl}${API.securityCheckManagement.getSecurityStatus}`
  );
};

export const updateSubscriber = async (id, payload) => {
  return await axios.put(
    `${baseUrl}${API.subscriberManagement.updateSubscriber}${id}`,
    payload
  );
};

export const updateSubscriberStatus = async (id) => {
  return await axios.get(
    `${baseUrl}${API.subscriberManagement.updateSubscriberStatus}${id}`
  );
};

export const addInvoiceData = async (payload) => {
  return await axios.post(`${baseUrl}${API.invoice.addInvoices}`, payload);
};

export const getInvoiceDataById = async (id) => {
  return await axios.get(`${baseUrl}${API.invoice.getInvoiceById}${id}`);
};

export const addRole = async (payload) => {
  return await axios.post(`${baseUrl}${API.role.addRole}`, payload);
};

export const getAllRole = async () => {
  return await axios.post(`${baseUrl}${API.role.getAllRole}`);
};

export const deleteRoleById = async (id) => {
  return await axios.delete(`${baseUrl}${API.role.deleteRole}${id}`);
};

export const updatePermission = async (payload, id) => {
  return await axios.put(
    `${baseUrl}${API.role.updatePermission}${id}`,
    payload
  );
};
export const getEventLogsAllData = async (page, limit, payload) => {
  return await axios.post(
    `${baseUrl}${API.logs.getEventLogsAll}?page=${page}&limit=${limit}`,
    payload
  );
};

export const getRoleDatabyId = async (id) => {
  return await axios.get(`${baseUrl}${API.role.getRoleDatabyId}${id}`);
};

export const getRolePermissions = async (role) => {
  return await axios.post(`${baseUrl}${API.role.getPermissionsByRole}`, role);
};

export const getPdfInvoiceId = async (id) => {
  return await axios.get(`${baseUrl}${API.invoice.getInvoicePdfById}${id}`);
};

export const loginAuth = async (payload) => {
  return await axios.post(`${baseUrl}${API.auth.login}`, payload);
};
export const forgetPasswordAuth = async (payload) => {
  return await axios.post(`${baseUrl}${API.auth.forgetPassword}`, payload);
};
export const changePasswordAuth = async (payload) => {
  return await axios.post(`${baseUrl}${API.auth.changePassword}`, payload);
};
export const OtpSend = async (payload) => {
  return await axios.post(`${baseUrl}${API.auth.SendOtp}`, payload);
};

export const verifyOTP = async (payload) => {
  return await axios.post(`${baseUrl}${API.auth.VerifyOtp}`, payload);
};

export const checkUserTokenIsValidAuth = async (payload) => {
  return await axios.post(
    `${baseUrl}${API.auth.checkUserTokenIsValid}`,
    payload
  );
};

export const addLanguage = async (payload) => {
  return await axios.post(`${baseUrl}${API.language.addLanguage}`, payload);
};
export const allLanguage = async (payload) => {
  return await axios.get(`${baseUrl}${API.language.allLanguage}`, payload);
};
export const updateLanguage = async (id, payload) => {
  return await axios.put(
    `${baseUrl}${API.language.updateLanguage}${id}`,
    payload
  );
};
export const deleteLanguage = async (id) => {
  return await axios.delete(`${baseUrl}${API.language.deleteLanguage}${id}`);
};

export const addGenre = async (payload) => {
  return await axios.post(`${baseUrl}${API.genre.addGenre}`, payload);
};
export const allGenre = async (payload) => {
  return await axios.get(`${baseUrl}${API.genre.allGenre}`, payload);
};
export const updateGenre = async (id, payload) => {
  return await axios.put(`${baseUrl}${API.genre.updateGenre}${id}`, payload);
};
export const deleteGenre = async (id) => {
  return await axios.delete(`${baseUrl}${API.genre.deleteGenre}${id}`);
};

export const addBroadcaster = async (payload) => {
  return await axios.post(
    `${baseUrl}${API.broadcaster.addBroadcaster}`,
    payload
  );
};

export const getBroadcasters = async (payload) => {
  return await axios.get(`${baseUrl}${API.broadcaster.getAllBroadcaster}`);
};

export const updateBroadcaster = async (id, payload) => {
  console.log(payload);
  return await axios.put(
    `${baseUrl}${API.broadcaster.updateBroadcaster}${id}`,
    payload
  );
};

export const deleteBroadcaster = async (id) => {
  return await axios.delete(
    `${baseUrl}${API.broadcaster.deletBroadcaster}${id}`
  );
};
// packages apis
export const createPackage = async (body) => {
  return await axios.post(`${baseUrl}${API.package.add}`, body);
};

// headend api routes

export const getAllChannelHeadends = async (parms) => {
  return await axios.get(
    `http://103.212.89.157:8085/streamer/api/v3/streams?limit=1000${parms}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
export const disableEnableChannel = async (name, payload) => {
  return await axios.put(
    `http://103.212.89.157:8085/streamer/api/v3/streams/${name}`,
    payload,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const addBanner = async (payload) => {
  return await axios.post(`${baseUrl}${API.banner.addBanner}`, payload);
};
export const updateBanner = async (id, payload) => {
  return await axios.put(`${baseUrl}${API.banner.updateBanner}${id}`, payload);
};
export const getBannerData = async () => {
  return await axios.get(`${baseUrl}${API.banner.getBanners}`);
};
export const getAllSliderImages = async () => {
  return await axios.get(`${baseUrl}${API.banner.getSliderImages}`);
};
export const deleteBannerImg = async (id) => {
  return await axios.delete(`${baseUrl}${API.banner.deleteBanner}${id}`);
};

export const addAppBanner = async (payload) => {
  return await axios.post(`${baseUrl}${API.banner.addAppBanner}`, payload);
};
export const updateAppBanner = async (id, payload) => {
  return await axios.put(
    `${baseUrl}${API.banner.updateAppBanner}${id}`,
    payload
  );
};
export const getAppBanners = async () => {
  return await axios.get(`${baseUrl}${API.banner.getAppBanners}`);
};
export const deleteAppBanner = async (id) => {
  return await axios.delete(`${baseUrl}${API.banner.deleteAppBanner}${id}`);
};

export const updatePackageinSubcriber = async (id, payload) => {
  return await axios.post(
    `${baseUrl}${API.subscriberManagement.updatePackage}${id}`,
    payload
  );
};

export const getSubscriberByNumber = async (payload) => {
  return await axios.post(
    `${baseUrl}${API.subscriberManagement.getSubscriberByNumber}`,
    payload
  );
};

export const addPolicy = async (payload) => {
  return await axios.post(
    `${baseUrl}${API.policy_condition.addPolicy}`,
    payload
  );
};
export const addTeamCondition = async (payload) => {
  return await axios.post(
    `${baseUrl}${API.policy_condition.addTeamCondition}`,
    payload
  );
};
export const addSubscriberAgreement = async (payload) => {
  return await axios.post(
    `${baseUrl}${API.policy_condition.addSubscriberAgreement}`,
    payload
  );
};

export const addContactUs = async (payload) => {
  return await axios.post(
    `${baseUrl}${API.policy_condition.addContactUs}`,
    payload
  );
};

export const addAboutUs = async (payload) => {
  return await axios.post(
    `${baseUrl}${API.policy_condition.addAboutUs}`,
    payload
  );
};

export const getPolicy = async (payload) => {
  return await axios.get(
    `${baseUrl}${API.policy_condition.getPolicy}`,
    payload
  );
};

export const getTeamCondition = async (payload) => {
  return await axios.get(
    `${baseUrl}${API.policy_condition.getTeamCondition}`,
    payload
  );
};
export const getAboutus = async (payload) => {
  return await axios.get(
    `${baseUrl}${API.policy_condition.getAboutUs}`,
    payload
  );
};
export const getContactUs = async (payload) => {
  return await axios.get(
    `${baseUrl}${API.policy_condition.getContactUs}`,
    payload
  );
};
export const getSubscriberAgreement = async (payload) => {
  return await axios.get(
    `${baseUrl}${API.policy_condition.getSubscriberAgreement}`,
    payload
  );
};

export const setSubscriptionManagement = async (id, payload) => {
  return await axios.post(
    `${baseUrl}${API.subscriberManagement.setSubscriptionManagement}${id}`,
    payload
  );
};

export const getTVAdBanners = async () => {
  return await axios.get(`${baseUrl}${API.adBanners.getTVBanners}`);
};

export const getAppAdBanners = async () => {
  return await axios.get(`${baseUrl}${API.adBanners.getAppBanners}`);
};

export const updateCategorySequence = async (payload) => {
  return await axios.post(`${baseUrl}${API.plan.updateSeq}`, payload);
};

export const deleteSubscriberById = async (id) => {
  return await axios.delete(
    `${baseUrl}${API.subscriberManagement.deleteNewSubscriber}${id}`
  );
};

// for video category

export const videoCategories = async () => {
  return await axios.get(`${baseUrl}${API.videoCategory.getVideoCategory}`);
};
export const deleteVideoCategory = async (id) => {
  return await axios.delete(
    `${baseUrl}${API.videoCategory.deleteVideoCategory}${id}`
  );
};
export const updateVideoCategory = async (id, body) => {
  return await axios.patch(
    `${baseUrl}${API.videoCategory.updateVideoCategory}${id}`,
    body
  );
};

export const addVideoCategory = async (payload) => {
  return await axios.post(
    `${baseUrl}${API.videoCategory.addVideoCategory}`,
    payload
  );
};

export const getAllYoutubeVideos = async (categoryId) => {
  return await axios.get(
    `${baseUrl}${API.youtubeVideo.getAllVideos}?category=${categoryId}`
  );
};

export const createYoutubeVideo = async (data) => {
  return await axios.post(`${baseUrl}${API.youtubeVideo.createVideo}`, data);
};

export const deleteYoutubeVideo = async (id) => {
  return await axios.delete(`${baseUrl}${API.youtubeVideo.deleteVideo}/${id}`);
};

export const updateYoutubeVideo = async (id, data) => {
  return await axios.patch(
    `${baseUrl}${API.youtubeVideo.updateVideo}/${id}`,
    data
  );
};

// WebSeries CRUD
export const getWebSeriesList = async () => {
  return axios.get(`${baseUrl}${API.webSeries.getAllWebSeries}`);
};
export const addWebSeries = async (payload) => {
  return axios.post(`${baseUrl}${API.webSeries.createWebSeries}`, payload);
};
export const updateWebSeries = async (id, payload) => {
  return axios.patch(
    `${baseUrl}${API.webSeries.updateWebSeries}/${id}`,
    payload
  );
};
export const deleteWebSeries = async (id) => {
  return axios.delete(`${baseUrl}${API.webSeries.deleteWebSeries}/${id}`);
};

// Season CRUD
export const getSeasonsList = async () => {
  return axios.get(`${baseUrl}${API.season.getAllSeason}`);
};
export const addSeason = async (payload) => {
  axios.post(`${baseUrl}${API.season.createSeason}`, payload);
};
export const updateSeason = async (id, payload) => {
  return axios.patch(`${baseUrl}${API.season.updateSeason}/${id}`, payload);
};
export const deleteSeason = async (id) => {
  return axios.delete(`${baseUrl}${API.season.deleteSeason}/${id}`);
};

// Episode CRUD
export const getEpisodesList = async () => {
  return axios.get(`${baseUrl}${API.episode.getAllEpisode}`);
};
export const addEpisode = async (payload) => {
  return axios.post(`${baseUrl}${API.episode.createEpisode}`, payload);
};
export const updateEpisode = async (id, payload) => {
  return axios.patch(`${baseUrl}${API.episode.updateEpisode}/${id}`, payload);
};
export const deleteEpisode = async (id) => {
  return axios.delete(`${baseUrl}${API.episode.deleteEpisode}/${id}`);
};

// free live channel
export const getAllChannelCategory = async () => {
  return await axios.get(`${baseUrl}${API.channelCategory.getChannelCategory}`);
};
export const createChannelCategory = async (data) => {
  console.log(data, " data api");
  return await axios.post(
    `${baseUrl}${API.channelCategory.addChannelCategory}`,
    data
  );
};
export const updateChannelCategory = async (id, data) => {
  console.log(data, " data api");
  return await axios.patch(
    `${baseUrl}${API.channelCategory.updateChannelCategory}${id}`,
    data
  );
};
export const deleteChannelCategory_api = async (id, data) => {
  console.log(data, " data api");
  return await axios.delete(
    `${baseUrl}${API.channelCategory.deleteChannelCategory}${id}`,
    data
  );
};

//  this components for free live channels
export const getFreeLiveChannels = async () => {
  return await axios.get(`${baseUrl}${API.freeLiveChannel.getFreeLiveChannel}`);
};

export const createLiveFreeChannel = async (data) => {
  console.log(data, " data api");
  return await axios.post(
    `${baseUrl}${API.freeLiveChannel.addFreeLiveChannel}`,
    data
  );
};
export const updateLiveFreeChannel = async (id, data) => {
  console.log(data, " data api");
  return await axios.patch(
    `${baseUrl}${API.freeLiveChannel.updateFreeLiveChannel}${id}`,
    data
  );
};

export const deleteLiveFreeChannel = async (id, data) => {
  console.log(data, " data api");
  return await axios.delete(
    `${baseUrl}${API.freeLiveChannel.deleteFreeLiveChannel}${id}`,
    data
  );
};
export const uploadFreeChannelUsingCsv = async (data) => {
  return await axios.post(
    `${baseUrl}${API.freeLiveChannel.uploadFreeChannelUsingCsv}`,
    data
  );
};

// cms

export const getPrivacyPolicy = async () => {
  return await axios.get(`${baseUrl}${API.cms.getPrivacyPolicy}`);
};
export const getTermAndCondition = async (data) => {
  return await axios.get(`${baseUrl}${API.cms.getTermAndCondition}`, data);
};
export const getAboutUs = async (data) => {
  return await axios.get(`${baseUrl}${API.cms.getAboutus}`, data);
};

// subscription  plan

export const getPlans = async () => {
  return await axios.get(`${baseUrl}${API.plan.getPlans}`);
};
export const addPlans = async (data) => {
  return await axios.post(`${baseUrl}${API.plan.addplan}`, data);
};
export const deletePlans = async (id) => {
  console.log("deletePlanId", id);
  return await axios.delete(`${baseUrl}${API.plan.deletePlan}${id}`);
};
export const addSubscription = async (data) => {
  return await axios.post(`${baseUrl}${API.plan.addSubscription}`, data);
};
export const editPlan = async (id, data) => {
  return await axios.patch(`${baseUrl}${API.plan.editPlan}${id}`, data);
};

// homeContent  module

export const getAllHomeContent = async () => {
  return await axios.get(`${baseUrl}${API.homeContent.getAllHomeContent}`);
};

export const createHomeContent = async (data) => {
  return await axios.post(`${baseUrl}${API.homeContent.addHomeContent}`, data);
};

export const editHomeContent = async (id, data) => {
  return await axios.patch(
    `${baseUrl}${API.homeContent.editHomeContent}${id}`,
    data
  );
};
export const deleteHomeContent = async (id) => {
  return await axios.delete(
    `${baseUrl}${API.homeContent.deleteHomeContent}${id}`
  );
};

// OTT
export const getAllOttContent = async () => {
  return await axios.get(`${baseUrl}${API.ottContent.getAllOttContent}`);
};

export const createOttContent = async (data) => {
  return await axios.post(`${baseUrl}${API.ottContent.addOttContent}`, data);
};

export const deleteOttContent = async (id) => {
  return await axios.delete(
    `${baseUrl}${API.ottContent.deleteOttContent}/${id}`
  );
};

export const updateOttContent = async (id, data) => {
  return await axios.patch(
    `${baseUrl}${API.ottContent.editOttContent}/${id}`,
    data
  );
};

//  this components for Exclusive channels
export const getExclusiveChannels = async () => {
  return await axios.get(
    `${baseUrl}${API.exclusiveChannel.getExclusiveChannel}`
  );
};

export const createExclusiveChannel = async (data) => {
  console.log(data, " data api");
  return await axios.post(
    `${baseUrl}${API.exclusiveChannel.addExclusiveChannel}`,
    data
  );
};
export const updateExclusiveChannel = async (id, data) => {
  console.log(data, " data api");
  return await axios.patch(
    `${baseUrl}${API.exclusiveChannel.updateExclusiveChannel}${id}`,
    data
  );
};

export const deleteExclusiveChannel = async (id, data) => {
  console.log(data, " data api");
  return await axios.delete(
    `${baseUrl}${API.exclusiveChannel.deleteExclusiveChannel}${id}`,
    data
  );
};

// HomeTitle module
export const getAllHomeTitle = async () => {
  return await axios.get(`${baseUrl}${API.homeTitle.getHomeTitle}`);
};

export const createHomeTitle = async (data) => {
  return await axios.post(`${baseUrl}${API.homeTitle.addHomeTitle}`, data);
};

export const editHomeTitle = async (id, data) => {
  return await axios.patch(
    `${baseUrl}${API.homeTitle.updateHomeTitle}/${id}`,
    data
  );
};

export const deleteHomeTitle = async (id) => {
  return await axios.delete(`${baseUrl}${API.homeTitle.deleteHomeTitle}/${id}`);
};

// Shorts module
export const getAllShorts = async (categoryId = null) => {
  const url = categoryId
    ? `${baseUrl}${API.shorts.getShorts}?shortsCategory=${categoryId}`
    : `${baseUrl}${API.shorts.getShorts}`;
  return await axios.get(url);
};

export const createShorts = async (data) => {
  return await axios.post(`${baseUrl}${API.shorts.addShorts}`, data);
};

export const editShorts = async (id, data) => {
  return await axios.patch(`${baseUrl}${API.shorts.updateShorts}/${id}`, data);
};

export const deleteShorts = async (id) => {
  return await axios.delete(`${baseUrl}${API.shorts.deleteShorts}/${id}`);
};

// shorts category
export const getAllShortsCategory = async () => {
  return await axios.get(`${baseUrl}${API.shorts.getShortsCategory}`);
};

export const createShortsCategory = async (data) => {
  return await axios.post(`${baseUrl}${API.shorts.addShortsCategory}`, data);
};

export const editShortsCategory = async (id, data) => {
  return await axios.patch(
    `${baseUrl}${API.shorts.updateShortsCategory}/${id}`,
    data
  );
};

export const deleteShortsCategory = async (id) => {
  return await axios.delete(
    `${baseUrl}${API.shorts.deleteShortsCategory}/${id}`
  );
};

// Tunes module
export const getAllTunes = async (categoryId = null) => {
  const url = categoryId
    ? `${baseUrl}${API.tunes.getTunes}?tuneCategory=${categoryId}`
    : `${baseUrl}${API.tunes.getTunes}`;
  return await axios.get(url);
};

export const createTunes = async (data) => {
  return await axios.post(`${baseUrl}${API.tunes.addTunes}`, data);
};

export const editTunes = async (id, data) => {
  return await axios.patch(`${baseUrl}${API.tunes.updateTunes}/${id}`, data);
};

export const deleteTunes = async (id) => {
  return await axios.delete(`${baseUrl}${API.tunes.deleteTunes}/${id}`);
};

// tunes category
export const getAllTunesCategory = async () => {
  return await axios.get(`${baseUrl}${API.tunes.getTunesCategory}`);
};

export const createTunesCategory = async (data) => {
  return await axios.post(`${baseUrl}${API.tunes.addTunesCategory}`, data);
};

export const editTunesCategory = async (id, data) => {
  return await axios.patch(
    `${baseUrl}${API.tunes.updateTunesCategory}/${id}`,
    data
  );
};

export const deleteTunesCategory = async (id) => {
  return await axios.delete(`${baseUrl}${API.tunes.deleteTunesCategory}/${id}`);
};

// Podcasts module
export const getAllPodcasts = async (categoryId = null) => {
  const url = categoryId
    ? `${baseUrl}${API.podcasts.getPodcasts}?podcastCategory=${categoryId}`
    : `${baseUrl}${API.podcasts.getPodcasts}`;
  return await axios.get(url);
};

export const createPodcasts = async (data) => {
  return await axios.post(`${baseUrl}${API.podcasts.addPodcasts}`, data);
};

export const editPodcasts = async (id, data) => {
  return await axios.patch(
    `${baseUrl}${API.podcasts.updatePodcasts}/${id}`,
    data
  );
};

export const deletePodcasts = async (id) => {
  return await axios.delete(`${baseUrl}${API.podcasts.deletePodcasts}/${id}`);
};

// podcasts category
export const getAllPodcastsCategory = async () => {
  return await axios.get(`${baseUrl}${API.podcasts.getPodcastsCategory}`);
};

export const createPodcastsCategory = async (data) => {
  return await axios.post(
    `${baseUrl}${API.podcasts.addPodcastsCategory}`,
    data
  );
};

export const editPodcastsCategory = async (id, data) => {
  return await axios.patch(
    `${baseUrl}${API.podcasts.updatePodcastsCategory}/${id}`,
    data
  );
};

export const deletePodcastsCategory = async (id) => {
  return await axios.delete(
    `${baseUrl}${API.podcasts.deletePodcastsCategory}/${id}`
  );
};

// Devotional module
export const getAllDevotionals = async (categoryId = null) => {
  const url = categoryId
    ? `${baseUrl}${API.devotionals.getDevotionals}?devotionalCategory=${categoryId}`
    : `${baseUrl}${API.devotionals.getDevotionals}`;
  return await axios.get(url);
};

export const createDevotionals = async (data) => {
  return await axios.post(`${baseUrl}${API.devotionals.addDevotionals}`, data);
};

export const editDevotionals = async (id, data) => {
  return await axios.patch(
    `${baseUrl}${API.devotionals.updateDevotionals}/${id}`,
    data
  );
};

export const deleteDevotionals = async (id) => {
  return await axios.delete(
    `${baseUrl}${API.devotionals.deleteDevotionals}/${id}`
  );
};

// devotional category
export const getAllDevotionalsCategory = async () => {
  return await axios.get(`${baseUrl}${API.devotionals.getDevotionalsCategory}`);
};

export const createDevotionalsCategory = async (data) => {
  return await axios.post(
    `${baseUrl}${API.devotionals.addDevotionalsCategory}`,
    data
  );
};

export const editDevotionalsCategory = async (id, data) => {
  return await axios.patch(
    `${baseUrl}${API.devotionals.updateDevotionalsCategory}/${id}`,
    data
  );
};

export const deleteDevotionalsCategory = async (id) => {
  return await axios.delete(
    `${baseUrl}${API.devotionals.deleteDevotionalsCategory}/${id}`
  );
};

// Sports module
export const getAllSports = async (categoryId = null) => {
  const url = categoryId
    ? `${baseUrl}${API.sports.getSports}?category=${categoryId}`
    : `${baseUrl}${API.sports.getSports}`;
  return await axios.get(url);
};

export const createSports = async (data) => {
  return await axios.post(`${baseUrl}${API.sports.addSports}`, data);
};

export const editSports = async (id, data) => {
  return await axios.patch(`${baseUrl}${API.sports.updateSports}/${id}`, data);
};

export const deleteSports = async (id) => {
  return await axios.delete(`${baseUrl}${API.sports.deleteSports}/${id}`);
};

// sport category
export const getAllSportsCategory = async () => {
  return await axios.get(`${baseUrl}${API.sports.getSportsCategory}`);
};

export const createSportsCategory = async (data) => {
  return await axios.post(`${baseUrl}${API.sports.addSportsCategory}`, data);
};

export const editSportsCategory = async (id, data) => {
  return await axios.patch(
    `${baseUrl}${API.sports.updateSportsCategory}/${id}`,
    data
  );
};

export const deleteSportsCategory = async (id) => {
  return await axios.delete(
    `${baseUrl}${API.sports.deleteSportsCategory}/${id}`
  );
};

// Dummy function for Watcho plans - TODO: Replace with actual API endpoint
export const getWatchoPlans = async () => {
  return await axios.get(`${baseUrl}${API.watcho.getWatchoPlans}`);
};

// subscription management
export const getAllUsersWithSubscriptions = async () => {
  return await axios.get(
    `${baseUrl}${API.subscriptionManagement.allUsersWithSubscriptions}`
  );
};

// Dashboard API
export const getAllDashboardStats = async () => {
  return await axios.get(`${baseUrl}${API.dashboard.getAllStats}`);
};

// Referral Api
export const getAllReferrals = async () => {
  return await axios.get(`${baseUrl}${API.referral.getAllReferrals}`);
};

// highLights Api
export const getAllHighLights = async () => {
  return await axios.get(`${baseUrl}${API.highLight.getAllHighLight}`);
};

export const createHighLights = async (data) => {
  return await axios.post(`${baseUrl}${API.highLight.addHighLight}`, data);
};

export const updateHighLights = async (id, data) => {
  return await axios.patch(
    `${baseUrl}${API.highLight.updateHighLight}${id}`,
    data
  );
};

export const deleteHighLights = async (id) => {
  return await axios.delete(`${baseUrl}${API.highLight.deleteHighLight}${id}`);
};
