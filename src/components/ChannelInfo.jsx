import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useYoutubeApi } from "../context/YoutubeApiContext";
export default function ChannelInfo({ id, name }) {
  const { youtube } = useYoutubeApi();
  const { isLoading, data: details } = useQuery({
    queryKey: ["details", id],
    queryFn: () => youtube.getChannelInfo(id),
  });
  if (isLoading) return <p>loading...</p>;
  console.log(details);
  return (
    <div className="flex my-4 mb-8 items-center">
      <img
        className="rounded-full w-10 h-10"
        src={details.snippet.thumbnails.default.url}
        alt="채널 이미지"
      />
      <p className="text-lg font-medium ml-2">{name}</p>
    </div>
  );
}