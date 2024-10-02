import { useQuery } from "@tanstack/react-query";
import { useYoutubeApi } from "../context/YoutubeApiContext";
import VideoCard from "./VideoCard";
interface Video {
  id: string;
  snippet: {
    title: string;
    channelId: string;
    thumbnails: {
      medium: {
        url: string;
      };
    };
    channelTitle: string;
    publishedAt: string;
  };
  statistics: {
    viewCount: string;
  };
  channel_img?: { default: { url: string } };
}
export default function ChannelVideos({ id }: { id: number }) {
  const { youtube } = useYoutubeApi();
  const {
    isLoading,
    error,
    data: videos,
  } = useQuery({
    queryKey: ["channel_video", id],
    queryFn: () => youtube.searchChannel(id),
  });
  return (
    <>
      {isLoading && <p>Loading...</p>}
      {error && <p>Wrong</p>}
      <ul>
        {videos &&
          videos.map((video: Video) => <VideoCard video={video} type="list" />)}
      </ul>
    </>
  );
}
