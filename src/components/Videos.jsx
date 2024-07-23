import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import VideoCard from "./VideoCard";
import { useYoutubeApi } from "../context/YoutubeApiContext";

export default function Videos() {
  const { keyword } = useParams();
  const { youtube } = useYoutubeApi();
  const {
    isPending,
    error,
    data: videos,
  } = useQuery({
    queryKey: ["videos", keyword],
    queryFn: () => youtube.search(keyword),
  });

  return (
    <div>
      <p>videos</p>
      {keyword ? `❓${keyword}` : "🔥"}
      {isPending && <p>Loading...</p>}
      {error && <p>Wrong</p>}
      {videos &&
        videos.map((video) => <VideoCard key={video.id} video={video} />)}
    </div>
  );
}
