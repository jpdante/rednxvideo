import net from "../services/net";
import { logout, isAuthenticated } from "../services/auth";

const api = {
  updateLike: async (videoId, value) => {
    const response = await net.post("/video/like", {
      id: videoId,
      value: value,
    });
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
  sendComment: async (videoId, comment) => {
    const response = await net.post("/comment/put", {
      id: videoId,
      comment: comment,
    });
    api.checkSession(response);
    return response;
  },
  getVideo: async (id) => {
    return await net.post("/video/get", { 
      id: id
    });
  },
  getNewVideos: async() => {
    return await net.get("/feed/newvideos");
  },
  checkSession: async(response) => {
    if(!isAuthenticated()) return;
    if(response !== undefined) {
      if(response.data.invalidSession === true) {
        logout();
        window.location.reload();
      }
    } else {
      const response = await net.get("/auth/checksession");
      if(response.data.invalidSession === true) {
        logout();
        window.location.reload();
      }
    }
  }
};

export default api;
