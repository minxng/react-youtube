import { Link } from "react-router-dom";
import { formatAgo } from "../util/date";
import React from "react";

interface Video {
  id: string | { videoId: string };
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
  viewCount?: string;
  channel_img?: {
    thumbnail: {
      default: { url: string };
    };
  };
}

interface VideoCardProps {
  video: Video;
  type: string | null;
}

export default function VideoCard({ video, type }: VideoCardProps) {
  const { title, thumbnails, channelTitle, publishedAt } = video.snippet;
  const view_count = video.viewCount
    ? video.viewCount
    : video.statistics.viewCount;
  const video_id = typeof video.id === "object" ? video.id.videoId : video.id;
  const isList = type === "list";
  const compactNumberFormatter = new Intl.NumberFormat("ko", {
    notation: "compact",
  });
  const compactNumber = (count: number): string => {
    return compactNumberFormatter.format(count);
  };
  return (
    <Link to={`/videos/watch/${video_id}`} state={video}>
      <li className={isList ? "flex gap-1 m-2" : ""}>
        <img
          className={`${isList ? "w-48 mr-2" : "w-full"} rounded-lg`}
          src={thumbnails.medium.url}
          alt="동영상 썸네일"
        />
        <div className="flex gap-4 py-2">
          {video.channel_img ? (
            <img
              className="rounded-full w-10 h-10"
              src={video.channel_img?.thumbnail.default.url}
              alt="채널 이미지"
            />
          ) : null}
          <div className="flex flex-col gap-1">
            <p
              className={`text-ellipsis line-clamp-2 ${
                isList ? "text-sm" : ""
              }`}
            >
              {title}
            </p>
            <div className={`text-gray ${isList ? "text-xs" : "text-sm"}`}>
              <p>{channelTitle}</p>
              <p>
                조회수 {compactNumber(Number(view_count))}회 •
                <span className="px-1">{formatAgo(publishedAt, "ko")}</span>
              </p>
            </div>
          </div>
        </div>
      </li>
    </Link>
  );
}
