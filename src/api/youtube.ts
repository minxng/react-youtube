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

export default class Youtube {
  httpClient: any;
  constructor() {
    // 기본적인 url과 key 설정
    this.httpClient = axios.create({
      baseURL: "https://youtube.googleapis.com/youtube/v3",
      params: { key: process.env.REACT_APP_YOUTUBE_API_KEY },
    });
  }

  async search(keyword: string) {
    return keyword ? this.searchByKeyword(keyword) : this.mostPopular();
  }

  private async searchByKeyword(keyword: string) {
    return this.httpClient
      .get("search", {
        params: {
          part: "snippet",
          maxResults: 25,
          type: "video",
          q: keyword,
        },
      })
      .then((res: YouTubeResponse) =>
        res.data.items.map((item) => ({ ...item, id: item.id.videoId }))
      );
  }

  private async mostPopular() {
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
      .then((res: YouTubeResponse) => res.data.items);
  }

  async getChannelInfo(channel_id: number) {
    return this.httpClient
      .get("channels", {
        params: {
          part: "snippet",
          id: channel_id,
        },
      })
      .then((res: YouTubeResponse) => res.data.items[0]);
  }

  async searchChannel(channel_id: number) {
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
      .then((res: YouTubeResponse) =>
        res.data.items.map((item) => ({ ...item }))
      );
  }
}
