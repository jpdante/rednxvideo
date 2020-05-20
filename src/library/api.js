import net from "../services/net";
import { logout, isAuthenticated } from "../services/auth";

const api = {
  // ~~~~ AUTH ~~~~
  register: async (data) => {
    const response = await net.post("/auth/register", data);
    return response;
  },
  login: async (data) => {
    const response = await net.post("/auth/login", data);
    return response;
  },
  checkSession: async (response) => {
    if (!isAuthenticated()) return;
    if (response !== undefined) {
      if (response.data.invalidSession === true) {
        logout();
        window.location.reload();
      }
    } else {
      const response = await net.get("/auth/checksession");
      if (response.data.invalidSession === true) {
        logout();
        window.location.reload();
      }
    }
  },
  // ~~~~ CHANNEL ~~~~
  newChannel: async (channelName, channelLink, captcha) => {
    const response = await net.post("/channel/new", {
      channelName: channelName,
      channelLink: channelLink,
      captcha: captcha,
    });
    api.checkSession(response);
    return response;
  },
  canCreateNewChannel: async () => {
    const response = await net.get("/channel/cancreate");
    api.checkSession(response);
    return response;
  },
  updateFollow: async (channelId, value) => {
    const response = await net.post("/channel/follow", {
      id: channelId,
      value: value,
    });
    api.checkSession(response);
    return response;
  },
  getChannel: async (channelLink) => {
    const response = await net.post("/channel/get", {
      link: channelLink,
    });
    return response;
  },
  // ~~~~ VIDEO ~~~~
  updateLike: async (videoId, value) => {
    const response = await net.post("/video/like", {
      id: videoId,
      value: value,
    });
    api.checkSession(response);
    return response;
  },
  getVideo: async (id) => {
    return await net.post("/video/get", {
      id: id,
    });
  },
  // ~~~~ COMMENT ~~~~
  sendComment: async (videoId, comment) => {
    const response = await net.post("/comment/put", {
      id: videoId,
      comment: comment,
    });
    api.checkSession(response);
    return response;
  },
  getComments: async (id) => {
    return await net.post("/comment/get", {
      id: id,
    });
  },
  // ~~~~ FEED ~~~~
  getNewVideos: async () => {
    return await net.get("/feed/newvideos");
  },
};

export default api;
