import axios from "axios";

export default class FakeYoutube {
  constructor() {}
  async search(keyword) {
    return keyword ? this.#searchByKeyword(keyword) : this.#mostPopular();
  }
  async #searchByKeyword() {
    return axios
      .get(`/videos/search.json`)
      .then((res) => res.data.items)
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
      .then((res) => res.data.items)
      .then((items) => items.map((item) => ({ ...item, id: item.id.videoId })));
  }
}
