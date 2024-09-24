import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import VideoCard from "./VideoCard";
import { useYoutubeApi } from "../context/YoutubeApiContext";
import React from "react";

interface Video {
  id: string;
  snippet: {
    title: string;
    thumbnails: {
      medium: {
        url: string;
      };
    };
    channelTitle: string;
    publishedAt: string;
  };
}

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
      {isPending && <p>Loading...</p>}
      {error && <p>Wrong</p>}
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-2 gap-y-4">
        {videos &&
          videos.map((video: Video) => (
            <VideoCard key={video.id} video={video} type={null} />
          ))}
      </ul>
    </div>
  );
}
