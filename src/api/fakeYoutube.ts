import axios from "axios";

interface YouTubeSearchResult {
  id: {
    videoId: string;
  };
  snippet: {
    title: string;
    description: string;
    thumbnails: {
      medium: {
        url: string;
      };
    };
    channelTitle: string;
    publishedAt: string;
  };
}

interface YouTubeResponse {
  data: {
    items: YouTubeSearchResult[];
  };
}

export default class FakeYoutube {
  async search(keyword: string) {
    return keyword ? this.#searchByKeyword() : this.#mostPopular();
  }
  async #searchByKeyword() {
    return axios
      .get(`/videos/search.json`)
      .then((res: YouTubeResponse) => res.data.items)
      .then((items) => items.map((item) => ({ ...item, id: item.id.videoId })));
  }

  async #mostPopular() {
    return axios.get(`/videos/popular.json`).then((res) => res.data.items);
  }
  async getChannelInfo() {
    return axios.get(`/videos/channel.json`).then((res) => res.data.items[0]);
  }

  async searchChannel() {
    return axios
      .get("/videos/searchChannel.json")
      .then((res: YouTubeResponse) => res.data.items)
      .then((items) => items.map((item) => ({ ...item, id: item.id.videoId })));
  }
}
