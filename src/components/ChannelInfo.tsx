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
  const compactNumberFormatter = new Intl.NumberFormat("ko", {
    notation: "compact",
  });
  const compactNumber = (count: number): string => {
    return compactNumberFormatter.format(count);
  };
  if (isLoading) return <p>loading...</p>;
  return (
    <div className="flex my-4 mb-8 items-center">
      <img
        className="rounded-full w-10 h-10"
        src={details.thumbnail.default.url}
        alt="채널 이미지"
      />
      <p className=" ml-2 flex flex-col">
        <span className="text-md">{name}</span>
        <span className="text-xs">
          구독자 {compactNumber(Number(details.subscriber_count))}명
        </span>
      </p>
    </div>
  );
}
