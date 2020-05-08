import net from "../services/net";

const api = {
  updateLike: async (videoId, value) => {
    return await net.post("/video/like", {
      id: videoId,
      value: value,
    });
  },
  updateFollow: async (channelId, value) => {
    return await net.post("/channel/follow", {
      id: channelId,
      value: value,
    });
  },
  getVideo: async (id) => {
    return await net.post("/video/get", { 
      id: id
    });
  },
  getNewVideos: async() => {
    return await net.get("/feed/newvideos");
  }
};

export default api;
