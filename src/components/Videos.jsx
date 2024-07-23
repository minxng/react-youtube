import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import VideoCard from "./VideoCard";
import { search } from "../api/youtube";

export default function Videos() {
  const { keyword } = useParams();
  const {
    isPending,
    error,
    data: videos,
  } = useQuery({
    queryKey: ["videos", keyword],
    queryFn: () => search(keyword),
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
