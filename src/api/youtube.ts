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
    channelId: string;
    publishedAt: string;
  };
  statistics: {
    viewCount: string;
  };
}

interface YouTubeResponse {
  data: {
    nextPageToken: string;
    items: YouTubeSearchResult[];
  };
}

export default class Youtube {
  httpClient: any;
  constructor() {
    this.httpClient = axios.create({
      baseURL: "https://youtube.googleapis.com/youtube/v3",
      params: { key: process.env.REACT_APP_YOUTUBE_API_KEY },
    });
  }

  async search(keyword: string, page_token?: string) {
    return keyword
      ? this.searchByKeyword(keyword, page_token)
      : this.mostPopular(page_token);
  }

  private async searchByKeyword(keyword: string, page_token?: string) {
    const res = await this.httpClient.get("search", {
      params: {
        part: "snippet",
        maxResults: 25,
        type: "video",
        q: keyword,
        pageToken: page_token,
      },
    });

    const itemsWithViewCount = await Promise.all(
      res.data.items.map(async (item: { id: { videoId: string } }) => {
        const viewCount = await this.getViewCount(item.id.videoId);
        return { ...item, id: item.id.videoId, viewCount: viewCount };
      })
    );
    return itemsWithViewCount;
  }

  private async mostPopular(page_token?: string) {
    return this.httpClient
      .get("videos", {
        params: {
          part: "snippet,statistics,contentDetails",
          maxResults: 25,
          type: "video",
          chart: "mostPopular",
          regionCode: "KR",
          pageToken: page_token,
        },
      })
      .then((res: YouTubeResponse) => {
        const data = res.data.items.map((item) => {
          return this.getChannelInfo(item.snippet.channelId).then(
            (channelInfo) => ({
              ...item,
              channel_img: channelInfo,
            })
          );
        });
        return Promise.all(data);
      });
  }

  // 채널 썸네일
  async getChannelInfo(channel_id: string) {
    return this.httpClient
      .get("channels", {
        params: {
          part: "snippet",
          id: channel_id,
        },
      })
      .then((res: YouTubeResponse) => {
        return res.data.items[0].snippet.thumbnails;
      });
  }

  // 해당 채널의 동영상
  async searchChannel(channel_id: number) {
    const res = await this.httpClient.get("search", {
      params: {
        part: "snippet",
        maxResults: 10, // 추후 20으로 수정하기
        type: "video",
        channelId: channel_id,
        order: "date",
      },
    });

    const itemsWithViewCount = await Promise.all(
      res.data.items.map(async (item: { id: { videoId: string } }) => {
        const viewCount = await this.getViewCount(item.id.videoId);
        return {
          ...item,
          channel_img: null,
          viewCount,
        };
      })
    );

    return itemsWithViewCount;
  }

  async getViewCount(id: string) {
    const res = await this.httpClient.get("videos", {
      params: {
        id: id,
        part: "statistics",
        maxResults: 1,
        type: "video",
        regionCode: "KR",
      },
    });
    return res.data.items[0].statistics.viewCount;
  }
}
