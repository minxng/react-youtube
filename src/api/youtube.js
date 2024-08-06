import axios from "axios";

export default class Youtube {
  constructor() {
    // 기본적인 url과 key 설정
    this.httpClient = axios.create({
      baseURL: "https://youtube.googleapis.com/youtube/v3",
      params: { key: process.env.REACT_APP_YOUTUBE_API_KEY },
    });
  }

  async search(keyword) {
    return keyword ? this.#searchByKeyword(keyword) : this.#mostPopular();
  }

  async #searchByKeyword(keyword) {
    return this.httpClient
      .get("search", {
        params: {
          part: "snippet",
          maxResults: 25,
          type: "video",
          q: keyword,
        },
      })
      .then((res) =>
        res.data.items.map((item) => ({ ...item, id: item.id.videoId }))
      );
  }

  async #mostPopular() {
    return this.httpClient
      .get("videos", {
        params: {
          part: "snippet",
          maxResults: 25,
          type: "video",
          chart: "mostPopular",
          regionCode: "KR",
        },
      })
      .then((res) => res.data.items);
  }

  async getChannelInfo(channel_id) {
    return this.httpClient
      .get("channels", {
        params: {
          part: "snippet",
          id: channel_id,
        },
      })
      .then((res) => res.data.items[0]);
  }

  async searchChannel(channel_id) {
    return this.httpClient
      .get("search", {
        params: {
          part: "snippet",
          maxResults: 10,
          type: "video",
          channelId: channel_id,
          order: "date",
        },
      })
      .then((res) => res.data.items.map((item) => ({ ...item })));
  }
}
