// export let baseUrl = "https://ziggsmsbackend.onrender.com";
// export let baseUrl = "https://ziggapp.in";
// export const baseUrl = "http://167.71.232.245:4202";
export const baseUrl = "https://admin.fast1.app";
// export const baseUrl = "http://localhost:4202";

// export const baseUrl = "http://31.97.61.208:4202";

export const API = {
  plan: {
    addPlan: "/plan/addPlan",
    deletePlan: "/plan/deletePlanById/",
    getPlanByCreator: "/plan/getPlanByCreator/",
    getPlanById: "/plan/getPlanById/",
    bulkInsertPlan: "/plan/bulkInsertPlan",
    statusChanges: "/plan/updatePlanStatus/",
    getAllChannel: "/channel/getAllChannel",
    deleteChannel: "/channel/deleteChannel/",
    // getAllChannelByCategory: "/channel/getAllChannelByCategory",
    getchannelCategory: "/channel/getCategories",
    addCategory: "/channel/addCategory",
    updateCategory: "/channel/updateCategory/",
    deleteCategory: "/channel/deleteCategory/",
    addChannel: "/channel/addChannel",
    // channelByFilter: "/channel/getChannelByFilter",
    getAllPlans: "/plan/getAllPlans",
    getAllChannelByCategory: "/channel/getAllChannelByCategory",
    getChannelById: "/channel/getChannelById/",
    updateChannelById: "/channel/updateChannel/",
    updatePlan: "/plan/updatePlanById",
    updateSeq: "/channel/updateSeq",
  },

  user: {
    addUser: "/ispMember/addMember",
    getAllUser: "/ispMember/getAllIspMember",
    getUserById: "/ispMember/getMemberById/",
    deleteUser: "/ispMember/deleteIspMember/",
    updateUser: "/ispMember/updateMember/",
    updateMemberStatus: "/ispMember/updateMemberStatus/",
    uploadFile: "/upload/uploadDocuments",
  },

  subscriberManagement: {
    addSubscriber: "/subscriber/addNewConnection",
    getAllSubscriber: "/newSubscriber/getAllSubscriber",
    deleteNewSubscriber: "/newSubscriber/deleteNewSubscriber/",
    getSubscriberById: "/subscriber/getSubscriberById/",
    updateSubscriber: "/subscriber/updateSubscriber/",
    deleteSubscriber: "/subscriber/deleteSubscriberById/",
    updateSubscriberStatus: "/subscriber/updateStatusById/",
    updatePackage: "/newSubscriber/updatePackageById/",
    getSubscriberByNumber: "/newSubscriber/getSubscriberByNumber",
    setSubscriptionManagement: "/newSubscriber/setSubscriptionManagement/",
    updateSecurityStatus: "/newSubscriber/updateSecurityStatus",
  },

  securityCheckManagement: { getSecurityStatus: "/securityCheck/status" },

  invoice: {
    addInvoices: "/invoice/addInvoice",
    getInvoiceById: "/invoice/getInvoiceByCreator/",
    viewDetailInvoice: "/invoice/getInvoiceById/id",
    getInvoicePdfById: "/invoice/getInvoiceById/",
  },
  role: {
    addRole: "/role/superAdmin/addRole",
    getAllRole: "/role/superAdmin/getAllRoleData",
    deleteRole: "/role/superAdmin/deleteRole/",
    updatePermission: "/role/superAdmin/updateRolePermissionById/",
    getRoleDatabyId: "/role/getRoleDatabyId/",
    getPermissionsByRole: "/role/superAdmin/getPermissionByRole",
  },
  auth: {
    login: "/auth/login",
    forgetPassword: "/auth/forgetPassword",
    changePassword: "/auth/changePassword",
    checkUserTokenIsValid: "/auth/checkUserTokenIsValid",
    SendOtp: "/auth/sendOtp",
    VerifyOtp: "/auth/verifyOtp",
  },
  logs: {
    getEventLogsAll: "/log/getEventLogsAll",
  },
  document: {
    upload: "/upload/uploadDocuments",
    deleteDocs: "/upload/deleteMultipleDocData",
  },
  language: {
    allLanguage: "/language/getAllLanguages",
    addLanguage: "/language/addLanguage",
    updateLanguage: "/language/updateLanguageById/",
    deleteLanguage: "/language/deleteLanguageById/",
  },

  genre: {
    allGenre: "/genre/getAllgenre",
    addGenre: "/genre/addgenre",
    updateGenre: "/genre/updategenreById/",
    deleteGenre: "/genre/deletegenreById/",
  },

  broadcaster: {
    getAllBroadcaster: "/broadcaster/getAllBroadcaster",
    addBroadcaster: "/broadcaster/addBroadcaster",
    updateBroadcaster: "/broadcaster/updateBroadcaster/",
    deletBroadcaster: "/broadcaster/deleteBroadcaster/",
  },
  banner: {
    addBanner: "/banner/addBanner",
    updateBanner: "/banner/editBanner/",
    getBanners: "/banner/getAllBanner",
    getSliderImages: "/banner/getAllSliderImg",
    deleteBanner: "/banner/deleteBanner/",
    addAppBanner: "/banner/app/addBanner",
    updateAppBanner: "/banner/app/updateBanner/",
    getAppBanners: "/banner/app/getAllBanner",
    deleteAppBanner: "/banner/app/deleteBanner/",
  },
  package: {
    add: "/plan/addPlan",
    update: "/plan/updatePlanById/",
    delete: "/plan/deletePlanById/",
  },
  policy_condition: {
    addPolicy: "/policy_condition/addAndUpdatePolicy",
    addTeamCondition: "/policy_condition/addAndUpdateTeamCondition",
    addSubscriberAgreement: "/policy_condition/addAndUpdateSubscriberAgreement",
    addAboutUs: "/policy_condition/addAndUpdateAboutUs",
    addContactUs: "/policy_condition/addAndUpdateContactUs",
    getPolicy: "/policy_condition/getPolicy",
    getTeamCondition: "/policy_condition/getTeamCondition",
    getAboutUs: "/policy_condition/getAboutUs",
    getContactUs: "/policy_condition/getContactUs",
    getSubscriberAgreement: "/policy_condition/getSubscriberAgreement",
  },
  adBanners: {
    getTVBanners: "/banner/getAllAdvBanner",
    getAppBanners: "/banner/app/getAllAdvAppBanner",
  },
  youtubeVideo: {
    createVideo: "/video/add",
    getAllVideos: "/video",
    updateVideo: "/video",
    deleteVideo: "/video",
  },

  // for video Category
  videoCategory: {
    addVideoCategory: "/videoCategory/videoCategory",
    getVideoCategory: "/videoCategory/videoCategory",
    updateVideoCategory: "/videoCategory/videoCategory/",
    deleteVideoCategory: "/videoCategory/videoCategory/",
  },
  // webSeries
  webSeries: {
    createWebSeries: "/webSeries",
    getAllWebSeries: "/webSeries",
    updateWebSeries: "/webSeries",
    deleteWebSeries: "/webSeries",
  },

  season: {
    createSeason: "/season",
    getAllSeason: "/season",
    updateSeason: "/season",
    deleteSeason: "/season",
  },

  episode: {
    createEpisode: "/episode",
    getAllEpisode: "/episode",
    updateEpisode: "/episode",
    deleteEpisode: "/episode",
  },

  // for Channel Category
  channelCategory: {
    addChannelCategory: "/channelCat/channelCategory",
    getChannelCategory: "/channelCat/channelCategory",
    updateChannelCategory: "/channelCat/channelCategory/",
    deleteChannelCategory: "/channelCat/channelCategory/",
  },

  // for free live channels
  freeLiveChannel: {
    getFreeLiveChannel: "/freeChannel/liveChannel?notFilter=false",
    addFreeLiveChannel: "/freeChannel/liveChannel",
    updateFreeLiveChannel: "/freeChannel/liveChannel/",
    deleteFreeLiveChannel: "/freeChannel/liveChannel/",
    uploadFreeChannelUsingCsv: "/importChannelCsv",
  },

  // cms
  cms: {
    getPrivacyPolicy: "/policy_condition/getPolicy",
    getTermAndCondition: "/policy_condition/getTeamCondition",
    getAboutus: "/policy_condition/getAboutUs",
  },

  // subscription Plan
  plan: {
    addplan: "/subscriptionPlan/add",
    getPlans: "/subscriptionPlan/allPlans",
    editPlan: "/subscriptionPlan/",
    deletePlan: "/subscriptionPlan/",
    addSubscription: "/subscription/add",
  },

  // Home content module
  homeContent: {
    addHomeContent: "/homeContent/add",
    getAllHomeContent: "/homeContent/content_all",
    editHomeContent: "/homeContent/",
    deleteHomeContent: "/homeContent/",
  },

  ottContent: {
    addOttContent: "/ottHub/add",
    getAllOttContent: "/ottHub",
    editOttContent: "/ottHub",
    deleteOttContent: "/ottHub",
  },

  exclusiveChannel: {
    getExclusiveChannel: "/freeChannel/xclusive",
    addExclusiveChannel: "/freeChannel/liveChannel",
    updateExclusiveChannel: "/freeChannel/liveChannel/",
    deleteExclusiveChannel: "/freeChannel/liveChannel/",
  },

  // HomeTitle
  homeTitle: {
    getHomeTitle: "/homeTitle",
    addHomeTitle: "/homeTitle",
    updateHomeTitle: "/homeTitle",
    deleteHomeTitle: "/homeTitle",
  },

  // Podcast
  podcasts: {
    getPodcasts: "/podcasts",
    addPodcasts: "/podcasts",
    updatePodcasts: "/podcasts",
    deletePodcasts: "/podcasts",
    getPodcastsCategory: "/podcasts/podcastCategory",
    addPodcastsCategory: "/podcasts/podcastCategory",
    updatePodcastsCategory: "/podcasts/podcastCategory",
    deletePodcastsCategory: "/podcasts/podcastCategory",
  },

  // Shorts
  shorts: {
    getShorts: "/shorts",
    addShorts: "/shorts",
    updateShorts: "/shorts",
    deleteShorts: "/shorts",
    getShortsCategory: "/shorts/shortsCategory",
    addShortsCategory: "/shorts/shortsCategory",
    updateShortsCategory: "/shorts/shortsCategory",
    deleteShortsCategory: "/shorts/shortsCategory",
  },
  // Tunes
  tunes: {
    getTunes: "/tunes",
    addTunes: "/tunes",
    updateTunes: "/tunes",
    deleteTunes: "/tunes",
    getTunesCategory: "/tunes/tuneCategory",
    addTunesCategory: "/tunes/tuneCategory",
    updateTunesCategory: "/tunes/tuneCategory",
    deleteTunesCategory: "/tunes/tuneCategory",
  },
  // Tunes
  devotionals: {
    getDevotionals: "/devotionals",
    addDevotionals: "/devotionals",
    updateDevotionals: "/devotionals",
    deleteDevotionals: "/devotionals",
    getDevotionalsCategory: "/devotionals/devotionalsCategory",
    addDevotionalsCategory: "/devotionals/devotionalsCategory",
    updateDevotionalsCategory: "/devotionals/devotionalsCategory",
    deleteDevotionalsCategory: "/devotionals/devotionalsCategory",
  },
  // Tunes
  sports: {
    getSports: "/sports",
    addSports: "/sports",
    updateSports: "/sports",
    deleteSports: "/sports",
  },

  // Watcho
  watcho: {
    getWatchoPlans: "/watcho/watcho/all-plans",
  },

  // Subscription Management
  subscriptionManagement: {
    allUsersWithSubscriptions: "/subscription/allUsersSubscriptions",
  },

  dashboard: {
    getAllStats: "/dashboard-stats/stats",
  },

  referral: {
    getAllReferrals: "/referral/admin/all-referrals",
  },

  highLight: {
    addHighLight: "/highLights",
    getAllHighLight: "/highLights",
    updateHighLight: "/highLights/",
    deleteHighLight: "/highLights/",
  },
};
