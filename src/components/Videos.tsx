import { useParams } from "react-router-dom";
import { useInfiniteQuery } from "@tanstack/react-query";
import VideoCard from "./VideoCard";
import { useYoutubeApi } from "../context/YoutubeApiContext";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

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
  statistics: {
    viewCount: string;
  };
  channel_img?: {
    thumbnail: {
      default: { url: string };
    };
  };
}

export default function Videos() {
  const { keyword } = useParams();
  const { youtube } = useYoutubeApi();
  const useGetTopRated = () => {
    return useInfiniteQuery({
      queryKey: ["videos", keyword],
      queryFn: async ({ pageParam }) => {
        return youtube.search(pageParam, keyword);
      },
      getNextPageParam: (last) => {
        if (last.nextPageToken) {
          return last.nextPageToken;
        }
      },
      initialPageParam: null,
    });
  };

  const {
    data: videos,
    isLoading,
    error,
    fetchNextPage,
    isFetchingNextPage,
  } = useGetTopRated();

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView]);

  return (
    <div>
      {isLoading && <p>Loading...</p>}
      {error && <p>Wrong</p>}
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-2 gap-y-4">
        {videos &&
          videos.pages.map((page) =>
            page.items.map((video: Video) => (
              <VideoCard key={video.id} video={video} type={null} />
            ))
          )}
      </ul>
      {!isLoading && (
        <h1 className="relative bottom-40" ref={ref}>
          더 보기
        </h1>
      )}
    </div>
  );
}
