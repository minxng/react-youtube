import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useYoutubeApi } from "../context/YoutubeApiContext";

interface Channel {
  id: number;
  name: string;
}

export default function ChannelInfo({ id, name }: Channel) {
  const { youtube } = useYoutubeApi();
  const { isLoading, data: details } = useQuery({
    queryKey: ["details", id],
    queryFn: () => youtube.getChannelInfo(id),
    staleTime: 1000 * 60 * 5,
  });
  if (isLoading) return <p>loading...</p>;
  return (
    <div className="flex my-4 mb-8 items-center">
      <img
        className="rounded-full w-10 h-10"
        src={details.default.url}
        alt="채널 이미지"
      />
      <p className="text-lg font-medium ml-2">{name}</p>
    </div>
  );
}
