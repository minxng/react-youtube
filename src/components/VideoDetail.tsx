import { useLocation } from "react-router-dom";
import ChannelInfo from "./ChannelInfo.tsx";
import ChannelVideos from "./ChannelVideos.tsx";
import React from "react";

export default function VideoDetail() {
  const video = useLocation().state;
  const { title, description, channelId, channelTitle } = video.snippet;
  console.log(video, "videp");
  return (
    <section className="flex flex-col lg:flex-row gap-x-6">
      <article className="basis-4/6">
        <iframe
          id="ytplayer"
          width="100%"
          title={video.id}
          className="aspect-video"
          src={`https://www.youtube.com/embed/${video.id}`}
          frameBorder="0"
        />
        <div className="py-2">
          <h2 className="text-xl font-bold">{title}</h2>
          <ChannelInfo id={channelId} name={channelTitle} />
          <pre className="whitespace-pre-wrap bg-zinc-100 rounded-md p-4">
            {description}
          </pre>
        </div>
      </article>
      <section className="basis-2/6">
        <ChannelVideos id={channelId} />
      </section>
    </section>
  );
}
