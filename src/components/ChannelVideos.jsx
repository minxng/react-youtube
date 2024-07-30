import { useQuery } from "@tanstack/react-query";
import { useYoutubeApi } from "../context/YoutubeApiContext";
import VideoCard from "./VideoCard";
export default function ChannelVideos({ id }) {
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
          videos.map((video) => <VideoCard video={video} type="list" />)}
      </ul>
    </>
  );
}
