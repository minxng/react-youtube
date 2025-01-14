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
    subscriberCount: string;
    viewCount: string;
    likeCount: string;
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

  async search(page_token: string | null, keyword: string) {
    return keyword
      ? this.searchByKeyword(keyword, page_token)
      : this.mostPopular(page_token);
  }

  private async searchByKeyword(keyword: string, page_token: string | null) {
    const res = await this.httpClient.get("search", {
      params: {
        part: "snippet",
        maxResults: 24,
        type: "video",
        q: keyword,
        pageToken: page_token,
      },
    });

    const itemsWithViewCount = await Promise.all(
      res.data.items.map(
        async (item: {
          snippet: { channelId: string };
          id: { videoId: string };
        }) => {
          const counts = await this.getCounts(item.id.videoId);
          const channelImg = await this.getChannelInfo(item.snippet.channelId);
          return {
            ...item,
            id: item.id.videoId,
            statistics: {
              viewCount: counts.view_count,
              likeCount: counts.like_count,
            },
            channel_img: channelImg,
          };
        }
      )
    );
    return {
      ...res.data,
      items: itemsWithViewCount,
    };
  }

  private async mostPopular(page_token: string | null) {
    return this.httpClient
      .get("videos", {
        params: {
          part: "snippet,statistics,contentDetails",
          maxResults: 24,
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
        return Promise.all(data).then((items) => ({
          ...res.data,
          items: items,
        }));
      });
  }

  async getChannelInfo(channel_id: string) {
    return this.httpClient
      .get("channels", {
        params: {
          part: "snippet, statistics",
          id: channel_id,
        },
      })
      .then((res: YouTubeResponse) => {
        return {
          subscriber_count: res.data.items[0].statistics.subscriberCount,
          view_count: res.data.items[0].statistics.viewCount,
          thumbnail: res.data.items[0].snippet.thumbnails,
        };
      });
  }

  async searchChannel(channel_id: number) {
    const res = await this.httpClient.get("search", {
      params: {
        part: "snippet",
        maxResults: 10,
        type: "video",
        channelId: channel_id,
        order: "date",
      },
    });

    const itemsWithViewCount = await Promise.all(
      res.data.items.map(async (item: { id: { videoId: string } }) => {
        const counts = await this.getCounts(item.id.videoId);
        return {
          ...item,
          channel_img: null,
          statistics: {
            viewCount: counts.view_count,
            likeCount: counts.like_count,
          },
        };
      })
    );

    return itemsWithViewCount;
  }

  async getCounts(id: string) {
    const res = await this.httpClient.get("videos", {
      params: {
        id: id,
        part: "statistics",
        maxResults: 1,
        type: "video",
        regionCode: "KR",
      },
    });
    return {
      view_count: res.data.items[0].statistics.viewCount,
      like_count: res.data.items[0].statistics.likeCount,
    };
  }
}
